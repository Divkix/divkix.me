# Phase 4: Quality Audit & Build Validation - Research

**Researched:** 2026-02-26
**Domain:** Astro build pipeline, content validation, OG image generation
**Confidence:** HIGH

## Summary

Phase 4 is a build validation phase, not a feature phase. The entire domain is the project's existing multi-step build pipeline (`prebuild` -> `validate-content` -> `astro build`), and the single blocking prerequisite is that `ai-models-compared-2026.mdx` currently has `published: false` in its frontmatter. Everything downstream -- posts.json inclusion, OG image generation, content validation sync, sitemap entry -- gates on `published: true`.

The build pipeline is well-understood, deterministic, and already proven across 11 published posts. There is no new infrastructure, no new libraries, no configuration changes. The work is: flip one frontmatter field, run the existing build chain, verify the outputs exist at expected paths.

**Primary recommendation:** Set `published: true` in the MDX frontmatter, run `bun run prebuild` to regenerate posts.json and OG images, then run `bun run build` to execute the full Astro static build. Verify outputs at each stage.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| BILD-02 | `bun run prebuild` passes (posts.json regenerated, content validated) | Prebuild runs `generate-posts-metadata.js` (writes posts.json with only published posts) then `generate-og-images.js`. Validation is separate (`validate-content.ts`) and runs during `bun run build`. The post must have `published: true` to appear in posts.json. See "Critical Prerequisite" and "Build Pipeline Sequence" sections. |
| BILD-03 | `bun run build` completes without errors | Build chain: prebuild -> validate-content.ts -> astro build -> submit-indexnow.ts. Validation compares published MDX slugs against posts.json slugs; mismatch = build failure. IndexNow skips on local builds (no `CF_PAGES_BRANCH`). See "Build Pipeline Sequence" section. |
| BILD-04 | OG image generated for the post | `generate-og-images.js` reads posts.json (published posts only), generates SVG-to-PNG/WebP via sharp at `public/og/blog/{slug}.png`, `{slug}.webp`, `{slug}-480.webp`, `{slug}-768.webp`. See "OG Image Generation" section. |
</phase_requirements>

## Standard Stack

### Core

No new libraries required. The build pipeline uses only existing project dependencies:

| Library | Version | Purpose | Role in Phase 4 |
|---------|---------|---------|-----------------|
| gray-matter | ^4.0.3 | YAML frontmatter parsing | Used by `generate-posts-metadata.js` and `validate-content.ts` to read `published` field |
| sharp | ^0.34.5 | Image processing | Used by `generate-og-images.js` to convert SVG templates to PNG/WebP |
| astro | ^5.17.3 | Static site builder | `astro build` compiles MDX to static HTML in `dist/` |
| zod | ^4.3.6 | Schema validation | Content collection schema in `src/content/config.ts` validates frontmatter at build time |

### Supporting

| Tool | Purpose | When Used |
|------|---------|-----------|
| `biome check .` | Linting (TS/TSX/JS only, not .astro or .mdx) | Optional quality gate -- does not run in the build chain but is a project standard |
| `bunx knip` | Unused export/dependency detection | Optional quality gate -- not part of build chain |
| `astro check` | TypeScript type checking | Optional quality gate -- not part of build chain |

### Alternatives Considered

None. This phase uses existing infrastructure exclusively.

**Installation:** No new packages needed.

## Architecture Patterns

### Critical Prerequisite: published Flag

The MDX file currently has `published: false` (line 18 of `src/content/blog/ai-models-compared-2026.mdx`). This is the single gate for the entire phase:

```
published: false  -->  published: true
```

**Why this matters:** Both `generate-posts-metadata.js` (line 119: `published: frontmatter.published !== false`) and `validate-content.ts` (line 50: `return data.published !== false`) filter on this field. With `published: false`:
- Post is excluded from `posts.json`
- OG images are not generated for it (generator reads from posts.json)
- Content validation only compares published posts against posts.json
- Sitemap does not include the post URL
- Blog listing page does not show the post

### Build Pipeline Sequence

The `bun run build` script executes this exact chain (from `package.json`):

```
bun run prebuild && bun run scripts/validate-content.ts && astro build && bun run scripts/submit-indexnow.ts
```

Expanded:

| Step | Script | Input | Output | Failure Mode |
|------|--------|-------|--------|--------------|
| 1 | `generate-posts-metadata.js` | `src/content/blog/*.mdx` | `content/blog/posts.json` | Exit 1 if content dir missing |
| 2 | `generate-og-images.js` | `content/blog/posts.json` | `public/og/blog/{slug}.{png,webp,-768.webp,-480.webp}` | Skips if posts.json missing; logs error per post on failure |
| 3 | `validate-content.ts` | `src/content/blog/*.mdx` + `content/blog/posts.json` | Pass/fail (exit 0 or 1) | Exit 1 on count mismatch, slug mismatch, or missing posts.json |
| 4 | `astro build` | Everything | `dist/` | Exit non-zero on Zod schema errors, MDX parse errors, or missing imports |
| 5 | `submit-indexnow.ts` | `dist/sitemap-0.xml` | HTTP POST to IndexNow API | **Skips on local** (checks `CF_PAGES_BRANCH=main`); never fails the build |

### OG Image Generation

`generate-og-images.js` produces 4 files per post:
- `public/og/blog/{slug}.png` -- 1200x630 PNG for social media meta tags
- `public/og/blog/{slug}.webp` -- 1200x630 WebP for page display
- `public/og/blog/{slug}-768.webp` -- 768px wide responsive variant
- `public/og/blog/{slug}-480.webp` -- 480px wide responsive variant

The blog post template (`src/pages/blog/[slug].astro`, line 149) constructs the OG image URL as:
```
`${baseUrl}/og/blog/${post.slug}.png`
```

And displays with srcset (line 273-274):
```
src={`/og/blog/${post.slug}.webp`}
srcset={`/og/blog/${post.slug}-480.webp 480w, /og/blog/${post.slug}-768.webp 768w, /og/blog/${post.slug}.webp 1200w`}
```

**Expected output for this post:**
- `public/og/blog/ai-models-compared-2026.png`
- `public/og/blog/ai-models-compared-2026.webp`
- `public/og/blog/ai-models-compared-2026-768.webp`
- `public/og/blog/ai-models-compared-2026-480.webp`

Currently: **none of these exist** (confirmed via filesystem check).

### Content Validation Logic

`validate-content.ts` performs three checks:
1. **Count match:** Number of published MDX files == `postsJson.totalPosts`
2. **Slug match:** Every published MDX slug exists in posts.json, and vice versa
3. **Slug format:** All MDX slugs (including drafts) match `/^[a-z0-9-]+$/`

The slug `ai-models-compared-2026` already passes the format check. After setting `published: true` and regenerating posts.json, counts and slugs will sync.

### Sitemap Integration

`astro.config.mjs` reads `content/blog/posts.json` at config time to build a `blogDateMap`. Only published posts with entries in posts.json get `lastmod` dates in the sitemap. After this phase, the post will appear in the sitemap with `lastmod: 2026-02-25` and `priority: 0.8`.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Content sync validation | Manual slug/count comparison | `validate-content.ts` (existing) | Already handles published vs draft filtering, format checks |
| OG image creation | Manual image design | `generate-og-images.js` (existing) | SVG template + sharp pipeline, generates all 4 variants automatically |
| Post metadata extraction | Manual frontmatter reading | `generate-posts-metadata.js` (existing) | Handles TOC, reading time, related posts, git dates |

**Key insight:** This phase requires zero custom code. Every tool already exists and is battle-tested across 11 published posts.

## Common Pitfalls

### Pitfall 1: Running build without setting published: true
**What goes wrong:** `bun run prebuild` succeeds but the post is excluded from posts.json. `validate-content.ts` also passes because it only compares published posts. The build completes "successfully" but the post is invisible -- no OG images, no sitemap entry, no blog listing.
**Why it happens:** The `published: false` flag silently filters the post at every stage. No error is thrown.
**How to avoid:** Set `published: true` FIRST, before running any build command.
**Warning signs:** posts.json totalPosts count unchanged from before; no OG image generated for the slug.

### Pitfall 2: Running validate-content.ts before prebuild
**What goes wrong:** `validate-content.ts` compares MDX files against a stale `posts.json`. If you change `published: true` but don't regenerate posts.json first, the count/slug comparison fails because posts.json still has the old count.
**Why it happens:** The build script chains them correctly (`prebuild && validate`), but manual testing might not.
**How to avoid:** Always run `bun run prebuild` before `bun run scripts/validate-content.ts`, or just run `bun run build` which chains everything.
**Warning signs:** "Mismatch: X published MDX files but posts.json has Y" error.

### Pitfall 3: OG image generation fails silently for individual posts
**What goes wrong:** `generate-og-images.js` catches per-post errors and logs them but continues. A malformed title with unescaped XML characters could produce a corrupt image without stopping the build.
**Why it happens:** The script uses try/catch per post with `continue` (line 258-260).
**How to avoid:** Check that all 4 image files exist for the slug after prebuild. The title "AI Models Compared 2026: I Tested All Five Flagships So You Don't Have To" contains no XML-unsafe characters, so this is low risk.
**Warning signs:** Missing `.png` or `.webp` files in `public/og/blog/`.

### Pitfall 4: MDX content errors surfaced only during astro build
**What goes wrong:** Frontmatter passes gray-matter parsing (prebuild) but fails Zod schema validation during `astro build`. Or MDX body has syntax errors (unclosed JSX, invalid imports).
**Why it happens:** gray-matter is lenient; Zod and MDX compiler are strict. Different validation stages.
**How to avoid:** The Zod schema (`src/content/config.ts`) is already known and the frontmatter was authored to match it. MDX body is plain markdown tables and prose (no JSX components, no imports). Risk is low.
**Warning signs:** `astro build` errors mentioning content collection validation or MDX compilation.

### Pitfall 5: Stale OG images from caching
**What goes wrong:** `generate-og-images.js` skips image generation if existing images are newer than posts.json (lines 211-223). If posts.json is regenerated but images already exist from a previous run with different content, the images won't update.
**Why it happens:** The freshness check compares mtime of image vs posts.json.
**How to avoid:** Not an issue here -- no OG images exist yet for this post. They will be freshly generated.

## Code Examples

### Verification: Check posts.json includes the post

```bash
# After bun run prebuild, verify the post appears
cat content/blog/posts.json | grep -c '"ai-models-compared-2026"'
# Expected: 1 (at minimum, the slug appears in the posts array)
```

### Verification: Check OG images exist

```bash
# After bun run prebuild, verify all 4 image variants
ls -la public/og/blog/ai-models-compared-2026.png
ls -la public/og/blog/ai-models-compared-2026.webp
ls -la public/og/blog/ai-models-compared-2026-768.webp
ls -la public/og/blog/ai-models-compared-2026-480.webp
```

### Verification: Check build output

```bash
# After bun run build, verify the post page exists in dist
ls -la dist/blog/ai-models-compared-2026/index.html
```

### Verification: Content validation standalone

```bash
# Run validation independently to check sync
bun run scripts/validate-content.ts
# Expected output: "Content validated: N published posts in sync (M total, K drafts)"
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Manual OG image creation | Automated SVG-to-PNG/WebP via sharp | Pre-existing in project | No manual image work needed |
| eslint + prettier | Biome 2.4.3 | Pre-existing in project | `bun run lint` for quality check, excludes .astro and .mdx |

**Deprecated/outdated:** Nothing. The pipeline is current and functional.

## Open Questions

1. **Should `bun run lint` and `bunx knip` be part of the phase gate?**
   - What we know: They are project standards per CLAUDE.md but are NOT part of the `bun run build` chain. The requirements (BILD-02, BILD-03, BILD-04) only mention prebuild, build, and OG images.
   - What's unclear: Whether the phase planner should include them as verification steps.
   - Recommendation: Include them as optional verification steps (nice-to-have, not blocking). The requirements are strictly about the build pipeline.

2. **Should `astro check` (type-check) be run?**
   - What we know: Available as `bun run type-check`, not part of build chain. No TypeScript files are being modified in this phase -- only the MDX frontmatter `published` field changes.
   - What's unclear: Whether frontmatter changes can trigger type errors elsewhere.
   - Recommendation: Skip. The change is a boolean field in YAML frontmatter. No TypeScript code is modified.

## Sources

### Primary (HIGH confidence)

- **Project source code** -- Direct inspection of all 4 build scripts (`generate-posts-metadata.js`, `generate-og-images.js`, `validate-content.ts`, `submit-indexnow.ts`), `package.json` build chain, `astro.config.mjs` sitemap integration, `src/content/config.ts` Zod schema, and `src/pages/blog/[slug].astro` OG image references
- **Filesystem state** -- Confirmed `ai-models-compared-2026` is absent from `content/blog/posts.json`, no OG images exist at `public/og/blog/ai-models-compared-2026*`, MDX file has `published: false` at line 18

### Secondary (MEDIUM confidence)

None needed. Everything is verifiable from source code.

### Tertiary (LOW confidence)

None.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- no new libraries, all existing project dependencies inspected
- Architecture: HIGH -- build pipeline fully traced through source code, every script read line-by-line
- Pitfalls: HIGH -- failure modes derived from actual code logic, not speculation

**Research date:** 2026-02-26
**Valid until:** Indefinite (pipeline is project-internal, not dependent on external API changes)
