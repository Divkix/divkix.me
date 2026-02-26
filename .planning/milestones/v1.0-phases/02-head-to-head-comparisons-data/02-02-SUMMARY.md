---
phase: 02-head-to-head-comparisons-data
plan: 02
subsystem: content
tags: [mdx, benchmarks, scorecard, anti-hype, leaderboard-illusion, goodhart, self-criticism]

# Dependency graph
requires:
  - phase: 02-head-to-head-comparisons-data
    plan: 01
    provides: "Five head-to-head comparison sections and Grok spotlight filling Phase 2 content stubs"
provides:
  - "Benchmark scorecard table with 5 benchmarks x 5 models, footnotes, and methodology caveat"
  - "Anti-hype section with Leaderboard Illusion citation, overhyped capability call-outs, and honest Claude self-criticism"
affects: [03-framing-editorial, 04-qa-validation]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Escaped asterisks for MDX footnotes: \\* format to prevent markdown italic interpretation"
    - "Claim-vs-reality pattern for overhyped capabilities: bold The claim / bold The reality"

key-files:
  created: []
  modified:
    - src/content/blog/ai-models-compared-2026.mdx

key-decisions:
  - "Used escaped asterisks (\\*) for footnotes to avoid MDX rendering as italic/bold markers"
  - "Selected 2 of 4 overhyped capability call-outs (agents, benchmark mastery) to stay within 350-word budget"
  - "Included 4 specific Claude weakness points: SWE-bench regression, MCP Atlas drop, creative writing, pricing"

patterns-established:
  - "Footnote format: escaped asterisks with inline explanations below table"
  - "Self-criticism pattern: 'Full disclosure: [model] is my daily driver. That said...' for credibility"

requirements-completed: [STRC-10, QUAL-02, QUAL-03, QUAL-06]

# Metrics
duration: 2min
completed: 2026-02-26
---

# Phase 2 Plan 2: Benchmark Scorecard & Anti-Hype Summary

**Benchmark scorecard table (5 benchmarks x 5 models with footnotes and methodology caveat) and anti-hype section citing The Leaderboard Illusion paper with Goodhart's Law, overhyped capability call-outs, and honest Claude Opus 4.6 self-criticism**

## Performance

- **Duration:** 2 min
- **Started:** 2026-02-26T14:31:24Z
- **Completed:** 2026-02-26T14:33:23Z
- **Tasks:** 2
- **Files modified:** 1

## Accomplishments
- Wrote benchmark scorecard table with all 5 required benchmarks (SWE-bench, ARC-AGI-2, GPQA Diamond, LMArena ELO, Terminal-Bench 2.0) across all 5 models, with bold leaders per row, 6 footnotes, and a methodology caveat blockquote
- Wrote anti-hype section (330 words) covering benchmark gaming with The Leaderboard Illusion paper citation, Goodhart's Law, 2 overhyped capability call-outs, and 4 specific Claude self-criticism points
- All Phase 2 stub comments now replaced with content -- only Phase 3 stubs remain (Hook, Comparison Table, Meet the Contenders, Verdict)

## Task Commits

Each task was committed atomically:

1. **Task 1: Write benchmark scorecard table (STRC-10)** - `5045a68` (feat)
2. **Task 2: Write anti-hype/benchmark-gaming section (QUAL-02, QUAL-03, QUAL-06)** - `11f52a3` (feat)

## Files Created/Modified
- `src/content/blog/ai-models-compared-2026.mdx` - Replaced 2 Phase 2 stub comments with benchmark scorecard table and anti-hype section

## Decisions Made
- Used escaped asterisks for footnotes to avoid MDX italic/bold rendering conflicts
- Selected 2 of 4 possible overhyped capability call-outs (autonomous agents, benchmark mastery) to stay within 350-word budget -- dropped "reasoning equals intelligence" and "benchmarks get gamed" as the latter is already covered by the Leaderboard Illusion citation
- Included 4 Claude self-criticism points (SWE-bench regression, MCP Atlas regression, creative writing weaker, most expensive API) exceeding the minimum 2 required

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- All Phase 2 content complete: 5 head-to-head sections (02-01), Grok spotlight (02-01), benchmark scorecard (02-02), anti-hype section (02-02)
- Phase 3 stubs remain: Hook (STRC-01), Comparison Table (STRC-02), Meet the Contenders (STRC-03), Verdict (STRC-11)
- Frontmatter errors flagged in 02-RESEARCH.md (10M context window, LiveCodeBench format) still need Phase 3/4 correction

## Self-Check: PASSED

- FOUND: src/content/blog/ai-models-compared-2026.mdx
- FOUND: 02-02-SUMMARY.md
- FOUND: 5045a68 (Task 1 commit)
- FOUND: 11f52a3 (Task 2 commit)

---
*Phase: 02-head-to-head-comparisons-data*
*Completed: 2026-02-26*
