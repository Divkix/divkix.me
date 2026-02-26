# Roadmap: AI Models Compared 2026

## Overview

This project delivers a ~3000-word MDX blog post comparing five flagship AI models (Claude Opus 4.6, GPT 5.2 Thinking, Codex 5.3 xHigh, Gemini 3.1 Pro, Grok 4.20) as a use-case guide. The work progresses from a valid MDX skeleton with SEO frontmatter, through the core comparison content (the hardest and highest-value writing), then the framing sections (hook, intros, verdict), and finally a quality audit with full build validation. No new site infrastructure is needed — the existing Astro MDX pipeline handles everything.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Skeleton & SEO Foundation** - Valid MDX file with complete frontmatter, section heading stubs, schema validation passing
- [ ] **Phase 2: Head-to-Head Comparisons & Data** - Five category comparison sections, Grok spotlight, benchmark scorecard, quality signals
- [ ] **Phase 3: Opening, Introductions & Verdict** - Hook, quick comparison table, model intros, verdict, cross-reference, word count
- [ ] **Phase 4: Quality Audit & Build Validation** - Full build pipeline passes, OG image generated, content quality verified end-to-end

## Phase Details

### Phase 1: Skeleton & SEO Foundation
**Goal**: A valid, schema-conforming MDX file exists with complete SEO frontmatter and stub headings for all sections
**Depends on**: Nothing (first phase)
**Requirements**: SEO-01, SEO-02, SEO-03, SEO-04, SEO-05, BILD-01
**Success Criteria** (what must be TRUE):
  1. MDX file exists at `src/content/blog/ai-models-compared-2026.mdx` with frontmatter that passes Zod schema validation
  2. Frontmatter contains complete tldr, keyTakeaways (5+), faq (4-5 questions matching real search queries), tags, excerpt, and date fields
  3. H2 headings are present for all planned sections and target distinct search intents
  4. Primary keyword "AI models compared 2026" appears in the title and first heading stub
  5. Slug is `ai-models-compared-2026` (URL-safe format confirmed)
**Plans**: 1 plan

Plans:
- [ ] 01-01-PLAN.md — Fix validate-content.ts for draft support + create MDX skeleton with complete SEO frontmatter and 11 H2 stub headings

### Phase 2: Head-to-Head Comparisons & Data
**Goal**: Readers can compare all five models across five use-case categories with benchmark evidence and honest personal experience
**Depends on**: Phase 1
**Requirements**: STRC-04, STRC-05, STRC-06, STRC-07, STRC-08, STRC-09, STRC-10, QUAL-01, QUAL-02, QUAL-03, QUAL-05, QUAL-06, QUAL-07, QUAL-08, QUAL-09
**Success Criteria** (what must be TRUE):
  1. Five head-to-head category sections exist (Coding, Reasoning, Agents, Creative Writing, Multimodal) each declaring a winner with benchmark citations and at least one first-person experience observation
  2. Grok 4.20 multi-agent spotlight section covers the 4-agent architecture, X firehose data, and practical use cases with beta/unverified data explicitly flagged
  3. Benchmark scorecard table includes SWE-bench Verified, ARC-AGI-2, GPQA Diamond, LMArena ELO, and Terminal-Bench 2.0 with source URLs and methodology caveats
  4. Anti-features/hype-check section exists calling out overhyped capabilities, benchmark gaming caveat cites "Leaderboard Illusion" paper, and honest criticism of at least one preferred model is present
  5. All benchmark citations include source URL, date, and methodology caveat; temporal qualifiers and version numbers used throughout
**Plans**: TBD

Plans:
- [ ] 02-01: TBD
- [ ] 02-02: TBD

### Phase 3: Opening, Introductions & Verdict
**Goal**: The post reads as a complete, coherent article from hook to verdict with proper framing around the comparison content
**Depends on**: Phase 2
**Requirements**: STRC-01, STRC-02, STRC-03, STRC-11, STRC-12, QUAL-04
**Success Criteria** (what must be TRUE):
  1. Post opens with a bold hook (~100 words) that challenges "which AI is best" thinking and includes the primary keyword in the first 100 words
  2. Quick comparison table (Model | Maker | Best For | Weakness | Verdict) appears within the first 300 words
  3. Each of the five models has a brief introduction (~120 words) covering maker, philosophy, and standout capability
  4. Verdict section maps each model to specific use cases with segmented recommendations (~300 words) and cross-reference link to `ai-coding-tools-compared-2026` post is present
  5. Total word count is approximately 3000 words
**Plans**: TBD

Plans:
- [ ] 03-01: TBD

### Phase 4: Quality Audit & Build Validation
**Goal**: The post passes all automated build gates and a manual quality checklist, ready for publication
**Depends on**: Phase 3
**Requirements**: BILD-02, BILD-03, BILD-04
**Success Criteria** (what must be TRUE):
  1. `bun run prebuild` passes cleanly (posts.json regenerated, content validation confirms MDX/JSON sync)
  2. `bun run build` completes without errors (full Astro static build)
  3. OG image is generated for the post at the expected path
**Plans**: TBD

Plans:
- [ ] 04-01: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Skeleton & SEO Foundation | 0/1 | Not started | - |
| 2. Head-to-Head Comparisons & Data | 0/2 | Not started | - |
| 3. Opening, Introductions & Verdict | 0/1 | Not started | - |
| 4. Quality Audit & Build Validation | 0/1 | Not started | - |
