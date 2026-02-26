---
phase: 02-head-to-head-comparisons-data
verified: 2026-02-26T15:00:00Z
status: passed
score: 13/13 must-haves verified
re_verification: false
gaps: []
human_verification:
  - test: "Read each of the five head-to-head sections end-to-end in a browser"
    expected: "Prose flows naturally, winner declarations are visually distinct (bold), benchmark table renders correctly with linked benchmark names and bold leaders per row, footnotes render as plain text (not as markdown italics/bold due to escaped asterisks)"
    why_human: "MDX rendering of escaped asterisks in footnotes and markdown table formatting cannot be verified programmatically without building the site"
  - test: "Click all inline markdown links in the body (SWE-bench, ARC-AGI-2, GPQA Diamond, LMArena, Terminal-Bench, Leaderboard Illusion paper, Grok agent sources)"
    expected: "All links resolve to valid, live pages — not 404s"
    why_human: "URL validity cannot be confirmed without live HTTP requests; source URLs may have changed since research"
  - test: "Verify the frontmatter 10M token error does not surface in visible rendered output"
    expected: "keyTakeaways[2] references '10M token window' and FAQ answer[2] references '10M token context' — these appear in the rendered blog post metadata sections; confirm this does not visibly contradict the correct 1M figure in the body"
    why_human: "Whether keyTakeaways and FAQ entries are rendered visibly on the page depends on the blog template and structured data rendering — cannot verify without browser inspection"
---

# Phase 2: Head-to-Head Comparisons & Data Verification Report

**Phase Goal:** Readers can compare all five models across five use-case categories with benchmark evidence and honest personal experience
**Verified:** 2026-02-26T15:00:00Z
**Status:** PASSED
**Re-verification:** No — initial verification

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | Reader can compare all five models on coding with a declared winner, benchmark evidence, and first-person observation | VERIFIED | Line 55: `**Winner: Claude Opus 4.6**` with SWE-bench 80.8% citation; line 59: "In my experience building and refactoring TypeScript codebases..." |
| 2 | Reader can compare all five models on reasoning with a declared winner, benchmark evidence, and first-person observation | VERIFIED | Line 67: `**Winner: Gemini 3.1 Pro**` with ARC-AGI-2 77.1% and GPQA 94.3% citations; line 71: "After three months of throwing complex multi-step problems..." |
| 3 | Reader can compare all five models on agents/tool use with a declared winner, benchmark evidence, and first-person observation | VERIFIED | Line 79: `**Winner: Claude Opus 4.6**` with OSWorld 72.7% citation; line 83: "In my testing with agentic coding workflows..." |
| 4 | Reader can compare all five models on creative writing with a declared winner and first-person observation | VERIFIED | Line 91: `**Winner: Claude Opus 4.6**` with qualitative rationale; line 95: "In my experience drafting technical blog posts..." |
| 5 | Reader can compare all five models on multimodal with a declared winner, benchmark evidence, and first-person observation | VERIFIED | Line 103: `**Winner: Gemini 3.1 Pro**`; LMArena Vision citation; line 107: "In my testing, I fed Gemini 3.1 Pro a 45-minute recorded meeting..." |
| 6 | Reader understands Grok 4.20 multi-agent architecture, its four agents, X firehose data, and that it is beta/unverified | VERIFIED | Lines 115-123: All four agents named with roles (Captain Grok, Harper, Benjamin, Lucas), X Firehose ~68M posts/day, "treat every performance claim as estimated and unverified" |
| 7 | Every benchmark citation in the body has a source URL, date, and methodology caveat | VERIFIED | Inline markdown links on lines 57, 61, 69, 73, 81, 105, 131-135; methodology blockquote on line 146 with "All data as of February 2026" |
| 8 | Pricing context appears in each head-to-head section | VERIFIED | Lines 63, 75, 87, 99, 111 — each section closes with explicit $/MTok pricing comparison |
| 9 | Temporal qualifiers and model version numbers appear throughout | VERIFIED | "as of February 2026" appears 6+ times; version numbers (Claude Opus 4.6, GPT 5.2, Gemini 3.1 Pro, Grok 4.20, Codex 5.3 xHigh) used consistently |
| 10 | Reader can see a benchmark scorecard table comparing all five models across five benchmarks with source links and footnotes | VERIFIED | Lines 129-142: 5x5 table with linked benchmark names, bold leaders per row, 6 footnotes |
| 11 | Reader encounters an anti-hype section that challenges benchmark worship and calls out overhyped capabilities | VERIFIED | Lines 148-160: Two claim-vs-reality call-outs (autonomous agents, benchmark mastery), Goodhart's Law, balanced closing |
| 12 | Reader sees the Leaderboard Illusion paper cited with specific findings about benchmark gaming | VERIFIED | Lines 146 and 150: `["The Leaderboard Illusion"](https://arxiv.org/abs/2504.20879)` with Meta 27 variants, Google/OpenAI 20% arena share, 112% score inflation specifics |
| 13 | Reader finds honest criticism of Claude as a credibility signal | VERIFIED | Line 158: SWE-bench regression (80.9% to 80.8%), MCP Atlas drop (62.3% to 59.5%), creative writing weaker than Opus 4.5, most expensive API at $5/$25 per MTok |

**Score:** 13/13 truths verified

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `src/content/blog/ai-models-compared-2026.mdx` | Six content sections replacing stub comments (5 head-to-head + Grok spotlight + scorecard + anti-hype) | VERIFIED | File exists, 2689 words total. Zero Phase 2 stub comments remain. Only four Phase 3 stubs remain: Hook (STRC-01), Comparison Table (STRC-02), Meet the Contenders (STRC-03), Verdict (STRC-11). Contains "Winner:" (5 occurrences), "Leaderboard Illusion" (3 occurrences). |

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `## Coding & Software Engineering` | SWE-bench Verified | Inline markdown link citation | WIRED | Line 57: `[80.8% on SWE-bench Verified](https://www.anthropic.com/news/claude-opus-4-6)` |
| `## The Grok 4.20 Spotlight` | beta/unverified qualifier | Explicit caveat text | WIRED | Lines 115, 119, 123: "launched in beta", "figure is unverified", "treat every performance claim as estimated and unverified" |
| `## Benchmark Scorecard` | SWE-bench, ARC-AGI-2, GPQA Diamond, LMArena, Terminal-Bench | Markdown table with linked benchmark names | WIRED | Lines 131-135: All 5 benchmarks appear as linked table rows in correct format |
| `## The Anti-Hype Check` | arXiv:2504.20879 | Inline citation link | WIRED | Line 150: `["The Leaderboard Illusion"](https://arxiv.org/abs/2504.20879)` |
| Creative Writing section | Claude Opus 4.6 creative regression from Opus 4.5 | First-person acknowledgment | WIRED | Line 93: "Opus 4.6 is actually slightly weaker at creative writing than its predecessor Opus 4.5" |

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|------------|-------------|--------|----------|
| STRC-04 | 02-01 | Coding head-to-head with winner and benchmark citations | SATISFIED | Lines 53-63: Full coding section, winner declared, SWE-bench + Terminal-Bench citations, runner-up, pricing |
| STRC-05 | 02-01 | Reasoning head-to-head with winner | SATISFIED | Lines 65-75: Full reasoning section, winner declared, ARC-AGI-2 + GPQA Diamond citations |
| STRC-06 | 02-01 | Agents & tool use head-to-head with winner | SATISFIED | Lines 77-87: Full agents section, winner declared, OSWorld + Terminal-Bench citations |
| STRC-07 | 02-01 | Creative writing head-to-head with winner | SATISFIED | Lines 89-99: Full creative writing section, winner declared, qualitative rationale |
| STRC-08 | 02-01 | Multimodal head-to-head with winner | SATISFIED | Lines 101-111: Full multimodal section, winner declared, native modality comparison |
| STRC-09 | 02-01 | Grok 4.20 spotlight with 4-agent architecture | SATISFIED | Lines 113-123: All four agents named and described, X Firehose data, access/pricing, beta qualifiers |
| STRC-10 | 02-02 | Benchmark scorecard table | SATISFIED | Lines 125-146: 5x5 table with links, bold leaders, 6 footnotes, methodology caveat blockquote |
| QUAL-01 | 02-01 | First-person observation in every head-to-head section | SATISFIED | Lines 59, 71, 83, 95, 107 — one first-person paragraph per section |
| QUAL-02 | 02-02 | Anti-hype section with overhyped capability call-outs | SATISFIED | Lines 152-156: Two claim-vs-reality entries (autonomous agents, benchmark mastery) |
| QUAL-03 | 02-02 | Benchmark gaming caveat with Leaderboard Illusion paper | SATISFIED | Lines 146, 150: Paper cited twice with arXiv URL, specific findings, Goodhart's Law |
| QUAL-05 | 02-01 | Pricing context alongside capability claims | SATISFIED | Lines 63, 75, 87, 99, 111 — pricing in every head-to-head section |
| QUAL-06 | 02-02 | Honest criticism of personally-preferred model | SATISFIED | Line 158: 4 specific Claude weaknesses (SWE regression, MCP Atlas drop, creative writing, cost) |
| QUAL-07 | 02-01 | Grok 4.20 data flagged as beta/unverified | SATISFIED | 9 occurrences of "beta", "unverified", "estimated", "projected", or "xAI claims" |
| QUAL-08 | 02-01 | Benchmark citations with source URL, date, methodology caveat | SATISFIED | All benchmarks linked; methodology caveat blockquote on line 146 with date |
| QUAL-09 | 02-01 | Temporal qualifiers and version numbers throughout | SATISFIED | "as of February 2026" on lines 55, 67, 79, 99, 109, 146; full version numbers used consistently |

**Orphaned requirements check:** REQUIREMENTS.md maps STRC-04 through STRC-10 and QUAL-01 through QUAL-09 to Phase 2. All 15 requirement IDs declared across the two plans are accounted for. No orphaned Phase 2 requirements.

**Requirements outside Phase 2 scope (correctly deferred):** STRC-01, STRC-02, STRC-03, STRC-11, STRC-12, QUAL-04 are mapped to Phase 3. BILD-02, BILD-03, BILD-04 mapped to Phase 4. All deferred correctly — stubs for Phase 3 sections exist in the file.

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| `src/content/blog/ai-models-compared-2026.mdx` | 23 | `keyTakeaways[2]` says "10M token window" for Gemini — contradicts "1M token context window" in body (line 103, 105) | Warning | Frontmatter error from Phase 1 acknowledged in SUMMARY. Body content is correct. Correction deferred to Phase 3/4. Does not block Phase 2 goal. |
| `src/content/blog/ai-models-compared-2026.mdx` | 32 | FAQ answer says "Gemini 3.1 Pro's 10M token context" — same error | Warning | Same root cause as above. Frontmatter only, body is correct. |

**Note:** No Phase 2 content sections contain stub comments, empty implementations, or placeholder patterns. The 10M token error exists only in frontmatter fields (keyTakeaways, faq) which were pre-existing Phase 1 artifacts. The commit history (9a98484, 79f198e, 5045a68, 11f52a3) confirms all four Phase 2 tasks were executed and committed.

### Human Verification Required

**1. MDX Rendering of Footnotes**

**Test:** Build the site (`bun run build`) and view the benchmark scorecard section in a browser
**Expected:** Footnote lines using escaped asterisks (`\*`, `\*\*`, etc.) render as literal asterisk characters, not as markdown bold/italic markers. Table with 5x5 grid renders correctly on mobile and desktop.
**Why human:** MDX rendering behavior for escaped special characters inside JSX comment contexts cannot be verified without building the Astro static output

**2. External Link Validity**

**Test:** Click all 12+ inline links in the body (SWE-bench, ARC-AGI-2, GPQA Diamond, LMArena, Terminal-Bench, Gemini model card, Anthropic news, OSWorld, arXiv paper, Grok agent sources x2)
**Expected:** All URLs resolve to valid pages — no 404s, redirects to homepages, or dead links
**Why human:** Link validity requires live HTTP requests. Research was conducted for this post and URLs were valid at time of writing (Feb 2026), but cannot be confirmed without browser access

**3. Frontmatter 10M Error Surfacing**

**Test:** View the rendered blog post and check whether keyTakeaways or FAQ sections are displayed visibly on the page (e.g., in a sidebar, callout box, or structured data)
**Expected:** If keyTakeaways are rendered visibly, the "10M token" figure should be noted as incorrect and flagged for Phase 3 fix. If they are only in structured data (JSON-LD), no visible inconsistency exists.
**Why human:** Need to inspect the blog post template to determine which frontmatter fields are rendered versus only used for schema.org structured data

### Gaps Summary

No gaps found. All 13 must-have truths verified, all 15 Phase 2 requirements satisfied, all key links wired, all four commits confirmed in git history.

One known-deferred issue exists: the 10M token context window error in frontmatter (keyTakeaways and FAQ fields). This was identified by Phase 2 execution agents, documented in both SUMMARY files, and explicitly deferred to Phase 3/4. The body content correctly uses 1M tokens throughout. This is a warning, not a blocker for Phase 2's goal.

---

_Verified: 2026-02-26T15:00:00Z_
_Verifier: Claude (gsd-verifier)_
