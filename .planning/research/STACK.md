# Stack Research: AI Model Specifications, Benchmarks & Capabilities

**Domain:** AI model comparison blog post (Claude Opus/Sonnet 4.6, GPT 5.2 Thinking, Codex 5.3 xHigh, Gemini 3.1 Pro, Grok 4.20)
**Researched:** 2026-02-25
**Confidence:** MEDIUM (see per-model and per-datapoint confidence below)

---

## Model Specifications Overview

### 1. Claude Opus 4.6 (Anthropic)

| Attribute | Value | Confidence |
|-----------|-------|------------|
| **Release Date** | February 5, 2026 | HIGH (Anthropic official) |
| **Context Window** | 200K standard; 1M beta (requires `context-1m-2025-08-07` header, tier 4+ orgs) | HIGH |
| **Max Output** | 128K tokens | HIGH |
| **API Pricing** | $5.00 / $25.00 per 1M tokens (input/output) | HIGH (Anthropic pricing page) |
| **Fast Mode Pricing** | $30.00 / $150.00 per 1M tokens (6x premium) | HIGH |
| **1M Context Pricing** | $10.00 / $37.50 per 1M tokens (2x input, 1.5x output) | HIGH |
| **Batch API** | 50% discount | HIGH |
| **Prompt Caching** | Up to 90% input cost reduction | HIGH |
| **Availability** | Anthropic API, AWS Bedrock, Google Vertex AI, Microsoft Foundry | HIGH |
| **LMArena ELO** | 1506 (Thinking mode), 1502 (standard) -- #1 and #2 on leaderboard as of Feb 11, 2026 | MEDIUM (leaderboard snapshot) |

**Key Capabilities:**
- **Adaptive Thinking**: Replaces extended thinking with four effort levels (low, medium, high, max). Claude dynamically decides when deeper reasoning helps.
- **Compaction API**: Enables infinite conversations through server-side context summarization.
- **Agent Teams**: Can spawn multiple Claude instances that coordinate autonomously. Anthropic demo: 16 agents built a 100,000-line Rust-based C compiler that boots Linux on three CPU architectures.
- **Security Research**: Found 500+ zero-day vulnerabilities (per Anthropic claims).

**Benchmark Results:**

| Benchmark | Score | vs. Previous (Opus 4.5) | Confidence |
|-----------|-------|--------------------------|------------|
| SWE-bench Verified | 80.8% | ~flat (80.9%) | HIGH |
| Terminal-Bench 2.0 | 65.4% | +5.6pp (59.8%) | HIGH |
| ARC-AGI-2 | 68.8% | +31.2pp (37.6%) -- nearly doubled | HIGH |
| OSWorld | 72.7% | — | MEDIUM |
| MRCR v2 (8-needle, 256K) | 93% | — | MEDIUM |
| MRCR v2 (8-needle, 1M) | 76% | — | MEDIUM |
| Artificial Analysis Intelligence Index | 53 (max effort) | — | MEDIUM |

---

### 2. Claude Sonnet 4.6 (Anthropic)

| Attribute | Value | Confidence |
|-----------|-------|------------|
| **Release Date** | February 17, 2026 | HIGH (Anthropic official) |
| **Context Window** | 200K standard; 1M beta (same requirements as Opus) | HIGH |
| **Max Output** | 64K tokens | HIGH |
| **API Pricing** | $3.00 / $15.00 per 1M tokens (input/output) | HIGH |
| **Availability** | All Claude plans, Claude Cowork, Claude Code, API, all major cloud platforms | HIGH |

**Key Differentiator:** Matches Opus 4.6 performance within 1-2 points on most benchmarks at 5x lower cost. Developers preferred Sonnet 4.6 over the previous flagship Opus 4.5 59% of the time.

**Benchmark Results:**

| Benchmark | Score | vs. Opus 4.6 | Confidence |
|-----------|-------|---------------|------------|
| SWE-bench Verified | 79.6% | -1.2pp | HIGH |
| OSWorld | 72.5% | -0.2pp | MEDIUM |
| OfficeQA | Matches Opus 4.6 | parity | MEDIUM |
| Artificial Analysis Intelligence Index | 51 (max effort) | -2pp | MEDIUM |

---

### 3. GPT-5.2 Thinking (OpenAI)

| Attribute | Value | Confidence |
|-----------|-------|------------|
| **Release Date** | December 11, 2025 | HIGH (OpenAI official) |
| **Knowledge Cutoff** | August 2025 | HIGH |
| **Context Window** | 400K tokens | HIGH |
| **Max Output** | 128K tokens | HIGH |
| **API Pricing (Thinking)** | $1.75 / $14.00 per 1M tokens (input/output) | HIGH (OpenAI pricing page) |
| **Cached Input Pricing** | $0.175 per 1M tokens (90% discount) | HIGH |
| **Pro Variant Pricing** | $21.00 / $168.00 per 1M tokens | HIGH |
| **Batch API** | 50% discount | HIGH |
| **Availability** | OpenAI API (all developers), ChatGPT Plus ($20/mo), Pro ($200/mo) | HIGH |
| **Model Variants** | Instant, Thinking, Pro | HIGH |

**Key Capabilities:**
- **Thinking Mode**: Generates internal reasoning tokens (billed as output) before producing the final answer. The "xhigh" reasoning effort setting provides maximum analytical depth.
- **Response Compaction**: Extends effective context beyond 400K tokens.
- **Three Variants**: Instant (quick lookups), Thinking (high-complexity), Pro (maximum context + agent support).

**Benchmark Results:**

| Benchmark | Score | Confidence |
|-----------|-------|------------|
| SWE-bench Verified | 80.0% | HIGH |
| SWE-bench Pro | 55.6% (SOTA at release) | HIGH |
| FrontierMath (Tier 1-3) | 40.3% (SOTA at release) | HIGH |
| GPQA Diamond | 92.4% | HIGH |
| ARC-AGI-2 | 52.9% | HIGH |
| GDPval (knowledge work) | Beats/ties top professionals on 70.9% of comparisons | HIGH |

---

### 4. GPT-5.3-Codex (OpenAI) — "xHigh" reasoning effort

| Attribute | Value | Confidence |
|-----------|-------|------------|
| **Release Date** | February 5, 2026 | HIGH (OpenAI official) |
| **Context Window** | 400K tokens | HIGH |
| **Max Output** | 128K tokens | HIGH |
| **API Pricing** | $3.50 / $28.00 per 1M tokens (estimated; official pricing rolled out post-launch) | LOW-MEDIUM |
| **Batch API Pricing** | $1.75 / $14.00 per 1M tokens (estimated) | LOW |
| **Availability** | ChatGPT paid plans, Codex (app, CLI, IDE, web), GitHub Copilot (GA Feb 9), OpenAI API (rolling out) | HIGH |
| **Reasoning Effort** | low, medium, high, xhigh | HIGH |

**Key Capabilities:**
- Combines coding strength of GPT-5.2-Codex with reasoning/professional capabilities of GPT-5.2 in a single model.
- 25% faster than previous Codex generation.
- Optimized for agentic coding tasks: long-running research, tool use, complex execution.

**Benchmark Results (xhigh reasoning effort):**

| Benchmark | Score | Confidence |
|-----------|-------|------------|
| SWE-bench Pro | 56.8% (surpasses GPT-5.2 Thinking's 55.6%) | HIGH |
| Terminal-Bench 2.0 | 77.3% (current leader) | HIGH |
| OSWorld-Verified | 64.7% | HIGH |

---

### 5. Gemini 3.1 Pro (Google DeepMind)

| Attribute | Value | Confidence |
|-----------|-------|------------|
| **Release Date** | February 19, 2026 (Preview) | HIGH (Google official) |
| **Architecture** | Transformer-based Mixture-of-Experts, built on Gemini 3 Pro | HIGH |
| **Context Window** | 1M tokens standard (some sources cite 2M tokens in extended mode) | MEDIUM |
| **API Pricing** | $2.00 / $12.00 per 1M tokens (under 200K context) | HIGH |
| **Long Context Pricing** | $4.00 / $18.00 per 1M tokens (200K-1M) | HIGH |
| **Availability** | Google AI Studio (free preview), Gemini app + NotebookLM (Pro/Ultra subscription) | HIGH |
| **Modalities** | Text, audio, images, video, code | HIGH |
| **Output Speed** | 109.5 tokens/sec via Google API (above median 71.3 t/s for reasoning models) | MEDIUM |
| **Artificial Analysis Intelligence Index** | 57 (#1 overall) | MEDIUM |

**Key Capabilities:**
- Massively multimodal: comprehends text, audio, images, video, and entire code repositories.
- MoE architecture delivers breakthrough improvements at same price as Gemini 3 Pro.
- MCP Atlas benchmark: 69.2% on multi-step tool coordination tasks.

**Benchmark Results:**

| Benchmark | Score | vs. Gemini 3 Pro | Confidence |
|-----------|-------|-------------------|------------|
| SWE-bench Verified | 80.6% | +4.4pp (76.2%) | HIGH |
| Terminal-Bench 2.0 | 68.5% | — | HIGH |
| ARC-AGI-2 | 77.1% | +44pp (33.1%) -- more than doubled | HIGH |
| GPQA Diamond | 94.3% (industry-leading) | — | HIGH |
| SciCode | 59.0% (field-leading) | — | HIGH |
| MCP Atlas | 69.2% | — | MEDIUM |
| Benchmarks won | 13 out of 16 industry-standard benchmarks | — | HIGH |

---

### 6. Grok 4.20 (xAI)

| Attribute | Value | Confidence |
|-----------|-------|------------|
| **Release Date** | ~February 17, 2026 (Beta) | HIGH (multiple sources) |
| **Status** | Beta (beta 2 shipping late Feb 2026; full benchmark disclosure expected March 2026) | HIGH |
| **Architecture** | Multi-agent: 4 specialized agents (Grok, Harper, Benjamin, Lucas) running in parallel | HIGH |
| **Training** | Colossus supercluster, 200,000 GPUs, large-scale RL at pretraining scale | MEDIUM |
| **Context Window** | ~2M tokens (inherited/enhanced from Grok 4.1 Fast) | MEDIUM |
| **Consumer Access** | SuperGrok (~$30/month), X Premium+ only | HIGH |
| **API Pricing** | Not yet available; API expected after beta concludes (~March 2026) | HIGH |
| **Grok 4.1 Fast API Pricing** (for reference) | $0.20 / $0.50 per 1M tokens (extremely cheap) | HIGH |
| **Estimated LMArena ELO** | 1505-1535 (provisional, not officially rated yet) | LOW |
| **Hallucination Rate** | ~4.2% (65% reduction from ~12%) | MEDIUM |

**Multi-Agent Architecture (the headline feature):**

| Agent | Specialization | Role |
|-------|---------------|------|
| **Grok** | Coordinator/Aggregator | Task decomposition, strategy, conflict resolution, final synthesis |
| **Harper** | Research & Facts | Real-time search, X firehose data (~68M English tweets/day), evidence integration, fact-verification |
| **Benjamin** | Math/Code/Logic | Step-by-step reasoning, numerical/computational verification, programming, proofs |
| **Lucas** | Creative/Language | (Role less documented; participates in deliberation) |

**Scalability:** Standard users get 4 agents; heavy users can scale to 16 agents on the same prompt.

**Parallel Inference:** All four agents run concurrently on Colossus (200K+ GPUs). Shared model weights, prefix/KV cache, and input context. Marginal cost ~1.5-2.5x a single pass (not 4x).

**Benchmark Results (limited -- formal disclosure pending):**

| Benchmark | Score | Source | Confidence |
|-----------|-------|--------|------------|
| SWE-bench (Grok 4.2 variant) | ~75% | Third-party reports | LOW |
| ARC-AGI (Grok 4.2 variant) | 15.9% | Third-party reports | LOW |
| Estimated Arena ELO | 1505-1535 | xAI claims | LOW |
| Hallucination reduction | 65% (12% -> 4.2%) | xAI claims | MEDIUM |

**Critical caveat:** Grok 4.20 is still in beta. xAI has NOT published official benchmarks yet. The scores above are estimates from third parties or xAI claims, not independently verified. Formal benchmark disclosure is expected March 2026.

---

## Consolidated Benchmark Comparison

### SWE-bench Verified (Software Engineering)

| Model | Score | Confidence |
|-------|-------|------------|
| Claude Opus 4.6 | 80.8% | HIGH |
| Gemini 3.1 Pro | 80.6% | HIGH |
| GPT-5.2 Thinking | 80.0% | HIGH |
| Claude Sonnet 4.6 | 79.6% | HIGH |
| Grok 4.20 (est.) | ~75% (Grok 4.2 data) | LOW |

### SWE-bench Pro (Harder Software Engineering)

| Model | Score | Confidence |
|-------|-------|------------|
| GPT-5.3-Codex (xhigh) | 56.8% | HIGH |
| GPT-5.2 Thinking | 55.6% | HIGH |
| Others | Not reported / not comparable | — |

### Terminal-Bench 2.0 (Agentic Coding)

| Model | Score | Confidence |
|-------|-------|------------|
| GPT-5.3-Codex (xhigh) | 77.3% | HIGH |
| Gemini 3.1 Pro | 68.5% | HIGH |
| Claude Opus 4.6 | 65.4% | HIGH |
| Grok 4.20 | Not disclosed | — |

### ARC-AGI-2 (Abstract Reasoning)

| Model | Score | Confidence |
|-------|-------|------------|
| Gemini 3.1 Pro | 77.1% | HIGH |
| Claude Opus 4.6 | 68.8% | HIGH |
| GPT-5.2 Thinking | 52.9% | HIGH |
| Grok 4.20 (est.) | ~15.9% (Grok 4.2 data) | LOW |

### GPQA Diamond (Graduate-Level Science Q&A)

| Model | Score | Confidence |
|-------|-------|------------|
| Gemini 3.1 Pro | 94.3% | HIGH |
| GPT-5.2 Thinking | 92.4% | HIGH |
| Claude Opus 4.6 | Not reported in this benchmark | — |
| Grok 4.20 | Not disclosed | — |

### Artificial Analysis Intelligence Index

| Model | Score | Confidence |
|-------|-------|------------|
| Gemini 3.1 Pro Preview | 57 | MEDIUM |
| Claude Opus 4.6 (max effort) | 53 | MEDIUM |
| Claude Sonnet 4.6 (max effort) | 51 | MEDIUM |
| GPT-5.2 / Codex 5.3 / Grok 4.20 | Not in top results at time of query | — |

### LMArena (Chatbot Arena) ELO Rankings (Feb 11, 2026 snapshot)

| Rank | Model | ELO | Votes |
|------|-------|-----|-------|
| 1 | Claude Opus 4.6 Thinking | 1506 | 3,922 |
| 2 | Claude Opus 4.6 | 1502 | 4,653 |
| 3 | Gemini 3 Pro | 1486 | 35,697 |
| 4 | Grok 4.1 Thinking | 1475 | 35,401 |
| 5 | Gemini 3 Flash | 1473 | 26,326 |

**Note:** Gemini 3.1 Pro, Grok 4.20, and GPT-5.3-Codex were released after this snapshot. Grok 4.20 is not yet rated (estimated 1505-1535 by xAI). Gemini 3.1 Pro and Codex 5.3 may not have enough votes yet.

---

## Pricing Comparison

| Model | Input (per 1M tokens) | Output (per 1M tokens) | Context Window | Max Output | Notes |
|-------|----------------------|------------------------|----------------|------------|-------|
| Claude Opus 4.6 | $5.00 | $25.00 | 200K (1M beta) | 128K | Fast mode 6x, 1M context 2x/1.5x premium |
| Claude Sonnet 4.6 | $3.00 | $15.00 | 200K (1M beta) | 64K | 5x cheaper than Opus, near-parity performance |
| GPT-5.2 Thinking | $1.75 | $14.00 | 400K | 128K | 90% cached discount; thinking tokens billed as output |
| GPT-5.3-Codex | ~$3.50 | ~$28.00 | 400K | 128K | Pricing not fully confirmed; batch at ~$1.75/$14.00 |
| Gemini 3.1 Pro | $2.00 | $12.00 | 1M (2M extended) | — | Long context: $4.00/$18.00 (200K-1M) |
| Grok 4.20 | TBD (beta) | TBD (beta) | ~2M | — | Reference: Grok 4.1 Fast is $0.20/$0.50 |

**Price-performance winner:** Gemini 3.1 Pro at $2/$12 with benchmark-leading scores across 13/16 benchmarks. Claude Sonnet 4.6 at $3/$15 is the best value in the Claude family.

**Cheapest raw access:** Grok 4.1 Fast at $0.20/$0.50 but that is the previous generation, not 4.20.

**Best cost optimization:** GPT-5.2 Thinking with 90% cached input discount ($0.175/M cached) for repeat-context workloads.

---

## Authoritative Benchmark Sources & Leaderboards

| Source | URL | What It Measures | Authority Level |
|--------|-----|------------------|-----------------|
| **LMArena (Chatbot Arena)** | https://lmarena.ai/ | Human preference ELO via crowdsourced blind voting (5.2M+ votes, 302 models) | HIGH -- gold standard for "vibes" / general preference |
| **Artificial Analysis** | https://artificialanalysis.ai/ | Intelligence, speed, latency, price, context (independent measurement) | HIGH -- independent, controlled measurement |
| **SWE-bench Verified** | https://www.swebench.com/ | Real-world software engineering (GitHub issue resolution) | HIGH -- industry standard for coding |
| **SWE-bench Pro** | https://scale.com/leaderboard/swe_bench_pro_public | Harder variant of SWE-bench by Scale AI | HIGH |
| **Terminal-Bench 2.0** | (referenced in model cards) | Agentic terminal-based coding tasks | MEDIUM -- newer benchmark, less established |
| **ARC-AGI-2** | (Francois Chollet) | Abstract reasoning / novel problem solving | HIGH -- well-respected for measuring genuine reasoning |
| **GPQA Diamond** | (published papers) | Graduate-level science Q&A (Google-proof) | HIGH |
| **FrontierMath** | (published papers) | Expert-level mathematics | HIGH |
| **OSWorld** | (published papers) | Computer use / operating system interaction | MEDIUM |
| **MMLU / MMLU-Pro** | (published papers) | Massive multitask language understanding | HIGH -- but increasingly saturated (most models >85%) |
| **HumanEval** | (OpenAI) | Code generation (function completion) | MEDIUM -- somewhat dated, most models score >90% |
| **GDPval** | (OpenAI) | Knowledge work across 44 occupations | MEDIUM -- newer, OpenAI-created |

**Recommendation for the blog post:** Cite SWE-bench Verified, ARC-AGI-2, GPQA Diamond, and LMArena ELO as primary benchmarks. These are the most discriminating (models don't all score 95%+) and most respected. Terminal-Bench 2.0 is good for the coding-specific comparison. Artificial Analysis for price-performance. Avoid over-relying on MMLU and HumanEval -- they're saturated and don't differentiate frontier models anymore.

---

## Multi-Agent Capabilities Comparison

| Feature | Claude Opus 4.6 (Agent Teams) | Grok 4.20 (4-Agent System) |
|---------|-------------------------------|----------------------------|
| **Architecture** | User-configurable multi-agent orchestration in Claude Code | Built-in 4-agent deliberation system |
| **Agent Count** | Configurable (demo used 16) | 4 standard, up to 16 for heavy users |
| **Agent Specialization** | User-defined per task | Fixed roles (Coordinator, Research, Math/Code, Creative) |
| **Deliberation** | Agents work on subtasks in parallel | Agents debate/deliberate on same question in parallel |
| **Use Case** | Complex development tasks (compiler building, multi-file refactors) | Reducing hallucination, improving answer quality through internal peer review |
| **Real-time Data** | No (relies on context provided) | Yes (Harper agent uses X firehose: ~68M tweets/day) |
| **Cost Model** | Each agent instance billed separately | ~1.5-2.5x single pass cost (shared weights/cache) |
| **Maturity** | Production (available in Claude Code) | Beta (SuperGrok/Premium+ only) |

---

## API Availability Summary

| Model | API Status | Providers |
|-------|-----------|-----------|
| Claude Opus 4.6 | GA | Anthropic API, AWS Bedrock, Google Vertex AI, Microsoft Foundry |
| Claude Sonnet 4.6 | GA | Same as Opus |
| GPT-5.2 Thinking | GA | OpenAI API, Azure OpenAI |
| GPT-5.3-Codex | Rolling out | OpenAI API, OpenRouter (recently added) |
| Gemini 3.1 Pro | Preview | Google AI Studio, Vertex AI |
| Grok 4.20 | Not available (beta only) | Consumer access via SuperGrok/X Premium+ only; API expected post-beta (~March 2026) |

---

## Context Window Comparison

| Model | Standard | Extended/Beta | Notes |
|-------|----------|---------------|-------|
| Grok 4.20 | ~2M tokens | — | Largest, inherited from Grok 4.1 Fast |
| Gemini 3.1 Pro | 1M tokens | 2M (extended mode) | Built-in, no beta flag needed |
| Claude Opus 4.6 | 200K tokens | 1M (beta, tier 4+) | Requires special header; 2x/1.5x price premium |
| Claude Sonnet 4.6 | 200K tokens | 1M (beta, tier 4+) | Same beta requirements as Opus |
| GPT-5.2 Thinking | 400K tokens | Response compaction extends beyond 400K | No separate beta tier |
| GPT-5.3-Codex | 400K tokens | — | Same as GPT-5.2 base |

---

## What NOT to Rely On

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| MMLU scores for model differentiation | Saturated -- all frontier models score 85-90%+, differences are noise | SWE-bench, ARC-AGI-2, GPQA Diamond |
| HumanEval for coding comparison | Saturated -- most models >90% | SWE-bench Verified, Terminal-Bench 2.0, SWE-bench Pro |
| Grok 4.20 official benchmarks | Don't exist yet (beta, expected March 2026) | Use Grok 4.2 data with LOW confidence caveat |
| Single-source pricing for Codex 5.3 | Pricing not fully confirmed by OpenAI at time of research | Use range estimates, note uncertainty |
| LMArena rankings for newest models | Feb 11 snapshot doesn't include models released Feb 17-19 | Note snapshot date, use estimated ELOs with caveats |

---

## Gaps & Open Questions

1. **Grok 4.20 official benchmarks**: Not published. Everything is estimated or from the earlier Grok 4.2 variant. The blog post should explicitly note this as beta/unverified.
2. **Codex 5.3 API pricing**: Conflicting sources. OpenAI hasn't fully confirmed. Use $3.50/$28.00 as working estimate.
3. **Claude Opus 4.6 GPQA Diamond score**: Not found in any source. May not have been tested or published.
4. **Grok 4.20 Lucas agent role**: Under-documented. Most sources only detail Grok, Harper, and Benjamin.
5. **Gemini 3.1 Pro 2M context claim**: Some sources say 1M, others say 2,048,000 tokens. Likely 1M standard with 2M extended. Treat with caution.
6. **Thinking token costs**: For both GPT-5.2 Thinking and Claude Opus 4.6 Adaptive Thinking, internal reasoning tokens are billed as output tokens. This can significantly inflate real-world costs vs. the listed per-token price. The blog post should call this out.

---

## Sources

### Official / HIGH Confidence
- [Introducing Claude Opus 4.6](https://www.anthropic.com/news/claude-opus-4-6) -- Anthropic official announcement
- [Introducing Claude Sonnet 4.6](https://www.anthropic.com/news/claude-sonnet-4-6) -- Anthropic official announcement
- [Claude API Pricing](https://platform.claude.com/docs/en/about-claude/pricing) -- Official pricing page
- [Introducing GPT-5.2](https://openai.com/index/introducing-gpt-5-2/) -- OpenAI official announcement
- [Introducing GPT-5.3-Codex](https://openai.com/index/introducing-gpt-5-3-codex/) -- OpenAI official announcement
- [OpenAI API Pricing](https://developers.openai.com/api/docs/pricing) -- Official pricing page
- [Gemini 3.1 Pro Model Card](https://deepmind.google/models/model-cards/gemini-3-1-pro/) -- Google DeepMind official
- [Gemini 3.1 Pro Blog Post](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-1-pro/) -- Google official
- [xAI Models and Pricing](https://docs.x.ai/developers/models) -- xAI official

### Leaderboards & Independent Analysis / MEDIUM Confidence
- [LMArena Leaderboard](https://lmarena.ai/) -- Crowdsourced ELO rankings (5.2M+ votes)
- [Artificial Analysis](https://artificialanalysis.ai/) -- Independent model intelligence/speed/price analysis
- [SWE-bench Leaderboard](https://www.swebench.com/) -- Software engineering benchmark
- [SWE-bench Pro by Scale AI](https://scale.com/leaderboard/swe_bench_pro_public) -- Harder SWE variant
- [SWE-bench Verified Feb 2026 Leaderboard](https://www.marc0.dev/en/leaderboard) -- Aggregated scores

### Third-Party Analysis / MEDIUM-LOW Confidence
- [VentureBeat: Sonnet 4.6 matches flagship at 1/5 cost](https://venturebeat.com/technology/anthropics-sonnet-4-6-matches-flagship-ai-performance-at-one-fifth-the-cost/)
- [DataCamp: Claude Opus 4.6](https://www.datacamp.com/blog/claude-opus-4-6) -- Feature breakdown
- [DataCamp: GPT-5.2](https://www.datacamp.com/blog/gpt-5-2) -- Benchmark analysis
- [NextBigFuture: Grok 4.20 launch](https://www.nextbigfuture.com/2026/02/xai-launches-grok-4-20-and-it-has-4-ai-agents-collaborating.html) -- Multi-agent details
- [Awesome Agents: Grok 4.20 multi-agent](https://awesomeagents.ai/news/grok-4-20-multi-agent-launch/) -- Agent architecture details
- [SmartScope: Gemini 3.1 Pro benchmark analysis](https://smartscope.blog/en/generative-ai/google-gemini/gemini-3-1-pro-benchmark-analysis-2026/) -- Critical analysis of "13 out of 16 wins" claim

---
*Stack research for: AI model comparison blog post*
*Researched: 2026-02-25*
