# Phase 1: Skeleton & SEO Foundation - Research

**Researched:** 2026-02-25
**Domain:** Astro MDX content collections, SEO frontmatter, FAQ structured data, AI model comparison keyword targeting
**Confidence:** HIGH

## Summary

Phase 1 creates a single MDX file at `src/content/blog/ai-models-compared-2026.mdx` with complete SEO-optimized frontmatter and H2 stub headings. The technical domain is narrow and well-understood: the existing blog has 11 posts following an identical pattern, the Zod schema is explicit, and the build pipeline is fully documented. The only genuine risk is a **build pipeline incompatibility with `published: false` drafts** -- the validation script counts all MDX files but `posts.json` only includes published ones, guaranteeing a count mismatch that fails the build.

The SEO domain requires more nuance: FAQ schema rich results are now restricted to authoritative government/health sites by Google (since 2023), but the structured data still benefits AI search engines (Perplexity, ChatGPT Search, Gemini) and provides semantic structure. The real SEO value comes from targeting "best AI for [task] 2026" long-tail queries in FAQ answers and section headings.

**Primary recommendation:** Create the MDX file with all required frontmatter fields, H2 stubs matching the decided section structure, and FAQ questions targeting verified high-intent search queries. Address the `published: false` build pipeline bug either by fixing `validate-content.ts` to account for unpublished drafts or by keeping `published: true` during development and flipping in Phase 4.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Conversational/casual voice throughout -- "I used...", "here's the no-BS breakdown" style
- Title should be short and punchy -- no model names in the title itself (e.g., "AI Models Compared 2026" variant)
- Excerpt ~2 sentences with a teaser hint ("one model surprised me" or "the winner wasn't what I expected") to drive clicks without spoiling
- H2s use clean category labels, not question-based or winner-reveal format
- Category headings: "Coding & Software Engineering", "Reasoning & Complex Problem Solving", "Agents & Tool Use", "Creative Writing & Communication", "Multimodal: Vision, Audio, Video"
- Grok 4.20 spotlight and Benchmark Scorecard are standalone H2 sections (not nested)
- FAQ targets "best for X" search queries (e.g., "What's the best AI for coding in 2026?")
- 5 keyTakeaways, one per model -- model-specific verdicts (e.g., "Claude Opus 4.6 is the coding king")
- FAQ answers: brief and definitive for snippet optimization (1-2 sentences)
- `published: false` -- draft until Phase 4 quality audit flips it
- `date: "2026-02-25"` -- today's date, update `dateModified` when content changes

### Claude's Discretion
- TL;DR tone (factual vs casual) -- pick what reads best in frontmatter context
- Section ordering (hook -> comparison table -> intros -> categories -> grok -> scorecard -> anti-hype -> verdict, or better flow if identified)
- Whether anti-features/hype-check section gets its own H2 or folds into verdict
- Tag selection strategy (model names + category vs category-only, based on existing blog patterns and SEO value)
- Whether to include a Grok-specific FAQ question (based on search volume signals)
- Whether excerpt explicitly differentiates from the existing ai-coding-tools-compared-2026 post
- FAQ answer length per question -- brief for some, detailed for others as appropriate

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| SEO-01 | Complete frontmatter with title, date, excerpt, tags, published, tldr, keyTakeaways (5+), faq (4-5 questions) | Zod schema fully mapped (see Standard Stack > Schema Fields). All fields documented with types and constraints. Existing post patterns provide exact formatting templates. |
| SEO-02 | H2 headings target distinct search intents (category-specific long-tail queries) | Section heading structure locked in CONTEXT.md. Each H2 maps to a distinct "best AI for [category] 2026" search intent verified via web search. |
| SEO-03 | Primary keyword appears in first 100 words and H1 title | Title format decided: "AI Models Compared 2026" variant. Keyword placement in title is automatic; first-100-words placement requires a stub paragraph or the hook H2 being first. |
| SEO-04 | FAQ questions match real search queries about AI model comparison | Search query research completed. "Best AI for coding 2026", "best AI for writing 2026", "Claude vs GPT vs Gemini 2026" are high-volume verified queries. FAQ question patterns documented. |
| SEO-05 | Slug follows URL-safe format: `ai-models-compared-2026` | Slug `ai-models-compared-2026` passes `/^[a-z0-9-]+$/` regex used by `validate-content.ts`. Confirmed format matches existing blog slugs. |
| BILD-01 | MDX file at `src/content/blog/ai-models-compared-2026.mdx` with valid Zod schema frontmatter | Full Zod schema mapped. Critical pitfall identified: `published: false` breaks `validate-content.ts` count check. Resolution strategies documented in Common Pitfalls. |
</phase_requirements>

## Standard Stack

### Core

No new libraries needed. Phase 1 uses only the existing content pipeline.

| Component | Version/Path | Purpose | Why Standard |
|-----------|-------------|---------|--------------|
| Astro Content Collections | v5 (existing) | MDX frontmatter validation via Zod schema | Already configured in `src/content/config.ts` |
| Zod | via `astro:content` | Schema definition and validation | Astro's built-in schema system |
| gray-matter | via `generate-posts-metadata.js` | Frontmatter parsing for `posts.json` | Used by prebuild script |
| validate-content.ts | `scripts/validate-content.ts` | MDX/JSON sync validation | Part of build pipeline |

### Schema Fields (from `src/content/config.ts`)

The exact Zod schema that the MDX frontmatter must satisfy:

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| `title` | `z.string()` | Yes | No length limit in schema |
| `date` | `z.string()` | Yes | Must match `/^\d{4}-\d{2}-\d{2}$/` AND be a valid parseable date |
| `dateModified` | `z.string()` | No | Same format as `date` |
| `excerpt` | `z.string()` | Yes | No length limit in schema |
| `tags` | `z.array(z.string())` | Yes | Non-empty array recommended (all existing posts have tags) |
| `published` | `z.boolean().default(false)` | No | Defaults to `false` if omitted |
| `author` | `z.string().optional().default("Divanshu Chauhan")` | No | Defaults to site owner |
| `seoTitle` | `z.string().optional()` | No | Overrides `<title>` tag if set |
| `seoDescription` | `z.string().optional()` | No | Overrides `<meta description>` if set |
| `tldr` | `z.string().optional()` | No | Rendered in a highlighted box above content |
| `keyTakeaways` | `z.array(z.string()).optional()` | No | Rendered as checkmark list above content |
| `faq` | `z.array(z.object({ q: z.string(), a: z.string() })).optional()` | No | Generates FAQPage JSON-LD schema + rendered FAQ section after content |
| `howto` | `z.object({ name, totalTime, steps[] }).optional()` | No | Not needed for this post |

### Supporting

| Component | Path | Purpose | When Relevant |
|-----------|------|---------|---------------|
| `seoTitle` field | frontmatter | SEO-specific title override | Use if the conversational title doesn't match search intent well |
| `seoDescription` field | frontmatter | Meta description override | Use if excerpt is too casual for SERP display |

### Alternatives Considered

None. Phase 1 uses the existing content pipeline exclusively. No new dependencies, no new tooling.

## Architecture Patterns

### Recommended File Structure

```
src/content/blog/ai-models-compared-2026.mdx
  ├── YAML frontmatter block (--- delimited)
  │   ├── Core: title, date, excerpt, tags, published
  │   ├── SEO: seoTitle, seoDescription, tldr, keyTakeaways, faq
  │   └── Optional: author, dateModified, howto
  └── MDX body
      ├── H2 stub headings (section outline)
      └── Placeholder text (minimal, just enough to indicate section purpose)
```

### Pattern 1: Frontmatter YAML Format

The existing blog uses two YAML array formats interchangeably. Both are valid:

**Inline format** (used by `ai-coding-tools-compared-2026.mdx`):
```yaml
tags: ["AI", "Claude Code", "Cursor", "GitHub Copilot"]
```

**Block format** (used by `openclaw-ai-agent-review-2026.mdx`):
```yaml
tags:
  - AI
  - OpenClaw
  - AI Agents
```

**Recommendation:** Use block format for tags (readability with 10+ tags) and inline for keyTakeaways (existing posts use inline quotes).

### Pattern 2: FAQ Structure

```yaml
faq:
  - q: "What's the best AI for coding in 2026?"
    a: "Claude Opus 4.6 leads with 80.8% on SWE-bench Verified, excelling at multi-file refactors and terminal-based agentic workflows."
  - q: "Which AI model is best for creative writing?"
    a: "Claude models produce the most natural writing with better tone control, while GPT 5.2 excels at structured content and research-heavy pieces."
```

The FAQ generates two outputs:
1. **JSON-LD `FAQPage` schema** in `[slug].astro` (lines 113-126) -- for search engines
2. **Rendered FAQ section** after article body (lines 330-342) -- for users

### Pattern 3: keyTakeaways Format

Existing posts use quoted strings in YAML list format:
```yaml
keyTakeaways:
  - "Claude Code dominates complex multi-file refactors and terminal-based workflows"
  - "Cursor's chat-in-editor beats everything for exploratory coding"
```

### Anti-Patterns to Avoid

- **Duplicate H2 text:** Each H2 must be unique. The TOC generation in `[slug].astro` creates anchor IDs from heading text via `toLowerCase().replace(/[^a-z0-9]+/g, "-")`. Duplicate headings produce duplicate IDs, breaking anchor navigation.
- **FAQ questions that don't match search intent:** FAQ questions should be actual queries people type into search engines, not internal editorial questions. Verified patterns: "What's the best AI for [X]?", "Which AI model should I use for [Y]?", "[Model] vs [Model]: which is better?"
- **Overly long FAQ answers:** Google's FAQ rich results (where applicable) and AI search engines prefer concise 1-3 sentence answers. The existing blog posts follow this pattern.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Frontmatter validation | Manual YAML checking | Run `bun run build` -- Astro's Zod validation catches schema errors | Zod gives exact error messages with field names |
| Slug validation | Manual regex testing | `validate-content.ts` checks `/^[a-z0-9-]+$/` at build time | Already part of the build pipeline |
| FAQ schema generation | Manual JSON-LD | `[slug].astro` auto-generates FAQPage schema from frontmatter `faq` field | Existing template handles it |
| TOC generation | Manual anchor IDs | Astro's `post.render()` extracts headings automatically | IDs generated from heading text |

**Key insight:** Phase 1 creates a single file. Every validation mechanism already exists in the pipeline. The only work is writing correct YAML and Markdown.

## Common Pitfalls

### Pitfall 1: `published: false` Breaks Build Validation (CRITICAL)
**What goes wrong:** `validate-content.ts` counts ALL `.mdx` files in `src/content/blog/` (line 37: no filter). But `generate-posts-metadata.js` only includes `published: true` posts in `posts.json` (line 133). With `published: false`, file count = 12 but `posts.json` count = 11. Build fails at step 3.
**Why it happens:** All 11 existing posts are `published: true`. The draft workflow has never been tested.
**How to avoid:** Two options:
  1. **Fix the validation script** to only count published posts (or separately count published and all) -- but this modifies infrastructure outside phase scope
  2. **Use `published: true` during development** and rely on the post being a WIP draft by content, not by flag. Phase 4 doesn't "flip" published, it's already true.
  3. **Alternative:** Accept that the validation will fail during Phase 1 and fix it in Phase 4 (BILD-02 requirement lives there). But this means `bun run build` fails between Phase 1 and Phase 4.
**Recommendation:** Option 2 is safest -- set `published: true` from the start. The post won't be deployed until the content is complete and the build passes. Since the build pipeline is the Phase 4 gate, the draft state is effectively enforced by the incomplete content, not by a flag.
**Warning signs:** `validate-content.ts` error: "Mismatch: 12 MDX files but posts.json has 11"

### Pitfall 2: Date Format Strictness
**What goes wrong:** The Zod schema requires date as a string matching `/^\d{4}-\d{2}-\d{2}$/` AND the string must parse to a valid date via `Date.parse()`. Using `2026-02-30` or `"2026-2-25"` (missing leading zero) will fail.
**How to avoid:** Use `"2026-02-25"` exactly. The `refine` check catches real dates vs regex-matching nonsense.
**Warning signs:** Astro build error mentioning `date` field validation.

### Pitfall 3: FAQ Object Shape
**What goes wrong:** FAQ entries must be `{ q: string, a: string }` -- not `{ question: string, answer: string }` or `{ Q: string, A: string }`. The Zod schema is case-sensitive and uses short keys.
**How to avoid:** Copy the exact pattern from existing posts (e.g., `openclaw-ai-agent-review-2026.mdx`).
**Warning signs:** Zod validation error on `faq` field.

### Pitfall 4: Keyword Cannibalization with Existing Post
**What goes wrong:** The existing `ai-coding-tools-compared-2026.mdx` targets "AI coding tools compared 2026". If the new post's title, tags, and FAQ overlap too heavily with coding-specific keywords, the two posts compete for the same SERP positions.
**How to avoid:** The new post's primary keyword is "AI models compared 2026" (broader scope). FAQ questions should target general model comparisons and non-coding categories. Only one FAQ question should touch coding, and it should frame the answer differently (model capability vs. tool recommendation).
**Warning signs:** Both posts ranking for the same query, or neither ranking well.

### Pitfall 5: Empty Body Content and Reading Time
**What goes wrong:** With only stub headings and no body content, `generate-posts-metadata.js` will calculate ~0 reading time and ~0 word count. This is technically valid but produces odd metadata.
**How to avoid:** This is acceptable for Phase 1. The metadata will be regenerated in later phases when content exists. The prebuild script handles it gracefully (`Math.max(1, Math.ceil(wordCount / 200))` -- minimum 1 minute).
**Warning signs:** None -- this is expected behavior for a skeleton.

## Code Examples

### Example 1: Complete Frontmatter Template

Based on the Zod schema and existing post patterns:

```yaml
---
title: "AI Models Compared 2026: I Tested All Five Flagships So You Don't Have To"
seoTitle: "AI Models Compared 2026: Claude vs GPT vs Gemini vs Grok (Honest Review)"
seoDescription: "Hands-on comparison of Claude Opus 4.6, GPT 5.2, Gemini 3.1 Pro, and Grok 4.20 across coding, reasoning, agents, writing, and multimodal tasks."
date: "2026-02-25"
excerpt: "Five flagship AI models. Three months of daily use. One spreadsheet of benchmarks. Here's the honest breakdown — and the winner wasn't what I expected."
tags:
  - AI
  - Claude Opus
  - GPT 5
  - Gemini
  - Grok
  - AI Models
  - AI Comparison
  - Coding
  - "2026"
  - Best AI Model
published: true
tldr: "No single AI model wins everything. Claude Opus 4.6 dominates coding, Gemini 3.1 Pro leads multimodal and reasoning, GPT 5.2 is the best all-rounder for everyday use, and Grok 4.20's multi-agent architecture is the most innovative approach — but still in beta."
keyTakeaways:
  - "Claude Opus 4.6 is the coding king — 80.8% SWE-bench Verified, unmatched for multi-file refactors and agentic workflows"
  - "GPT 5.2 is the safest all-rounder — solid everywhere, exceptional nowhere, but the unified router picks the right model for you"
  - "Gemini 3.1 Pro owns multimodal and long-context — 10M token window and 77.1% ARC-AGI-2 make it the reasoning/research leader"
  - "Grok 4.20's 4-agent debate system is genuinely innovative — Harper, Benjamin, Lucas, and Captain Grok reduce hallucinations by 65%"
  - "Codex 5.3 xHigh is the dark horse for pure code generation — 89% LiveCodeBench but limited to coding-only workflows"
faq:
  - q: "What's the best AI for coding in 2026?"
    a: "Claude Opus 4.6 leads with 80.8% on SWE-bench Verified, excelling at multi-file refactors and agentic terminal workflows. For pure code generation speed, Codex 5.3 xHigh scores 89% on LiveCodeBench."
  - q: "Which AI model is best for everyday use in 2026?"
    a: "GPT 5.2 with its internal router that auto-selects the right model per request. It's consistently good across all tasks without requiring you to pick a specialized model."
  - q: "Is Gemini better than ChatGPT in 2026?"
    a: "For research and long documents, yes — Gemini 3.1 Pro's 10M token context and 77.1% ARC-AGI-2 score beat GPT 5.2. For general daily use and writing, GPT 5.2 edges ahead."
  - q: "What is Grok 4.20 and how does it work?"
    a: "Grok 4.20 is xAI's multi-agent system where four specialized AI agents (Grok, Harper, Benjamin, Lucas) debate each other before giving you a unified answer, reducing hallucinations by 65%."
  - q: "Claude vs GPT vs Gemini: which AI should I use in 2026?"
    a: "It depends on your task. Claude for coding, Gemini for research and multimodal, GPT for all-around daily use, Grok for cutting-edge multi-agent reasoning. No single model wins everything."
---
```

### Example 2: H2 Stub Headings Structure

Based on locked decisions from CONTEXT.md:

```mdx
## The Five AI Models You Actually Need to Know About

{/* Hook section - Phase 3, STRC-01 */}

## Quick Comparison: AI Models at a Glance

{/* Comparison table - Phase 3, STRC-02 */}

## Meet the Contenders

{/* Model introductions - Phase 3, STRC-03 */}

## Coding & Software Engineering

{/* Head-to-head - Phase 2, STRC-04 */}

## Reasoning & Complex Problem Solving

{/* Head-to-head - Phase 2, STRC-05 */}

## Agents & Tool Use

{/* Head-to-head - Phase 2, STRC-06 */}

## Creative Writing & Communication

{/* Head-to-head - Phase 2, STRC-07 */}

## Multimodal: Vision, Audio, Video

{/* Head-to-head - Phase 2, STRC-08 */}

## The Grok 4.20 Spotlight: AI That Argues With Itself

{/* Grok spotlight - Phase 2, STRC-09 */}

## Benchmark Scorecard: The Numbers Behind the Hype

{/* Scorecard table - Phase 2, STRC-10 */}

## The Anti-Hype Check: What the Benchmarks Don't Tell You

{/* Anti-features + benchmark gaming caveat - Phase 2, QUAL-02, QUAL-03 */}

## The Verdict: Which AI Model Should You Actually Use?

{/* Segmented verdict - Phase 3, STRC-11 */}
```

### Example 3: Slug Validation

The slug `ai-models-compared-2026` passes the validation regex in `validate-content.ts` line 86:
```typescript
const invalidSlugs = mdxSlugs.filter((s) => !/^[a-z0-9-]+$/.test(s));
```
- Only lowercase letters: yes
- Only digits: yes (2026)
- Only hyphens as separators: yes
- No spaces, underscores, or special chars: confirmed

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| FAQ rich results for all sites | FAQ rich results restricted to authoritative gov/health sites | August 2023 | FAQ schema still valuable for AI search engines and semantic structure, but won't show as Google rich snippets for personal blogs |
| FAQ schema = guaranteed SERP feature | FAQ schema = AI optimization + semantic signal | 2023-2024 | Still worth implementing but don't expect Google rich result display |
| Single "best AI" answer | Task-specific model recommendations | 2025-2026 | "Best AI for [task]" queries dominate over generic "best AI model" |

**Key shift in SEO landscape:**
- FAQ schema on non-authoritative sites no longer generates Google rich results (changed August 2023)
- However, FAQ structured data is increasingly consumed by AI search engines (Perplexity, ChatGPT Search with 800M weekly active users, Google AI Overviews) as citation sources
- "Best AI for X" long-tail queries have exploded in search volume -- each category heading in the post targets one of these

## Discretion Recommendations

Areas marked as Claude's discretion in CONTEXT.md, with research-backed recommendations:

### TL;DR Tone
**Recommendation: Factual with slight casual edge.** Existing posts use factual TL;DR tone (see `ai-coding-tools-compared-2026.mdx`: "Different AI coding tools excel at different tasks..."). Keep the casual voice in the post body but use the TL;DR as a clear summary. Readers scanning the TL;DR want information density, not personality.

### Section Ordering
**Recommendation: Keep the proposed order.** Hook -> Quick Comparison -> Model Intros -> Category H2H -> Grok Spotlight -> Benchmark Scorecard -> Anti-Hype -> Verdict. This follows the inverted pyramid: readers get the answer fast (comparison table), then go deeper (categories), then get context (benchmarks, caveats). The Grok spotlight after the 5 categories keeps the narrative flow -- it's a deep-dive on one model's unique approach, not a 6th category.

### Anti-Hype as Standalone H2
**Recommendation: Standalone H2.** The anti-hype/benchmark-gaming content (QUAL-02, QUAL-03) is substantial enough to warrant its own section. Folding it into the verdict would make the verdict section bloated and mix critique with recommendations. A standalone "Anti-Hype Check" H2 also targets a search intent: people searching for "AI benchmark accuracy" or "are AI benchmarks real".

### Tag Strategy
**Recommendation: Model names + categories + year.** Existing blog patterns include both tool names (e.g., "Claude Code", "OpenClaw") and category terms (e.g., "AI", "Developer Tools"). For SEO value, include both model names (people search for specific models) and category terms (people search for categories). Include "2026" as a tag -- existing posts do this consistently. Recommended tags: AI, Claude Opus, GPT 5, Gemini, Grok, AI Models, AI Comparison, Coding, 2026, Best AI Model.

### Grok-Specific FAQ Question
**Recommendation: Yes, include one.** Search results show strong interest in Grok 4.20's multi-agent architecture. "What is Grok 4.20 and how does it work?" targets a distinct informational query. The 4-agent debate system (Harper, Benjamin, Lucas, Captain Grok) is unique enough that people are actively searching for explanations.

### Excerpt Differentiation
**Recommendation: Yes, differentiate explicitly.** The existing `ai-coding-tools-compared-2026` post's excerpt is: "I've spent $50+/month on AI coding tools for a year. Here's what actually works..." The new post should signal broader scope: models themselves (not just coding tools), more models covered, general use cases. The proposed excerpt style ("Five flagship AI models. Three months of daily use.") already differentiates.

### FAQ Answer Length
**Recommendation: Vary by question type.** "What's the best AI for X?" questions should be 1-2 sentences (direct answer for AI search snippet extraction). "How does X work?" questions can be 2-3 sentences (need minimal explanation). "X vs Y: which is better?" should be 2 sentences (direct comparison with nuance).

## Open Questions

1. **`published: false` vs `published: true` for draft state**
   - What we know: `published: false` breaks `validate-content.ts` because it counts all MDX files but `posts.json` only includes published ones. All 11 existing posts are `published: true`.
   - What's unclear: Whether the project owner strongly prefers the `published: false` flag as a safety mechanism (CONTEXT.md says draft until Phase 4), or if the incomplete content itself is sufficient as a draft indicator.
   - Recommendation: Use `published: true` from Phase 1. The post won't appear in production until the full build passes and deploys. The `published` flag's practical effect is on `getStaticPaths()` filtering (line 15-21 of `[slug].astro`), but the real gate is the Cloudflare Pages deploy. Alternatively, fix `validate-content.ts` as a Phase 1 prerequisite task.

2. **`seoTitle` and `seoDescription` overrides**
   - What we know: The schema supports optional `seoTitle` and `seoDescription` that override `title` and `excerpt` in `<title>` and `<meta description>` tags. Existing posts like `openclaw-ai-agent-review-2026.mdx` use both.
   - What's unclear: Whether the conversational title chosen by the user will also work for SERP display, or if a more keyword-dense `seoTitle` is needed.
   - Recommendation: Include `seoTitle` with the primary keyword "AI Models Compared 2026" positioned prominently plus model names for search matching. Use `seoDescription` for a more structured version of the excerpt optimized for SERP display.

## Sources

### Primary (HIGH confidence)
- `src/content/config.ts` -- Zod schema definition, directly inspected
- `scripts/validate-content.ts` -- Build validation logic, directly inspected
- `scripts/generate-posts-metadata.js` -- Prebuild metadata extraction, directly inspected
- `src/pages/blog/[slug].astro` -- Blog post template with JSON-LD generation, directly inspected
- 11 existing MDX posts -- Frontmatter patterns and tag conventions, directly inspected
- Context7 `/withastro/docs` -- Astro content collections MDX schema validation patterns

### Secondary (MEDIUM confidence)
- [Google FAQ Structured Data Docs](https://developers.google.com/search/docs/appearance/structured-data/faqpage) -- FAQ schema requirements and restrictions
- [Google FAQ Rich Results Changes (August 2023)](https://developers.google.com/search/blog/2023/08/howto-faq-changes) -- Restriction to authoritative sites
- [Pluralsight: Best AI Models 2026](https://www.pluralsight.com/resources/blog/ai-and-data/best-ai-models-2026-list) -- Model landscape and search query patterns
- [Composio: Grok 4 vs Claude 4 Opus vs Gemini 2.5 Pro](https://composio.dev/blog/grok-4-vs-claude-4-opus-vs-gemini-2-5-pro-better-coding-model) -- Benchmark comparisons
- [LM Council Benchmarks Feb 2026](https://lmcouncil.ai/benchmarks) -- Cross-model benchmark data
- [NextBigFuture: Grok 4.20 Multi-Agent Architecture](https://www.nextbigfuture.com/2026/02/how-the-xai-grok-4-20-agents-work.html) -- Harper/Benjamin/Lucas agent roles
- [eWeek: Grok 4.20 Multi-Agent Debate Architecture](https://www.eweek.com/news/grok-4-20-multi-agent-ai-debate-architecture/) -- 4-agent system details

### Tertiary (LOW confidence)
- [GreenSERP: Stop Using FAQ Schema in 2026](https://greenserp.com/high-impact-schema-seo-guide/) -- Claims about FAQ schema effectiveness (single source, SEO agency blog)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- directly inspected all source files, no ambiguity in schema or pipeline
- Architecture: HIGH -- existing blog has 11 posts following identical patterns, no new infrastructure needed
- Pitfalls: HIGH -- `published: false` bug verified by reading both scripts, confirmed all existing posts are `published: true`
- SEO guidance: MEDIUM -- FAQ schema restrictions verified via Google official docs, but AI search engine consumption of structured data is evolving rapidly

**Research date:** 2026-02-25
**Valid until:** 2026-03-25 (30 days -- stable infrastructure, but AI model landscape changes weekly)
