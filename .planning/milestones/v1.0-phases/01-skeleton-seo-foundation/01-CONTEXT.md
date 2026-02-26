# Phase 1: Skeleton & SEO Foundation - Context

**Gathered:** 2026-02-25
**Status:** Ready for planning

<domain>
## Phase Boundary

Create a valid MDX file at `src/content/blog/ai-models-compared-2026.mdx` with complete SEO frontmatter (title, excerpt, tldr, keyTakeaways, faq, tags, date) and H2 stub headings for all planned sections. The file must pass Zod schema validation. No article body content — that's Phase 2 and 3.

</domain>

<decisions>
## Implementation Decisions

### Title & excerpt tone
- Conversational/casual voice throughout — "I used...", "here's the no-BS breakdown" style
- Title should be short and punchy — no model names in the title itself (e.g., "AI Models Compared 2026" variant)
- Excerpt ~2 sentences with a teaser hint ("one model surprised me" or "the winner wasn't what I expected") to drive clicks without spoiling

### Section heading structure
- H2s use clean category labels, not question-based or winner-reveal format
- Category headings: "Coding & Software Engineering", "Reasoning & Complex Problem Solving", "Agents & Tool Use", "Creative Writing & Communication", "Multimodal: Vision, Audio, Video"
- Grok 4.20 spotlight and Benchmark Scorecard are standalone H2 sections (not nested)

### FAQ & keyTakeaways
- FAQ targets "best for X" search queries (e.g., "What's the best AI for coding in 2026?")
- 5 keyTakeaways, one per model — model-specific verdicts (e.g., "Claude Opus 4.6 is the coding king")
- FAQ answers: brief and definitive for snippet optimization (1-2 sentences)

### Tags & publishing
- `published: false` — draft until Phase 4 quality audit flips it
- `date: "2026-02-25"` — today's date, update `dateModified` when content changes

### Claude's Discretion
- TL;DR tone (factual vs casual) — pick what reads best in frontmatter context
- Section ordering (hook → comparison table → intros → categories → grok → scorecard → anti-hype → verdict, or better flow if identified)
- Whether anti-features/hype-check section gets its own H2 or folds into verdict
- Tag selection strategy (model names + category vs category-only, based on existing blog patterns and SEO value)
- Whether to include a Grok-specific FAQ question (based on search volume signals)
- Whether excerpt explicitly differentiates from the existing ai-coding-tools-compared-2026 post
- FAQ answer length per question — brief for some, detailed for others as appropriate

</decisions>

<specifics>
## Specific Ideas

- Title style references: "I Used Every Major AI Model for 3 Months. Here's What Actually Happened." — casual, first-person, experience-driven
- Excerpt vibe: "Look, I get it — there are too many AI models and everyone claims theirs is best. I spent real time with all five flagships so here's the no-BS breakdown."
- Existing related post: `ai-coding-tools-compared-2026` — this new post covers models broadly (not just coding tools)

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 01-skeleton-seo-foundation*
*Context gathered: 2026-02-25*
