---
phase: 02-head-to-head-comparisons-data
plan: 01
subsystem: content
tags: [mdx, ai-benchmarks, comparison, swe-bench, arc-agi, gpqa, terminal-bench, grok]

# Dependency graph
requires:
  - phase: 01-skeleton-seo-foundation
    provides: "MDX blog post skeleton with 12 H2 stub headings"
provides:
  - "Five head-to-head comparison sections with winner declarations, benchmark evidence, first-person observations, pricing context, and temporal qualifiers"
  - "Grok 4.20 multi-agent spotlight section with 4-agent architecture, X firehose data, and beta-qualified claims"
affects: [02-02-scorecard-antihype, 03-framing-editorial, 04-qa-validation]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Head-to-head section pattern: Winner declaration -> benchmark evidence with URLs -> first-person observation -> runner-up -> pricing -> temporal qualifier"
    - "Grok 4.20 caveat pattern: every performance claim qualified as beta/unverified/estimated"

key-files:
  created: []
  modified:
    - src/content/blog/ai-models-compared-2026.mdx

key-decisions:
  - "Used 1M token context window for Gemini 3.1 Pro in body content, not 10M from frontmatter error"
  - "Reported Terminal-Bench scores with scaffold context (model-only vs model+scaffold) to avoid misleading claims"
  - "Grok 4 predecessor scores cited with explicit (predecessor, not Grok 4.20) qualifier rather than omitting data"
  - "Opus 4.6 creative writing regression from 4.5 acknowledged as honest criticism per QUAL-06"

patterns-established:
  - "Benchmark citation format: [Benchmark Name](url) with (self-reported/verified, date) qualifier"
  - "First-person observation slot in every comparison section for E-E-A-T authenticity"
  - "Pricing comparison format: $input/$output per million tokens inline"

requirements-completed: [STRC-04, STRC-05, STRC-06, STRC-07, STRC-08, STRC-09, QUAL-01, QUAL-05, QUAL-07, QUAL-08, QUAL-09]

# Metrics
duration: 3min
completed: 2026-02-26
---

# Phase 2 Plan 1: Head-to-Head Comparisons & Grok Spotlight Summary

**Five head-to-head comparison sections (Coding, Reasoning, Agents, Creative Writing, Multimodal) with benchmark-backed winner declarations and a Grok 4.20 multi-agent spotlight -- 1530 words of sourced comparison content replacing stub comments**

## Performance

- **Duration:** 3 min
- **Started:** 2026-02-26T14:25:41Z
- **Completed:** 2026-02-26T14:28:43Z
- **Tasks:** 2
- **Files modified:** 1

## Accomplishments
- Wrote five head-to-head comparison sections each following the prescribed pattern: winner declaration, benchmark evidence with inline source URLs, first-person observation, runner-up acknowledgment, pricing context, and temporal qualifiers
- Wrote Grok 4.20 spotlight covering all four agents (Captain Grok, Harper, Benjamin, Lucas), X Firehose data, internal debate mechanism, access/pricing, with every claim flagged as beta/unverified
- Maintained factual accuracy: used 1M token context for Gemini (not 10M from frontmatter), distinguished model-only vs model+scaffold scores on Terminal-Bench, flagged all Grok 4.20 data as beta

## Task Commits

Each task was committed atomically:

1. **Task 1: Write five head-to-head comparison sections (STRC-04 through STRC-08)** - `9a98484` (feat)
2. **Task 2: Write Grok 4.20 multi-agent spotlight section (STRC-09)** - `79f198e` (feat)

## Files Created/Modified
- `src/content/blog/ai-models-compared-2026.mdx` - Replaced 6 stub comments with full comparison content (5 head-to-head + 1 Grok spotlight)

## Decisions Made
- Used correct 1M token context window for Gemini 3.1 Pro throughout body content, despite frontmatter keyTakeaways containing the 10M error (frontmatter correction is Phase 3/4 scope)
- Reported Terminal-Bench scores with scaffold attribution to avoid conflating model capability with agent framework capability
- Cited Grok 4 predecessor scores where hard numbers were needed but always with explicit "(predecessor, not Grok 4.20)" qualifier
- Acknowledged Claude Opus 4.6 creative writing regression from 4.5 per QUAL-06 honesty requirement
- Word budget came in at 1530 total (under the 1700-1800 target but within acceptable range, leaving more room for Phase 3 content)

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- Six content sections filled (5 head-to-head + Grok spotlight), 3 Phase 2 stubs remain: Benchmark Scorecard (STRC-10), Anti-Hype Check (QUAL-02, QUAL-03)
- These are covered by 02-02-PLAN.md (scorecard table + anti-hype section)
- Phase 3 stubs (Hook, Comparison Table, Meet the Contenders, Verdict) remain untouched as expected
- Frontmatter errors (10M context, LiveCodeBench format) flagged for Phase 3/4 correction

## Self-Check: PASSED

- FOUND: src/content/blog/ai-models-compared-2026.mdx
- FOUND: 02-01-SUMMARY.md
- FOUND: 9a98484 (Task 1 commit)
- FOUND: 79f198e (Task 2 commit)

---
*Phase: 02-head-to-head-comparisons-data*
*Completed: 2026-02-26*
