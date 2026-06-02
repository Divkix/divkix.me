# Design Fix Implementation Plan

> **For agentic workers:** Use subagents to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix all design audit issues found in `docs/design-audit-report.md` — contrast failures, anti-patterns, theming inconsistencies, and layout drift.

**Architecture:** Fix tokens.css first (foundation), then fix individual components and pages that consume those tokens. Group by independent task areas.

**Tech Stack:** Astro 5, TypeScript, Tailwind CSS v4, React islands

---

## Task 1: Fix Token System & Contrast

**Files:**
- Modify: `src/styles/tokens.css`
- Modify: `src/styles/globals.css`

### [P1] Fix muted text contrast

The current `color-ink-2` is `oklch(0.47 0.014 258)` which gives ~2.5:1 contrast on paper. Need to darken to ~3.5:1 or add a new token.

- [ ] **Step 1: Darken `color-ink-2`**

Change `color-ink-2` from `oklch(0.47 0.014 258)` to `oklch(0.37 0.014 258)`.

```css
/* In src/styles/tokens.css */
--color-ink-2: oklch(0.37 0.014 258);
```

Also update `color-muted` to match.

Verify: `oklch(0.37)` on `oklch(0.986)` gives ~3.5:1 which meets WCAG AA for large text and is close for normal text. Actually, let me recalculate. For WCAG AA normal text (4.5:1), we need `oklch(0.37)` on `oklch(0.986)`. The relative luminance of `oklch(0.37)` is about 0.11, and `oklch(0.986)` is about 0.97. The ratio is (0.97 + 0.05) / (0.11 + 0.05) = 1.02 / 0.16 = 6.375. That's actually >4.5:1. So `oklch(0.37)` is fine.

Wait, let me reconsider. The current `oklch(0.47)` on `oklch(0.986)`:
- L=0.47 has relative luminance ~0.20
- L=0.986 has relative luminance ~0.96
- Ratio: (0.96 + 0.05) / (0.20 + 0.05) = 1.01 / 0.25 = 4.04

That's 4.04:1 which is below 4.5:1. For WCAG AA, we need L <= 0.40 or so. Let's use `oklch(0.42 0.014 258)` to be safe but not too dark.

For L=0.42: relative luminance ~0.16
Ratio: (0.96 + 0.05) / (0.16 + 0.05) = 1.01 / 0.21 = 4.81

That's >4.5:1. Good.

For dark mode: `oklch(0.72 0.008 262)` on `oklch(0.2 0.004 260)`:
- L=0.72 has relative luminance ~0.47
- L=0.2 has relative luminance ~0.03
- Ratio: (0.47 + 0.05) / (0.03 + 0.05) = 0.52 / 0.08 = 6.5

That's >4.5:1. Good.

So the fix is: change `--color-ink-2` to `oklch(0.42 0.014 258)` and keep dark mode as is.

### [P1] Add semantic tokens for alpha text

- [ ] **Step 2: Add secondary/tertiary text tokens**

Add to `src/styles/tokens.css`:

```css
--color-ink-secondary: oklch(0.42 0.014 258);  /* ~4.8:1 on paper */
--color-ink-tertiary: oklch(0.55 0.012 258);   /* ~3.5:1 on paper, for large text only */
```

And dark mode equivalents:
```css
.dark {
  --color-ink-secondary: oklch(0.72 0.008 262);
  --color-ink-tertiary: oklch(0.60 0.008 262);
}
```

### [P2] Add subtle background token

- [ ] **Step 3: Add primary subtle background token**

```css
--color-primary-subtle: oklch(0.44 0.09 265 / 0.1);
```

And dark mode:
```css
--color-primary-subtle: oklch(0.62 0.1 265 / 0.15);
```

- [ ] **Step 4: Commit**

```bash
git add src/styles/tokens.css
```

---

## Task 2: Fix Blog Post Page

**Files:**
- Modify: `src/pages/blog/[slug].astro`

### [P1] Remove side-tab border

- [ ] **Step 1: Remove `border-l-4` from TL;DR**

Line 294: Change:
```astro
<div class="tldr-summary surface-raised p-6 rounded-lg border-l-4 border-primary">
```
to:
```astro
<div class="tldr-summary surface-raised p-6 border-t-2 border-primary">
```

### [P1] Fix `address` tag misuse

- [ ] **Step 2: Replace `address` with `span`**

Line 260: Change:
```astro
<address class="not-italic">
  by <a href="/divkix" class="hover:text-primary"><span>{post.data.author}</span></a>
</address>
```
to:
```astro
<span class="not-italic">
  by <a href="/divkix" class="hover:text-primary">{post.data.author}</a>
</span>
```

### [P2] Fix border radius inconsistencies

- [ ] **Step 3: Remove `rounded-lg` from all elements**

Lines to fix:
- Line 171: `rounded-lg` on mobile TOC details
- Line 287: `rounded-lg` on featured image
- Line 294: already fixed above
- Line 301: `rounded-lg` on key takeaways
- Line 339: `rounded-lg` on FAQ items
- Line 375: `rounded-lg` on related posts
- Line 390: `rounded-lg` on author bio

Replace `rounded-lg` with nothing (default is square from `radius-card: 0`).

For the image (line 287), `rounded-lg` is fine for images but the design system says square. Remove it.

### [P2] Fix mobile TOC padding

- [ ] **Step 4: Replace `px-4` with `page-gutter`**

Line 170: Change `container mx-auto px-4 pt-4` to use `content-rail` class or add `px-[var(--page-gutter)]`.

Actually, the design system uses `content-rail` for the main container. The mobile TOC is outside `text-band` so it needs its own padding. Let's use `px-[var(--page-gutter)]`.

```astro
<div class="xl:hidden pt-4 px-[var(--page-gutter)]">
```

### [P2] Fix `prose-slate` class

- [ ] **Step 5: Remove `prose-slate` from prose class**

Line 330: Change `prose prose-slate dark:prose-invert` to `prose dark:prose-invert`.

The custom colors in `globals.css` should override the default prose colors.

- [ ] **Step 6: Commit**

```bash
git add src/pages/blog/[slug].astro
```

---

## Task 3: Fix Page Layouts (404, Socials, Mentions)

**Files:**
- Modify: `src/pages/404.astro`
- Modify: `src/pages/socials.astro`
- Modify: `src/pages/mentions.astro`

### [P2] Fix container drift

- [ ] **Step 1: Fix 404 page**

Replace `container mx-auto px-4 py-20` with `text-band pt-[var(--space-xl)]! pb-[var(--space-3xl)]`.

Remove `max-w-2xl mx-auto` from inner divs.

### [P2] Fix socials page

- [ ] **Step 2: Fix socials page**

Replace `container mx-auto px-4 py-20` with `text-band pt-[var(--space-xl)]! pb-[var(--space-3xl)]`.

Remove `max-w-2xl mx-auto` from inner divs.

### [P2] Fix mentions page

- [ ] **Step 3: Fix mentions page**

Replace `container mx-auto px-4 py-20` with `text-band pt-[var(--space-xl)]! pb-[var(--space-3xl)]`.

Remove `max-w-3xl mx-auto` from inner divs.

### [P3] Fix border radius on these pages

- [ ] **Step 4: Remove `rounded-lg` and `rounded-full`**

On socials page:
- Line 65: `rounded-lg` on social links
- Line 67: `rounded-full` on icon containers
- Line 103: `rounded-lg` on email card

On mentions page:
- Line 41: `rounded-lg` on surface-raised
- Line 48: `rounded-lg` on empty state

On 404 page:
- Line 19: `surface-raised` already uses `radius-card: 0`, so no issue

- [ ] **Step 5: Commit**

```bash
git add src/pages/404.astro src/pages/socials.astro src/pages/mentions.astro
```

---

## Task 4: Fix Components

**Files:**
- Modify: `src/components/sections/experience/ExperienceBento.tsx`
- Modify: `src/components/shared/SectionLabel.tsx`

### [P2] Fix ExperienceBento non-design-system classes

- [ ] **Step 1: Replace `container mx-auto px-4 py-16 md:py-24 reveal-on-scroll max-w-6xl`**

Change to:
```tsx
<section id="experience" className="text-band min-w-0">
```

Remove `reveal-on-scroll` class if it's not defined in the design system.

### [P2] Fix SectionLabel numbered markers

- [ ] **Step 2: Deprecate or remove SectionLabel**

The component uses numbered section markers (`01: About`) which is an anti-pattern. Since it's not used anywhere in the current codebase, we can either:
1. Remove the component entirely
2. Keep it but change the API to not use numbers

Since it's unused, let's just leave it but note that it's deprecated. Or better yet, just simplify it to not use numbers.

Actually, let me check if it's used anywhere.

Search for `SectionLabel` usage.

If unused, we can remove it. If used, we need to update the usage.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/experience/ExperienceBento.tsx src/components/shared/SectionLabel.tsx
```

---

## Task 5: Fix Alpha Text Values

**Files:**
- Modify: `src/components/sections/Hero.astro`
- Modify: `src/components/sections/Highlights.tsx`
- Modify: `src/components/sections/Projects.tsx`
- Modify: `src/components/sections/RecentWriting.astro`
- Modify: `src/components/sections/Contact.tsx`
- Modify: `src/components/sections/experience/ExperienceBento.tsx`
- Modify: `src/components/sections/experience/ExperienceBentoStatic.astro`
- Modify: `src/pages/about.astro`
- Modify: `src/pages/resume.astro`
- Modify: `src/pages/socials.astro`
- Modify: `src/pages/mentions.astro`

### [P1] Replace `text-foreground/85` with semantic token

- [ ] **Step 1: Replace all `text-foreground/85` with `text-foreground/90`**

Actually, the better approach is to use a new token. But since we just added `color-ink-secondary`, we can use `text-[var(--color-ink-secondary)]`.

However, this is verbose. Let me think of a better approach.

Since we can't easily add Tailwind classes for custom tokens, we can either:
1. Add them to the `@theme` in globals.css
2. Use arbitrary values

The simplest approach: add `--color-ink-secondary` to the Tailwind theme so we can use `text-ink-secondary`.

Wait, looking at globals.css, we have `--color-foreground: var(--color-ink)`. We can add `--color-ink-secondary: var(--color-ink-secondary)` to the theme.

But actually, the cleanest approach is to just use the alpha values but ensure they meet contrast. `text-foreground/85` on paper with `color-ink` at `oklch(0.29)`:

Effective L: 0.29 + (0.986 - 0.29) * 0.15 ≈ 0.29 + 0.105 ≈ 0.395
Wait, that's not how alpha blending works. Let me think again.

Alpha blending in OKLCH: the resulting color is a mix of foreground and background. For `oklch(0.29 0.02 260)` at 85% opacity on `oklch(0.986 0.003 250)`:

Using color-mix: `color-mix(in oklch, oklch(0.29 0.02 260) 85%, oklch(0.986 0.003 250))`

This gives approximately `oklch(0.39 0.017 258)` which is ~4.5:1. So `text-foreground/85` is borderline.

For `text-foreground/75`:
`color-mix(in oklch, oklch(0.29 0.02 260) 75%, oklch(0.986 0.003 250))` ≈ `oklch(0.46 0.015 258)` which is ~4.0:1. This fails WCAG AA.

So `text-foreground/75` should be changed to `text-foreground/85` or `text-foreground/90`.

For `text-foreground/60`:
`color-mix(in oklch, oklch(0.29 0.02 260) 60%, oklch(0.986 0.003 250))` ≈ `oklch(0.57 0.012 258)` which is ~2.8:1. This fails for all text sizes.

For `text-foreground/70`:
`color-mix(in oklch, oklch(0.29 0.02 260) 70%, oklch(0.986 0.003 250))` ≈ `oklch(0.50 0.014 258)` which is ~3.3:1. Fails for normal text.

For `text-foreground/80`:
`color-mix(in oklch, oklch(0.29 0.02 260) 80%, oklch(0.986 0.003 250))` ≈ `oklch(0.43 0.015 258)` which is ~4.3:1. Close but might fail.

For `text-foreground/90`:
`color-mix(in oklch, oklch(0.29 0.02 260) 90%, oklch(0.986 0.003 250))` ≈ `oklch(0.35 0.017 258)` which is ~5.2:1. Passes.

So the rule is:
- Normal text: use `text-foreground/90` or higher (or `text-foreground`)
- Large text (≥18px): `text-foreground/85` is okay (3:1)
- Decorative text: `text-foreground/60` is okay but should be marked as decorative

Wait, but the `text-muted-foreground` is used for normal text and it's already at 2.5:1. We're fixing that by darkening the token.

So the approach for alpha values:
1. For `text-foreground/85` on normal text: it's borderline. Let's keep it but ensure the base color is dark enough. Since `color-ink` is `oklch(0.29)`, `text-foreground/85` gives ~4.5:1. This is okay.
2. For `text-foreground/75`: change to `text-foreground/85` or use `text-muted-foreground` (which will be fixed)
3. For `text-foreground/60` and `text-foreground/70`: these should be `text-muted-foreground` or `text-foreground/85` depending on size.

Let me search for all occurrences:

`text-foreground/85`:
- Hero.astro line 19: description text, normal size. Should be `text-foreground/90` or `text-muted-foreground` (after fix)
- Resume.astro line 52: description text. Same.
- Resume.astro line 80: skills tags. Small text. Should be `text-muted-foreground`.

`text-foreground/75`:
- ExperienceBento.tsx line 92: highlights. Should be `text-muted-foreground`.
- ExperienceBentoStatic.astro line 72: highlights. Should be `text-muted-foreground`.
- Resume.astro line 98: project desc. Should be `text-muted-foreground`.

`text-foreground/70`:
- Socials.astro line 50: description. Should be `text-muted-foreground`.
- Mentions.astro line 36: description. Should be `text-muted-foreground`.
- Blog/[slug].astro line 294: TL;DR text. Should be `text-muted-foreground`.
- Blog/[slug].astro line 305: takeaway text. Should be `text-muted-foreground`.
- Blog/[slug].astro line 341: FAQ text. Should be `text-muted-foreground`.
- Blog/[slug].astro line 380: related post excerpt. Should be `text-muted-foreground`.
- Blog/[slug].astro line 403: author bio. Should be `text-muted-foreground`.
- Blog/[slug].astro line 406: author expertise. Should be `text-muted-foreground`.

`text-foreground/60`:
- Blog/[slug].astro line 184: TOC links. Should be `text-muted-foreground`.
- Blog/[slug].astro line 204: TOC links (desktop). Should be `text-muted-foreground`.
- Blog/[slug].astro line 220: back to blog. Should be `text-muted-foreground`.
- Socials.astro line 76: URL. Should be `text-muted-foreground`.
- Socials.astro line 91: arrow icon. Decorative, can stay.
- Socials.astro line 113: email. Should be `text-muted-foreground`.
- Socials.astro line 128: email icon. Decorative, can stay.
- Socials.astro line 138: footer text. Should be `text-muted-foreground`.
- Mentions.astro line 42: description. Should be `text-muted-foreground`.
- Mentions.astro line 49: empty state. Should be `text-muted-foreground`.

`text-muted-foreground/60`:
- SectionLabel.tsx line 13: already very light. Should be `text-muted-foreground` since it's already secondary.

The plan for alpha values:
- Replace all `text-foreground/60`, `text-foreground/70`, `text-foreground/75` with `text-muted-foreground` (which will be fixed to have proper contrast)
- Replace `text-foreground/85` with `text-muted-foreground` for normal text, or keep for large text
- For `text-foreground/80` and similar, use `text-muted-foreground`

Wait, but `text-muted-foreground` is a Tailwind class that maps to `--color-muted-foreground` which is `var(--color-ink-2)` in the theme. If we fix `--color-ink-2` to be darker, then `text-muted-foreground` will have proper contrast.

So the fix is:
1. Fix `--color-ink-2` in tokens.css (Task 1)
2. Replace all alpha values with `text-muted-foreground` or `text-foreground` as appropriate

But wait, the current `--color-ink-2` is also used as `color-muted` in tokens.css. And `color-muted` is used in some places. Let me check.

Looking at tokens.css:
```css
--color-ink-2: oklch(0.47 0.014 258);
--color-muted: oklch(0.47 0.014 258);
```

They are the same value. And in globals.css:
```css
--muted-foreground: var(--color-ink-2);
```

So `text-muted-foreground` = `color-ink-2`.

If we darken `color-ink-2` to `oklch(0.42)`, then all `text-muted-foreground` will automatically have better contrast.

But we also need to update places that use `text-foreground/70` etc. to use `text-muted-foreground` instead.

So Task 5 is: replace all `text-foreground/60`, `text-foreground/70`, `text-foreground/75`, and `text-foreground/85` with `text-muted-foreground` (or `text-foreground` for primary text).

Wait, but `text-foreground/85` is used for description text which is meant to be slightly less prominent than body text. If we darken `color-ink-2` to `oklch(0.42)`, then `text-muted-foreground` will be `oklch(0.42)` which is ~4.8:1. That's good for normal text. But for very subtle text (like the "by Author" line), `text-muted-foreground` might be too dark.

Hmm, we could add a `text-muted-foreground/80` or similar. But the simplest approach is:
1. For primary body text: use `text-foreground`
2. For secondary body text: use `text-muted-foreground` (after fix, this is ~4.8:1)
3. For very subtle text: use `text-muted-foreground/80` which would be `oklch(0.42)` at 80% = ~3.8:1. That's okay for large text but not normal text.

Actually, looking at the usage, the subtle text is mostly things like:
- "by Author" — normal text, can use `text-muted-foreground`
- "5 min read" — small text, can use `text-muted-foreground`
- "Published Jan 2026" — small text, can use `text-muted-foreground`
- Description text — normal text, can use `text-muted-foreground`

So the plan is:
1. Fix `color-ink-2` to `oklch(0.42 0.014 258)`
2. Replace all `text-foreground/60`, `text-foreground/70`, `text-foreground/75`, `text-foreground/85` with `text-muted-foreground`

Wait, but some places use `text-foreground/85` which is close to 4.5:1. If we replace with `text-muted-foreground` (which will be ~4.8:1), the text will be slightly darker. This might actually improve readability.

For places that need to be even lighter, we can add `text-muted-foreground/80` but that would be ~3.8:1 which fails for normal text. So we should avoid that for normal text.

For decorative elements (like the arrow icon in socials), `text-foreground/60` is fine since it's decorative. But the arrow icon already has `aria-hidden="true"` so it's not an accessibility issue.

So the plan for Task 5:
- Replace all `text-foreground/70`, `text-foreground/75` with `text-muted-foreground`
- For `text-foreground/60`, if it's on decorative text, leave it; if it's on readable text, change to `text-muted-foreground`
- For `text-foreground/85`, if it's on large text (≥18px), keep it; if it's on normal text, change to `text-muted-foreground`

Actually, let me just simplify: replace ALL alpha text values with `text-muted-foreground` or `text-foreground`. No exceptions.

- [ ] **Step 1: Replace alpha values in all files**

Run regex replacements across all files:
- `text-foreground/85` → `text-muted-foreground`
- `text-foreground/80` → `text-muted-foreground`
- `text-foreground/75` → `text-muted-foreground`
- `text-foreground/70` → `text-muted-foreground`
- `text-foreground/60` → `text-muted-foreground`
- `text-foreground/50` → `text-muted-foreground`
- `text-foreground/40` → `text-muted-foreground`
- `text-foreground/85` → `text-muted-foreground` (catch any missed)

Also replace `text-muted-foreground/60` → `text-muted-foreground` (in SectionLabel)

Wait, but some of these might be on backgrounds that are not `bg-paper`. For example, `text-foreground/60` on a `bg-card` (which is `color-paper-2` = `oklch(0.968)`). The contrast would be slightly lower.

For `color-paper-2` (oklch(0.968)):
- `text-foreground` (oklch(0.29)) gives ~9.5:1
- `text-muted-foreground` (oklch(0.42)) gives ~5.5:1

So `text-muted-foreground` on `bg-card` is ~5.5:1 which is fine.

For dark mode:
- `bg-card` is `oklch(0.24)`
- `text-muted-foreground` is `oklch(0.72)`
- Contrast: (0.72 vs 0.24) gives ~8.5:1. Fine.

So replacing all alpha values with `text-muted-foreground` is safe.

But wait, there are also places like `hover:text-foreground/60` etc. These should be `hover:text-muted-foreground`.

And `text-primary/60` on the socials page (for tags). `text-primary` is `oklch(0.44 0.09 265)` which is ~4.5:1 on paper. `text-primary/60` would be ~2.8:1. This fails.

Actually, looking at the socials page, there's `text-primary/60` on the icon containers. But that's for the background color, not text. The `bg-primary/10` is a background alpha.

Let me check the exact usage in socials.astro:
```astro
<div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
  <span class="text-xl font-bold text-primary">{social.label.charAt(0)}</span>
</div>
```

The `bg-primary/10` is a background alpha. This is fine. The `text-primary` is the text color which is fine.

And:
```astro
<span class="text-sm text-foreground/60 block">
  {social.href.replace(/^https?:\/\//, "").replace(/\/$/, "")}
</span>
```

This is `text-foreground/60` which should be `text-muted-foreground`.

And:
```astro
<svg class="text-foreground/40 group-hover:text-primary transition-colors">
```

This is decorative (arrow icon), so it can stay. But for consistency, we could use `text-muted-foreground`.

Alright, let me be practical. I'll replace all alpha text values with `text-muted-foreground` across all files. The only exceptions are decorative elements with `aria-hidden="true"` which are not accessibility-critical.

Actually, the simplest approach is to just do a global search and replace. Let me list all the files that need changes:

1. `src/components/sections/Hero.astro` — line 19: `text-foreground/85` → `text-muted-foreground`
2. `src/components/sections/Highlights.tsx` — no alpha values
3. `src/components/sections/Projects.tsx` — line 54: `text-foreground/85` → `text-muted-foreground`
4. `src/components/sections/RecentWriting.astro` — no alpha values (already uses `text-muted-foreground`)
5. `src/components/sections/Contact.tsx` — no alpha values
6. `src/components/sections/experience/ExperienceBento.tsx` — line 92: `text-foreground/75` → `text-muted-foreground`
7. `src/components/sections/experience/ExperienceBentoStatic.astro` — line 72: `text-foreground/75` → `text-muted-foreground`
8. `src/pages/about.astro` — line 55: `text-foreground/85` → `text-muted-foreground`
9. `src/pages/resume.astro` — line 52: `text-foreground/85` → `text-muted-foreground`, line 80: `text-foreground/85` → `text-muted-foreground`, line 98: `text-foreground/75` → `text-muted-foreground`
10. `src/pages/socials.astro` — line 50: `text-foreground/70` → `text-muted-foreground`, line 76: `text-foreground/60` → `text-muted-foreground`, line 91: `text-foreground/40` → `text-muted-foreground`, line 113: `text-foreground/60` → `text-muted-foreground`, line 128: `text-foreground/40` → `text-muted-foreground`, line 138: `text-foreground/60` → `text-muted-foreground`
11. `src/pages/mentions.astro` — line 36: `text-foreground/70` → `text-muted-foreground`, line 42: `text-foreground/70` → `text-muted-foreground`, line 49: `text-foreground/60` → `text-muted-foreground`
12. `src/pages/blog/[slug].astro` — multiple instances
13. `src/components/shared/SectionLabel.tsx` — line 13: `text-muted-foreground/60` → `text-muted-foreground`
14. `src/components/sections/Skills.tsx` — line 56: `text-foreground/80` → `text-muted-foreground`

- [ ] **Step 2: Commit**

```bash
git add -A
```

---

## Verification

After all fixes:

- [ ] Run `bun run lint` to check for linting issues
- [ ] Run `bun run type-check` to check for TypeScript errors
- [ ] Build the site: `bun run build`
- [ ] Verify no visual regressions

---

## Commit Summary

```bash
git add -A
git commit -m "fix: resolve design audit issues — contrast, anti-patterns, theming

- Darken color-ink-2 for WCAG AA compliance (4.8:1 on paper)
- Remove side-tab border anti-pattern from blog posts
- Fix semantic HTML (address tag misuse)
- Replace alpha text values with semantic muted-foreground tokens
- Remove rounded-lg overrides to match design system square corners
- Fix container drift on 404, socials, mentions pages
- Fix ExperienceBento to use design system tokens
- Fix prose-slate to use custom theme colors
- Fix mobile TOC padding to use page-gutter token
- Add subtle background tokens for primary color"
```
