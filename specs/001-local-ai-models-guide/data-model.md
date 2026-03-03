# Data Model: Local AI Models Guide Blog Post

**Date**: 2026-03-02 | **Spec**: [spec.md](./spec.md) | **Branch**: `001-local-ai-models-guide`

## Entities

### 1. Blog Post (MDX File)

The primary deliverable. Conforms to the Zod schema in `src/content/config.ts`.

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| title | string | Yes | Display title for the post |
| seoTitle | string | No | SEO-optimized title (differs from display title) |
| seoDescription | string | No | Meta description for search engines |
| date | string | Yes | YYYY-MM-DD format, valid date |
| dateModified | string | No | YYYY-MM-DD format, valid date |
| excerpt | string | Yes | Short summary for cards/previews |
| tags | string[] | Yes | URL-safe tags for categorization |
| published | boolean | Yes | Defaults to false |
| author | string | No | Defaults to "Divanshu Chauhan" |
| tldr | string | No | One-paragraph summary for AEO |
| keyTakeaways | string[] | No | 4-6 bullet points (spec: FR-013) |
| faq | {q: string, a: string}[] | No | ≥5 Q&A pairs (spec: FR-012) |
| howto | {name, totalTime, steps[]} | No | Optional structured data |

**Slug**: Must match `/^[a-z0-9-]+$/`. Candidate: `local-ai-models-guide-2026`

**Relationships**: Cross-links to `lm-studio-local-ai-mac`, `ai-models-compared-2026`, `ai-coding-tools-compared-2026`.

---

### 2. Open Source Model (Content Entity — not persisted, exists within MDX)

Represented as comparison table rows and prose sections within the blog post.

| Field | Type | Example |
|-------|------|---------|
| name | string | "Kimi K2.5" |
| creator | string | "Moonshot AI" |
| totalParams | string | "1T" |
| activeParams | string | "32B" |
| architecture | enum | "MoE" / "Dense" |
| license | string | "Modified MIT" |
| swebenchScore | string | "76.8% (self-reported)" |
| gpqaDiamondScore | string | "87.6% (self-reported)" |
| liveCodeBenchScore | string | "85.0 (self-reported)" |
| hleScore | string | "50.2% with tools (self-reported)" |
| arenaElo | number | 1452 |
| apiPricingInput | string | "$0.60/M" |
| apiPricingOutput | string | "$2.50/M" |
| quantAvailable | boolean | true |

**Validation**: All benchmark scores must cite source (self-reported vs independently verified).

---

### 3. Benchmark (Content Entity)

| Field | Type | Example |
|-------|------|---------|
| name | string | "SWE-rebench" |
| methodology | string | "Continuously evolving, decontaminated..." |
| whatItMeasures | string | "Real-world software engineering tasks" |
| knownLimitations | string[] | ["Small active problem set", "Python-only in V1"] |
| topScores | {model: string, score: string}[] | [{model: "Claude Code", score: "52.9%"}] |
| contaminated | boolean | false |

---

### 4. Quantization Format (Content Entity)

| Field | Type | Example |
|-------|------|---------|
| name | string | "Q4_K_M" |
| bitsPerWeight | number | 4.9 |
| type | enum | "K-quant" / "I-quant" |
| vramSavingsVsFP16 | string | "~70%" |
| qualityImpact | string | "<2% perplexity increase" |
| recommendedUseCase | string | "Community sweet spot for most use cases" |

**State transitions**: N/A (static reference data).

---

### 5. Search Tool (Content Entity)

| Field | Type | Example |
|-------|------|---------|
| name | string | "Exa.ai" |
| type | enum | "API" / "Self-hosted" |
| pricing | string | "~$5/1K queries" |
| freeTier | string | "~1K req/month" |
| keyFeatures | string[] | ["Neural/semantic search", "Sub-200ms latency"] |
| latency | string | "100-350ms" |
| privacyModel | string | "Cloud, standard ToS" |
| selfHostable | boolean | false |
| mcpServer | boolean | true |

---

### 6. Inference Engine (Content Entity)

| Field | Type | Example |
|-------|------|---------|
| name | string | "Ollama" |
| bestUseCase | string | "Single-user local inference on Mac/Linux" |
| keySettings | string[] | ["OLLAMA_FLASH_ATTENTION=1", "OLLAMA_KV_CACHE_TYPE=q8_0"] |
| hardwareRequirements | string | "16GB+ RAM, Apple Silicon or NVIDIA GPU" |

---

## File Structure Impact

This feature creates exactly **one new file** and modifies **one generated file**:

| File | Action | Purpose |
|------|--------|---------|
| `src/content/blog/local-ai-models-guide-2026.mdx` | Create | The blog post |
| `content/blog/posts.json` | Regenerate | Prebuild step auto-generates from all MDX files |

No new components, no new pages, no schema changes. The existing content pipeline handles everything.

---

## Content Structure (Section Outline)

```
Frontmatter (title, seo*, date, excerpt, tags, tldr, keyTakeaways, faq)
│
├── Opening hook (TLDR-first for GEO, 40-60 words answering the primary query)
│
├── P1: Open Source Models (40%)
│   ├── Quick comparison table (8 models × key metrics)
│   ├── The new contenders (Kimi K2.5, GLM-5, MiniMax M2.5, Qwen 3.5)
│   ├── The incumbents (DeepSeek V3.2, Llama 4, GPT-oss-120B)
│   ├── Closing the gap analysis (where open matches frontier, where gaps remain)
│   └── API pricing comparison table
│
├── P2: Local Optimization (35%)
│   ├── Quantization guide (Unsloth Dynamic 2.0, format comparison, VRAM tiers)
│   ├── Sampling parameters (temperature + min_p, per-task recommendations)
│   ├── Ollama configuration (flash attention, KV cache, context length)
│   ├── Making models think more (reasoning models, CoT prompting)
│   └── Apple Silicon optimization notes
│
├── P3: Search/RAG (15%)
│   ├── Tool comparison table (Exa.ai vs SearXNG vs Brave)
│   ├── SearXNG Docker setup gotcha (JSON format)
│   ├── "Local Perplexity" stack (Perplexica + SearXNG + Ollama)
│   └── Link to existing posts for deeper coverage
│
├── P4: Benchmark Literacy (10%)
│   ├── Why SWE-Bench Verified died (contamination, Feb 2026 retirement)
│   ├── SWE-rebench: what it actually measures
│   └── The anti-benchmark take (Leaderboard Illusion reference)
│
├── My Picks / Verdict
│   ├── Best overall local model
│   ├── Best for coding
│   ├── Best for reasoning
│   ├── Best quantization for each VRAM tier
│   └── Best search tool by use case
│
├── Related Posts (cross-links)
│
└── (Implicit: FAQ rendered by schema.ts as JSON-LD)
```
