# Phase 3: Opening, Introductions & Verdict - Research

**Researched:** 2026-02-26
**Domain:** Content writing / MDX blog post structure — hooks, model introductions, verdict framing
**Confidence:** HIGH (this is content-authoring, not library integration; all source material is in the existing MDX file)

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| STRC-01 | Post opens with a bold hook (~100 words) challenging "which AI is best" thinking; primary keyword in first 100 words | Hook stub exists at lines 39-47 of the MDX. Primary keyword "AI models compared 2026" is at line 39 (the very first line after frontmatter). Hook must follow the line 39 opening sentence and fill the `{/* Hook section */}` comment. ~100 words = 4-6 sentences of punchy prose. |
| STRC-02 | Quick comparison table (Model \| Maker \| Best For \| Weakness \| Verdict) within first 300 words | Table stub at lines 45-47 of the MDX. Must appear under "Quick Comparison: AI Models at a Glance" H2 — confirmed within first 300 words of body text if hook is ~100 words + table is ~80 words. Five rows needed (Claude Opus 4.6, GPT 5.2, Codex 5.3, Gemini 3.1 Pro, Grok 4.20). |
| STRC-03 | Each of the 5 models has a brief introduction (~120 words) covering maker, philosophy, standout capability | Intro stub at lines 49-51. Five intros totaling ~600 words. Each intro = 1 tight paragraph per model. All 5 models: Claude Opus 4.6 (Anthropic), GPT 5.2 Thinking (OpenAI), Codex 5.3 xHigh (OpenAI), Gemini 3.1 Pro (Google DeepMind), Grok 4.20 (xAI). |
| STRC-11 | Verdict section mapping each model to specific use cases (~300 words) + cross-reference link to `ai-coding-tools-compared-2026` | Verdict stub at lines 162-164. Cross-reference to existing blog post confirmed at `/blog/ai-coding-tools-compared-2026` (published: true, slug confirmed). Must include explicit scope differentiation (that post = IDE/tool comparison, this post = underlying model comparison). |
| STRC-12 | Total word count approximately 3000 words | Current body word count: ~2,193 words (Phase 2 content, measured). Phase 3 adds ~807 words to hit 3,000 target. Hook (~100) + table (~80) + 5 intros (~600) + verdict (~300) = ~1,080 words. Actual target: keep intros tight (~100 words each = 500 total) and verdict at ~207 words to land at ~3,000. |
| QUAL-04 | Cross-reference link to `ai-coding-tools-compared-2026` with explicit scope differentiation | Post confirmed to exist at `src/content/blog/ai-coding-tools-compared-2026.mdx` (published: true). Title: "Claude Code vs Cursor vs Copilot (2026): Best AI Coding Tools Compared". Differentiation framing: that post covers AI-powered IDE tools (Claude Code, Cursor, Copilot), this post covers underlying models (Claude Opus 4.6, GPT 5.2, etc.). |
</phase_requirements>

---

## Summary

Phase 3 is a pure content-authoring phase. It fills four stub sections in the existing MDX file with ~800 words of new prose, completing the blog post as a coherent article. No new infrastructure, libraries, or dependencies are involved. The MDX skeleton from Phase 1 already has the correct H2 headings with `{/* ... */}` comment stubs for every section this phase must fill.

The central challenge is word-count discipline. The existing Phase 2 body is ~2,193 words. The four Phase 3 sections (hook, table, 5 model intros, verdict) must add approximately 807 words to hit the ~3,000 word target. The temptation is to over-write each section — particularly the model introductions — and blow past the word budget. The planner must assign tight per-section targets and the executor must respect them.

The cross-reference requirement (QUAL-04) is trivial technically but must be handled correctly: the link is to `ai-coding-tools-compared-2026`, not `ai-models-compared-2026`, and the prose must include explicit scope differentiation explaining what each post covers.

**Primary recommendation:** Fill the four MDX stubs in a single plan (03-01). Assign explicit word targets per section. Include the cross-reference in the verdict section. Verify total word count after writing.

---

## Standard Stack

### Core

No new libraries or dependencies. Phase 3 modifies a single MDX file.

| Component | Version/Path | Purpose | Why Standard |
|-----------|-------------|---------|--------------|
| MDX content | `src/content/blog/ai-models-compared-2026.mdx` | Target file for content writing | Existing skeleton from Phase 1 |
| Markdown table | Native MDX syntax | Quick comparison table (STRC-02) | Astro renders native markdown tables in MDX |

### Alternatives Considered

None. Pure content authoring in an existing MDX file.

---

## Architecture Patterns

### MDX File Structure After Phase 3

```
--- (frontmatter — COMPLETE, do not touch)

[line 39] AI models compared 2026 — opening sentence (EXISTING — leave as-is)

## The Five AI Models You Actually Need to Know About
[STRC-01: ~100-word hook paragraph]

## Quick Comparison: AI Models at a Glance
[STRC-02: markdown table — Model | Maker | Best For | Weakness | Verdict]

## Meet the Contenders
[STRC-03: 5 model intro paragraphs, ~100 words each]

## Coding & Software Engineering   (COMPLETE from Phase 2)
## Reasoning & Complex Problem Solving   (COMPLETE from Phase 2)
## Agents & Tool Use   (COMPLETE from Phase 2)
## Creative Writing & Communication   (COMPLETE from Phase 2)
## Multimodal: Vision, Audio, Video   (COMPLETE from Phase 2)
## The Grok 4.20 Spotlight   (COMPLETE from Phase 2)
## Benchmark Scorecard   (COMPLETE from Phase 2)
## The Anti-Hype Check   (COMPLETE from Phase 2)

## The Verdict: Which AI Model Should You Actually Use?
[STRC-11: ~300-word segmented verdict + QUAL-04 cross-reference]
```

### Pattern 1: Stub Replacement

The MDX file uses `{/* Section description — Phase 3, STRC-XX */}` as placeholders. The executor must:
1. Find the stub comment
2. Replace it with prose content
3. Preserve the H2 heading above it (already in file)
4. NOT duplicate the H2 heading

```mdx
## The Five AI Models You Actually Need to Know About

{/* Hook section — Phase 3, STRC-01 */}
```

Becomes:

```mdx
## The Five AI Models You Actually Need to Know About

Everyone's asking "which AI is best" — and it's the wrong question. The five flagship models
available right now are each built for different jobs...
```

### Pattern 2: MDX Markdown Table

The comparison table must use standard markdown syntax that Astro renders correctly:

```mdx
| Model | Maker | Best For | Weakness | Verdict |
|-------|-------|----------|----------|---------|
| Claude Opus 4.6 | Anthropic | Coding & agentic workflows | Price ($5/$25/MTok) | Best coder |
| GPT 5.2 Thinking | OpenAI | All-round daily use | Nothing standout | Safest bet |
| Codex 5.3 xHigh | OpenAI | Pure code generation | Coding only | Dark horse |
| Gemini 3.1 Pro | Google DeepMind | Research & multimodal | Variable writing | Research king |
| Grok 4.20 Beta | xAI | Real-time research | Beta, no API | Most innovative |
```

Note: Escaped pipes in MDX must use `\|` if inside JSX, but in standard prose sections they render as-is. The existing benchmark scorecard table (Phase 2) uses this same plain markdown approach — follow the same pattern.

### Pattern 3: Model Introduction Paragraph Structure

Each of the 5 model intros follows the same 3-beat structure: **[Maker + positioning] → [Core philosophy] → [Standout capability]**

```
[Model Name] is [maker]'s [positioning]. [Philosophy sentence.] Its standout capability
is [specific differentiator] — [one concrete detail].
```

Example at ~100 words:

```
Claude Opus 4.6 is Anthropic's flagship reasoning and coding model, released February 5, 2026.
Anthropic builds toward AI safety as a first principle, and that shows in Claude's tendency
toward careful, methodical responses over confident-but-wrong ones. Its standout capability
is agentic coding: 80.8% on SWE-bench Verified, native tool use for file systems and terminals,
and the ability to run multi-step refactors across dozens of files without losing context.
At $5/$25 per million tokens (input/output), it's the most expensive model here — and for
pure coding work, often worth it.
```

### Pattern 4: Verdict Section Structure

The verdict section (STRC-11) must map each model to named use-case personas/scenarios — not a table, prose with structure:

```
**Use [Model] if you [specific condition].**
```

Pattern:
- 5 model-to-use-case mappings (~40 words each = ~200 words)
- 1 closing statement (~30 words)
- 1 cross-reference paragraph (~50-70 words) — QUAL-04

Cross-reference paragraph pattern:

```
If you're comparing AI *tools* rather than *models* — editor integrations like Claude Code,
Cursor, and GitHub Copilot — that's a different evaluation. See [Claude Code vs Cursor vs
Copilot (2026)](../ai-coding-tools-compared-2026) for that breakdown.
```

### Anti-Patterns to Avoid

- **Over-writing model intros:** 120 words per model = ~600 total. Going to 200 words per model adds 400 words and breaks word budget. The planner MUST set hard per-section word limits.
- **Duplicating comparison table content in intros:** The quick comparison table already states "Best For" and "Weakness" — the intros add *maker, philosophy, and standout capability*, not a repeat of the table.
- **Duplicating verdict content in intros:** The intros introduce the models; the verdict assigns use cases. Don't pre-empt the verdict in the intros.
- **Touching Phase 2 content:** Lines 53-164 (the eight comparison sections) are COMPLETE. Phase 3 fills ONLY the four stubs.
- **Wrong cross-reference URL:** The link is `../ai-coding-tools-compared-2026` (relative) or `/blog/ai-coding-tools-compared-2026` (absolute). Do NOT link to `ai-models-compared-2026` (the current post).

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Word count verification | Manual counting | `wc -w` or Python word count script | Accurate, fast, matches what build tools would see |
| Cross-reference URL discovery | Guess the path | Read `src/content/blog/ai-coding-tools-compared-2026.mdx` frontmatter | Slug is in frontmatter, published status confirmed |
| Table formatting | Custom JSX components | Plain markdown table syntax | Existing benchmark scorecard in the file uses markdown tables — consistent with established pattern |

---

## Common Pitfalls

### Pitfall 1: Word Count Overshoot

**What goes wrong:** Executor writes generous model intros (~200 words each) and a full verdict section (~400 words), landing at ~3,500+ words.
**Why it happens:** Without a hard limit, prose naturally expands. Model intros tempt the writer to recap comparison section content already covered in Phase 2.
**How to avoid:** Planner assigns explicit word budgets per section. Executor verifies total word count after writing with `wc -w` or Python count script (excluding frontmatter).
**Warning signs:** Each model intro approaches or exceeds 150 words.

### Pitfall 2: Stub Comment Not Removed

**What goes wrong:** Executor adds content after the `{/* ... */}` comment but leaves the comment in place, resulting in blank rendering plus new content, or JSX parse errors.
**Why it happens:** Treating the stub as a section marker rather than a placeholder to replace.
**How to avoid:** Explicitly instruct the executor to DELETE the `{/* ... */}` comment and replace it with prose. Verify the MDX comment is gone after writing.
**Warning signs:** The MDX file still contains `{/* Hook section — Phase 3, STRC-01 */}` after execution.

### Pitfall 3: Cross-Reference Without Scope Differentiation

**What goes wrong:** Executor adds a link to `ai-coding-tools-compared-2026` but the surrounding prose doesn't explain WHY the reader should click it or how it differs from this post.
**Why it happens:** Cross-reference treated as a SEO checkbox rather than a navigation aid.
**How to avoid:** The cross-reference paragraph must explicitly state: "that post compares IDE tools (Claude Code, Cursor, Copilot), this post compares underlying models (Claude Opus 4.6, GPT 5.2, etc.)."
**Warning signs:** Cross-reference is a bare link or just "see also" without explanation.

### Pitfall 4: Touching H2 Headings

**What goes wrong:** Executor modifies or re-creates H2 headings that already exist in the file, creating duplicate headings.
**Why it happens:** Treating stub filling as "write a whole section" rather than "fill the comment placeholder."
**How to avoid:** Instruct executor to make targeted edits: delete only the `{/* */}` comment, insert prose, leave all surrounding H2/H3 headings untouched.

### Pitfall 5: Grok 4.20 Beta Disclaimer Missing from Intro

**What goes wrong:** The Grok 4.20 model introduction omits the beta/unverified qualifier, contradicting the careful flagging in Phase 2 sections.
**Why it happens:** The intro section feels separate from the benchmark sections where caveats live.
**How to avoid:** The Grok 4.20 intro MUST include "(beta, as of February 2026)" or equivalent. Per QUAL-07 established in Phase 2, every Grok 4.20 claim carries the beta qualifier.

---

## Code Examples

### MDX Stub Locations (exact lines to modify)

```
Line 43: {/* Hook section — Phase 3, STRC-01 */}
Line 47: {/* Comparison table — Phase 3, STRC-02 */}
Line 51: {/* Model introductions — Phase 3, STRC-03 */}
Line 164: {/* Segmented verdict — Phase 3, STRC-11 */}
```

These four comment lines are the ONLY things being replaced. Everything else stays.

### Word Count Verification Command

```bash
python3 -c "
import re
with open('src/content/blog/ai-models-compared-2026.mdx') as f:
    content = f.read()
content = re.sub(r'^---.*?---\n', '', content, flags=re.DOTALL)
content = re.sub(r'\{/\*.*?\*/\}', '', content, flags=re.DOTALL)
words = len(content.split())
print(f'Body word count: {words}')
print(f'Target: ~3000 words')
print(f'Delta: {words - 3000:+d} words')
"
```

Run from: `/Users/divkix/GitHub/divkix.me`

### Quick Comparison Table — Data Reference

All data confirmed from Phase 2 research:

| Model | Maker | Best For | Weakness | Verdict |
|-------|-------|----------|----------|---------|
| Claude Opus 4.6 | Anthropic | Coding & agentic workflows | Price ($5/$25/MTok) | Best coder |
| GPT 5.2 Thinking | OpenAI | All-round daily use | Not best at anything | Safest bet |
| Codex 5.3 xHigh | OpenAI | Pure code generation | Coding-only, no general tasks | Dark horse |
| Gemini 3.1 Pro | Google DeepMind | Research, reasoning & multimodal | Writing quality variable | Research king |
| Grok 4.20 Beta | xAI | Real-time research & multi-agent | No API, beta only | Most innovative |

### Model Introduction Data Reference

Key facts confirmed in Phase 2 for each model introduction:

**Claude Opus 4.6 (Anthropic)**
- Released: February 5, 2026
- Pricing: $5/$25 per million tokens (input/output)
- Standout: 80.8% SWE-bench Verified, 72.7% OSWorld, agentic coding workflows
- Philosophy: AI safety-first, careful reasoning, methodical responses

**GPT 5.2 Thinking (OpenAI)**
- Pricing: $1.75/$14 per million tokens
- Standout: Internal router auto-selects best sub-model per request; 80.0% SWE-bench; 93.2% GPQA Diamond (Pro w/ high reasoning effort); most balanced across all task types
- Philosophy: Universal assistant, "best for most people"

**Codex 5.3 xHigh (OpenAI)**
- Pricing: inherits GPT 5.2 pricing structure
- Standout: 89% LiveCodeBench, 77.3% Terminal-Bench 2.0 (via Droid scaffold); specialized for code generation only
- Philosophy: Narrow-domain specialist, not a general model

**Gemini 3.1 Pro (Google DeepMind)**
- Released: February 19, 2026
- Pricing: $2/$12 per million tokens
- Standout: 77.1% ARC-AGI-2, 94.3% GPQA Diamond, 1M token context window, 900 images/prompt, 8.4 hrs audio, 1 hr video
- Philosophy: Long-context research and multimodal understanding

**Grok 4.20 Beta (xAI)**
- Launched: February 17, 2026 (beta)
- Access: SuperGrok $30/mo or X Premium+; no API yet
- Standout: 4-agent debate architecture (Captain Grok, Harper, Benjamin, Lucas); 65% hallucination reduction (unverified); X Firehose real-time data
- Philosophy: Multi-agent consensus reduces errors; real-time information access

### Verdict Section — Use-Case Mappings

Confirmed from Phase 2 comparison sections:

- **Coding & agentic work** → Claude Opus 4.6
- **Daily all-purpose use** → GPT 5.2 Thinking
- **Pure code generation / CI pipelines** → Codex 5.3 xHigh
- **Research, long documents, multimodal** → Gemini 3.1 Pro
- **Real-time info, breaking news, multi-perspective** → Grok 4.20 (with beta caveat)

### Cross-Reference Paragraph Pattern

```mdx
For comparisons of AI *tools* — the IDE integrations, editors, and coding assistants
built on top of these models — see [Claude Code vs Cursor vs Copilot (2026)](/blog/ai-coding-tools-compared-2026).
That post covers Claude Code, Cursor, GitHub Copilot, and LM Studio as practical
day-to-day tools. This post covers the underlying models those tools run on.
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Single "best AI" recommendation | Use-case-segmented verdicts | 2024-2025 | Models are specialized; no single winner; readers need task-specific guidance |
| Blog post hook = topic intro | Blog post hook = challenge conventional assumption | SEO content best practice 2025 | Opens with tension, not summary — higher engagement |

---

## Open Questions

1. **Word count precision**
   - What we know: Current body is ~2,193 words. Phase 3 target adds ~807 words.
   - What's unclear: Exact word targets per section to hit ~3,000 without overshoot.
   - Recommendation: Hook ~100 words, table ~80 words, 5 intros ~95 words each (475 total), verdict ~250 words = ~905 words → ~3,098 total. Trim verdict to ~200 words if needed. Use Python verification script after writing.

2. **Codex 5.3 xHigh intro framing**
   - What we know: It's an OpenAI product, specialized for code generation, uses GPT 5.2 pricing.
   - What's unclear: Whether to present it as a separate "model" or a "variant of GPT 5.2." Phase 2 treats it as distinct.
   - Recommendation: Present as a distinct specialized model (consistent with Phase 2 framing) but note the OpenAI family relationship. Keep intro tight to ~95 words.

---

## Sources

### Primary (HIGH confidence)
- `src/content/blog/ai-models-compared-2026.mdx` — existing content and stub locations (lines verified)
- `src/content/blog/ai-coding-tools-compared-2026.mdx` — cross-reference target; slug, title, published status confirmed
- `.planning/REQUIREMENTS.md` — STRC-01, STRC-02, STRC-03, STRC-11, STRC-12, QUAL-04 definitions
- `.planning/phases/02-head-to-head-comparisons-data/02-RESEARCH.md` — all model data facts and benchmark scores
- `.planning/ROADMAP.md` — phase 3 success criteria definitions

### Secondary (MEDIUM confidence)
- Phase 2 PLAN.md execution notes (STATE.md accumulated context) — confirms Phase 2 is complete, all comparison sections written

### Tertiary (LOW confidence)
- None for this phase. All required data exists in the current MDX file and Phase 2 research.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — no new infrastructure; pure content authoring
- Architecture patterns: HIGH — MDX stub replacement pattern confirmed from existing file; all four stub locations identified by line number
- Content data: HIGH — all model facts, benchmark scores, and pricing confirmed in Phase 2 research and existing MDX file
- Word count math: MEDIUM — ~2,193 word estimate may vary by ±50 words depending on counting method; verify with Python script

**Research date:** 2026-02-26
**Valid until:** 2026-03-26 (stable — content-only phase, no library dependencies to expire)
