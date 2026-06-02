# Design Audit Report — divkix.me

## Audit Health Score

| # | Dimension | Score | Key Finding |
|---|---|---|---|
| 1 | Accessibility | 2 | Contrast failures on muted text (P1) |
| 2 | Performance | 3 | Good hydration strategy, minor bundle concerns |
| 3 | Responsive Design | 3 | Fluid spacing works, some mobile nav issues |
| 4 | Theming | 3 | Good token system, some inconsistent usage |
| 5 | Anti-Patterns | 2 | Side-tab border, numbered labels, container drift |
| **Total** | | **13/20** | **Acceptable (significant work needed)** |

---

## Anti-Patterns Verdict

**Overall**: The site is well-designed and editorial, but has several issues that violate the design system and accessibility standards.

**Specific tells found**:
1. **Side-tab accent border** (`border-l-4 border-primary`) on blog post TL;DR — the most recognizable AI slop tell
2. **Numbered section markers** (`SectionLabel` component: "01: About") — anti-pattern per design system
3. **Inconsistent border radius** — `rounded-lg` overrides `radius-card: 0` design system token
4. **Container drift** — multiple pages use `container mx-auto px-4` instead of `content-rail`

---

## Executive Summary

- **Audit Health Score**: 13/20 (Acceptable — significant work needed)
- **Total issues found**: 7 P1, 6 P2, 4 P3
- **Top 3 critical issues**:
  1. Muted text contrast fails WCAG AA (affects all pages)
  2. Side-tab border anti-pattern in blog posts
  3. Inconsistent container/border radius across pages

---

## Detailed Findings by Severity

### P1 Issues (Major)

#### [P1] Muted text contrast fails WCAG AA
- **Location**: All pages — `text-muted-foreground` is used extensively
- **Category**: Accessibility
- **Impact**: Users with low vision cannot read secondary text. ~2.5:1 contrast ratio (needs 4.5:1)
- **WCAG**: Fails WCAG AA 1.4.3 Contrast (Minimum)
- **Recommendation**: Darken `color-ink-2` from `oklch(0.47 0.014 258)` to `oklch(0.37 0.014 258)` (~3.5:1) or add a dedicated `color-ink-3` token for secondary text
- **Suggested command**: `$impeccable colorize`

#### [P1] Side-tab accent border (anti-pattern)
- **Location**: `src/pages/blog/[slug].astro` line 294
- **Category**: Anti-Pattern
- **Impact**: Recognizable AI slop tell that undermines the editorial brand
- **Recommendation**: Remove `border-l-4 border-primary` from TL;DR summary. Use a subtle background tint or top border instead.
- **Suggested command**: `$impeccable quieter`

#### [P1] Alpha text values without semantic tokens
- **Location**: All pages — `text-foreground/85`, `text-foreground/75`, `text-foreground/60`
- **Category**: Theming
- **Impact**: Hard to maintain, inconsistent opacity values across pages, no dark mode guarantee
- **Recommendation**: Add semantic tokens: `--color-ink-secondary`, `--color-ink-tertiary` to tokens.css
- **Suggested command**: `$impeccable colorize`

#### [P1] `address` tag used for author name
- **Location**: `src/pages/blog/[slug].astro` line 260
- **Category**: Accessibility
- **Impact**: Screen readers announce "address" for author name, which is semantically incorrect
- **WCAG**: Fails WCAG 1.3.1 Info and Relationships
- **Recommendation**: Use `<span>` or `<p>` with `class="not-italic"` instead of `<address>`
- **Suggested command**: `$impeccable audit`

### P2 Issues (Minor)

#### [P2] Inconsistent border radius
- **Location**: Blog posts, 404, socials, mentions — `rounded-lg` overrides `radius-card: 0`
- **Category**: Anti-Pattern / Theming
- **Impact**: Design system inconsistency; square corners are part of the Atelier brand
- **Recommendation**: Replace all `rounded-lg` with design system tokens or remove entirely
- **Suggested command**: `$impeccable quieter`

#### [P2] Container drift on multiple pages
- **Location**: `src/pages/404.astro`, `src/pages/socials.astro`, `src/pages/mentions.astro`
- **Category**: Anti-Pattern / Responsive
- **Impact**: Pages use `container mx-auto px-4` instead of `content-rail` class, creating inconsistent gutters
- **Recommendation**: Replace with `content-rail` class from design system
- **Suggested command**: `$impeccable layout`

#### [P2] `ExperienceBento.tsx` uses non-design-system classes
- **Location**: `src/components/sections/experience/ExperienceBento.tsx` line 110
- **Category**: Anti-Pattern / Theming
- **Impact**: `container mx-auto px-4 py-16 md:py-24 reveal-on-scroll max-w-6xl` bypasses design tokens
- **Recommendation**: Use `text-band` and `section-gap` tokens
- **Suggested command**: `$impeccable layout`

#### [P2] Numbered section markers
- **Location**: `src/components/shared/SectionLabel.tsx`
- **Category**: Anti-Pattern
- **Impact**: "01: About" pattern is an AI slop tell; not used in a real sequence
- **Recommendation**: Remove component or use non-numbered labels
- **Suggested command**: `$impeccable quieter`

#### [P2] `prose-slate` on blog post
- **Location**: `src/pages/blog/[slug].astro` line 330
- **Category**: Theming
- **Impact**: `prose-slate` uses default Tailwind colors, may conflict with custom design system
- **Recommendation**: Use `prose` without `prose-slate` or create custom prose theme
- **Suggested command**: `$impeccable colorize`

#### [P2] Mobile TOC uses `px-4` instead of `page-gutter`
- **Location**: `src/pages/blog/[slug].astro` line 170
- **Category**: Responsive / Theming
- **Impact**: Mobile TOC has different padding than rest of page
- **Recommendation**: Use `page-gutter` token instead of `px-4`
- **Suggested command**: `$impeccable layout`

### P3 Issues (Polish)

#### [P3] `text-8xl md:text-9xl` on 404 page
- **Location**: `src/pages/404.astro` line 12
- **Category**: Anti-Pattern
- **Impact**: `text-9xl` is ~128px, exceeds the 6rem ceiling for display text
- **Recommendation**: Cap at `text-8xl` or use `clamp()` with max 6rem
- **Suggested command**: `$impeccable typeset`

#### [P3] `rounded-full` on socials page
- **Location**: `src/pages/socials.astro` line 67
- **Category**: Anti-Pattern
- **Impact**: Circular icons conflict with square-corner design system
- **Recommendation**: Use `rounded-sm` or remove border-radius
- **Suggested command**: `$impeccable quieter`

#### [P3] `bg-primary/10` alpha backgrounds
- **Location**: `src/pages/socials.astro` line 67
- **Category**: Theming
- **Impact**: Alpha backgrounds should be semantic tokens
- **Recommendation**: Add `--color-primary-subtle` token
- **Suggested command**: `$impeccable colorize`

#### [P3] `text-foreground/70` on socials/mentions
- **Location**: `src/pages/socials.astro`, `src/pages/mentions.astro`
- **Category**: Theming
- **Impact**: Inconsistent alpha value
- **Recommendation**: Use semantic secondary text token
- **Suggested command**: `$impeccable colorize`

---

## Positive Findings

1. **Excellent skip link**: `sr-only focus:not-sr-only` pattern in Navbar
2. **Good focus management**: Visible focus indicators with `outline: 2px solid var(--color-focus)`
3. **Proper form a11y**: Labels, `aria-invalid`, `aria-describedby`, `role="alert"` on errors
4. **Good hydration strategy**: `client:visible`, `client:idle`, `client:only` used appropriately
5. **Strong semantic HTML**: `section`, `article`, `header`, `footer`, `nav`, `main` used correctly
6. **Responsive spacing**: `clamp()` for fluid gutters, `page-gutter` token
7. **Reduced motion support**: `prefers-reduced-motion` media query
8. **Theme toggle**: View transitions with reduced-motion fallback

---

## Recommended Actions

1. **[P1] `$impeccable colorize`**: Fix muted text contrast and add semantic secondary text tokens
2. **[P1] `$impeccable quieter`**: Remove side-tab border, fix border radius inconsistencies
3. **[P2] `$impeccable layout`**: Fix container drift on 404, socials, mentions, ExperienceBento
4. **[P2] `$impeccable audit`**: Fix `address` tag misuse, mobile TOC padding
5. **[P3] `$impeccable typeset`**: Cap 404 heading size, remove numbered section labels

Re-run `$impeccable audit` after fixes to verify score improvement.
