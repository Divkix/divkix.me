# AI Models Compared 2026: Claude vs ChatGPT vs Gemini vs Grok

## What This Is

A ~3000-word blog post comparing the latest flagship AI models (Claude Opus/Sonnet 4.6, GPT 5.2 Thinking, Codex 5.3 xHigh, Gemini 3.1 Pro, Grok 4.20) as a use-case guide. Published as an MDX post on divkix.me, targeting both developers and tech-savvy general readers with a conversational, first-person tone.

## Core Value

Help readers pick the right AI model for their specific task by providing honest, benchmark-backed, experience-informed comparisons — not marketing fluff.

## Requirements

### Validated

- ✓ Blog system with MDX content collections — existing
- ✓ Frontmatter schema with title, date, excerpt, tags, tldr, keyTakeaways, faq — existing
- ✓ OG image generation pipeline — existing
- ✓ SEO with JSON-LD structured data (BlogPosting, FAQ) — existing
- ✓ Build pipeline with metadata extraction and validation — existing
- ✓ Sitemap and RSS feed integration — existing

### Active

- [ ] Research latest model specs, benchmarks, and capabilities for all 5 models
- [ ] Write ~3000-word MDX blog post with hybrid structure (model intros → head-to-head by category → verdict)
- [ ] Include benchmark images/references from LMArena, Artificial Analysis, official model cards, standard benchmarks (MMLU, HumanEval, SWE-Bench)
- [ ] Cover Grok 4.20 multi-agent capabilities as a highlight
- [ ] Cover use-case categories: coding, reasoning, agents, creative writing, multimodal
- [ ] Complete frontmatter with SEO fields (tldr, keyTakeaways, faq)
- [ ] Ensure build pipeline passes (posts.json regeneration, content validation, OG images)

### Out of Scope

- New site features or components — existing blog infrastructure is sufficient
- Pricing deep-dive or API comparison — this is a capabilities/use-case post
- Historical model evolution — focus on current state, not how we got here
- Video or interactive content — static MDX post only

## Context

- Existing blog has 11 posts including a related post (`ai-coding-tools-compared-2026.mdx`) that covers coding tools specifically — this new post is broader (models themselves, not just coding tools)
- Blog uses conversational, first-person writing style with direct opinions
- Posts include structured data for SEO (FAQ schema, key takeaways, tldr)
- Build pipeline requires `bun run prebuild` after adding new posts to regenerate `posts.json`
- Slug format must be URL-safe: `/^[a-z0-9-]+$/`
- Models to cover:
  - **Claude Opus 4.6 / Sonnet 4.6** (Anthropic) — latest Claude family
  - **GPT 5.2 Thinking** (OpenAI) — reasoning-focused flagship
  - **Codex 5.3 xHigh** (OpenAI) — code-specialized model
  - **Gemini 3.1 Pro** (Google DeepMind) — multimodal flagship
  - **Grok 4.20** (xAI) — multi-agent capabilities highlighted

## Constraints

- **Content schema**: Must conform to existing Zod schema in `src/content/config.ts`
- **Slug format**: URL-safe lowercase alphanumeric with hyphens only
- **Build pipeline**: Must pass `validate-content.ts` after adding post
- **Images**: Benchmark images need to be sourced from public/official sources with attribution
- **Length**: ~3000 words target (matching existing long-form posts)
- **Date**: Publication date 2026-02-25

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Hybrid structure (intros → categories → verdict) | Best of both worlds: readers get model context AND comparative analysis | — Pending |
| Conversational tone, first-person | Matches existing blog voice, more engaging than dry comparison | — Pending |
| Include benchmark images as references | Visual proof points increase credibility and shareability | — Pending |
| Cover Grok multi-agent as highlight | User specifically interested, differentiating feature worth spotlight | — Pending |

---
*Last updated: 2026-02-25 after initialization*
