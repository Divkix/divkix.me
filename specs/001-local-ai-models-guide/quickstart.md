# Quickstart: Local AI Models Guide Blog Post

**Date**: 2026-03-02 | **Branch**: `001-local-ai-models-guide`

## Prerequisites

- Repository cloned, on branch `001-local-ai-models-guide`
- `bun install` completed
- Familiarity with existing blog posts (especially `ai-models-compared-2026.mdx` for style reference)

## Implementation Steps

### Step 1: Create the MDX file

Create `src/content/blog/local-ai-models-guide-2026.mdx` with proper frontmatter conforming to the Zod schema in `src/content/config.ts`.

**Required frontmatter fields:**
```yaml
title: "[Display title]"
seoTitle: "[SEO-optimized title, different from display]"
seoDescription: "[Meta description, keyword-rich, ≤160 chars]"
date: "2026-03-02"
excerpt: "[Short summary for cards]"
tags: [AI, Open Source, Local AI, Ollama, Quantization, ...]
published: true
tldr: "[One paragraph summary]"
keyTakeaways:
  - "[4-6 bullet points]"
faq:
  - q: "[Question phrased as users/AI would ask]"
    a: "[Direct, factual answer with data]"
```

### Step 2: Write the content

Follow the content structure from `data-model.md`. Key constraints:
- 3,000-6,000 words (SC-005)
- P1 + P2 ≥ 70% of content (SC-009)
- ≥3 comparison tables (SC-003)
- ≥6 open source models with ≥4 benchmarks (SC-002)
- Cross-links to ≥2 existing posts (SC-007)
- All data attributed to named sources (SC-008)
- Match existing blog tone: direct, cynical, opinionated (FR-010)

### Step 3: Regenerate posts.json

```bash
bun run prebuild
```

This runs `generate-posts-metadata.js` which parses all MDX frontmatter and writes `content/blog/posts.json`.

### Step 4: Validate and build

```bash
bun run lint          # Biome check (MDX excluded, but any TS changes caught)
bun run type-check    # astro check
bun run build         # Full pipeline: prebuild → validate → astro build
```

The build will fail at `validate-content.ts` if posts.json is out of sync with MDX files.

### Step 5: Preview

```bash
bun run preview       # Preview production build at localhost:4321
```

Verify:
- [ ] Post renders at `/blog/local-ai-models-guide-2026/`
- [ ] Tables display correctly
- [ ] Cross-links resolve
- [ ] FAQ section visible
- [ ] OG image generated
- [ ] View source: JSON-LD schema present (BlogPosting + FAQ)

## Quality Gates (from Constitution Principle IV)

```bash
bun run lint          # Zero errors
bunx knip             # Zero unused exports
bun run type-check    # Zero TypeScript errors
bun run build         # Full build succeeds
```

All four must pass before the post is considered complete.

## File Checklist

| File | Action | Notes |
|------|--------|-------|
| `src/content/blog/local-ai-models-guide-2026.mdx` | Create | The blog post |
| `content/blog/posts.json` | Auto-regenerated | By `bun run prebuild` |
| `dist/og/local-ai-models-guide-2026.png` | Auto-generated | By `generate-og-images.js` |

No other files should be created or modified.
