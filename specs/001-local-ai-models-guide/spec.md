# Feature Specification: Local AI Models Guide Blog Post

**Feature Branch**: `001-local-ai-models-guide`
**Created**: 2026-03-02
**Status**: Draft
**Input**: User description: "Blog post about open source models (Kimi K2.5, GLM-5, MiniMax M2.5), comparison to frontier models, SWE-ReBench benchmark, search tools (Exa.ai, SearXNG, Brave API), local model optimization (Unsloth quants, sampling settings, extended thinking), and how to close the gap with frontier models."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Reader Evaluates Open Source Models (Priority: P1)

A developer or AI practitioner visits the blog post to understand which open source models in early 2026 are worth running locally or via API, how they stack up against frontier models (Claude Opus 4.6, GPT-5.x), and whether the gap is small enough to justify switching for their use case.

**Why this priority**: This is the core value proposition of the post — readers need a clear, data-backed comparison to make informed decisions about model selection.

**Independent Test**: Can be fully tested by verifying the post renders correctly, contains accurate benchmark data for at least 6 models across 4+ benchmarks, and provides a clear recommendation framework.

**Acceptance Scenarios**:

1. **Given** a reader lands on the blog post, **When** they read the model comparison section, **Then** they find benchmark scores for Kimi K2.5, GLM-5, MiniMax M2.5, DeepSeek V3.2, Qwen 3.5, and at least 2 others across SWE-Bench Verified, Chatbot Arena, HLE, and LiveCodeBench.
2. **Given** a reader wants to know if open source is "good enough," **When** they read the comparison analysis, **Then** they find a clear summary of where open models match or fall short of frontier models, with specific percentage gaps cited.
3. **Given** a reader wants cost context, **When** they review the post, **Then** they find API pricing comparisons showing cost differences between open and closed models.

---

### User Story 2 - Reader Optimizes Local Model Setup (Priority: P2)

A developer running models locally via Ollama, llama.cpp, or vLLM wants to know the best quantization format, sampling parameters, and inference settings to maximize output quality on their hardware.

**Why this priority**: Readers who've already decided to run local models need actionable configuration guidance — this is the practical "how to get the best results" section.

**Independent Test**: Can be tested by verifying the post includes specific parameter values for at least 3 use cases (code, general, creative), quantization recommendations by VRAM tier, and Ollama/llama.cpp configuration examples.

**Acceptance Scenarios**:

1. **Given** a reader has a 24GB GPU, **When** they read the optimization section, **Then** they find specific quantization format recommendations (Q4_K_M vs Q5_K_M vs Q6_K), VRAM estimates, and expected quality tradeoffs.
2. **Given** a reader wants better reasoning from local models, **When** they read the "making models think more" section, **Then** they find concrete techniques (CoT prompting, extended thinking tokens, reasoning model recommendations) with examples.
3. **Given** a reader uses Ollama, **When** they read the configuration section, **Then** they find specific settings for flash attention, KV cache quantization, context length, and sampling parameters.

---

### User Story 3 - Reader Adds Search/RAG to Local Models (Priority: P3)

A developer wants to augment local models with web search capabilities using Exa.ai, self-hosted SearXNG, or Brave Search API to get up-to-date information without relying on closed APIs.

**Why this priority**: Search augmentation is a key differentiator for making local models practically useful, but it's a narrower audience than model comparison or optimization.

**Independent Test**: Can be tested by verifying the post covers at least 3 search tools with pricing, setup steps, and integration patterns for local model workflows.

**Acceptance Scenarios**:

1. **Given** a reader wants privacy-first search, **When** they read the SearXNG section, **Then** they find Docker Compose setup instructions, critical config settings (JSON format enablement), and integration patterns with local models.
2. **Given** a reader evaluates search APIs, **When** they read the comparison, **Then** they find feature/pricing comparison across Exa.ai, SearXNG, and Brave Search API with clear tradeoffs.
3. **Given** a reader wants to build a "local Perplexity," **When** they read the RAG section, **Then** they find a recommended stack (e.g., Perplexica + SearXNG + Ollama) with architecture overview.

---

### User Story 4 - Reader Understands New Benchmarks (Priority: P4)

A reader wants to understand SWE-ReBench (Multi-SWE-Bench) as a new coding benchmark and why it matters compared to the original SWE-Bench, plus how Artificial Analysis and other benchmarks fit into the evaluation landscape.

**Why this priority**: Benchmark literacy helps readers interpret model claims critically, but it's context for the comparison rather than the primary value.

**Independent Test**: Can be tested by verifying the post explains SWE-ReBench's methodology, key differences from SWE-Bench, and why scores differ (contamination, multi-language coverage).

**Acceptance Scenarios**:

1. **Given** a reader sees conflicting benchmark claims, **When** they read the benchmarks section, **Then** they understand why SWE-ReBench scores are 20-25% lower than SWE-Bench Verified for the same models and what that implies about contamination.
2. **Given** a reader wants to evaluate model claims, **When** they read the benchmark methodology section, **Then** they find explanations of Artificial Analysis Intelligence Index, Humanity's Last Exam, and LiveCodeBench with their strengths and limitations.

---

### Edge Cases

- What happens when benchmark data becomes outdated within weeks of publication? Post includes a "last verified" date and caveat about the rapid pace of releases.
- How does the post handle models that claim benchmark scores but haven't been independently verified? Flag self-reported vs. independently verified scores explicitly.
- What if a reader has less than 8GB VRAM? Post acknowledges the minimum viable hardware and suggests API alternatives for underpowered setups.
- What about Apple Silicon (M-series) users? Unified memory changes the VRAM calculus — post addresses this separately.
- How does the post handle models released after publication? Include a "methodology for evaluating new models" framework readers can apply themselves.

## Clarifications

### Session 2026-03-02

- Q: How should benchmark data be sourced for this post? → A: Web-research current benchmark data from Artificial Analysis, lmsys, Papers With Code, and other public sources during implementation. All scores must be attributable to named sources per SC-008.
- Q: How should content depth be distributed across the four topic areas? → A: Prioritize depth on P1 (model comparison) and P2 (local optimization) as the primary content pillars. Cover P3 (search/RAG) and P4 (benchmark literacy) at summary depth, linking to existing posts (`lm-studio-local-ai-mac`, `ai-models-compared-2026`) where applicable.
- Q: How strongly opinionated should model/tool recommendations be? → A: Explicitly declare top picks per use case (e.g., "best for coding," "best overall local model," "best quantization for 24GB") with supporting benchmark data. Match the blog's established direct/cynical tone — no hedging behind "it depends" without specifics.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Blog post MUST be a valid MDX file conforming to the existing content schema (title, date, excerpt, tags, published, tldr, keyTakeaways, faq).
- **FR-002**: Post MUST include benchmark comparison tables covering at least 6 open source models across at least 4 standardized benchmarks.
- **FR-003**: Post MUST explain SWE-ReBench (Multi-SWE-Bench) methodology and how it differs from SWE-Bench, including contamination concerns and multi-language coverage.
- **FR-004**: Post MUST provide quantization recommendations by VRAM tier (8GB, 12GB, 16GB, 24GB, 48GB) with specific format recommendations and quality tradeoff analysis.
- **FR-005**: Post MUST include sampling parameter recommendations for at least 3 use cases (code generation, general conversation, creative writing) with specific values for temperature, min_p, top_p, and repetition penalty.
- **FR-006**: Post MUST cover search/RAG tools (Exa.ai, SearXNG, Brave Search API) with feature comparison, pricing, and integration patterns.
- **FR-007**: Post MUST include techniques for making local models "think more" (CoT prompting, extended thinking, reasoning model selection).
- **FR-008**: Post MUST reference Unsloth Dynamic 2.0 GGUFs and explain layer-aware quantization as a key optimization technique.
- **FR-009**: Post MUST include Ollama-specific configuration guidance (flash attention, KV cache quantization, context length settings).
- **FR-010**: Post MUST follow the existing blog's tone: direct, cynical, data-backed, opinionated but honest about tradeoffs, no marketing language. Post MUST explicitly declare top picks per use case (e.g., "best for coding," "best overall") with supporting data rather than neutral "it depends" framing.
- **FR-011**: Post MUST include a clear "closing the gap" section analyzing where open models match frontier models and where gaps remain.
- **FR-012**: Post MUST include FAQ section with at least 5 Q&A pairs covering common reader questions.
- **FR-013**: Post MUST include keyTakeaways with 4-6 bullet points summarizing the core insights.
- **FR-014**: Post MUST pass the existing build pipeline (posts.json generation, content validation, Astro build).
- **FR-015**: Post MUST use proper slug format (`/^[a-z0-9-]+$/`) and be URL-safe.

### Key Entities

- **Open Source Model**: Name, creator, parameter count (total/active), architecture type (MoE/dense), license, benchmark scores, API pricing, quantization availability.
- **Benchmark**: Name, methodology, what it measures, known limitations, top scores.
- **Quantization Format**: Name (Q4_K_M, Q6_K, etc.), VRAM savings percentage, quality impact, recommended use case.
- **Search Tool**: Name, type (API/self-hosted), pricing, key features, latency, privacy model.
- **Inference Engine**: Name (Ollama, vLLM, llama.cpp), best use case, key settings, hardware requirements.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Post passes the full build pipeline (`bun run build`) without errors, including posts.json generation and content validation.
- **SC-002**: Post covers at least 6 distinct open source models with benchmark data from at least 4 independent benchmarks.
- **SC-003**: Post includes at least 3 comparison tables (model benchmarks, quantization formats, search tool comparison).
- **SC-004**: Post provides actionable configuration for at least 2 inference engines (Ollama, llama.cpp) with specific parameter values.
- **SC-005**: Post length falls between 3,000 and 6,000 words — comprehensive but not bloated.
- **SC-006**: Post includes all required frontmatter fields (title, date, excerpt, tags, published, tldr, keyTakeaways, faq) conforming to the Zod schema.
- **SC-007**: Post includes proper cross-linking to at least 2 related existing blog posts (e.g., "AI Models Compared 2026", "LM Studio Setup Guide").
- **SC-008**: All benchmark data cited in the post is attributable to a named source (no unattributed claims). Data sourced via web research from Artificial Analysis, lmsys Chatbot Arena, Papers With Code, and official model release announcements.
- **SC-009**: P1 (model comparison) and P2 (local optimization) sections each comprise at least 35% of total word count. P3 (search/RAG) and P4 (benchmarks) are summary-depth, each under 15% of total word count.

## Assumptions

- The post targets the existing blog audience: technical practitioners, developers, and grad students who are skeptical of hype and value practical guidance.
- Benchmark scores cited are from publicly available sources as of early March 2026 and may shift rapidly. The post acknowledges this volatility.
- "Frontier models" refers to Claude Opus 4.6, GPT-5.x, and Gemini 3.x as the closed-source performance ceiling.
- The post assumes readers have basic familiarity with LLMs but may not know quantization formats or inference engine configuration.
- Apple Silicon (M-series) unified memory is treated as equivalent VRAM for model loading recommendations.
- The post does not cover fine-tuning or training — it focuses on inference optimization of pre-trained/pre-quantized models.
- Unsloth is referenced as a quantization provider, not as a training framework (which it also is).
- SearXNG Docker setup assumes OrbStack or Docker Desktop is already installed.
- Benchmark data will be web-researched from public sources (Artificial Analysis, lmsys, Papers With Code) during implementation, not provided by the author. Scores are as of early March 2026.
- P3 (search/RAG) and P4 (benchmark literacy) are summary-depth sections that link out to existing posts rather than providing exhaustive standalone coverage.
