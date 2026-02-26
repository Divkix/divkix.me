# Phase 2: Head-to-Head Comparisons & Data - Research

**Researched:** 2026-02-25
**Domain:** AI model benchmarks, capabilities comparison, content writing patterns for technical blog posts
**Confidence:** MEDIUM (benchmark data is fast-moving; some scores are self-reported and vary by source)

## Summary

Phase 2 writes the core comparison content for the blog post -- five head-to-head category sections, a Grok 4.20 multi-agent spotlight, a benchmark scorecard table, and an anti-hype/benchmark-gaming section. This is a content-authoring phase, not a code-infrastructure phase. The primary challenge is assembling accurate, well-sourced benchmark data for five AI models (Claude Opus 4.6, GPT 5.2, Codex 5.3 xHigh, Gemini 3.1 Pro, Grok 4.20) across five required benchmarks (SWE-bench Verified, ARC-AGI-2, GPQA Diamond, LMArena ELO, Terminal-Bench 2.0), while acknowledging significant data gaps -- particularly for Grok 4.20 (still in beta with no official benchmarks) and for LMArena ELO scores of the newest models (Claude Opus 4.6 and Gemini 3.1 Pro not yet ranked).

The research uncovered several critical factual issues in the existing frontmatter that Phase 2 content must not perpetuate: (1) Gemini 3.1 Pro has a 1M token context window, NOT 10M as stated in the keyTakeaways; (2) ARC-AGI-2 top scores are around 54% (GPT-5.2) and 77.1% (Gemini 3.1 Pro), not the 77.1% attributed to Gemini 3.1 Pro in the frontmatter -- actually that one checks out, Gemini 3.1 Pro does score 77.1% on ARC-AGI-2 per Google's official release; (3) Claude Opus 4.6 scores 91.3% on GPQA Diamond, not the 77.3% found in some early sources.

**Primary recommendation:** Write content in the established MDX skeleton sections, filling each stub heading with ~250-300 words of comparison content. Use the verified benchmark data compiled below. Flag every Grok 4.20 data point as beta/unverified. Include temporal qualifiers ("as of February 2026") throughout.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| STRC-04 | Head-to-head "Coding & Software Engineering" section with winner and benchmarks (~300 words) | SWE-bench Verified, Terminal-Bench 2.0, LiveCodeBench scores compiled for all 5 models. Claude Opus 4.6 wins coding overall (80.8% SWE-bench, 65.4% Terminal-Bench self-reported), but Codex 5.3 leads Terminal-Bench via agent scaffolds (77.3%). First-person observation needed per QUAL-01. |
| STRC-05 | Head-to-head "Reasoning & Complex Problem Solving" section with winner (~300 words) | GPQA Diamond and ARC-AGI-2 scores compiled. Gemini 3.1 Pro wins reasoning (77.1% ARC-AGI-2, 94.3% GPQA Diamond per some sources). Multiple conflicting GPQA scores found -- use Anthropic's self-reported 91.3% for Claude, cross-reference with LM Council data. |
| STRC-06 | Head-to-head "Agents & Tool Use" section with winner (~300 words) | Terminal-Bench 2.0, OSWorld, tau-bench scores compiled. Claude Opus 4.6 leads agentic tasks (72.7% OSWorld, agent teams feature). GPT 5.2 router architecture documented. Grok 4.20 multi-agent is novel but beta. |
| STRC-07 | Head-to-head "Creative Writing & Communication" section with winner (~250 words) | Claude wins creative writing per multiple comparison reviews. GPT 5.2 stronger for structured/professional content. Gemini variable. Research supports Claude as winner with caveats about Opus 4.6 being slightly weaker than 4.5 at creative writing. |
| STRC-08 | Head-to-head "Multimodal (Vision, Audio, Video)" section with winner (~250 words) | Gemini 3.1 Pro dominates multimodal: processes images (900/prompt), audio (8.4 hrs), video (1 hr). Leads LMArena Vision leaderboard. Claude limited to images+documents. GPT 5.2 has DALL-E but narrower input modalities. |
| STRC-09 | Grok 4.20 multi-agent spotlight: 4-agent architecture, X firehose, practical use cases (~250 words) | Detailed architecture documented: Captain Grok (coordinator), Harper (research/X firehose), Benjamin (logic/math), Lucas (creative/UX). 65% hallucination reduction. Beta launched Feb 17, 2026. SuperGrok $30/mo. No official benchmarks yet. |
| STRC-10 | Benchmark scorecard table with 5 specific benchmarks, source URLs, methodology caveats | All 5 benchmarks researched with scores for all models where available. Grok 4.20 has NO official scores -- predecessor Grok 4 scores documented as placeholder. LMArena ELO data incomplete for newest models. Source URLs collected. |
| QUAL-01 | Every head-to-head section includes at least one first-person experience observation | Content guidance: each section needs an "I found that..." or "In my testing..." observation. These must be written as authentic first-person experience per the blog's E-E-A-T voice. Research provides the benchmark framing; planner must ensure each section template includes a first-person slot. |
| QUAL-02 | Anti-features/hype-check section calling out overhyped capabilities | Research compiled: benchmark gaming (112% score inflation via data leakage), reasoning limitations (pattern matching not deliberation), agent failures outside coding. Specific overhyped claims identified. |
| QUAL-03 | Benchmark gaming caveat citing "Leaderboard Illusion" paper (Singh et al.) and Goodhart's Law | Paper fully cited: Singh et al., arXiv:2504.20879, April 2025. Key findings: Meta tested 27 private variants, proprietary models got disproportionate arena data (Google 19.2%, OpenAI 20.4%), score inflation up to 112%. |
| QUAL-05 | Pricing context alongside capability claims | API pricing compiled for all models. Claude Opus 4.6: $5/$25 per MTok. GPT 5.2: $1.75/$14. Gemini 3.1 Pro: $2/$12. Grok 4.20: beta only, SuperGrok $30/mo. Codex 5.3: inherits GPT 5.2 pricing. |
| QUAL-06 | Honest criticism of at least one personally-preferred model | Claude Opus 4.6 criticism points documented: slightly weaker creative writing than 4.5, highest API cost among competitors, SWE-bench score actually dropped 0.1% from 4.5 (80.8% vs 80.9%), MCP Atlas regression (59.5% vs 62.3%). |
| QUAL-07 | Grok 4.20 data explicitly flagged as beta/unverified | Confirmed: official Grok 4.20 benchmarks will not be published until beta concludes (estimated mid-to-late March 2026). All Grok 4.20 data points must carry "beta/unverified" qualifier. Predecessor Grok 4 scores can be cited as baseline. |
| QUAL-08 | All benchmark citations include source URL, date, and methodology caveat | Source URLs compiled for each benchmark. Methodology caveats documented: self-reported scores, scaffold variation, private testing bias, contamination risks. |
| QUAL-09 | Temporal qualifiers and version numbers throughout | Research confirms all model version numbers: Claude Opus 4.6 (Feb 5, 2026), GPT 5.2 (Dec 2025), Codex 5.3 xHigh (Feb 5, 2026), Gemini 3.1 Pro (Feb 19, 2026), Grok 4.20 Beta (Feb 17, 2026). |
</phase_requirements>

## Standard Stack

### Core

No new libraries or dependencies. Phase 2 modifies a single MDX file.

| Component | Version/Path | Purpose | Why Standard |
|-----------|-------------|---------|--------------|
| MDX content | `src/content/blog/ai-models-compared-2026.mdx` | Target file for content writing | Existing skeleton from Phase 1 |
| Markdown tables | Native MDX | Benchmark scorecard rendering | Astro renders markdown tables natively in blog posts |

### Supporting

| Component | Purpose | When to Use |
|-----------|---------|-------------|
| MDX comments `{/* */}` | Phase/requirement annotations | Keep existing annotations for sections not yet filled (Phase 3 stubs) |
| Markdown links | Source URL citations | Every benchmark citation needs `[source](url)` format |

### Alternatives Considered

None. This is pure content authoring in an existing MDX file.

## Architecture Patterns

### Content Structure Per Head-to-Head Section

Each of the five category sections (STRC-04 through STRC-08) follows the same pattern:

```
## [Category Name]

[Opening hook: 1-2 sentences framing why this category matters]

[Winner declaration: "**Winner: [Model]** — [one-sentence justification]"]

[Benchmark evidence: 2-3 sentences with specific scores and source citations]

[First-person observation: "In my experience..." or "After three months of..." — 2-3 sentences of genuine experience observation per QUAL-01]

[Runner-up acknowledgment: 1-2 sentences on what the second-best model does well]

[Pricing context: 1 sentence relating capability to cost per QUAL-05]

[Temporal qualifier: "As of February 2026, ..." somewhere in the section per QUAL-09]
```

**Target: ~250-300 words per section.**

### Benchmark Scorecard Table Pattern (STRC-10)

```markdown
| Benchmark | Claude Opus 4.6 | GPT 5.2 | Codex 5.3 xHigh | Gemini 3.1 Pro | Grok 4.20* |
|-----------|-----------------|---------|------------------|----------------|------------|
| SWE-bench Verified | 80.8% | 80.0% | — | 76.2%** | ~73.5%*** |
| ARC-AGI-2 | 68.8% | 54.0% | — | 77.1% | N/A |
| GPQA Diamond | 91.3% | 93.2%**** | — | 94.3% | ~88.4%*** |
| LMArena ELO | TBD | 1465 | — | 1492** | ~1505-1535 est. |
| Terminal-Bench 2.0 | 65.4% | 64.9% | 75.1% | 74.8%***** | N/A |

*All Grok 4.20 scores are beta/unverified. Predecessor Grok 4 scores shown where available.
**Gemini 3 Pro scores; 3.1 Pro too new for some benchmarks.
***Grok 4 (predecessor) scores.
****GPT 5.2 Pro variant.
*****Via Terminus-KIRA agent scaffold.
```

**Each row needs:** source URL, date accessed, methodology caveat.

### Anti-Hype Section Pattern (QUAL-02, QUAL-03)

```
## The Anti-Hype Check: What the Benchmarks Don't Tell You

[Benchmark gaming caveat: cite "The Leaderboard Illusion" paper, explain Goodhart's Law]

[Overhyped capability 1: specific claim vs. reality]
[Overhyped capability 2: specific claim vs. reality]

[Honest self-criticism: criticism of personally-preferred model per QUAL-06]

[Closing: what benchmarks actually tell you vs. what they don't]
```

### Anti-Patterns to Avoid

- **Presenting self-reported scores as verified:** Many benchmark scores on leaderboards are self-reported by model providers. Always note when a score is self-reported vs. independently verified.
- **Treating agent scaffold scores as model scores:** Terminal-Bench 2.0 and SWE-bench scores vary dramatically based on the agent scaffold used (Droid vs. Claude Code vs. Simple Codex). The model alone doesn't determine the score -- the agent framework adds 10-20 percentage points.
- **Omitting version numbers:** "Claude beats GPT" is meaningless without "Claude Opus 4.6 vs. GPT 5.2" specificity.
- **Treating LMArena ELO as static:** Arena rankings change daily as new battles accumulate. Always date the snapshot.
- **Claiming Grok 4.20 benchmark results exist:** They do not. xAI has not published official benchmarks. Only estimated/projected scores exist.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Benchmark data tables | Custom React components | Standard markdown tables | MDX renders markdown tables natively; blog has existing prose styling |
| Source citations | Footnote system | Inline markdown links `[source](url)` | Consistent with existing blog post citation style |
| Comparison visualization | Interactive charts/widgets | Prose + table format | Out of scope per requirements (static MDX only) |

**Key insight:** This phase is entirely content authoring. The MDX skeleton already exists. The job is filling stub headings with well-researched prose and one data table.

## Common Pitfalls

### Pitfall 1: Stale Benchmark Data
**What goes wrong:** AI benchmarks change weekly. A score cited today may be outdated by publication time.
**Why it happens:** Model providers release updates, independent evaluations differ from self-reported scores, leaderboard rankings shift.
**How to avoid:** Include "as of [date]" with every benchmark citation. Use `dateModified` frontmatter field when content changes. Cite primary sources (official model announcements, benchmark leaderboard URLs) not secondary blog posts.
**Warning signs:** Numbers in the post don't match current leaderboard pages.

### Pitfall 2: Conflicting Benchmark Numbers Across Sources
**What goes wrong:** Different sources report different scores for the same model on the same benchmark.
**Why it happens:** Score variation comes from: (a) different agent scaffolds (Terminal-Bench), (b) different reasoning effort settings (GPT 5.2 medium vs. high), (c) self-reported vs. independently verified, (d) different evaluation dates.
**How to avoid:** Prefer the model provider's self-reported score as baseline (it's what they stand behind), note when independent evaluations differ, and always specify the scaffold/settings used.
**Warning signs:** Two seemingly authoritative sources give different numbers.

### Pitfall 3: Factual Errors in Existing Frontmatter
**What goes wrong:** The Phase 1 frontmatter contains a factual error: it claims Gemini 3.1 Pro has a "10M token window." The actual context window is 1M tokens (up to 2M for enterprise Vertex AI). This error exists in keyTakeaways line 3.
**Why it happens:** The 10M figure likely comes from speculative pre-release articles about Gemini 3. Google's official documentation confirms 1M input tokens for Gemini 3.1 Pro.
**How to avoid:** Phase 2 content must use the correct 1M figure. The frontmatter keyTakeaways should also be corrected (though frontmatter editing may be Phase 3/4 scope). At minimum, body content must not repeat this error.
**Warning signs:** Any mention of "10M token window" in content.

### Pitfall 4: Word Count Drift
**What goes wrong:** Each head-to-head section is targeted at 250-300 words. Five sections + spotlight + scorecard + anti-hype easily exceeds the ~1500-1800 words allocated to Phase 2 content (out of ~3000 total).
**Why it happens:** Benchmark citations are verbose. It's tempting to include every data point.
**How to avoid:** Budget strictly: 5 x 300 = 1500 words for categories, 250 for Grok spotlight, 200 for scorecard (table + intro), 300 for anti-hype. Total: ~2250 words. This leaves ~750 for Phase 3 (hook, intros, verdict).
**Warning signs:** Any single section exceeding 350 words.

### Pitfall 5: Grok 4.20 Over-Speculation
**What goes wrong:** Writing about Grok 4.20 capabilities as if they're confirmed when the model is in beta with no official benchmarks.
**Why it happens:** The multi-agent architecture is genuinely interesting, and estimated ELO scores exist. Tempting to present projections as facts.
**How to avoid:** Every Grok 4.20 claim must be qualified: "beta," "estimated," "xAI projects," "unverified." Cite predecessor Grok 4 scores where hard numbers are needed. Flag data gaps explicitly per QUAL-07.
**Warning signs:** Any Grok 4.20 benchmark number without a caveat qualifier.

### Pitfall 6: Missing First-Person Experience (QUAL-01)
**What goes wrong:** Writing purely data-driven sections without the required first-person observations.
**Why it happens:** It's easier to compile benchmarks than to write authentic experience narratives.
**How to avoid:** Each section template must have a designated slot for a first-person observation. These should be concrete ("When I used Claude for a 2000-line refactor...") not generic ("In my experience, it works well").
**Warning signs:** A section that reads like a benchmark summary with no "I" statements.

## Verified Benchmark Data

### SWE-bench Verified (as of February 2026)
**What it measures:** Real-world software engineering -- resolving GitHub issues in actual open-source repositories.
**Methodology caveat:** Scores are self-reported by model providers unless independently verified. Agent scaffold significantly impacts scores.

| Model | Score | Source |
|-------|-------|--------|
| Claude Opus 4.5 | 80.9% | Anthropic self-reported |
| Claude Opus 4.6 | 80.8% | [Anthropic](https://www.anthropic.com/news/claude-opus-4-6) |
| MiniMax M2.5 | 80.2% | Self-reported |
| GPT 5.2 | 80.0% | OpenAI self-reported |
| Gemini 3 Flash | 78.0% | Google self-reported |
| GLM-5 | 77.8% | Zhipu AI self-reported |
| Claude Sonnet 4.5 | 77.2% | Anthropic self-reported |
| Gemini 3 Pro | 76.2% | Google self-reported |
| Grok 4 | 73.5% | xAI self-reported (predecessor, NOT Grok 4.20) |
| Codex 5.3 | Not separately listed | Typically tested via Terminal-Bench/SWE-Bench Pro |

**Source:** [SWE-bench Verified Leaderboard](https://www.marc0.dev/en/leaderboard), [SWE-bench Official](https://www.swebench.com/)

### ARC-AGI-2 (as of February 2026)
**What it measures:** Fluid intelligence and novel problem-solving -- designed to prevent memorization/pattern-matching.
**Methodology caveat:** Efficiency metric matters alongside accuracy. Refinement loops dominate over base model scores. Cost per task varies dramatically.

| Model | Score | Notes |
|-------|-------|-------|
| Gemini 3.1 Pro | 77.1% | Google's official claim, Feb 19, 2026 |
| Claude Opus 4.6 | 68.8% | Anthropic self-reported |
| GPT 5.2 | 54.0% | Highest non-refinement score reported |
| Grok 4.20 | N/A | No official score published (beta) |
| Codex 5.3 | N/A | Not evaluated on this benchmark |

**Source:** [ARC Prize Leaderboard](https://arcprize.org/leaderboard), [Anthropic Opus 4.6 announcement](https://www.anthropic.com/news/claude-opus-4-6)

### GPQA Diamond (as of February 2026)
**What it measures:** PhD-level science questions (biology, chemistry, physics) -- 198 "diamond" items where domain experts succeed but non-experts fail.
**Methodology caveat:** Approaching saturation at the top end. Different reasoning effort settings produce different scores. Some sources report different numbers for the same model.

| Model | Score | Source/Notes |
|-------|-------|-------------|
| Gemini 3.1 Pro | 94.3% | Highest reported; some sources say 92.6% for Gemini 3 Pro |
| GPT 5.2 Pro | 93.2% | Pro variant with high reasoning effort |
| Claude Opus 4.6 | 91.3% | [Anthropic self-reported](https://www.anthropic.com/news/claude-opus-4-6); LM Council shows 90.5% |
| Grok 4 Heavy | 88.4-88.9% | July 2025 data, predecessor model |
| GPT 5.2 (standard) | 87.9-88.2% | Medium reasoning effort |
| Grok 4.20 | N/A | No official score (beta) |

**Source:** [Epoch AI GPQA Diamond](https://epoch.ai/benchmarks/gpqa-diamond), [LM Council](https://lmcouncil.ai/benchmarks)

### LMArena ELO / Chatbot Arena (as of mid-February 2026)
**What it measures:** Human preference in blind A/B comparisons. Crowdsourced, updated continuously.
**Methodology caveat:** Subject to gaming per "The Leaderboard Illusion" paper. Private testing, selective model submission, and data access disparities bias results. Rankings change daily.

| Model | ELO | Notes |
|-------|-----|-------|
| Gemini 3 Pro | 1492 | #1 overall (pre-3.1 release) |
| Grok 4.1-Thinking | 1482 | #2 overall |
| Gemini 3 Flash | 1470 | |
| Claude Opus 4.5 (thinking-32k) | 1466 | |
| GPT 5.2-high | 1465 | |
| Grok 4.1 | 1463 | |
| Claude Opus 4.5 | 1462 | |
| Grok 4.20 | ~1505-1535 | **Estimated, not official** |
| Claude Opus 4.6 | Not yet ranked | Too new (Feb 5, 2026) |
| Gemini 3.1 Pro | Not yet ranked | Too new (Feb 19, 2026) |

**Critical data gap:** The three newest models (Claude Opus 4.6, Gemini 3.1 Pro, Grok 4.20) are NOT yet in the official LMArena rankings. Only predecessor scores and estimates are available.

**Source:** [LMSYS Chatbot Arena](https://aidevdayindia.org/blogs/lmsys-chatbot-arena-current-rankings/), [NextBigFuture Grok 4.20 estimate](https://www.nextbigfuture.com/2026/02/xai-launches-grok-4-20-and-it-has-4-ai-agents-collaborating.html)

### Terminal-Bench 2.0 (as of February 2026)
**What it measures:** AI agents executing real terminal tasks autonomously -- compiling code, training models, setting up servers, end-to-end workflows.
**Methodology caveat:** Scores are model+scaffold combinations, NOT pure model scores. The same model scores very differently with different agent frameworks.

| Model + Scaffold | Score |
|-----------------|-------|
| Droid + GPT 5.3 Codex | 77.3% |
| Simple Codex + GPT 5.3 Codex | 75.1% |
| Terminus-KIRA + Gemini 3.1 Pro | 74.8% |
| Terminus-KIRA + Claude Opus 4.6 | 74.7% |
| Judy + Claude Opus 4.6 | 71.9% |
| Droid + Claude Opus 4.6 | 69.9% |
| Claude Opus 4.6 (self-reported, no scaffold specified) | 65.4% |
| GPT 5.2 (medium reasoning) | 64.9% |
| Grok 4.20 | N/A |

**Key insight for content:** When reporting Terminal-Bench scores, MUST specify whether it's the model self-reported score or the model+scaffold score. The difference is 10-12 percentage points.

**Source:** [Terminal-Bench 2.0 Leaderboard](https://www.tbench.ai/leaderboard/terminal-bench/2.0)

## Grok 4.20 Multi-Agent Architecture (STRC-09)

### The Four Agents
| Agent | Role | Specialization |
|-------|------|----------------|
| **Grok (Captain)** | Coordinator | Analyzes task, activates agents, synthesizes final answer |
| **Harper** | Research | Real-time web + X Firehose data (~68M English tweets/day), fact retrieval |
| **Benjamin** | Logic | Mathematical reasoning, code verification, numerical calculations |
| **Lucas** | Creative | Divergent thinking, user experience optimization, creative angles |

### How It Works
1. Task decomposition: Captain Grok analyzes complexity and activates relevant agents
2. Parallel analysis: All four agents work simultaneously from their domain perspective
3. Internal debate: Multiple rounds of cross-verification (e.g., Benjamin's math vs. Harper's facts)
4. Synthesis: Captain Grok delivers unified answer

### Key Claims (ALL BETA/UNVERIFIED per QUAL-07)
- 65% hallucination reduction (from ~12% to ~4.2%)
- X Firehose: ~68M English-language posts/day, millisecond-level sentiment conversion
- Alpha Arena trading competition: only AI to achieve profitability (12.11% avg return)
- Estimated ELO: 1505-1535 (projected, not verified)

### Access and Pricing
- SuperGrok subscription: ~$30/month
- X Premium+ membership
- API: "coming soon" -- Grok 4.20 multi-agent not yet available via API
- Beta launched: February 17, 2026
- Official benchmarks expected: mid-to-late March 2026

### Sources
- [Grok 4.20 Agents Explained](https://www.adwaitx.com/grok-4-20-agents-harper-benjamin-lucas/)
- [How xAI Grok 4.20 Agents Work](https://www.nextbigfuture.com/2026/02/how-the-xai-grok-4-20-agents-work.html)
- [xAI Launches Grok 4.20](https://www.nextbigfuture.com/2026/02/xai-launches-grok-4-20-and-it-has-4-ai-agents-collaborating.html)
- [eWeek: Grok 4.20 Multi-Agent Debate Architecture](https://www.eweek.com/news/grok-4-20-multi-agent-ai-debate-architecture/)

## "The Leaderboard Illusion" Paper (QUAL-03)

### Citation
Singh, S., Nan, Y., Wang, A., D'Souza, D., Kapoor, S., Ustun, A., Koyejo, S., Deng, Y., Longpre, S., Smith, N.A., Ermis, B., Fadaee, M., & Hooker, S. (2025). "The Leaderboard Illusion." arXiv:2504.20879. [https://arxiv.org/abs/2504.20879](https://arxiv.org/abs/2504.20879)

### Key Findings for Anti-Hype Section
1. **Private testing bias:** Providers test multiple variants before public release. Meta tested 27 private variants before Llama-4 release.
2. **Data access disparity:** Google and OpenAI received 19.2% and 20.4% of total arena data respectively. 83 open-weight models combined got only 29.7%.
3. **Score inflation:** Limited additional arena data access yields "relative performance gains of up to 112%."
4. **Overfitting:** Dynamics promote "overfitting to Arena-specific dynamics rather than general model quality."
5. **Model deprecation bias:** 64% of silently deprecated models are open-weight or open-source.

### Goodhart's Law Connection
"When a measure becomes a target, it ceases to be a good measure." Benchmarks designed to evaluate capability become optimization targets. Models are trained to maximize benchmark scores rather than genuine capability.

## Pricing Context (QUAL-05)

### API Pricing per Million Tokens (as of February 2026)

| Model | Input ($/MTok) | Output ($/MTok) | Context Window | Subscription |
|-------|----------------|-----------------|----------------|-------------|
| Claude Opus 4.6 | $5.00 | $25.00 | 1M (beta) | Claude Pro $20/mo |
| GPT 5.2 | $1.75 | $14.00 | 400K | ChatGPT Plus $20/mo |
| GPT 5.2 Pro | $21.00 | $168.00 | 400K | ChatGPT Pro $200/mo |
| Codex 5.3 xHigh | ~$1.75-2.00 | ~$14.00 | Inherits GPT 5.2 | Same as GPT 5.2 |
| Gemini 3.1 Pro | $2.00 | $12.00 | 1M | Google AI Pro $19.99/mo |
| Grok 4.20 | N/A (API coming soon) | N/A | N/A | SuperGrok $30/mo |
| Grok 4.1 Fast | $0.20 | $0.50 | 2M | (predecessor API) |

**Key pricing insight for content:** Claude Opus 4.6 is the most expensive frontier model at API tier. GPT 5.2 offers the best price-performance ratio for general use. Gemini 3.1 Pro is a strong value play. Grok 4.20 is subscription-only for now.

## Anti-Hype Data Points (QUAL-02)

### Overhyped Capabilities to Call Out
1. **"AI agents work autonomously":** Outside coding and narrowly defined workflows, agents struggle in production. The gap between demo and deployment remains wide.
2. **"Reasoning equals intelligence":** Current reasoning resembles pattern completion more than deliberation. Models solve puzzles but struggle with sustained multi-hour problem-solving without human intervention.
3. **"95%+ benchmark scores = real-world mastery":** Models scoring 95% on bar exams can't determine if a contract is legally binding. Models acing medical tests recommend dangerous treatments. Benchmark performance and production reliability are different things.
4. **"Every new benchmark gets gamed within months":** Training data inevitably includes test samples, paraphrased versions, or conceptually similar problems. Score inflation documented at up to 112%.

### Honest Self-Criticism (QUAL-06)
For Claude Opus 4.6 (the model likely preferred by the blog author given the coding focus):
- SWE-bench Verified score **dropped** from 80.9% (Opus 4.5) to 80.8% (Opus 4.6) -- marginal but real
- MCP Atlas score **regressed** from 62.3% (Opus 4.5) to 59.5% (Opus 4.6)
- Creative writing quality **slightly weaker** than Opus 4.5 per multiple reviewers
- **Most expensive** API among the five models being compared ($5/$25 per MTok)
- Still relies on scaffolds to compete with Codex on Terminal-Bench (65.4% self-reported vs. 75.1% for Codex via scaffold)

## Model Release Dates (QUAL-09)

| Model | Release Date | Version Notes |
|-------|-------------|---------------|
| Claude Opus 4.6 | February 5, 2026 | 1M context (beta), 128K max output |
| GPT 5.2 | December 2025 | 400K context, router architecture |
| Codex 5.3 xHigh | February 5, 2026 | Combines 5.2 reasoning + coding |
| Gemini 3.1 Pro | February 19, 2026 | 1M context, NOT 10M |
| Grok 4.20 Beta | February 17, 2026 | Multi-agent, SuperGrok only |

## Code Examples

### Benchmark Scorecard Table (MDX format)

```mdx
| Benchmark | Claude Opus 4.6 | GPT 5.2 | Codex 5.3 xHigh | Gemini 3.1 Pro | Grok 4.20 Beta* |
|-----------|:-:|:-:|:-:|:-:|:-:|
| [SWE-bench Verified](https://www.swebench.com/) | **80.8%** | 80.0% | -- | 76.2%** | ~73.5%*** |
| [ARC-AGI-2](https://arcprize.org/leaderboard) | 68.8% | 54.0% | -- | **77.1%** | N/A |
| [GPQA Diamond](https://epoch.ai/benchmarks/gpqa-diamond) | 91.3% | 93.2%**** | -- | **94.3%** | ~88.4%*** |
| [LMArena ELO](https://lmarena.ai/) | ~1466***** | 1465 | -- | **~1492***** | ~1505-1535 est. |
| [Terminal-Bench 2.0](https://www.tbench.ai/leaderboard/terminal-bench/2.0) | 65.4% | 64.9% | **75.1%** | 74.8%****** | N/A |

*All Grok 4.20 data is beta/unverified -- official benchmarks expected March 2026.*
**Gemini 3 Pro score; Gemini 3.1 Pro not yet separately benchmarked on SWE-bench.*
***Grok 4 (predecessor) score, not Grok 4.20.*
****GPT 5.2 Pro variant with high reasoning effort.*
*****Predecessor model scores (Opus 4.5 / Gemini 3 Pro); Opus 4.6 and 3.1 Pro not yet ranked.*
******Via Terminus-KIRA agent scaffold, not raw model.*

> **Methodology caveat:** Scores are self-reported by model providers unless noted. Agent scaffolds add 10-20 percentage points on coding benchmarks. LMArena rankings change daily. See ["The Leaderboard Illusion"](https://arxiv.org/abs/2504.20879) for systematic bias documentation.
```

### Head-to-Head Section Template

```mdx
## Coding & Software Engineering

{/* STRC-04: ~300 words. Winner: Claude Opus 4.6 */}

**Winner: Claude Opus 4.6** -- [one sentence benchmark justification]

[2-3 sentences of benchmark evidence with inline citations]

[First-person experience observation per QUAL-01 -- "In my experience..." 2-3 sentences]

[Runner-up: Codex 5.3 for Terminal-Bench. 1-2 sentences.]

[Pricing context per QUAL-05. 1 sentence.]

As of February 2026, [temporal qualifier per QUAL-09].
```

### Source Citation Format

```mdx
Claude Opus 4.6 scores 80.8% on [SWE-bench Verified](https://www.swebench.com/) (self-reported, February 2026), compared to GPT 5.2's 80.0%.
```

## Frontmatter Corrections Needed

The following errors in the Phase 1 frontmatter were identified during research. These are NOT Phase 2 scope (frontmatter is Phase 3/4 territory), but Phase 2 body content MUST NOT repeat these errors:

| Issue | Current Value | Correct Value | Impact |
|-------|-------------|---------------|--------|
| Gemini context window | "10M token window" (keyTakeaways line 3) | 1M token window (up to 2M enterprise) | Factual error; body content must use 1M |
| LiveCodeBench claim | "89% LiveCodeBench" for Codex 5.3 (keyTakeaways line 5) | LiveCodeBench Pro Elo: 2887 (Gemini 3.1 Pro leads) | Score format mismatch; LiveCodeBench uses Elo not percentage |

**Recommendation:** Flag these for Phase 3/4 correction. Do not repeat them in Phase 2 body text.

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Single model per task | Router-based model selection (GPT 5.2) | Dec 2025 | Users don't pick models; the system routes |
| Single agent per query | Multi-agent debate (Grok 4.20) | Feb 2026 | Four agents cross-verify, reducing hallucination |
| Static benchmark scores | Continuous leaderboards (LMArena, LiveCodeBench) | 2024-2026 | Rankings change daily, point-in-time snapshots needed |
| Model-only scores | Model + scaffold scores (Terminal-Bench) | 2025-2026 | The agent framework matters as much as the model |
| Trust benchmarks at face value | Benchmark skepticism ("Leaderboard Illusion") | April 2025 | Self-reported scores questioned, gaming documented |

## Open Questions

1. **Gemini 3.1 Pro SWE-bench Verified score**
   - What we know: Gemini 3 Pro scored 76.2%. Gemini 3.1 Pro was released Feb 19, 2026.
   - What's unclear: Has Gemini 3.1 Pro been separately evaluated on SWE-bench Verified? No score found.
   - Recommendation: Use Gemini 3 Pro score (76.2%) with a footnote noting 3.1 Pro is not yet separately benchmarked.

2. **LMArena ELO for newest models**
   - What we know: Claude Opus 4.6, Gemini 3.1 Pro, and Grok 4.20 are all too new for official LMArena rankings.
   - What's unclear: When will official rankings appear? Predecessor scores exist but may not represent the new versions.
   - Recommendation: Use predecessor scores with clear footnotes. Note the data gap explicitly. Grok 4.20 estimated ELO (1505-1535) should be clearly labeled as projection.

3. **Codex 5.3 xHigh across non-coding benchmarks**
   - What we know: Codex 5.3 is a coding-specialized model. It excels on Terminal-Bench (75.1%) and SWE-Bench Pro (56.8%).
   - What's unclear: It has no ARC-AGI-2, GPQA Diamond, or LMArena scores because it's not designed for general reasoning.
   - Recommendation: Use "--" in the scorecard for non-coding benchmarks. Explain in a footnote that Codex 5.3 is a specialized coding model.

4. **Grok 4.20 hallucination reduction claim**
   - What we know: xAI claims 65% hallucination reduction (from ~12% to ~4.2%).
   - What's unclear: No independent verification of this claim exists. The methodology behind the measurement is not published.
   - Recommendation: Cite the claim but flag it as unverified beta data per QUAL-07.

## Sources

### Primary (HIGH confidence)
- [Anthropic: Claude Opus 4.6 announcement](https://www.anthropic.com/news/claude-opus-4-6) -- benchmark scores, pricing, capabilities
- [OpenAI: Introducing GPT 5.2](https://openai.com/index/introducing-gpt-5-2/) -- features, router architecture
- [OpenAI: Introducing GPT 5.3 Codex](https://openai.com/index/introducing-gpt-5-3-codex/) -- coding benchmarks, agentic capabilities
- [Google DeepMind: Gemini 3.1 Pro Model Card](https://deepmind.google/models/model-cards/gemini-3-1-pro/) -- multimodal specs, context window
- [SWE-bench Official Leaderboard](https://www.swebench.com/) -- coding benchmark scores
- [Terminal-Bench 2.0 Leaderboard](https://www.tbench.ai/leaderboard/terminal-bench/2.0) -- terminal task benchmark scores
- [ARC Prize Leaderboard](https://arcprize.org/leaderboard) -- reasoning benchmark scores
- [Epoch AI: GPQA Diamond](https://epoch.ai/benchmarks/gpqa-diamond) -- science reasoning scores
- [arXiv: "The Leaderboard Illusion" (Singh et al., 2504.20879)](https://arxiv.org/abs/2504.20879) -- benchmark gaming paper

### Secondary (MEDIUM confidence)
- [Vellum: Claude Opus 4.6 vs 4.5 Benchmarks](https://www.vellum.ai/blog/claude-opus-4-6-benchmarks) -- detailed benchmark comparison, cross-verified with Anthropic announcement
- [LM Council Benchmarks Feb 2026](https://lmcouncil.ai/benchmarks) -- cross-model benchmark data
- [SWE-bench Verified Leaderboard (marc0.dev)](https://www.marc0.dev/en/leaderboard) -- aggregated leaderboard, cross-verified
- [ScriptByAI: API Pricing](https://www.scriptbyai.com/gpt-gemini-claude-pricing/) -- pricing comparison, cross-verified with provider docs
- [NextBigFuture: Grok 4.20 Agents](https://www.nextbigfuture.com/2026/02/how-the-xai-grok-4-20-agents-work.html) -- architecture details
- [eWeek: Grok 4.20 Architecture](https://www.eweek.com/news/grok-4-20-multi-agent-ai-debate-architecture/) -- multi-agent debate details
- [LMSYS Chatbot Arena Rankings](https://aidevdayindia.org/blogs/lmsys-chatbot-arena-current-rankings/) -- ELO scores snapshot

### Tertiary (LOW confidence)
- [NextBigFuture: Grok 4.20 estimated ELO](https://www.nextbigfuture.com/2026/02/xai-launches-grok-4-20-and-it-has-4-ai-agents-collaborating.html) -- projected 1505-1535, single source projection
- [Grokipedia: Grok 4.20](https://grokipedia.com/page/Grok_420) -- community wiki, needs cross-verification
- Grok 4.20 hallucination reduction (65%) -- xAI claim without independent verification

## Metadata

**Confidence breakdown:**
- Benchmark data (Claude, GPT, Gemini): MEDIUM-HIGH -- self-reported scores from official announcements, cross-verified across multiple leaderboards, but scores vary by source and settings
- Benchmark data (Grok 4.20): LOW -- beta model with no official benchmarks, only estimates and predecessor scores
- Benchmark data (LMArena ELO): LOW for newest models -- three of five models not yet ranked
- Grok 4.20 architecture: MEDIUM -- multiple consistent sources describe the 4-agent system, but all based on xAI's own materials
- Pricing: MEDIUM-HIGH -- cross-verified across multiple pricing aggregators, but Grok 4.20 API pricing not yet published
- Anti-hype/benchmark gaming: HIGH -- "Leaderboard Illusion" paper is peer-reviewed with specific, verifiable claims
- Creative writing comparison: MEDIUM -- consistent across reviews but subjective by nature
- Multimodal comparison: HIGH -- Gemini's multimodal lead is well-documented across official specs

**Research date:** 2026-02-25
**Valid until:** 2026-03-07 (7 days -- AI model landscape changes weekly; Grok 4.20 beta expected to conclude mid-March with official benchmarks)
