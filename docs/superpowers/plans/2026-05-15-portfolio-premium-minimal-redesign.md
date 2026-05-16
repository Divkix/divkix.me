# Portfolio Premium Minimal Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the portfolio from "developer toy" aesthetic (dot grids, hard shadows, terminals, CRT scanlines) to a premium-minimal look with warm earth tones, generous whitespace, refined typography, and a subtle gold accent.

**Architecture:** Pure visual redesign — zero content or logic changes. All data in `site.config.ts` stays identical. The CSS layer (`globals.css`, `animations.css`) gets cleaned up first, then each section component is rewritten inline. Blog, resume, and other pages inherit changes through shared layouts (`BaseLayout`, `Navbar`, `Footer`).

**Tech Stack:** Astro 5, TypeScript, React 19, Tailwind CSS v4, shadcn/ui, Geist Sans + Instrument Serif fonts

**Spec:** `docs/superpowers/specs/2026-05-15-portfolio-premium-minimal-redesign.md`

---

## File Structure Map

| File | Role | Change |
|------|------|--------|
| `src/styles/globals.css` | Theme tokens, utilities, component styles | Major — new palette, remove old utilities, add surface classes |
| `src/styles/animations.css` | Reusable keyframes | Minor — remove terminal/timeline keyframes |
| `src/layouts/BaseLayout.astro` | Root layout, fonts, `<head>`, background layers | Minor — remove dot grid & noise divs |
| `src/components/sections/Hero.astro` | Hero section | Major — full rewrite |
| `src/components/sections/Highlights.tsx` | Animated stat counters | Major — simplify to compact text stats |
| `src/components/sections/Projects.tsx` | Project cards + filter bar | Major — remove BrowserMockup, rework cards |
| `src/components/sections/experience/ExperienceBento.tsx` | Timeline + education | Moderate — remove hard shadows |
| `src/components/sections/skills/Skills.tsx` | Skills section wrapper | Major — remove terminal background |
| `src/components/sections/skills/SkillsTerminal.tsx` | Terminal-framed skills display | **Delete file** |
| `src/components/sections/skills/index.ts` | Skills barrel export | Minor — stop exporting terminal |
| `src/components/sections/Contact.tsx` | Contact form | Major — full rewrite |
| `src/components/shared/Footer.astro` | Site footer | Major — full rewrite |
| `src/components/shared/Navbar.tsx` | Navigation + theme toggle | Minor — remove gradient border |
| `src/components/shared/SectionLabel.tsx` | Section heading label | Minor — remove `//` prefix |
| `src/components/shared/TerminalWindow.tsx` | Terminal window wrapper | **Delete file** |

---

### Task 1: CSS Foundation — New Color Palette & Shadow Tokens

**Files:**
- Modify: `src/styles/globals.css` (entire `:root` and `.dark` blocks, `@theme` shadow tokens, utilities layer)

**Purpose:** Replace the orange/teal palette and cartoonish shadows with muted earth tones and atmospheric shadows.

- [ ] **Step 1: Replace `:root` CSS custom properties (lines 51-84)**

Replace the entire `:root` and `.dark` blocks with the new palette:

```css
:root {
  --radius: 0.5rem;
  --background: oklch(0.97 0.005 90);
  --foreground: oklch(0.15 0.01 60);
  --card: oklch(0.99 0.003 85);
  --card-foreground: oklch(0.15 0.01 60);
  --popover: oklch(0.99 0.003 85);
  --popover-foreground: oklch(0.15 0.01 60);
  --primary: oklch(0.70 0.12 80);
  --primary-foreground: oklch(0.97 0.005 90);
  --secondary: oklch(0.94 0.01 85);
  --secondary-foreground: oklch(0.20 0.01 60);
  --muted: oklch(0.94 0.01 85);
  --muted-foreground: oklch(0.50 0.01 60);
  --accent: oklch(0.94 0.01 85);
  --accent-foreground: oklch(0.20 0.01 60);
  --destructive: oklch(0.57 0.24 27);
  --border: oklch(0.88 0.01 85);
  --input: oklch(0.88 0.01 85);
  --ring: oklch(0.70 0.12 80);
  --chart-1: oklch(0.65 0.22 41);
  --chart-2: oklch(0.60 0.12 185);
  --chart-3: oklch(0.40 0.07 227);
  --chart-4: oklch(0.83 0.19 84);
  --chart-5: oklch(0.77 0.19 70);
  --sidebar: oklch(0.97 0.005 90);
  --sidebar-foreground: oklch(0.15 0.01 60);
  --sidebar-primary: oklch(0.70 0.12 80);
  --sidebar-primary-foreground: oklch(0.97 0.005 90);
  --sidebar-accent: oklch(0.94 0.01 85);
  --sidebar-accent-foreground: oklch(0.20 0.01 60);
  --sidebar-border: oklch(0.88 0.01 85);
  --sidebar-ring: oklch(0.70 0.12 80);
}

.dark {
  --background: oklch(0.13 0.01 60);
  --foreground: oklch(0.92 0.01 85);
  --card: oklch(0.17 0.01 60);
  --card-foreground: oklch(0.92 0.01 85);
  --popover: oklch(0.17 0.01 60);
  --popover-foreground: oklch(0.92 0.01 85);
  --primary: oklch(0.75 0.12 75);
  --primary-foreground: oklch(0.13 0.01 60);
  --secondary: oklch(0.20 0.01 60);
  --secondary-foreground: oklch(0.92 0.01 85);
  --muted: oklch(0.20 0.01 60);
  --muted-foreground: oklch(0.60 0.01 60);
  --accent: oklch(0.20 0.01 60);
  --accent-foreground: oklch(0.92 0.01 85);
  --destructive: oklch(0.70 0.19 22);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 12%);
  --ring: oklch(0.75 0.12 75);
  --chart-1: oklch(0.49 0.24 264);
  --chart-2: oklch(0.70 0.17 162);
  --chart-3: oklch(0.77 0.19 70);
  --chart-4: oklch(0.63 0.27 304);
  --chart-5: oklch(0.65 0.25 16);
  --sidebar: oklch(0.17 0.01 60);
  --sidebar-foreground: oklch(0.92 0.01 85);
  --sidebar-primary: oklch(0.75 0.12 75);
  --sidebar-primary-foreground: oklch(0.13 0.01 60);
  --sidebar-accent: oklch(0.20 0.01 60);
  --sidebar-accent-foreground: oklch(0.92 0.01 85);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.75 0.12 75);
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.06);
  --shadow: 0 1px 3px 0 rgb(0 0 0 / 0.08), 0 1px 2px -1px rgb(0 0 0 / 0.06);
}
```

- [ ] **Step 2: Update `@theme inline` shadow tokens (lines 47-48)**

Replace the existing `--shadow-sm` and `--shadow` with:

```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.06);
--shadow: 0 1px 3px 0 rgb(0 0 0 / 0.08), 0 1px 2px -1px rgb(0 0 0 / 0.06);
```

And add new shadow tokens:

```css
--shadow-md: 0 4px 12px -2px rgb(0 0 0 / 0.08);
--shadow-lg: 0 12px 24px -8px rgb(0 0 0 / 0.08);
```

- [ ] **Step 3: Replace `@layer utilities` block (lines 163-524)**

Remove all old utilities and replace with the new surface classes:

```css
@layer utilities {
  /* ===== SURFACE CLASSES ===== */
  .surface-raised {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-sm);
  }

  .surface-hover {
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;
  }

  .surface-hover:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }

  /* ===== ACCENT DIVIDER ===== */
  .accent-line {
    width: 3rem;
    height: 3px;
    background: var(--primary);
    opacity: 0.6;
  }

  /* ===== SECTION DIVIDER (keep, refined) ===== */
  .section-divider {
    height: 1px;
    background: linear-gradient(
      to right,
      transparent,
      oklch(0.70 0.12 80 / 0.3),
      transparent
    );
  }

  .dark .section-divider {
    background: linear-gradient(
      to right,
      transparent,
      oklch(0.75 0.12 75 / 0.25),
      transparent
    );
  }

  /* ===== LINK UNDERLINE (keep) ===== */
  .link-underline-grow {
    position: relative;
    text-decoration: none;
  }

  .link-underline-grow::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 1px;
    background: currentColor;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .link-underline-grow:hover::after {
    transform: scaleX(1);
  }

  /* ===== INPUT FOCUS (refined) ===== */
  .input-focus-ring:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px oklch(0.70 0.12 80 / 0.2);
  }
}
```

- [ ] **Step 4: Remove old keyframe blocks from globals.css (lines 345-418)**

Delete these keyframes from `globals.css` (they're duplicates of what's in `animations.css`):
- `timeline-node-appear`
- `timeline-pulse`
- `cursor-blink` (keep in animations.css only)
- `terminal-flicker`
- `terminal-fade-in`
- `terminal-cursor-blink`

- [ ] **Step 5: Commit**

```bash
git add src/styles/globals.css
git commit -m "refactor: replace color palette and shadows with muted earth tones; remove old utilities"
```

---

### Task 2: Animations Cleanup

**Files:**
- Modify: `src/styles/animations.css`

**Purpose:** Remove terminal/timeline-specific keyframes that won't be used after the redesign.

- [ ] **Step 1: Remove terminal keyframes**

Delete these blocks from `animations.css`:
- `cursor-glow` (lines 99-109)
- `timeline-node-appear` (lines 145-154)
- `timeline-pulse` (lines 156-166)
- `scanline` (lines 170-177)

- [ ] **Step 2: Keep everything else**

The following remain:
- `reveal-on-scroll` (scroll-driven section reveals)
- `text-clip-reveal`
- `card-enter`
- `navbar-indicator`
- `cursor-blink`
- `text-reveal`

- [ ] **Step 3: Commit**

```bash
git add src/styles/animations.css
git commit -m "refactor: remove terminal and timeline keyframes from animations"
```

---

### Task 3: Remove Background Noise & Dot Grid

**Files:**
- Modify: `src/layouts/BaseLayout.astro`

**Purpose:** Remove the two decorative overlay divs from the `<body>`.

- [ ] **Step 1: Remove the overlay divs**

On lines 162-163, delete:
```html
<div class="dot-grid-bg" aria-hidden="true"></div>
<div class="page-noise" aria-hidden="true"></div>
```

The `<body>` should now look like:
```html
<body>
  <slot />
  <Toaster client:idle />
</body>
```

- [ ] **Step 2: Commit**

```bash
git add src/layouts/BaseLayout.astro
git commit -m "refactor: remove dot grid and film grain background overlays"
```

---

### Task 4: SectionLabel — Remove `//` Prefix

**Files:**
- Modify: `src/components/shared/SectionLabel.tsx`

**Purpose:** Replace `// 02 / projects` with clean `02 — Projects` format.

- [ ] **Step 1: Replace the component**

Replace the entire file:

```tsx
import { cn } from "@/lib/utils";

interface SectionLabelProps {
  number: string;
  label: string;
  className?: string;
}

export function SectionLabel({ number, label, className }: SectionLabelProps) {
  return (
    <p
      className={cn(
        "mb-4 font-mono text-xs tracking-widest uppercase text-muted-foreground/60",
        className,
      )}
    >
      {number} — {label}
    </p>
  );
}
```

Remove the `variant` prop — it's no longer needed since terminal-specific styling is gone.

**Files that import SectionLabel need updating** (remove `variant="terminal"` where used):
- `src/components/sections/skills/Skills.tsx` (will be rewritten in Task 9)
- `src/components/sections/Contact.tsx` (will be rewritten in Task 10)

No error will occur at build time since the `variant` prop is optional; the changes in Task 9 and 10 will clean it up.

- [ ] **Step 2: Commit**

```bash
git add src/components/shared/SectionLabel.tsx
git commit -m "refactor: simplify SectionLabel — remove // prefix and terminal variant"
```

---

### Task 5: Hero Rewrite

**Files:**
- Modify: `src/components/sections/Hero.astro`

**Purpose:** Replace the terminal-mockup hero with a clean, confident premium-minimal layout.

- [ ] **Step 1: Replace the entire Hero.astro**

```astro
---
import SocialIcons from "@/components/shared/SocialIcons.astro";
import { siteConfig } from "@/data/site.config";

const firstName = siteConfig.name.split(" ")[0];
const lastName = siteConfig.name.split(" ")[1];
---

<section id="hero" class="container mx-auto px-4 min-h-screen flex items-center py-20">
  <div class="max-w-3xl">
    <p class="font-mono text-xs tracking-widest uppercase text-muted-foreground/60 mb-8">
      Software Engineer
    </p>

    <h1 class="font-display text-5xl sm:text-6xl lg:text-7xl font-normal tracking-tight leading-[0.95] text-foreground">
      {firstName} {lastName}
      <span class="sr-only"> — DevTools &amp; Infrastructure</span>
    </h1>

    <div class="accent-line mt-8 mb-8" aria-hidden="true" />

    <p class="text-lg text-foreground/75 leading-relaxed max-w-xl">
      Building developer tools, observability systems, and edge-native
      applications.
    </p>

    <p class="text-base text-muted-foreground max-w-lg mt-4 leading-relaxed">
      MS Computer Science @ Arizona State University. Currently interning
      at Cloudflare on the Engineering Tooling &amp; Infrastructure team.
    </p>

    <div class="flex flex-wrap gap-4 mt-10">
      <a
        href="#projects"
        class="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-foreground text-background hover:bg-foreground/90 h-11 px-6"
      >
        View Projects
      </a>
      <a
        href="/blog/"
        class="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-border text-foreground hover:bg-muted h-11 px-6"
      >
        Read Blog
      </a>
      <a
        href="/resume/"
        class="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-border text-foreground hover:bg-muted h-11 px-6"
      >
        Resume
      </a>
    </div>

    <div class="mt-12">
      <SocialIcons size="sm" />
    </div>
  </div>
</section>

<style>
  h1 {
    opacity: 0;
    animation: hero-fade-up 0.7s ease-out 0.1s forwards;
  }

  .accent-line {
    opacity: 0;
    animation: hero-fade-up 0.7s ease-out 0.25s forwards;
  }

  p {
    opacity: 0;
    animation: hero-fade-up 0.7s ease-out 0.35s forwards;
  }

  .flex.flex-wrap {
    opacity: 0;
    animation: hero-fade-up 0.7s ease-out 0.45s forwards;
  }

  div:has(> .accent-line) + p + p {
    animation-delay: 0.4s;
  }

  @keyframes hero-fade-up {
    from {
      opacity: 0;
      transform: translateY(16px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    h1, .accent-line, p, .flex.flex-wrap {
      animation: none;
      opacity: 1;
    }
  }
</style>
```

**What changed:**
- No `@divkix_` handle, no `// 00 — intro` label, no terminal mockup
- Single column, max-w-3xl, centered name in serif
- Gold accent divider line between name and bio
- Clean fade-up animation (simple, one keyframe)
- CTAs use foreground-colored primary button (inverted theme)
- Social icons at bottom

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/Hero.astro
git commit -m "refactor: premium-minimal hero — remove terminal, add clean serif layout"
```

---

### Task 6: Highlights — Simplify to Compact Stats

**Files:**
- Modify: `src/components/sections/Highlights.tsx`

**Purpose:** Replace massive animated counter numbers with compact inline text statistics.

- [ ] **Step 1: Replace the entire Highlights.tsx**

```tsx
import { SectionLabel } from "@/components/shared/SectionLabel";
import { siteConfig } from "@/data/site.config";

export function Highlights() {
  const stats = [
    { value: siteConfig.facts.impact, label: "Users Reached" },
    { value: siteConfig.facts.projects, label: "Projects Built" },
    { value: siteConfig.facts.oss, label: "OSS Contributions" },
  ];

  return (
    <section id="highlights" className="container mx-auto px-4 py-16">
      <SectionLabel number="01" label="stats" />
      <div className="flex flex-wrap gap-x-12 gap-y-3 text-sm">
        {stats.map((stat) => (
          <p key={stat.label} className="text-muted-foreground">
            <span className="font-mono font-semibold text-foreground tabular-nums">
              {stat.value}
            </span>{" "}
            {stat.label.toLowerCase()}
          </p>
        ))}
      </div>
    </section>
  );
}
```

This removes the `AnimatedStat` component, `IntersectionObserver` counting animation, and all the large `text-7xl` → `text-9xl` counters.

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/Highlights.tsx
git commit -m "refactor: simplify highlights to compact inline stats"
```

---

### Task 7: Projects — Remove Browser Mockups, Rework Cards

**Files:**
- Modify: `src/components/sections/Projects.tsx`

**Purpose:** Remove `BrowserMockup`, `shadow-hard`, colored border tops, and per-tag accent colors. Replace with clean bordered cards.

- [ ] **Step 1: Replace FeaturedProjectCard**

Replace the `FeaturedProjectCard` function (lines 131-226) with:

```tsx
function FeaturedProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div
      ref={ref}
      className={cn(
        "surface-raised p-8 transition-all duration-700",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
      )}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-2xl font-display font-semibold">
            {project.name}
          </h3>
          {"period" in project && project.period && (
            <span className="text-xs font-mono text-muted-foreground shrink-0">
              {project.period}
            </span>
          )}
        </div>
        <p className="text-foreground/70 leading-relaxed">{project.desc}</p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag: string) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs font-mono rounded-md bg-muted text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="flex gap-2 mt-6">
        {project.links.map((link: ProjectLink) => {
          const linkLabel = link.label;
          const ariaLabel =
            linkLabel === "Live"
              ? `View ${project.name} live`
              : linkLabel === "GitHub"
                ? `View ${project.name} on GitHub`
                : `${linkLabel} - ${project.name}`;
          return (
            <Button key={link.label} variant="outline" size="sm" asChild>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={ariaLabel}
              >
                {linkLabel === "Live" ? (
                  <Globe className="mr-1.5 size-3.5" />
                ) : linkLabel === "GitHub" ? (
                  <GitHubIcon className="mr-1.5 size-3.5" />
                ) : (
                  <ExternalLink className="mr-1.5 size-3.5" />
                )}
                {linkLabel}
              </a>
            </Button>
          );
        })}
        {PROJECT_BLOG_MAP[project.name] && (
          <Button variant="ghost" size="sm" asChild>
            <a href={PROJECT_BLOG_MAP[project.name]}>
              <BookOpen className="mr-1.5 size-3.5" />
              Read more
            </a>
          </Button>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Replace RegularProjectCard**

Replace the `RegularProjectCard` function (lines 228-312) with:

```tsx
function RegularProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <article
      ref={ref}
      className={cn(
        "surface-raised p-6 transition-all duration-700 surface-hover",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-xl font-display font-semibold">
            {project.name}
          </h3>
          {"period" in project && project.period && (
            <span className="text-xs font-mono text-muted-foreground shrink-0">
              {project.period}
            </span>
          )}
        </div>
        <p className="text-sm text-foreground/70 leading-relaxed line-clamp-2">
          {project.desc}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag: string) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs font-mono rounded-md bg-muted text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      {project.links.length > 0 && (
        <div className="flex gap-2 mt-4">
          {project.links.map((link: ProjectLink) => {
            const linkLabel = link.label;
            const ariaLabel =
              linkLabel === "Live"
                ? `View ${project.name} live`
                : linkLabel === "GitHub"
                  ? `View ${project.name} on GitHub`
                  : `${linkLabel} - ${project.name}`;
            return (
              <Button key={link.label} variant="outline" size="sm" asChild>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={ariaLabel}
                >
                  {linkLabel === "GitHub" ? (
                    <GitHubIcon className="mr-1.5 size-3.5" />
                  ) : linkLabel === "Live" ? (
                    <Globe className="mr-1.5 size-3.5" />
                  ) : (
                    <ExternalLink className="mr-1.5 size-3.5" />
                  )}
                  {linkLabel}
                </a>
              </Button>
            );
          })}
        </div>
      )}
    </article>
  );
}
```

- [ ] **Step 3: Remove unused imports and functions**

Remove these from the top of the file:
- `BrowserMockup` function (lines 84-111)
- `getAccentColor` function (lines 36-38)
- `getTagColor` function (lines 23-34) and the `allTags` variable if no longer used — but `allTags` is still needed for the filter bar, so keep it.
- The `useCallback`, `CSSProperties` imports if no longer used

Keep: `SectionLabel`, `Button`, `siteConfig`, `cn`, `Globe`, `ExternalLink`, `BookOpen`, the `GitHubIcon` inline SVG, `FEATURED_PROJECT_NAMES`, `PROJECT_BLOG_MAP`, `isFeatured`, `useScrollReveal`, and the filter bar logic.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/Projects.tsx
git commit -m "refactor: projects — remove browser mockups, hard shadows, colored accents; use clean bordered cards"
```

---

### Task 8: Experience — Remove Hard Shadows

**Files:**
- Modify: `src/components/sections/experience/ExperienceBento.tsx`

**Purpose:** Replace `shadow-hard` with `shadow-sm` and use `surface-raised` for cards. Keep the timeline structure.

- [ ] **Step 1: Replace card shadow class**

In the `TimelineCard` function, change line 78 from:
```tsx
className="rounded-xl border border-border bg-card p-6 shadow-hard hover:border-primary/50 transition-colors"
```
to:
```tsx
className="rounded-xl border border-border bg-card p-6 shadow-sm hover:border-primary/50 transition-colors"
```

- [ ] **Step 2: Replace the active role dot**

Change lines 46-53 (the pulsing green dot indicator) to a simpler non-animated dot:

```tsx
{isCurrentRole ? (
  <span className="inline-flex rounded-full size-3 bg-primary border-2 border-background" />
) : (
  <span className="inline-flex rounded-full size-3 bg-muted-foreground/30 border-2 border-background" />
)}
```

This removes the `animate-ping` and changes the color from green to the primary gold accent.

- [ ] **Step 3: Keep everything else identical**

The education section, timeline line, connector lines, and all content remain unchanged.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/experience/ExperienceBento.tsx
git commit -m "refactor: experience — replace hard shadows with subtle shadows; simplify active dot"
```

---

### Task 9: Skills — Replace Terminal with Clean Grid

**Files:**
- Modify: `src/components/sections/skills/Skills.tsx`
- Delete: `src/components/sections/skills/SkillsTerminal.tsx`
- Modify: `src/components/sections/skills/index.ts`
- Keep: `src/components/sections/skills/skillsUtils.ts`

**Purpose:** Remove the terminal-framed skills display and replace with a clean categorized grid.

- [ ] **Step 1: Rewrite Skills.tsx**

Replace the entire file with:

```tsx
import { SectionLabel } from "@/components/shared/SectionLabel";
import { siteConfig } from "@/data/site.config";
import { type Skill, getProficiencyLevel } from "./skillsUtils";

function groupSkillsByCategory(
  skills: readonly Skill[],
): Record<string, Skill[]> {
  const grouped: Record<string, Skill[]> = {};
  for (const skill of skills) {
    const existing = grouped[skill.category];
    if (existing) {
      existing.push({ ...skill });
    } else {
      grouped[skill.category] = [{ ...skill }];
    }
  }
  for (const [, list] of Object.entries(grouped)) {
    list.sort((a, b) => b.proficiency - a.proficiency);
  }
  return grouped;
}

export function Skills() {
  const skills = siteConfig.skills;
  const groupedSkills = groupSkillsByCategory(skills);

  return (
    <section id="skills" className="container mx-auto px-4 py-24">
      <SectionLabel number="04" label="skills" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {Object.entries(groupedSkills).map(([category, categorySkills]) => (
          <div key={category}>
            <h3 className="font-mono text-xs tracking-widest uppercase text-muted-foreground/60 mb-4">
              {category}
            </h3>
            <ul className="space-y-2.5">
              {categorySkills.map((skill) => {
                const { label } = getProficiencyLevel(skill.proficiency);
                return (
                  <li
                    key={skill.name}
                    className="flex items-center justify-between gap-3 text-sm"
                  >
                    <span className="text-foreground">{skill.name}</span>
                    <span className="text-xs text-muted-foreground font-mono">
                      {label.toLowerCase()}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
```

This removes:
- The dark terminal background gradient
- The `SkillsTerminal` import
- The CRT scanlines, typewriter animation, tab bar, green text glow
- The `variant="terminal"` SectionLabel prop

- [ ] **Step 2: Delete SkillsTerminal.tsx**

```bash
rm src/components/sections/skills/SkillsTerminal.tsx
```

- [ ] **Step 3: Update index.ts**

Since `SkillsTerminal.tsx` is now deleted and `Skills.tsx` no longer depends on it, no change needed — `index.ts` already exports from `Skills.tsx`. But verify the deleted import won't cause errors: since `SkillsTerminal` is no longer imported by `Skills.tsx`, this is safe.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/skills/Skills.tsx src/components/sections/skills/SkillsTerminal.tsx
git commit -m "refactor: skills — replace terminal display with clean categorized grid"
```

---

### Task 10: Contact — Full Rewrite

**Files:**
- Modify: `src/components/sections/Contact.tsx`
- Delete: `src/components/shared/TerminalWindow.tsx` (if no longer imported anywhere)

**Purpose:** Replace the dark terminal-based contact form with a clean, elegant form matching the new design system.

- [ ] **Step 1: Verify TerminalWindow is only used by Contact.tsx**

Check if any other file imports `TerminalWindow`:
```bash
rg "TerminalWindow" src/
```

If only Contact.tsx uses it, it's safe to delete. If others use it, keep the file.

- [ ] **Step 2: Rewrite Contact.tsx**

Replace the entire file:

```tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { SectionLabel } from "@/components/shared/SectionLabel";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/site.config";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/xgvreprq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSuccess(true);
        reset();
        toast.success("Message sent!", {
          description: "I'll get back to you soon.",
        });
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        const errorData = (await response
          .json()
          .catch(() => ({ message: "Unknown error" }))) as {
          message?: string;
          errors?: Array<{ message: string }>;
        };
        toast.error("Failed to send message", {
          description:
            errorData.errors?.[0]?.message ??
            errorData.message ??
            "Please try again later.",
        });
      }
    } catch (error) {
      toast.error("Failed to send message", {
        description:
          error instanceof Error
            ? error.message
            : "An error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = siteConfig.socials.filter((s) => s.label !== "Email");

  return (
    <section id="contact" className="container mx-auto px-4 py-24">
      <SectionLabel number="05" label="contact" />

      <div className="max-w-xl">
        {/* Hiring CTA */}
        <p className="text-sm text-muted-foreground mb-6">
          Looking for 2026 new-grad SWE roles in backend, infrastructure,
          devtools, AI tooling, and platform engineering.
        </p>

        {isSuccess ? (
          <div className="py-8">
            <p className="text-foreground font-medium">
              Message sent. Expect a response within 24h.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name */}
            <div>
              <label
                htmlFor="contact-name"
                className="block text-sm font-medium text-foreground mb-1.5"
              >
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                placeholder="Your name"
                autoComplete="name"
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 input-focus-ring transition-shadow"
                aria-required="true"
                aria-describedby={
                  errors.name ? "contact-name-error" : undefined
                }
                {...register("name")}
                disabled={isSubmitting}
              />
              {errors.name && (
                <p
                  id="contact-name-error"
                  className="text-xs text-destructive mt-1.5"
                >
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="contact-email"
                className="block text-sm font-medium text-foreground mb-1.5"
              >
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 input-focus-ring transition-shadow"
                aria-required="true"
                aria-describedby={
                  errors.email ? "contact-email-error" : undefined
                }
                {...register("email")}
                disabled={isSubmitting}
              />
              {errors.email && (
                <p
                  id="contact-email-error"
                  className="text-xs text-destructive mt-1.5"
                >
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="contact-message"
                className="block text-sm font-medium text-foreground mb-1.5"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                placeholder="Tell me about your project or opportunity..."
                rows={5}
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 input-focus-ring transition-shadow resize-none"
                aria-required="true"
                aria-describedby={
                  errors.message ? "contact-message-error" : undefined
                }
                {...register("message")}
                disabled={isSubmitting}
              />
              {errors.message && (
                <p
                  id="contact-message-error"
                  className="text-xs text-destructive mt-1.5"
                >
                  {errors.message.message}
                </p>
              )}
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="size-4 animate-spin" />
                  Sending…
                </span>
              ) : (
                "Send Message"
              )}
            </Button>
          </form>
        )}

        {/* Social links */}
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground mb-3">
            Or find me elsewhere:
          </p>
          <div className="flex flex-wrap gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${social.label} profile`}
                className="text-sm text-foreground/60 hover:text-foreground transition-colors link-underline-grow"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

Key changes:
- No terminal wrapper, no dark background
- Visible `<label>` elements (not `sr-only`)
- Standard borders and rounded inputs
- Clean button ("Send Message" not `$ send --message`)
- No typewriter success animation
- No green text glow
- Social links as clean text links, not terminal-style
- Formspree integration preserved exactly

- [ ] **Step 3: Delete TerminalWindow.tsx**

```bash
rm src/components/shared/TerminalWindow.tsx
```

(Only if no other file imports it — verify with `rg "TerminalWindow" src/`)

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/Contact.tsx src/components/shared/TerminalWindow.tsx
git commit -m "refactor: contact — replace terminal form with clean standard form; delete TerminalWindow"
```

---

### Task 11: Footer — Full Rewrite

**Files:**
- Modify: `src/components/shared/Footer.astro`

**Purpose:** Replace the dark terminal-themed footer with a clean, minimal footer.

- [ ] **Step 1: Replace Footer.astro**

```astro
---
const currentYear = new Date().getFullYear();

const footerLinks = [
  { label: "home", href: "/" },
  { label: "blog", href: "/blog" },
  { label: "about", href: "/about" },
  { label: "privacy", href: "/privacy" },
];
---

<footer class="border-t border-border">
  <div class="container mx-auto px-4 py-6">
    <div class="flex flex-col sm:flex-row items-center justify-between gap-3">
      <p class="text-xs text-muted-foreground">
        &copy; {currentYear} Divanshu Chauhan
      </p>

      <nav class="flex items-center gap-4 text-xs text-muted-foreground" aria-label="Footer navigation">
        {footerLinks.map((link) => (
          <a
            href={link.href}
            class="hover:text-foreground transition-colors"
          >
            {link.label}
          </a>
        ))}
        <a
          href="https://github.com/divkix/divkix.me"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View source code on GitHub"
          class="hover:text-foreground transition-colors"
        >
          source
        </a>
      </nav>
    </div>
  </div>
</footer>
```

Key changes:
- No dark background — uses normal site background
- No terminal prompt, no blinking cursor
- No `[src]` button, no status dot
- Simple `border-t` separator
- Copyright line + nav links
- `source` link instead of `[src]`

- [ ] **Step 2: Commit**

```bash
git add src/components/shared/Footer.astro
git commit -m "refactor: footer — replace terminal theme with clean minimal footer"
```

---

### Task 12: Navbar — Remove Gradient Border

**Files:**
- Modify: `src/components/shared/Navbar.tsx`

**Purpose:** Replace the gradient border-on-scroll with a simple transparent border.

- [ ] **Step 1: Replace the scroll border effect**

In the `Navbar` component, find the `<nav>` element (line 208) and replace its style. Change:

```tsx
<nav
  className="sticky top-0 z-50 w-full bg-background transition-all duration-300"
  style={
    scrolled
      ? {
          borderBottom: "1px solid transparent",
          borderImage:
            "linear-gradient(to right, var(--primary), var(--accent)) 1",
        }
      : undefined
  }
>
```

To:

```tsx
<nav
  className={cn(
    "sticky top-0 z-50 w-full bg-background/80 backdrop-blur-sm transition-all duration-300",
    scrolled ? "border-b border-border" : "border-b border-transparent",
  )}
>
```

This adds a subtle glass effect on scroll with a simple border — no gradient.

- [ ] **Step 2: Commit**

```bash
git add src/components/shared/Navbar.tsx
git commit -m "refactor: navbar — replace gradient border with simple border on scroll"
```

---

### Task 13: Verify Build, Type-Check, Lint

**Files:** None modified — verification only.

**Purpose:** Ensure the entire site still builds, type-checks, and passes linting after all the changes.

- [ ] **Step 1: Run type-check**

```bash
bun run type-check
```

Expected: No errors. If errors appear, they're likely unused imports or props — fix them in the relevant task file.

- [ ] **Step 2: Run lint**

```bash
bun run lint
```

Expected: No errors. If errors appear, run `bun run lint:fix` to auto-fix formatting issues.

- [ ] **Step 3: Run full build**

```bash
bun run build
```

Expected: Build succeeds. The build pipeline generates `posts.json`, creates OG images, validates content, builds Astro, and (if on production) submits IndexNow.

- [ ] **Step 4: (Optional) Preview the build**

```bash
bun run preview
```

Open `http://localhost:4321` and visually verify:
- Both light and dark themes render correctly
- No dot grid or noise visible
- No terminal effects visible
- Hero shows clean serif name + accent line
- Project cards have subtle borders, no mockups
- Contact form has visible labels
- Footer is minimal
- Blog pages still render correctly
- Mobile responsive at all breakpoints

- [ ] **Step 5: Commit**

```bash
# No files to commit — this is verification only
```

---

## Execution Order Dependency Graph

```
Task 1 (CSS) ──┐
Task 2 (Anim) ─┤
               ├──> Task 3 (BaseLayout) ──> Task 5 (Hero)
               ├──> Task 4 (SectionLabel) ──> Task 6, 7, 8, 9, 10
               ├──> Task 12 (Navbar)
               │
               ├──> Task 5 (Hero) ──── independent
               ├──> Task 6 (Highlights) ──── independent
               ├──> Task 7 (Projects) ──── depends on Task 1 (surface-raised)
               ├──> Task 8 (Experience) ──── depends on Task 1
               ├──> Task 9 (Skills) ──── depends on Task 1, Task 4
               ├──> Task 10 (Contact) ──── depends on Task 1, Task 4
               ├──> Task 11 (Footer) ──── independent after Task 1
               │
               └──> Task 13 (Verify) ──── after all tasks
```

**Recommended execution order:** 1, 2, 12, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13
