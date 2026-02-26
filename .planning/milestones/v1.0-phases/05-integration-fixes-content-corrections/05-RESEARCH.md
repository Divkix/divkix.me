# Phase 5: Integration Fixes & Content Corrections - Research

**Researched:** 2026-02-26
**Domain:** MDX frontmatter corrections, Astro SEO meta tag pipeline, content accuracy
**Confidence:** HIGH

## Summary

This phase addresses three distinct but straightforward issues identified in the v1.0 milestone audit (INT-01, INT-02, FLOW-01) plus two factual errors in frontmatter arrays. All fixes are confined to a single file (`src/content/blog/ai-models-compared-2026.mdx`) -- no template, config, or infrastructure changes are needed. The existing Astro template code in `[slug].astro` and `BaseLayout.astro` already handles `dateModified` correctly when present in frontmatter; the gap is simply that the frontmatter field was never added.

The cross-reference trailing slash and the "10M -> 1M" token corrections are pure text edits in the same MDX file. After all edits, `bun run prebuild` must regenerate `posts.json` (which will pick up the new `dateModified` from frontmatter instead of git date), and `bun run build` must pass cleanly.

**Primary recommendation:** Make all four edits in the MDX frontmatter/body, run `bun run build` (which includes prebuild), and verify the built HTML contains the correct JSON-LD `dateModified`, `article:modified_time` meta tag, trailing slash on the cross-reference link, and corrected "1M token" text in rendered key takeaways and FAQ.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| SEO-01 | Complete frontmatter with title, date, excerpt, tags, published, tldr, keyTakeaways (5+), faq (4-5 questions) | Adding `dateModified: '2026-02-26'` completes the frontmatter; `[slug].astro` lines 71-73 already use `post.data.dateModified` for JSON-LD `dateModified`; `BaseLayout.astro` line 67 already conditionally renders `article:modified_time` when `articleMeta.modifiedTime` is present |
| QUAL-04 | Cross-reference link to ai-coding-tools-compared-2026 with explicit scope differentiation | Line 190 of MDX has the link text and scope differentiation already; only the href needs a trailing slash appended to match `trailingSlash: "always"` in `astro.config.mjs` line 36 |
</phase_requirements>

## Standard Stack

### Core

No new libraries needed. All fixes are content edits within the existing stack:

| Component | Version | Purpose | Relevance to Phase |
|-----------|---------|---------|-------------------|
| Astro | 5.x | Static site generator | Builds the HTML that must contain correct meta tags |
| MDX | via `@astrojs/mdx` | Blog content format | The single file being edited |
| Zod | via `astro:content` | Schema validation | Validates `dateModified` field format (`YYYY-MM-DD`) |

### Supporting

| Tool | Purpose | When Used |
|------|---------|-----------|
| `bun run prebuild` | Regenerates `posts.json` from MDX frontmatter | After MDX edits, before build |
| `bun run build` | Full production build (prebuild + OG + validate + astro build) | Final verification |

### Alternatives Considered

None. This is a pure content correction phase -- no architectural choices to make.

## Architecture Patterns

### Data Flow: dateModified Through the Pipeline

Understanding this flow is critical for verifying the fix works end-to-end:

```
MDX frontmatter: dateModified: '2026-02-26'
    |
    +--> [slug].astro line 71-73: JSON-LD BlogPosting.dateModified
    |       Uses: post.data.dateModified ? `${post.data.dateModified}T00:00:00Z` : `${post.data.date}T00:00:00Z`
    |       Current bug: Falls back to date (2026-02-25) because dateModified absent
    |
    +--> [slug].astro line 152-158: articleMeta.modifiedTime
    |       Uses: post.data.dateModified ? { modifiedTime: `${post.data.dateModified}T00:00:00Z` } : {}
    |       Current bug: Omits modifiedTime entirely because dateModified absent
    |
    +--> BlogLayout.astro: Passes articleMeta to BaseLayout
    |
    +--> BaseLayout.astro line 67: <meta property="article:modified_time">
    |       Uses: articleMeta.modifiedTime && renders meta tag
    |       Current bug: Meta tag completely absent because modifiedTime never set
    |
    +--> generate-posts-metadata.js line 111: posts.json dateModified
            Uses: frontmatter.dateModified || getGitLastModified(filePath)
            Current state: Already correct (2026-02-26 from git), but will now use frontmatter value
```

### Fix Locations (All in One File)

```
src/content/blog/ai-models-compared-2026.mdx
    |
    +-- Line 6 area (frontmatter): Add dateModified: '2026-02-26'
    +-- Line 23 (keyTakeaways[2]): Change "10M token window" to "1M token context window"
    +-- Line 32 (faq[2].a): Change "10M token context" to "1M token context"
    +-- Line 190 (body): Change /blog/ai-coding-tools-compared-2026 to /blog/ai-coding-tools-compared-2026/
```

### Verification Points in Built HTML

After `bun run build`, check `dist/blog/ai-models-compared-2026/index.html`:

1. **JSON-LD**: `"dateModified":"2026-02-26T00:00:00Z"` in the BlogPosting script tag
2. **Meta tag**: `<meta property="article:modified_time" content="2026-02-26T00:00:00Z" />` in `<head>`
3. **Cross-reference**: href contains `/blog/ai-coding-tools-compared-2026/` (with trailing slash)
4. **Key takeaways**: Rendered text says "1M token context window" not "10M"
5. **FAQ**: Rendered FAQ answer says "1M token context" not "10M"

### Anti-Patterns to Avoid

- **Editing `[slug].astro` or `BaseLayout.astro`:** The templates already handle `dateModified` correctly. Do NOT modify them. The fix is purely in the content file.
- **Editing `posts.json` directly:** This file is generated. Edit the MDX source; `prebuild` regenerates it.
- **Using `dateModified` with a different date format:** The Zod schema in `content/config.ts` requires `YYYY-MM-DD` format exactly. Do NOT use ISO 8601 with time component in the frontmatter value.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Date inconsistency | Custom build script to inject dates | `dateModified` frontmatter field | Templates already support it; just add the data |
| Trailing slash enforcement | Link rewriting plugin or middleware | Astro's `trailingSlash: "always"` config | Already configured; just fix the source link |

**Key insight:** Every piece of infrastructure needed for these fixes already exists. The gaps are data omissions, not code deficiencies.

## Common Pitfalls

### Pitfall 1: Wrong dateModified Format
**What goes wrong:** Using `dateModified: '2026-02-26T00:00:00Z'` or `dateModified: 2026-02-26` (unquoted) in frontmatter
**Why it happens:** ISO 8601 timestamps feel natural; YAML treats unquoted dates as Date objects
**How to avoid:** Use the exact format `dateModified: '2026-02-26'` (quoted string, YYYY-MM-DD only). The Zod schema (`content/config.ts` line 16-21) validates this regex: `/^\d{4}-\d{2}-\d{2}$/`
**Warning signs:** `bun run build` fails with Zod validation error mentioning dateModified

### Pitfall 2: Forgetting to Run prebuild After MDX Changes
**What goes wrong:** `posts.json` is stale, sitemap `lastmod` doesn't reflect new `dateModified`
**Why it happens:** `posts.json` is a derived artifact; easy to forget it needs regeneration
**How to avoid:** `bun run build` already runs prebuild as step 1 of its chain. Just run the full build.
**Warning signs:** `posts.json` dateModified still shows git-derived date instead of frontmatter value (functional, but not canonical)

### Pitfall 3: Editing the Wrong keyTakeaways Index
**What goes wrong:** Fixing the wrong takeaway or FAQ answer
**Why it happens:** YAML arrays are 0-indexed; the audit says "keyTakeaways[2]" which is the third item
**How to avoid:** The specific text to find is `"10M token window"` on line 23 and `"10M token context"` on line 32. Use exact text matching, not index counting.
**Warning signs:** `grep -n "10M" src/content/blog/ai-models-compared-2026.mdx` still returns matches after fix

### Pitfall 4: Cross-Reference Link Breaks After Adding Trailing Slash
**What goes wrong:** The target post doesn't exist or the slug is wrong
**Why it happens:** Typo in slug or target post unpublished
**How to avoid:** Verify `src/content/blog/ai-coding-tools-compared-2026.mdx` exists and has `published: true`
**Warning signs:** 404 instead of 301 after the fix

## Code Examples

### Fix 1: Add dateModified to Frontmatter

The frontmatter currently has `date: "2026-02-25"` on line 6. Add `dateModified` immediately after:

```yaml
# Before (line 6 area):
date: "2026-02-25"
excerpt: "Five flagship AI models..."

# After:
date: "2026-02-25"
dateModified: "2026-02-26"
excerpt: "Five flagship AI models..."
```

### Fix 2: Correct keyTakeaways[2] (Line 23)

```yaml
# Before:
  - "Gemini 3.1 Pro owns multimodal and long-context — 10M token window and 77.1% ARC-AGI-2 make it the reasoning/research leader"

# After:
  - "Gemini 3.1 Pro owns multimodal and long-context — 1M token context window and 77.1% ARC-AGI-2 make it the reasoning/research leader"
```

### Fix 3: Correct FAQ answer[2] (Line 32)

```yaml
# Before:
    a: "For research and long documents, yes — Gemini 3.1 Pro's 10M token context and 77.1% ARC-AGI-2 score beat GPT 5.2. For general daily use and writing, GPT 5.2 edges ahead."

# After:
    a: "For research and long documents, yes — Gemini 3.1 Pro's 1M token context and 77.1% ARC-AGI-2 score beat GPT 5.2. For general daily use and writing, GPT 5.2 edges ahead."
```

### Fix 4: Add Trailing Slash to Cross-Reference (Line 190)

```markdown
# Before:
See [Claude Code vs Cursor vs Copilot (2026): Best AI Coding Tools Compared](/blog/ai-coding-tools-compared-2026) for that breakdown.

# After:
See [Claude Code vs Cursor vs Copilot (2026): Best AI Coding Tools Compared](/blog/ai-coding-tools-compared-2026/) for that breakdown.
```

### Verification Command

```bash
# After all fixes, run full build:
bun run build

# Then verify the output HTML:
grep -o '"dateModified":"[^"]*"' dist/blog/ai-models-compared-2026/index.html
grep -o 'article:modified_time.*content="[^"]*"' dist/blog/ai-models-compared-2026/index.html
grep -o 'ai-coding-tools-compared-2026[/"]' dist/blog/ai-models-compared-2026/index.html
grep '10M token' dist/blog/ai-models-compared-2026/index.html  # Should return nothing
```

## State of the Art

Not applicable -- this phase is content corrections, not technology adoption.

## Open Questions

None. All four fixes are well-defined with exact locations, exact before/after text, and clear verification steps. The template code has been read and confirmed to handle `dateModified` correctly when present.

## Sources

### Primary (HIGH confidence)

All findings come from direct source code inspection:

- `src/content/blog/ai-models-compared-2026.mdx` -- Lines 1-37 (frontmatter), line 190 (cross-reference)
- `src/content/config.ts` -- Lines 15-22 (dateModified Zod schema: optional string, YYYY-MM-DD regex)
- `src/pages/blog/[slug].astro` -- Lines 63-85 (JSON-LD generation), lines 152-159 (articleMeta construction)
- `src/layouts/BaseLayout.astro` -- Lines 64-71 (article meta tag rendering including `article:modified_time`)
- `src/layouts/BlogLayout.astro` -- Lines 15-21 (articleMeta interface with optional modifiedTime)
- `astro.config.mjs` -- Line 36 (`trailingSlash: "always"`), lines 14-31 (sitemap serialization using posts.json dateModified)
- `scripts/generate-posts-metadata.js` -- Line 111 (`frontmatter.dateModified || getGitLastModified(filePath)`)
- `.planning/v1.0-MILESTONE-AUDIT.md` -- INT-01, INT-02, FLOW-01 gap definitions and tech debt items 1-2, 9-10

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- No new libraries; all existing code paths verified by reading source
- Architecture: HIGH -- Complete data flow traced from MDX frontmatter through templates to HTML output
- Pitfalls: HIGH -- All edge cases are format validation (Zod) which is already enforced

**Research date:** 2026-02-26
**Valid until:** 2026-03-26 (stable -- content fixes don't change with library updates)
