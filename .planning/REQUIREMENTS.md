# Requirements: AI Models Compared 2026

**Defined:** 2026-02-25
**Core Value:** Help readers pick the right AI model for their specific task with honest, benchmark-backed, experience-informed comparisons

## v1 Requirements

### Structure

- [ ] **STRC-01**: Post opens with a bold hook that challenges "which AI model is best" thinking (~100 words)
- [ ] **STRC-02**: Quick comparison table appears within first 300 words (Model | Maker | Best For | Weakness | Verdict)
- [ ] **STRC-03**: Each of the 5 models has a brief introduction (~120 words each) covering maker, philosophy, standout capability
- [ ] **STRC-04**: Head-to-head "Coding & Software Engineering" category section with declared winner and benchmark citations (~300 words)
- [ ] **STRC-05**: Head-to-head "Reasoning & Complex Problem Solving" category section with declared winner (~300 words)
- [ ] **STRC-06**: Head-to-head "Agents & Tool Use" category section with declared winner (~300 words)
- [ ] **STRC-07**: Head-to-head "Creative Writing & Communication" category section with declared winner (~250 words)
- [ ] **STRC-08**: Head-to-head "Multimodal (Vision, Audio, Video)" category section with declared winner (~250 words)
- [ ] **STRC-09**: Dedicated Grok 4.20 multi-agent spotlight section covering 4-agent architecture (Grok/Harper/Benjamin/Lucas), X firehose data, practical use cases (~250 words)
- [ ] **STRC-10**: Benchmark scorecard table with SWE-bench Verified, ARC-AGI-2, GPQA Diamond, LMArena ELO, Terminal-Bench 2.0
- [ ] **STRC-11**: Segmented verdict section mapping each model to specific use cases (~300 words)
- [ ] **STRC-12**: Total word count targets ~3000 words

### Content Quality

- [ ] **QUAL-01**: Every head-to-head section includes at least one first-person experience observation (E-E-A-T requirement)
- [ ] **QUAL-02**: Anti-features / hype-check section calling out overhyped capabilities that don't deliver in practice
- [ ] **QUAL-03**: Benchmark gaming caveat citing the "Leaderboard Illusion" paper (Singh et al.) and Goodhart's Law
- [ ] **QUAL-04**: Cross-reference link to existing `ai-coding-tools-compared-2026` post with explicit scope differentiation
- [ ] **QUAL-05**: Pricing context alongside capability claims for each model (brief, not deep-dive)
- [ ] **QUAL-06**: Honest criticism of at least one personally-preferred model (credibility signal)
- [ ] **QUAL-07**: Grok 4.20 data explicitly flagged as beta/unverified where official benchmarks are missing
- [ ] **QUAL-08**: All benchmark citations include source URL, date, and methodology caveat
- [ ] **QUAL-09**: Temporal qualifiers and version numbers throughout ("as of Feb 2026", model version numbers)

### SEO & Frontmatter

- [ ] **SEO-01**: Complete frontmatter with title, date, excerpt, tags, published, tldr, keyTakeaways (5+), faq (4-5 questions)
- [ ] **SEO-02**: H2 headings target distinct search intents (category-specific long-tail queries)
- [ ] **SEO-03**: Primary keyword appears in first 100 words and H1 title
- [ ] **SEO-04**: FAQ questions match real search queries about AI model comparison
- [ ] **SEO-05**: Slug follows URL-safe format: `ai-models-compared-2026`

### Build Pipeline

- [ ] **BILD-01**: MDX file at `src/content/blog/ai-models-compared-2026.mdx` with valid Zod schema frontmatter
- [ ] **BILD-02**: `bun run prebuild` passes (posts.json regenerated, content validated)
- [ ] **BILD-03**: `bun run build` completes without errors
- [ ] **BILD-04**: OG image generated for the post

## v2 Requirements

### Interactive Features

- **INTV-01**: Interactive comparison widget with filtering by use case (requires React component)
- **INTV-02**: Head-to-head prompt shootout with actual model outputs side-by-side

### Expanded Coverage

- **EXPD-01**: Open-source model comparison section (DeepSeek, Llama, Mistral)
- **EXPD-02**: Date-based update when Grok 4.20 exits beta with official benchmarks (~March 2026)

## Out of Scope

| Feature | Reason |
|---------|--------|
| New site components or React islands | Existing blog infrastructure handles everything — markdown tables, prose styling, FAQ schema |
| Deep pricing/API comparison | This is a capabilities/use-case post, not a cost optimization guide |
| Historical model evolution timeline | Focus on current state, not lineage — keeps the post focused and reduces decay risk |
| Video or interactive embeds | Static MDX only — keeps build simple, fast, and cacheable |
| Open-source model inclusion | Different audience and evaluation criteria — separate post |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| STRC-01 | Phase 3 | Pending |
| STRC-02 | Phase 3 | Pending |
| STRC-03 | Phase 3 | Pending |
| STRC-04 | Phase 2 | Pending |
| STRC-05 | Phase 2 | Pending |
| STRC-06 | Phase 2 | Pending |
| STRC-07 | Phase 2 | Pending |
| STRC-08 | Phase 2 | Pending |
| STRC-09 | Phase 2 | Pending |
| STRC-10 | Phase 2 | Pending |
| STRC-11 | Phase 3 | Pending |
| STRC-12 | Phase 3 | Pending |
| QUAL-01 | Phase 2 | Pending |
| QUAL-02 | Phase 2 | Pending |
| QUAL-03 | Phase 2 | Pending |
| QUAL-04 | Phase 3 | Pending |
| QUAL-05 | Phase 2 | Pending |
| QUAL-06 | Phase 2 | Pending |
| QUAL-07 | Phase 2 | Pending |
| QUAL-08 | Phase 2 | Pending |
| QUAL-09 | Phase 2 | Pending |
| SEO-01 | Phase 1 | Pending |
| SEO-02 | Phase 1 | Pending |
| SEO-03 | Phase 1 | Pending |
| SEO-04 | Phase 1 | Pending |
| SEO-05 | Phase 1 | Pending |
| BILD-01 | Phase 1 | Pending |
| BILD-02 | Phase 4 | Pending |
| BILD-03 | Phase 4 | Pending |
| BILD-04 | Phase 4 | Pending |

**Coverage:**
- v1 requirements: 30 total
- Mapped to phases: 30
- Unmapped: 0

---
*Requirements defined: 2026-02-25*
*Last updated: 2026-02-25 after roadmap creation*
