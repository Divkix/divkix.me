# Portfolio Redesign: Premium Minimal

**Status:** Draft — awaiting review
**Date:** 2026-05-15
**Direction:** Option A — Premium Minimal (with light + dark)

---

## 1. Motivation

The current site uses a "developer toy" aesthetic—dot grid backgrounds, film grain, hard-offset shadows, terminal mockups, CRT scanlines, green-on-black code blocks, and `// 00 — intro` section labels. Individually these are fun. Together they read as **childish and trying too hard**, not as a professional portfolio for a senior engineer.

The redesign moves to **Option A: Premium Minimal** — clean, confident, generous whitespace, refined typography, muted earth tones with a subtle gold accent. Think Stripe or Linear: polish through restraint, not spectacle.

---

## 2. Design Direction

### 2.1 Color Palette

**Light mode:**
- Background: warm off-white (`oklch(0.97 0.005 90)` — cream)
- Text: deep charcoal (`oklch(0.15 0.01 60)`)
- Accent: muted gold/amber (`oklch(0.70 0.12 80)`)
- Subtle borders: (`oklch(0.90 0.01 85)`)
- Muted surfaces: (`oklch(0.95 0.01 85)`)

**Dark mode:**
- Background: deep charcoal (`oklch(0.13 0.01 60)`)
- Text: warm white (`oklch(0.92 0.01 85)`)
- Accent: warm gold (`oklch(0.75 0.12 75)`)
- Subtle borders: (`oklch(1 0 0 / 10%)`)
- Muted surfaces: (`oklch(0.18 0.01 60)`)

### 2.2 Typography

- **Display:** Instrument Serif (headings, name) — keep
- **Body:** Geist Sans (body text, UI) — keep
- **Mono:** Geist Mono (code, data, labels) — keep

**Scale changes:**
- Hero name: reduce from `text-7xl/8xl/9xl` to `text-5xl/6xl/7xl` range with more whitespace instead
- Section headings: `text-3xl/4xl` range, letting breathing room carry the weight
- Body: `text-base` / `text-lg`

### 2.3 Visual Language

- **No decorative effects.** Remove dot grid, film grain, CRT scanlines, hard-offset shadows.
- **Shadows are atmospheric, not cartoonish.** Replace `4px 4px 0` hard shadows with subtle layered shadows (`0 1px 2px`, `0 4px 12px`).
- **Borders over shadows** for card containment. A 1px subtle border defines space better than an offset shadow.
- **Generous whitespace.** Sections breathe. Content isn't crammed.
- **Single accent divider line** as a recurring motif (thin gold/amber line).
- **No "dev" signaling.** Remove `// 00 — intro`, terminal prompts, `@divkix_` handle, `$ whoami` blocks.

---

## 3. Changes Per Component

### 3.1 `globals.css` — Utility Cleanup

| Remove | Reason |
|--------|--------|
| `.dot-grid-bg` | Notebook-paper aesthetic |
| `.page-noise` | Rough texture, unpolished |
| `.shadow-hard` | Cartoonish 4px offset |
| `.btn-snap-hover` (4px shadow offset) | Same cheap effect |
| `.shadow-glow`, `.shadow-elevated` (current versions) | Too heavy; replace with subtler variants |
| `.contact-prompt`, `.contact-input` | Terminal-specific; contact form gets clean redesign |
| `.terminal-cursor-block` | No more terminal aesthetic |
| `.project-card` / `.project-card-content` / `.project-card-featured` / `.project-card-regular` | Replaced by simpler card classes |
| Timeline keyframes in utilities layer | Move to animations if needed or remove |

| Add | Purpose |
|-----|---------|
| `.accent-line` | Thin gold divider element |
| `.surface-raised` | Subtle elevated surface (very light shadow + border) |
| `.surface-inset` | Subtle inset surface for cards/sections |
| Refined shadow tokens | `--shadow-sm`, `--shadow-md` — atmospheric, not hard |

### 3.2 `BaseLayout.astro` & `site.config.ts`

- The two noise/dot overlay divs inside `<body>` (`dot-grid-bg`, `page-noise`) are **removed**.
- `site.config.ts` data stays identical — no content changes.

### 3.3 Hero Section (`Hero.astro`)

**Remove:**
- `@divkix_` handle line
- `// 00 — intro` label with clip-reveal animation
- The terminal mockup (right column on desktop)
- The staggered animation system (`.hero-label`, `.hero-handle`, etc.)
- The `<style>` block with all `@keyframes`

**New design:**
- Full-width centered or slightly-left-aligned layout
- Small label: `Software Engineer` in mono (no `//`)
- Name in large serif (`text-6xl lg:text-7xl`)
- A subtle gold accent divider (`width: 3rem; height: 3px`)
- One-line subtitle
- Two-line context below
- CTAs: primary (filled), secondary (outlined), tertiary (text-only)
- Social icons row at bottom (keep existing `SocialIcons.astro`)
- Simple staggered fade-up animation using CSS `@keyframes` (no clip-paths, no translateX)

### 3.4 Highlights (`Highlights.tsx`)

**Remove:**
- The massive animated number counters (`text-7xl md:text-8xl lg:text-9xl`)
- The `// 01 / highlights` section label

**New design:**
- Integrated into Hero or a compact stats row
- Simple text presentation: `250,000+ users reached` inline
- No counting animation — just display the value
- Or: remove the Highlights section entirely and fold key stats into the Hero context paragraph

### 3.5 Section Label (`SectionLabel.tsx`)

**Change:**
- Remove `//` comment prefix
- Simplify to: `02 — Projects` or just the label
- Smaller, less prominent — these are for scanning, not a personality trait

### 3.6 Projects (`Projects.tsx`)

**Remove:**
- The `BrowserMockup` component (red/yellow/green dots, gradient background)
- `shadow-hard` on featured cards
- `border-top-4` colored tops on regular cards
- The `.project-card` utility classes (defined in globals.css)
- `border-t-4` colored accent top on regular cards
- Accent color per-tag system on cards (over-complicated)

**New design:**
- Featured: Simple border card, left-aligned text, no mockup image. Just project name, description, tags, links.
- Regular: Grid of 2 columns, simple bordered cards with name, description, tags, links.
- Tag filter bar stays (it's functional and well-done)
- Cards use `shadow-sm` (subtle) or just border, no hard shadows
- Hover: slight lift (`translateY(-2px)`) + subtle shadow increase, not colored glow

### 3.7 Experience (`ExperienceBento.tsx`)

**Remove:**
- `shadow-hard` on timeline cards
- The pulsing green dot for current role (keep the indicator but less flashy)

**New design:**
- Timeline stays structurally the same (vertical line, alternating cards)
- Cards use subtle borders instead of hard shadows
- Cleaner spacing, more breathing room
- Current role indicator: a subtle dot or badge, not an animated ping

### 3.8 Skills (`Skills.tsx`, `SkillsTerminal.tsx`)

**Remove:**
- `SkillsTerminal.tsx` terminal aesthetic (green-on-black, scanlines, typewriter)
- Any terminal-framed presentation

**New design:**
- Clean grid of skill categories
- Simple cards or a table/grid with category headers and skill names
- Proficiency bars as subtle, thin lines (not chunky)
- Or: replace with a compact tag cloud or categorized list

### 3.9 Contact (`Contact.tsx`)

**Remove:**
- Entire dark terminal background (`oklch(0.08 0 0)`)
- `TerminalWindow` wrapper
- CRT scanlines, green text glow, `$ send --message` button text
- Typewriter success animation
- The green/teal social link list at the bottom
- All `contact-prompt` and `contact-input` CSS utilities

**New design:**
- Clean form on the site's normal background
- Visible labels (not `sr-only`)
- Standard input styling matching the design system
- Standard button (not `$ send --message`)
- Success state: simple confirmation message, no typewriter
- Social links: standard icon/text links, not green terminal-style
- Keep Formspree integration (the `fetch` call to `formspree.io`)
- Keep the hiring CTA text

### 3.10 Footer (`Footer.astro`)

**Remove:**
- Dark background (`oklch(0.08 0 0)`)
- Terminal prompt line (`divkix@portfolio:~$`)
- Blinking cursor block
- `[src]` GitHub button
- Status dot with "online"
- `.link-underline-grow` usage (keep utility but use differently)

**New design:**
- Light border-top separator
- Simple copyright line + nav links
- Clean, minimal — a handful of words, no personality effects

### 3.11 Navbar (`Navbar.tsx`)

**Keep mostly as-is:**
- Sticky positioning
- Desktop nav with sliding underline indicator
- Mobile nav dialog
- Theme toggle
- `divkix_` branding

**Remove:**
- Gradient border on scroll (`borderImage` with primary→accent gradient)
- Replace with simple `border-b border-border` or transparent

### 3.12 Blog & Other Pages

**No content changes.** These reuse `Navbar`, `Footer`, and `BaseLayout` — they inherit the design system changes automatically. Blog posts keep their `BlogLayout`, which uses `Navbar` and `Footer`.

### 3.13 `animations.css`

**Remove:**
- `timeline-node-appear`, `timeline-pulse` (no longer needed)
- `scanline` (no more CRTs)
- `cursor-glow` (no more terminal cursor)
- Any terminal-specific keyframes

**Keep:**
- `reveal-on-scroll` (scroll-driven section reveals — keep, it's clean and CSS-only)
- `text-clip-reveal` (may repurpose for hero)
- `cursor-blink` (may keep for a subtle use)

---

## 4. What Does NOT Change

- All data in `site.config.ts` — zero content edits
- Astro 5 architecture, React islands, hydration directives
- Tailwind CSS v4, PostCSS, `tw-animate-css`
- shadcn/ui components (`Button`, etc.)
- Theme toggle mechanism (localStorage + class-based dark mode)
- Contact form backend (Formspree endpoint)
- Blog Content Collections, MDX, `posts.json` generation
- SEO: JSON-LD structured data, meta tags, sitemap
- `ScrollProgress` component
- `SocialIcons.astro` component
- View transitions (Astro `ClientRouter`)
- Analytics script
- Accessibility features (skip links, focus rings, aria labels, keyboard nav, focus trap)
- Reduced-motion support
- Font preloading

---

## 5. Files Touched (Summary)

| File | Change |
|------|--------|
| `src/styles/globals.css` | Major — remove utilities, add new surface classes, rework shadows |
| `src/styles/animations.css` | Minor — remove terminal/timeline keyframes |
| `src/layouts/BaseLayout.astro` | Minor — remove `dot-grid-bg` and `page-noise` divs |
| `src/components/sections/Hero.astro` | Major — full rewrite |
| `src/components/sections/Highlights.tsx` | Major — simplify or remove |
| `src/components/sections/Projects.tsx` | Major — remove BrowserMockup, rework cards |
| `src/components/sections/experience/ExperienceBento.tsx` | Moderate — remove hard shadows |
| `src/components/sections/skills/*` | Major — replace terminal with clean design |
| `src/components/sections/Contact.tsx` | Major — full rewrite |
| `src/components/shared/Footer.astro` | Major — full rewrite |
| `src/components/shared/Navbar.tsx` | Minor — remove gradient border |
| `src/components/shared/SectionLabel.tsx` | Minor — remove `//` prefix |
| `src/components/shared/TerminalWindow.tsx` | Remove — no longer used |

---

## 6. Risks & Edge Cases

1. **Blog pages** use `Navbar` and `Footer` — must verify they look correct with new design
2. **Resume page** (`/resume/`) may have its own styling — check for hard-coded styles
3. **Dark/light transition** — removing hard shadows may require testing both themes
4. **Mobile nav** — the full-screen mobile dialog should inherit new color scheme
5. **Contact form** — must preserve all accessibility features (labels, error states, aria attributes)
6. **Performance** — removing effects should improve performance, not degrade it
7. **Animation preference** — `prefers-reduced-motion` support must be maintained

---

## 7. Definition of Done

- [ ] No dot grid background visible on any page
- [ ] No film grain noise visible on any page
- [ ] No hard-offset shadows (`4px 4px 0`) anywhere
- [ ] No terminal/CRT aesthetic anywhere (Hero, Contact, Skills, Footer)
- [ ] No `//` comment section labels
- [ ] Color palette matches spec (muted earth tones + gold accent)
- [ ] Both light and dark themes render correctly
- [ ] All sections render on homepage
- [ ] Contact form submits successfully
- [ ] Blog pages render correctly
- [ ] Resume page renders correctly
- [ ] About page renders correctly
- [ ] Mobile responsive at all breakpoints
- [ ] Accessibility: keyboard nav, focus rings, screen reader labels intact
- [ ] `bun run build` succeeds
- [ ] `bun run type-check` passes
- [ ] `bun run lint` passes
