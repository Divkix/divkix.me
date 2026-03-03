# Tasks: Local AI Models Guide Blog Post

**Input**: Design documents from `/specs/001-local-ai-models-guide/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Tests**: Not applicable — this is a content-only feature. Verification is via the existing build pipeline (`bun run build`) which runs content validation, Zod schema checks, and posts.json sync.

**Organization**: Tasks are grouped by user story (content section) to enable incremental writing and independent verification of each section's acceptance criteria.

**Note**: All content tasks target a single file (`src/content/blog/local-ai-models-guide-2026.mdx`). Parallelization is limited to research tasks and build validation commands.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files or independent operations)
- **[Story]**: Which user story this task belongs to (US1, US2, US3, US4)
- All content tasks target `src/content/blog/local-ai-models-guide-2026.mdx` unless otherwise noted

---

## Phase 1: Setup (Research & Scaffolding)

**Purpose**: Gather current data and create the MDX file skeleton

- [x] T001 [P] Web-research latest benchmark scores (March 2026) for 8 open source models (Kimi K2.5, GLM-5, MiniMax M2.5, DeepSeek V3.2, Qwen 3.5, Llama 4 Maverick, GPT-oss-120B, DeepSeek-R1) from Artificial Analysis, Arena.ai (LMArena), SWE-rebench.com, Scale.com/leaderboard, and LiveCodeBench — document findings for use in content tasks
- [x] T002 [P] Web-research latest API pricing, quantization availability (Unsloth Dynamic 2.0 GGUFs), Ollama/llama.cpp configuration updates, and search tool pricing (Exa.ai, Brave Search API) — document findings for use in content tasks
- [x] T003 Create MDX file with complete Zod-conforming frontmatter (title, seoTitle, seoDescription ≤160 chars, date "2026-03-03", excerpt, tags, published: true, author, tldr, keyTakeaways [4-6 bullets], faq [≥5 Q&A pairs]) in `src/content/blog/local-ai-models-guide-2026.mdx`

**Checkpoint**: MDX file exists with valid frontmatter, research data documented for content writing

---

## Phase 2: Foundational (Post Structure)

**Purpose**: Opening content that frames the entire post — MUST be complete before story sections

**CRITICAL**: The opening hook sets the tone and GEO optimization for the entire post

- [x] T004 Write opening hook and TLDR-first section — first 200 words must directly answer "Are open source AI models good enough in 2026?" per GEO requirements, match blog tone (direct, cynical, data-backed), include a provocative one-liner opener, and include a "Last verified: March 2026" note below the opening to address benchmark data volatility (EC1) in `src/content/blog/local-ai-models-guide-2026.mdx`

**Checkpoint**: Post has valid frontmatter and a strong opening — foundational structure ready for section writing

---

## Phase 3: User Story 1 — Reader Evaluates Open Source Models (Priority: P1) MVP

**Goal**: Deliver a clear, data-backed comparison of 8 open source models against frontier models with benchmark tables, gap analysis, and pricing — the core value proposition of the post (~40% of word count)

**Independent Test**: Post renders with ≥6 models × ≥4 benchmarks in comparison tables, frontier model reference rows present, specific percentage gaps cited, API pricing table included, and clear recommendation framework visible

### Implementation for User Story 1

- [x] T005 [US1] Write 8-model benchmark comparison table with columns: Model, SWE-Bench Verified, GPQA Diamond, LiveCodeBench, HLE, Arena ELO, API pricing — include 3 frontier model reference rows (Claude Opus 4.6, GPT-5.2, Gemini 3.1 Pro), flag self-reported vs independently verified scores in `src/content/blog/local-ai-models-guide-2026.mdx`
- [x] T006 [US1] Write new contenders analysis sections (Kimi K2.5 for agentic coding, GLM-5 for non-NVIDIA training, MiniMax M2.5 for cost-efficiency, Qwen 3.5 for reasoning) — each with 50-word AEO answer at section top, key differentiator, and "Winner" declaration per category in `src/content/blog/local-ai-models-guide-2026.mdx`
- [x] T007 [US1] Write incumbents and context sections (DeepSeek V3.2 price-performance, Llama 4 Maverick controversy and benchmark gaming, GPT-oss-120B as OpenAI's first open weights, DeepSeek-R1 for reasoning) with attributed benchmark data in `src/content/blog/local-ai-models-guide-2026.mdx`
- [x] T008 [US1] Write "Closing the Gap" analysis section — where open models match frontier (coding tasks, specific benchmarks within 5%), where gaps remain (multi-step reasoning, agentic tasks, tool use), with specific percentage gaps cited per FR-011 in `src/content/blog/local-ai-models-guide-2026.mdx`
- [x] T009 [US1] Write API pricing comparison table (8 open source models + 3 frontier models, input/output cost per million tokens, cost-per-task estimates for common workloads) per SC-003 in `src/content/blog/local-ai-models-guide-2026.mdx`

**Checkpoint**: US1 section complete — post contains ≥6 models × ≥4 benchmarks (SC-002), ≥2 comparison tables (partial SC-003), clear gap analysis (FR-011), pricing data (SC-002). Independently verifiable by reviewing rendered content.

---

## Phase 4: User Story 2 — Reader Optimizes Local Model Setup (Priority: P2)

**Goal**: Deliver actionable configuration guidance for running models locally — quantization by VRAM tier, sampling parameters for 3 use cases, Ollama/llama.cpp configs, and reasoning model recommendations (~35% of word count)

**Independent Test**: Post includes VRAM tier table (8/12/16/24/48 GB), sampling params table for code/general/creative, Ollama env var configuration block, reasoning model recommendations, and Apple Silicon notes

### Implementation for User Story 2

- [x] T010 [US2] Open section with 50-word AEO summary paragraph optimized for AI-assisted search extraction, write quantization guide section — explain Unsloth Dynamic 2.0 methodology (layer-aware quantization, calibration data, KL divergence advantages per FR-008), include VRAM tier recommendation table (8/12/16/24/48 GB with specific format recommendations Q4_K_M/Q5_K_M/Q6_K/Q8_0 per FR-004), Apple Silicon unified memory note, include a <8GB VRAM row recommending API alternatives (Groq, OpenRouter, Together AI) for underpowered hardware (EC3) in `src/content/blog/local-ai-models-guide-2026.mdx`
- [x] T011 [US2] Write sampling parameters section — temperature + min_p as 2026 consensus, comparison table for 3 use cases (code: temp 0.1-0.4/min_p 0.05-0.1, general: temp 0.7-1.0/min_p 0.05-0.1, creative: temp 0.8-1.2/min_p 0.02-0.05) with repetition penalty values per FR-005 in `src/content/blog/local-ai-models-guide-2026.mdx`
- [x] T012 [US2] Write Ollama and llama.cpp configuration section — OLLAMA_FLASH_ATTENTION, OLLAMA_KV_CACHE_TYPE, OLLAMA_NUM_PARALLEL, OLLAMA_MAX_LOADED_MODELS env vars, context length settings, Apple Silicon optimization, llama.cpp equivalent flags per FR-009 and SC-004 in `src/content/blog/local-ai-models-guide-2026.mdx`
- [x] T013 [US2] Write "Making Models Think More" section — reasoning model recommendations by VRAM tier (DeepSeek-R1-Distill variants, QwQ-32B), CoT prompting techniques, extended thinking token usage, when to use reasoning models vs standard models per FR-007 in `src/content/blog/local-ai-models-guide-2026.mdx`

**Checkpoint**: US2 section complete — post provides configs for ≥2 engines (SC-004), VRAM tier guidance (FR-004), sampling params for 3 use cases (FR-005), reasoning techniques (FR-007). Independently verifiable by checking parameter values and configuration blocks.

---

## Phase 5: User Story 3 — Reader Adds Search/RAG to Local Models (Priority: P3)

**Goal**: Deliver a summary-depth comparison of search/RAG tools with practical integration guidance — comparison table, SearXNG config gotcha, Perplexica stack overview (~15% of word count)

**Independent Test**: Post covers 3 search tools with pricing, SearXNG JSON format gotcha documented, "Local Perplexity" stack architecture described, links to existing posts for deeper coverage

### Implementation for User Story 3

- [x] T014 [US3] Open section with 50-word AEO summary paragraph optimized for AI-assisted search extraction, write search tool comparison table (Exa.ai vs SearXNG vs Brave Search API) covering: type, own index, self-hostable, free tier, cost/1K queries, latency, content extraction, privacy model, MCP server availability per FR-006 and SC-003 in `src/content/blog/local-ai-models-guide-2026.mdx`
- [x] T015 [US3] Write SearXNG setup section (JSON format config gotcha: `formats: [html, json]` in settings.yml) and "Local Perplexity" stack overview (Perplexica + SearXNG + Ollama architecture, fully self-hosted) with link to `lm-studio-local-ai-mac` for related setup guidance in `src/content/blog/local-ai-models-guide-2026.mdx`

**Checkpoint**: US3 section complete — ≥3 search tools covered (FR-006), comparison table present (completes SC-003 with ≥3 total tables), integration patterns documented. Summary depth — links out for exhaustive coverage.

---

## Phase 6: User Story 4 — Reader Understands New Benchmarks (Priority: P4)

**Goal**: Deliver benchmark literacy context — SWE-Bench Verified retirement, SWE-ReBench methodology, Multi-SWE-Bench findings, and how to evaluate model claims critically (~10% of word count)

**Independent Test**: Post explains SWE-ReBench methodology, SWE-Bench contamination story, Multi-SWE-Bench multi-language findings, and provides a framework for interpreting benchmark claims

### Implementation for User Story 4

- [x] T016 [US4] Open section with 50-word AEO summary paragraph optimized for AI-assisted search extraction, write benchmark literacy section — SWE-Bench Verified retirement (Feb 2026, 59.4% tasks flawed, contamination evidence per FR-003), SWE-ReBench methodology (decontaminated, 5 runs, standardized scaffolding, scores 25-50pp lower), Multi-SWE-Bench (7 languages, Python overweighting), Artificial Analysis AAII v4.0, and "how to read benchmark claims" framework in `src/content/blog/local-ai-models-guide-2026.mdx`

**Checkpoint**: US4 section complete — SWE-ReBench explained (FR-003), contamination story told, benchmark evaluation framework provided. Summary depth per SC-009 (<15% word count).

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Finalize the post with verdict, cross-links, attribution verification, and full build pipeline validation

- [x] T017 Write "My Picks / Verdict" section with explicit top picks: best overall local model, best for coding, best for reasoning, best quantization per VRAM tier, best search tool by use case — each pick backed by specific benchmark data, in blog's declarative "Winner:" format, include a 3-step framework for evaluating new models released after publication per EC5 in `src/content/blog/local-ai-models-guide-2026.mdx`
- [x] T018 Add cross-links to ≥2 existing posts throughout content body — link to `ai-models-compared-2026` (frontier model deep-dive), `lm-studio-local-ai-mac` (hardware/LM Studio setup), and optionally `ai-coding-tools-compared-2026` (tool-level comparison) per SC-007 in `src/content/blog/local-ai-models-guide-2026.mdx`
- [x] T019 Verify all benchmark data citations — every claim must attribute a named source (Artificial Analysis, Arena.ai, SWE-ReBench, official model releases), flag any self-reported vs independently verified distinction per SC-008 in `src/content/blog/local-ai-models-guide-2026.mdx`
- [x] T020 Run `bun run prebuild` to regenerate `content/blog/posts.json` with new post metadata
- [x] T021 [P] Run `bun run lint` (biome check) — zero errors
- [x] T022 [P] Run `bun run type-check` (astro check) — zero TypeScript errors
- [x] T023 [P] Run `bunx knip` — zero unused exports/dependencies
- [x] T024 Run `bun run build` — full pipeline passes (prebuild → validate-content → astro build)
- [x] T025 Verify final content metrics: word count 3,000-6,000 (SC-005), content depth distribution P1+P2 ≥ 70% and P3+P4 ≤ 30% (SC-009), ≥3 comparison tables (SC-003), ≥6 models × ≥4 benchmarks (SC-002), frontmatter schema valid (SC-006), verify strict H2→H3 heading hierarchy (no H4+, no skipped levels) per FR-019

**Checkpoint**: Post is production-ready — all quality gates pass, all success criteria verified, ready for `bun run preview` and deployment.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — research and scaffolding start immediately
- **Foundational (Phase 2)**: Depends on T003 (MDX file exists) — opening section needs the file
- **User Stories (Phases 3-6)**: All depend on Phase 2 (opening/structure established)
  - User stories MUST proceed sequentially (P1 → P2 → P3 → P4) since all target the same file
  - Content order in the file matches story priority order
- **Polish (Phase 7)**: Depends on all user story phases being complete

### User Story Dependencies

- **User Story 1 (P1)**: Depends on T001 (benchmark research), T003 (MDX skeleton), T004 (opening). No dependency on other stories.
- **User Story 2 (P2)**: Depends on T002 (optimization research), T003 (MDX skeleton). No dependency on US1 content but follows it in file order.
- **User Story 3 (P3)**: Depends on T002 (search tool research), T003 (MDX skeleton). Independent of US1/US2 content.
- **User Story 4 (P4)**: Depends on T001 (benchmark research), T003 (MDX skeleton). Independent of other stories.

### Within Each User Story

- 50-word AEO section opener before detailed content
- Tables before prose analysis (readers scan tables first)
- Data attribution inline with every claim
- "Winner" declarations at end of each category

### Parallel Opportunities

- **T001 and T002**: Research tasks can run in parallel (different data sources)
- **T021, T022, T023**: Build validation commands can run in parallel
- **All user story phases**: Write sequentially within the file, but research for each can be done in advance during Phase 1

---

## Parallel Example: Phase 1 Research

```bash
# Launch both research tasks together:
Task T001: "Web-research benchmark scores from Artificial Analysis, Arena.ai, SWE-ReBench"
Task T002: "Web-research pricing, quantization availability, Ollama config updates"
```

## Parallel Example: Phase 7 Build Validation

```bash
# Launch all validation commands together:
Task T021: "bun run lint"
Task T022: "bun run type-check"
Task T023: "bunx knip"
# Then sequentially:
Task T024: "bun run build" (depends on T020 prebuild completing first)
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (research + MDX skeleton)
2. Complete Phase 2: Foundational (opening hook)
3. Complete Phase 3: User Story 1 (model comparison — the core value)
4. **STOP and VALIDATE**: Run `bun run build`, verify tables render, check word count
5. Post is publishable as a focused model comparison article

### Incremental Delivery

1. Setup + Foundational → File skeleton with opening ready
2. Add User Story 1 (P1, ~40%) → Build + verify → Core comparison article (MVP)
3. Add User Story 2 (P2, ~35%) → Build + verify → Comprehensive guide (MVP + optimization)
4. Add User Story 3 (P3, ~15%) → Build + verify → Full practical guide
5. Add User Story 4 (P4, ~10%) → Build + verify → Complete post with benchmark literacy
6. Polish → Verdict, cross-links, final validation → Production-ready

### Single Writer Strategy (Expected)

This is a single-file content feature. One writer handles all phases sequentially:
1. Research (T001-T002) in parallel
2. Scaffold (T003) then opening (T004)
3. Write sections in priority order: US1 → US2 → US3 → US4
4. Polish: verdict, cross-links, attribution check
5. Build pipeline validation: prebuild → lint → type-check → knip → build
6. Final metrics verification

---

## Notes

- All content tasks target one file: `src/content/blog/local-ai-models-guide-2026.mdx`
- Auto-generated files (`content/blog/posts.json`, `dist/og/*.png`) are handled by the build pipeline
- No code changes, no new components, no schema changes, no new dependencies
- Blog tone reference: existing posts `ai-models-compared-2026.mdx` and `lm-studio-local-ai-mac.mdx`
- Slug: `local-ai-models-guide-2026` (matches `/^[a-z0-9-]+$/`)
- Commit after each completed phase or logical group of tasks
