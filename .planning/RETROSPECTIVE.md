# Project Retrospective

*A living document updated after each milestone. Lessons feed forward into future planning.*

## Milestone: v1.0 — AI Models Compared 2026

**Shipped:** 2026-02-26
**Phases:** 5 | **Plans:** 6 | **Tasks:** 13

### What Was Built
- 3134-word MDX blog post comparing 5 flagship AI models across 5 use-case categories
- Benchmark scorecard with 5 benchmarks x 5 models, footnotes, and methodology caveats
- Grok 4.20 multi-agent spotlight with beta-qualified claims
- Anti-hype section with Leaderboard Illusion citation and honest Claude self-criticism
- Draft-aware content validation in build pipeline

### What Worked
- Linear phase dependencies (skeleton → comparisons → framing → validation) eliminated rework
- Writing comparisons before intros/verdict meant framing sections could reference real findings
- Yolo mode with automated verification caught integration gaps without manual gating overhead
- Milestone audit identified 3 real integration issues (dateModified, trailing slash, token counts) that Phase 5 fixed cleanly
- Consistent 1-3 min per plan — fast execution with no blockers

### What Was Inefficient
- 10M→1M token error in frontmatter persisted from Phase 1 through Phase 4 — caught only by milestone audit
- Phase 4 was originally planned as TBD with no plan details — had to be planned on the fly
- Model intro word counts (72-73 words vs 120 target) were accepted without revision — spec was overspecified for budget

### Patterns Established
- Head-to-head section pattern: Winner → benchmark evidence → first-person observation → runner-up → pricing → temporal qualifier
- Benchmark citation format: [Name](url) with (self-reported/verified, date) qualifier
- Self-criticism pattern: "Full disclosure: [model] is my daily driver. That said..."
- Publish workflow: flip published flag → prebuild → build → verify output
- Footnote format: escaped asterisks for MDX table compatibility

### Key Lessons
1. Frontmatter errors propagate silently — validate semantic accuracy (not just schema) at content creation time
2. Milestone audit is worth running even when all requirements pass — it catches cross-phase integration issues that per-phase verification misses
3. Word count targets in requirements should be ranges, not point estimates — 72 words vs 120 words was functionally fine
4. Build validation phases need concrete plans upfront, not TBD — even if the plan is "flip a flag and run the pipeline"

### Cost Observations
- Model mix: 100% opus (quality profile)
- Sessions: ~5 sessions across 2 days
- Notable: Average 2.2 min per plan — content writing at AI speed with human-level editorial judgment

---

## Cross-Milestone Trends

### Process Evolution

| Milestone | Sessions | Phases | Key Change |
|-----------|----------|--------|------------|
| v1.0 | ~5 | 5 | Established GSD workflow for content creation milestones |

### Cumulative Quality

| Milestone | Requirements | Coverage | Audit Score |
|-----------|-------------|----------|-------------|
| v1.0 | 30/30 | 100% | 28/30 integration (30/30 after Phase 5) |

### Top Lessons (Verified Across Milestones)

1. Milestone audits catch integration gaps that per-phase verification misses — run them before shipping
