# Project Research Summary

**Project:** AI Model Comparison Blog Post (Claude vs ChatGPT vs Gemini vs Grok)
**Domain:** Long-form technical blog post — AI model comparison, MDX content for Astro portfolio site
**Researched:** 2026-02-25
**Confidence:** MEDIUM (benchmarks verifiable from official sources; Grok 4.20 data is beta/unverified)

## Executive Summary

The project is a ~3000-word AI model comparison blog post covering five flagship models released in early 2026: Claude Opus 4.6/Sonnet 4.6, GPT-5.2 Thinking, GPT-5.3 Codex xHigh, Gemini 3.1 Pro, and Grok 4.20. Research consistently points to a hybrid content architecture — brief model introductions followed by head-to-head category comparisons — as the highest-performing structure for both SEO and reader engagement. The post fits into an existing Astro MDX content pipeline that already supports FAQ schema, key takeaways, structured data, and cross-linking to a related coding tools post. The core differentiator for this post versus commodity AI comparison content is first-hand personal experience layered over benchmark data, which is what Google's E-E-A-T framework and the February 2026 core update actively reward.

The recommended approach is a 9-section hybrid structure: hook, quick comparison table, model introductions, five head-to-head categories (coding, reasoning, agents, writing, multimodal), a Grok 4.20 multi-agent spotlight, a benchmark scorecard, and a segmented verdict. No single model wins across all categories — this is not a post with a single winner. Claude Opus 4.6 leads coding (80.8% SWE-bench Verified), GPT-5.2 Thinking leads hard reasoning/science (92.4% GPQA Diamond, 52.9% ARC-AGI-2), Gemini 3.1 Pro leads multimodal and abstract reasoning (77.1% ARC-AGI-2, native video/audio), Codex 5.3 xHigh leads terminal/shell dev work (77.3% Terminal-Bench 2.0), and Grok 4.20 is the only model with built-in multi-agent orchestration and real-time social data.

The critical risks are benchmark gaming (documented, systematic problem at all major labs), content decay within weeks of publication (AI models update on weekly cadence), and Google penalizing pure aggregation content with no first-hand experience. The mitigation: write from actual hands-on testing, caveat every benchmark with source and methodology limitations, include temporal qualifiers and version numbers throughout, and plan a dateModified update within 60-90 days. The biggest execution risk is writing a post that Google can fully extract into an AI Overview with zero click incentive — the defense is narrative depth, personal anecdotes, and failure stories that a summary cannot capture.

## Key Findings

### Recommended Stack

The post lives in an existing Astro 5 + MDX content pipeline. No new infrastructure is needed. The relevant stack elements are already in production: MDX content collections (`src/content/blog/`), frontmatter schema with Zod validation (title, date, dateModified, excerpt, tags, published, tldr, keyTakeaways, faq, howto), JSON-LD structured data (BlogPosting, FAQPage schema in `src/lib/schema.ts`), OG image generation (`scripts/generate-og-images.js`), and sitemap/RSS integration. The only new content-level components needed are two markdown tables (quick comparison and benchmark scorecard) and proper frontmatter population.

**Core technologies:**
- Astro 5 + MDX: content rendering — static output, zero JS for blog posts
- Zod schema (`src/content/config.ts`): validates frontmatter fields including faq[], keyTakeaways[], tldr
- BlogLayout + `[slug].astro`: auto-renders FAQ schema, key takeaways, TLDR without custom code
- `generate-posts-metadata.js`: must run (`bun run prebuild`) after adding the new .mdx file
- Tailwind v4 prose class: handles all markdown table styling automatically

**Critical version note:** If the new post is added without running `bun run prebuild`, the `validate-content.ts` step will fail the build. This is a hard build gate, not a warning.

### Expected Features

Research maps clearly to what the post must cover versus what to defer.

**Must have (table stakes for the post to be credible):**
- Quick comparison table within first 300 words — featured snippet capture, skimmer value
- Per-model differentiators with specific benchmark numbers sourced to official pages
- Use-case verdict matrix (not "Model X wins" — segmented by coding/reasoning/writing/multimodal/agents)
- Grok 4.20 multi-agent deep-dive (explicitly flagged by project owner as required)
- Anti-features / hype-check section — distinguishes post from commodity comparison content
- First-person testing experience (without this, Google E-E-A-T penalizes the content)
- FAQ frontmatter with 4-5 questions matching real search queries (FAQPage schema already wired up)
- Temporal qualifiers and version numbers throughout (prevents stale content problem)

**Should have (differentiators):**
- Benchmark gaming caveat section — names the "Leaderboard Illusion" paper and Goodhart's Law problem; signals expertise to knowledgeable readers
- Cross-reference to existing `ai-coding-tools-compared-2026.mdx` post — prevents self-cannibalization and internal link equity
- Pricing context alongside capability claims (even though deep pricing analysis is out of scope, omitting it entirely misleads readers)
- Genuine criticism of the author's preferred model — strongest credibility signal per research

**Defer (v2+):**
- Interactive comparison widget or filtering table — requires React component, out of scope for static MDX
- Head-to-head prompt shootout with actual outputs — requires hands-on testing infrastructure and would push the post past 3000 words
- Open-source model comparison (DeepSeek, Llama, Mistral) — different audience, different post

### Architecture Approach

The post uses a proven hybrid structure: brief model introductions (context-setting, ~120 words each) followed by five category-based head-to-head comparisons (analysis, ~300 words each), with supporting scorecard and segmented verdict. This outperforms both pure model-by-model structure (repetitive, forces mental cross-referencing) and pure category structure (no model context). A Grok multi-agent spotlight section sits between the main comparisons and the scorecard table as a standalone deep-dive on the most novel differentiator.

**Major components:**
1. **Frontmatter block** — tldr, keyTakeaways[], faq[], dateModified; populates all schema and structured data automatically
2. **Hook + Quick Comparison Table** — ~250 words, within first 300 words; targets featured snippets; columns: Model | Maker | Best For | Notable Weakness | Quick Verdict
3. **Model Introductions (H2 + H3 per model)** — ~600 words total; context-setting, not analysis; covers who built it, core philosophy, one standout capability
4. **Head-to-Head Categories (H2 each)** — ~1400 words total; Coding, Reasoning, Agents, Creative Writing, Multimodal; each declares a winner with one-line verdict
5. **Grok 4.20 Multi-Agent Spotlight (H2)** — ~250 words; dedicated coverage of 4-agent architecture (Grok/Harper/Benjamin/Lucas), X firehose data, practical use cases
6. **Benchmark Scorecard (H2)** — ~200 words; data table with SWE-bench Verified, ARC-AGI-2, GPQA Diamond, LMArena ELO, Terminal-Bench 2.0; caveat paragraph required
7. **Verdict: Which Model for Which Job (H2)** — ~300 words; segmented use-case recommendations, personal preference with honest disclosure, hook for dateModified update
8. **FAQ (auto-rendered)** — rendered by BlogLayout from frontmatter; FAQPage JSON-LD schema; targets AI Overview citation

### Critical Pitfalls

1. **Benchmark gaming as ground truth** — The "Leaderboard Illusion" paper (Singh et al., 2025) documented labs cherry-picking variants on LMArena and deleting test cases from benchmark code. Never present a single score as definitive proof. Every benchmark citation needs source, date, and a methodology caveat. Use Artificial Analysis and LiveBench as independent evaluation supplements.

2. **Content decay within weeks** — AI model comparison content has the shortest shelf life in technical writing. New releases can make sections obsolete within 30 days. Prevention: version numbers everywhere, "as of [date]" qualifiers, `dateModified` in frontmatter, calendar reminder to update within 60-90 days. Separate stable observations (architecture philosophy) from volatile data (benchmark scores, pricing).

3. **No first-hand experience = Google penalty** — Google's February 2026 core update specifically demoted "lightly edited AI summaries." Every section needs at least one concrete personal-use observation. "When I asked Claude to..." not "Claude is reported to excel at..." If a model hasn't been personally tested, state that explicitly.

4. **Declaring a single winner** — There is no single best AI model in Feb 2026. The market has genuinely specialized. A single-winner verdict alienates most readers and reads as uninformed. The verdict must be a use-case matrix: "Best for X: Model A. Best for Y: Model B."

5. **AI Overview cannibalization** — 60%+ of searches end without a click; for structured comparison queries with tables, it's higher. Don't structure the entire comparison as a table Google can extract verbatim. Defend click value with narrative depth, personal anecdotes, and failure stories that a summary cannot capture.

## Implications for Roadmap

Based on the combined research, the post can be written in four sequential phases. Each phase has clear deliverables and depends on the previous one.

### Phase 1: Frontmatter and Structure Setup

**Rationale:** The Astro build pipeline requires the MDX file to exist before prebuild can run. Frontmatter must be complete and valid against the Zod schema from the start — invalid schema fails validation at build time. Getting the skeleton right first prevents rebuild cycles.

**Delivers:** Valid `.mdx` file at `src/content/blog/ai-models-compared-2026.mdx` with complete frontmatter (title, date, excerpt, tags, published, tldr, keyTakeaways[], faq[]), stub section headings, and confirmed schema validation passing.

**Addresses:** Pitfall 2 (shelf-life: dateModified field wired up), Pitfall 9 (structured data: FAQ and key takeaways populated upfront), Pitfall 8 (keyword stuffing: headers set to natural language from the start)

**Avoids:** Mid-writing discovery that frontmatter is invalid, which breaks the entire build pipeline and `posts.json` sync.

### Phase 2: Core Comparison Content

**Rationale:** The head-to-head categories are the highest-value, highest-risk content. They consume ~1400 of ~3000 words and determine whether the post passes Google's E-E-A-T threshold. Writing these before supporting sections (scorecard, spotlight) forces clarity on what the actual comparative claims are.

**Delivers:** Five complete category sections (Coding, Reasoning, Agents, Creative Writing, Multimodal) each with: comparative analysis across all 5 models, a declared winner with rationale, at least one personal-experience observation, and at least one failure mode per model.

**Addresses:** Must-have features (per-model differentiators, use-case verdict), Pitfall 1 (benchmark gaming caveats inline), Pitfall 3 (first-hand experience throughout), Pitfall 4 (no single winner — segmented by category), Pitfall 6 (real-world gap acknowledged)

**Avoids:** Thin content (each model-category cell needs substantive claims), wall-of-benchmarks anti-pattern (experience first, benchmarks as citations).

### Phase 3: Supporting Sections

**Rationale:** The hook, model introductions, Grok spotlight, scorecard table, and verdict are all dependent on knowing what the category comparisons concluded. Writing these after Phase 2 ensures they reflect actual findings rather than pre-cooked summaries.

**Delivers:**
- Hook + Quick Comparison Table (within first 300 words, featured snippet target)
- Model introductions (~120 words each, five models)
- Grok 4.20 Multi-Agent Spotlight (~250 words)
- Benchmark Scorecard table (SWE-bench Verified, ARC-AGI-2, GPQA Diamond, LMArena ELO, Terminal-Bench 2.0)
- Verdict / Which Model for Which Job section

**Addresses:** Must-have feature (quick comparison table), Pitfall 5 (bias: balanced model introductions, explicit disclosure), Pitfall 12 (pricing context in model intros and verdict), Pitfall 13 (Grok multi-agent dedicated coverage)

**Avoids:** Burying the table anti-pattern (table placed in first 300 words as designed), model-by-model structure anti-pattern (intros are brief context, not full analysis).

### Phase 4: Quality Pass and Build Validation

**Rationale:** The post needs a structured audit before committing because several pitfalls are "looks done but isn't" — they require deliberate checking, not just writing. The Astro build pipeline provides an automated gate (`validate-content.ts`) but won't catch content quality issues.

**Delivers:** Post passing the "Looks Done But Isn't" checklist from PITFALLS.md, `bun run prebuild` passing cleanly, cross-reference link to existing `ai-coding-tools-compared-2026.mdx` added, all benchmark citations include source and date, word count confirmed ~3000.

**Addresses:** Pitfall 11 (self-cannibalization: cross-reference and scope differentiation), Pitfall 2 (temporal qualifiers verified), Pitfall 7 (thin content audit), Pitfall 8 (keyword stuffing check in headers)

**Avoids:** Build failure from missing `posts.json` sync, publishing a post that reads as pure aggregation.

### Phase Ordering Rationale

- Phase 1 must precede all others because the MDX file must exist for the build pipeline to reference it. Invalid frontmatter fails schema validation immediately.
- Phase 2 before Phase 3 because the quick comparison table and verdict must accurately reflect the category analysis conclusions — not the other way around. Writing the intro before knowing the findings produces incoherent summaries.
- Phase 4 is always last. Quality audits on incomplete content waste time.
- The Grok multi-agent spotlight (Phase 3) comes after the Agents category section (Phase 2) so it can reference and expand on that section rather than duplicating it.

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 2 (Coding category):** Grok 4.20 has zero published SWE-bench or Terminal-Bench results. The section will have an explicit data gap — the honest treatment is to state this, not estimate. Decide in advance how to handle absent Grok coding data without the section reading as incomplete.
- **Phase 2 (Agents category):** Claude Opus 4.6 Agent Teams vs. Grok 4.20 multi-agent is a direct comparison that requires more nuance than the research covers. Claude's is user-configurable; Grok's is built-in. The practical difference in use cases needs to be written carefully to avoid false equivalence.
- **Phase 3 (Grok spotlight):** Lucas agent's role is under-documented across all sources. The spotlight can cover Grok, Harper, and Benjamin in detail but should acknowledge Lucas's role is not well-documented rather than speculating.

Phases with standard patterns (skip research-phase):
- **Phase 1 (Frontmatter/Structure):** The Astro MDX schema, frontmatter fields, and build pipeline are fully documented in the existing codebase. Zero ambiguity.
- **Phase 4 (Build Validation):** Standard `bun run prebuild && bun run build` sequence, well-established per CLAUDE.md.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Existing codebase fully mapped; no new infrastructure needed |
| Features | HIGH | Official announcements and model cards for Claude, GPT, Gemini are all sourced from official pages; Grok is MEDIUM due to beta status |
| Architecture | HIGH | Content structure verified against multiple high-performing comparison articles; heading hierarchy and SEO patterns well-established |
| Pitfalls | HIGH | Benchmark gaming documented by published academic paper; SEO decay and E-E-A-T requirements sourced from Google's own guidelines and core update analysis |

**Overall confidence:** MEDIUM-HIGH

The major uncertainty is Grok 4.20 — it is in beta, has no official published benchmarks, and API pricing is unavailable. Every Grok data point in the post must be explicitly marked as beta/unverified or sourced from third-party reports with LOW confidence labels. The "Grok wins" story is the multi-agent architecture and X firehose integration, not benchmark scores. Lean into that.

### Gaps to Address

- **Grok 4.20 official benchmarks:** Not published. March 2026 expected. The post should acknowledge this explicitly and use Grok 4.2 data as a proxy with clear caveats.
- **Claude Opus 4.6 GPQA Diamond score:** Not found in any source. Section on Reasoning will have an asymmetric data gap favoring Gemini and GPT-5.2. Treat this as an honest data absence, not a zero.
- **GPT-5.3 Codex API pricing:** Not fully confirmed by OpenAI at time of research. $3.50/$28.00 is a working estimate — must be labeled as such.
- **Gemini 3.1 Pro 2M context claim:** Conflicting sources (1M standard vs. 2M extended). Use 1M as confirmed, note 2M as "some sources report" with caveat.
- **Hands-on testing required:** The post cannot pass Google E-E-A-T without actual personal testing of all five models on comparable tasks. Research provides the data skeleton; execution requires using the models. This is a content creation dependency, not a research gap.

## Sources

### Primary (HIGH Confidence)
- [Anthropic: Introducing Claude Opus 4.6](https://www.anthropic.com/news/claude-opus-4-6) — model specs, benchmarks, pricing
- [Anthropic: Introducing Claude Sonnet 4.6](https://www.anthropic.com/news/claude-sonnet-4-6) — model specs, cost comparison
- [Anthropic: Claude API Pricing](https://platform.claude.com/docs/en/about-claude/pricing) — confirmed pricing
- [OpenAI: Introducing GPT-5.2](https://openai.com/index/introducing-gpt-5-2/) — model specs, benchmarks
- [OpenAI: Introducing GPT-5.3-Codex](https://openai.com/index/introducing-gpt-5-3-codex/) — coding benchmarks, interactive steering feature
- [OpenAI: API Pricing](https://developers.openai.com/api/docs/pricing) — confirmed pricing
- [Google DeepMind: Gemini 3.1 Pro Model Card](https://deepmind.google/models/model-cards/gemini-3-1-pro/) — specs, 13/16 benchmark wins claim
- [Google: Gemini 3.1 Pro Blog Post](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-1-pro/) — official capabilities
- [Singh et al. / TechCrunch: LMArena gaming paper](https://techcrunch.com/2025/04/30/study-accuses-lm-arena-of-helping-top-ai-labs-game-its-benchmark/) — benchmark gaming documentation
- [Google February 2026 Core Update](https://www.arieldigitalmarketing.com/blog/google-february-2026-core-update/) — E-E-A-T enforcement, AI content penalties

### Secondary (MEDIUM Confidence)
- [LMArena Leaderboard](https://lmarena.ai/) — ELO rankings, Feb 11 2026 snapshot
- [Artificial Analysis](https://artificialanalysis.ai/) — Intelligence Index, independent measurement
- [SWE-bench Leaderboard](https://www.swebench.com/) — software engineering benchmark scores
- [NextBigFuture: Grok 4.20 multi-agent](https://www.nextbigfuture.com/2026/02/xai-launches-grok-4-20-and-it-has-4-ai-agents-collaborating.html) — agent architecture details
- [VentureBeat: Sonnet 4.6 cost efficiency](https://venturebeat.com/technology/anthropics-sonnet-4-6-matches-flagship-ai-performance-at-one-fifth-the-cost/) — Sonnet vs Opus performance claim
- [SmartScope: Gemini 3.1 Pro critical analysis](https://smartscope.blog/en/generative-ai/google-gemini/gemini-3-1-pro-benchmark-analysis-2026/) — independent critique of "13/16 wins" claim
- Existing codebase: `src/content/blog/ai-coding-tools-compared-2026.mdx` — blog voice and structure reference
- Existing codebase: `src/pages/blog/[slug].astro` — schema rendering confirmation

### Tertiary (LOW Confidence — needs explicit caveats in post)
- Grok 4.20 benchmark estimates (third-party reports, pre-official-disclosure)
- GPT-5.3 Codex pricing ($3.50/$28.00 working estimate, unconfirmed)
- Gemini 3.1 Pro 2M context claim (conflicting sources)
- Grok "rapid learning architecture" weekly update cadence (xAI marketing claim)

---
*Research completed: 2026-02-25*
*Ready for roadmap: yes*
