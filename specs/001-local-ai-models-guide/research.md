# Research: Local AI Models Guide Blog Post

**Date**: 2026-03-02 | **Spec**: [spec.md](./spec.md) | **Branch**: `001-local-ai-models-guide`

## Writing Style Analysis (from existing blog posts)

**Decision**: Match the established blog voice across `ai-models-compared-2026`, `lm-studio-local-ai-mac`, and `ai-coding-tools-compared-2026`.

**Key patterns identified:**
- **Titles**: "[Topic]: [Punchy personal hook with year]" — SEO title differs from display title
- **Openings**: No preamble. Start with a direct claim, problem statement, or provocative one-liner
- **Paragraphs**: 1-3 sentences max. Single-sentence paragraphs for emphasis
- **Tone**: Cynical, direct, opinionated, data-backed. Declares winners explicitly. No hedging behind "it depends" without follow-up specifics
- **Personal voice**: "I tested…", "In my experience…", references ASU CS grad student status, M4 Pro 48GB hardware
- **Tables**: Heavy use for comparisons (benchmarks, pricing, hardware recommendations)
- **Structure**: "Winner: [Model]" declarations per section, "The honest downsides" section, "My actual [workflow/take]" section, verdict with direct recommendations
- **Cross-links**: Always links to 2-3 related existing posts
- **Anti-hype**: Explicitly calls out benchmark gaming, marketing language, and overpromising ("Here's the thing…", "Let's be honest…")
- **Frontmatter**: tldr, keyTakeaways (4-6 bullets), faq (5+ Q&A pairs), optional howto
- **Word count**: Existing comparison posts are 3,000-5,000 words

**Alternatives considered**: Academic/tutorial tone (rejected — doesn't match blog voice), listicle format (rejected — too shallow for the technical depth required).

---

## Open Source Model Landscape (March 2026)

### Decision: Cover 8 Open Source Models

The spec requires ≥6. Covering 8 gives thorough coverage of the early 2026 landscape:

| Model | Creator | Total Params | Active Params | Architecture | License |
|-------|---------|-------------|--------------|--------------|---------|
| Kimi K2.5 | Moonshot AI | 1T | 32B | MoE (384 experts, 8 active) | Modified MIT |
| GLM-5 | Zhipu AI (Z.ai) | ~745B | 44B | MoE | MIT |
| MiniMax M2.5 | MiniMax | 230B | 10B | MoE | Modified MIT |
| DeepSeek V3.2 | DeepSeek | 685B | 37B | MoE + MLA + DSA | MIT |
| Qwen 3.5 | Alibaba Cloud | 397B | 17B | MoE + Gated Delta Networks | Apache 2.0 |
| Llama 4 Maverick | Meta | 400B | 17B | MoE (128 experts) | Llama Community |
| GPT-oss-120B | OpenAI | 117B | 5.1B | MoE (128 experts, Top-4) | Apache 2.0 |
| DeepSeek-R1 | DeepSeek | 671B | 37B | MoE (reasoning model) | MIT |

**Rationale**: These are the models dominating the open-source leaderboards as of March 2026. Each offers something distinct: Kimi K2.5 for agentic, MiniMax M2.5 for cost-efficiency, Qwen 3.5 for reasoning, DeepSeek for price-performance, GLM-5 for non-NVIDIA training, GPT-oss for OpenAI's first open weights.

**Alternatives considered**: Including NVIDIA Nemotron family (rejected — narrow agentic focus, less relevant to general local use). Including Phi-4 (rejected — too small for the "closing the gap" narrative, but mentioned in optimization section).

---

## Benchmark Data (Sourced, Attributed)

### Cross-Model Benchmark Table

| Model | SWE-Bench Verified | GPQA Diamond | LiveCodeBench | HLE (tools) | Arena ELO | API $/M (in/out) |
|-------|-------------------|-------------|---------------|-------------|-----------|------------------|
| **Frontier Reference** | | | | | | |
| Claude Opus 4.6 | 80.8% (self) | ~91.3% (self) | — | ~43.4% | 1503 | $5.00/$25.00 |
| GPT-5.2 | 80.0% (self) | 93.2% (Pro) | — | 45.5% | 1481 | $1.75/$14.00 |
| Gemini 3.1 Pro | 80.6% (self) | 94.3% (self) | 91.7% | — | 1500 | $2.00/$12.00 |
| **Open Source** | | | | | | |
| Kimi K2.5 | 76.8% (self) | 87.6% (self) | 85.0 (self) | 50.2% (self) | ~1452 | $0.60/$2.50 |
| GLM-5 | 77.8% (self) | 86.0% (self) | 52% (self) | 50.4% (self) | ~1455 | $1.00/$3.20 |
| MiniMax M2.5 | 80.2% (self) | 62% (self) | — | 28% (self) | TBD | $0.30/$1.20 |
| DeepSeek V3.2 | 70.0% (verified) | 82.4% (self) | 74.1 | 25.1% (self) | ~1421 | $0.27/$1.10 |
| Qwen 3.5 | 76.4% (self) | 88.4% (self) | 83.6 (self) | 48.3% (self) | ~1454 | $0.40/$1.60 |
| Llama 4 Maverick | — | 73.7% (contested) | — | — | ~1417→32nd* | $0.27/$0.85 |
| GPT-oss-120B | — | 80.1% (self) | — | — | — | Self-host |

\*Llama 4 Maverick's Arena ranking dropped from initial "experimental" submission to 32nd for the actual open-source version. [Major controversy](https://techcrunch.com/2025/04/06/metas-benchmarks-for-its-new-ai-models-are-a-bit-misleading/).

**Key insight**: Self-reported scores dominate. Only Arena ELO and Artificial Analysis Intelligence Index are independently verified. SWE-Bench Verified was retired Feb 2026 due to fatal contamination.

### Artificial Analysis Intelligence Index (AAII v4.0)

- Composite score across 4 categories (25% each): Agents, Coding, Scientific Reasoning, General
- 10 evaluations including GDPval-AA, Terminal-Bench Hard, HLE, GPQA Diamond
- **Top scores**: Gemini 3.1 Pro (57), Claude Opus 4.6 (53), Claude Sonnet 4.6 (51), GPT-5.2 (~50)
- Open source models not yet in top 4 but "within striking distance" on individual evals

**Source**: [Artificial Analysis](https://artificialanalysis.ai/evaluations/artificial-analysis-intelligence-index)

---

## SWE-ReBench / Multi-SWE-Bench Research

### Decision: Explain both as distinct benchmarks, focus on SWE-rebench

**SWE-rebench** (TractoAI):
- Continuously evolving, decontaminated benchmark using fresh GitHub issues
- 5 runs per model, standardized scaffolding, centralized evaluation
- Current top: Claude Code 52.9% pass@1, Claude Opus 4.6 and GPT-5.2 tied at 51.7%
- Scores ~25-50pp lower than retired SWE-Bench Verified due to decontamination and standardized scaffolding

**Multi-SWE-Bench** (ByteDance):
- 1,632 human-validated instances across 7 languages (Java, TypeScript, JavaScript, Go, Rust, C, C++)
- Models show limited generalization beyond Python: Claude 3.7 Sonnet 43% multi-language vs 63% Python-only
- Reveals that "coding ability" benchmarks heavily overweight Python

**Why SWE-Bench Verified died**: OpenAI's Feb 2026 audit found 59.4% of tasks flawed/unsolvable under fair evaluation. Frontier models could reproduce verbatim gold patches from memory. SWE-Bench Pro is the replacement (~23% top score vs 80%+ on Verified).

**Source**: [swe-rebench.com](https://swe-rebench.com), [arXiv:2505.20411](https://arxiv.org/abs/2505.20411), [arXiv:2504.02605](https://arxiv.org/html/2504.02605v1)

---

## Search/RAG Tools Comparison

### Decision: Cover Exa.ai, SearXNG, Brave Search API as primary; Perplexica as integration pattern

| Feature | Exa.ai | Brave Search API | SearXNG |
|---------|--------|-----------------|---------|
| Type | Neural search API | Traditional search API | Self-hosted metasearch |
| Own Index | Yes (proprietary) | Yes (30B pages) | No (aggregates others) |
| Self-Hostable | No | No | Yes (Docker/OrbStack) |
| Free Tier | ~1K req/month | $5 credit/month | Unlimited |
| Cost/1K Queries | ~$5 (variable) | $5 | $0 |
| Latency | 100-350ms | < 1s | 1-3s |
| Content Extraction | Full text + highlights | Snippets only | Snippets only |
| Privacy | Cloud, standard ToS | ZDR, no tracking | Total (self-hosted) |
| MCP Server | Yes (official) | Yes (official) | No (custom) |
| Best For | Semantic search, RAG | General search, privacy | Budget/privacy stacks |

**Perplexica architecture**: SearXNG → search results (JSON) → Perplexica backend → Ollama (local LLM) → cited answer. Fully self-hosted "local Perplexity" stack.

**Key SearXNG config gotcha**: JSON format disabled by default. Must add `formats: [html, json]` to `settings.yml` or the API is useless for local model integration.

---

## Local Model Optimization Research

### Unsloth Dynamic 2.0

**Decision**: Recommend Unsloth Dynamic 2.0 GGUFs as the default quantization source.

- Layer-aware quantization: analyzes every layer individually, assigns per-layer quant type
- Calibrated on 1.5M+ tokens of curated conversational data (not Wikipedia)
- Lower KL Divergence than standard imatrix quants and QAT quants
- Available for all major open-source models on HuggingFace
- 1-bit Dynamic GGUF shrinks DeepSeek-V3.1 from 671GB to 192GB

### Quantization Recommendations by VRAM

| VRAM | Best Option |
|------|------------|
| 8 GB | 7-8B @ Q4_K_M (tight, ~4K context) |
| 12 GB | 7-8B @ Q6_K/Q8_0, or 14B @ Q4_K_M (tight) |
| 16 GB | 14B @ Q4_K_M/Q5_K_M comfortably |
| 24 GB | 14B @ Q8_0, or 32B @ Q4_K_M |
| 48 GB | 32B @ Q8_0, or 70B @ Q4_K_M |

Apple Silicon unified memory: reserve ~8GB for OS, remainder available for models.

### Sampling Parameters

| Task | Temperature | min_p | Repetition Penalty |
|------|------------|-------|-------------------|
| Code | 0.1-0.4 | 0.05-0.1 | 1.0-1.05 |
| General | 0.7-1.0 | 0.05-0.1 | 1.1-1.15 |
| Creative | 0.8-1.2 | 0.02-0.05 | 1.1-1.2 |

**Key insight**: Temperature + min_p is the 2026 consensus. min_p scales dynamically with model confidence, solving top_k's fixed cutoff problem and top_p's flat-distribution problem.

### Ollama Performance Config (Apple Silicon)

```bash
export OLLAMA_FLASH_ATTENTION=1
export OLLAMA_KV_CACHE_TYPE=q8_0
export OLLAMA_NUM_PARALLEL=1
export OLLAMA_MAX_LOADED_MODELS=1
```

### Reasoning Models for Local Use

| VRAM | Best Reasoning Model |
|------|---------------------|
| 8 GB | DeepSeek-R1-Distill-Qwen-7B @ Q4_K_M |
| 16 GB | QwQ-32B @ Q4_K_M (tight) or R1-Distill-14B @ Q5_K_M |
| 24 GB | QwQ-32B @ Q5_K_M or R1-Distill-32B @ Q4_K_M |
| 48 GB | DeepSeek-R1-Distill-70B @ Q4_K_M |

---

## SEO / AEO / GEO Strategy

### Decision: Implement all three optimization layers

**SEO (Search Engine Optimization)**:
- Already handled by the existing blog infrastructure (JSON-LD schemas, sitemap, RSS, OpenGraph, Twitter Cards)
- Blog post needs: seoTitle, seoDescription (different from display title/excerpt), proper heading hierarchy (H2→H3 only), internal cross-links, keyword-optimized FAQ

**AEO (Answer Engine Optimization)**:
- **50-word rule**: Place a concise 40-60 word answer at the top of each major section
- Structure content around questions that AI assistants would be asked
- FAQ section with question-phrased entries matching common AI assistant queries
- Clear, extractable key takeaways in frontmatter (these become AI citation targets)

**GEO (Generative Engine Optimization)**:
- **TLDR-first**: First 200 words must directly answer the primary query
- **Fact density**: Every claim needs a number, source, or specific data point
- **Structured data**: BlogPosting schema with FAQ schema (already supported by the blog's JSON-LD setup)
- **Citable information**: Tables, specific percentages, named sources — all easily extractable by LLMs

**Alternatives considered**: Ignoring AEO/GEO as "marketing buzzwords" (rejected — Gartner predicts 25% drop in traditional search by 2026, and the blog's existing traffic depends on discoverability).

**Sources**: [SEO, AEO & GEO in 2026](https://www.seowithsiva.com/blog/seo-aeo-geo-in-2026/), [AEO & GEO Best Practices 2026](https://opollo.com/blog/aeo-geo-best-practices-for-2026/), [GEO Best Practices 2026](https://www.firebrand.marketing/2025/12/geo-best-practices-2026/)

---

## Content Depth Distribution

### Decision: 40/35/15/10 split matching spec requirements (SC-009)

| Section | Weight | Treatment |
|---------|--------|-----------|
| P1: Model Comparison | ~40% | Full depth: 8-model benchmark tables, winner declarations, pricing, gap analysis |
| P2: Local Optimization | ~35% | Full depth: quantization guide, sampling params, Ollama config, reasoning models |
| P3: Search/RAG | ~15% | Summary: comparison table, SearXNG gotcha, Perplexica stack mention, links out |
| P4: Benchmark Literacy | ~10% | Summary: SWE-rebench methodology, contamination story, links to further reading |

**Cross-links to existing posts**:
- `lm-studio-local-ai-mac` — hardware recommendations, LM Studio setup
- `ai-models-compared-2026` — frontier model deep-dive (Claude, GPT, Gemini, Grok)
- `ai-coding-tools-compared-2026` — tool-level comparison vs model-level

---

## All NEEDS CLARIFICATION Resolved

No remaining unknowns. All technical decisions, data sources, and content structure decisions are documented above.
