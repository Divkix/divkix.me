# Repository Guidelines

This file provides guidance for AI assistants working with the divkix.me portfolio codebase.

## Project Overview

Portfolio and blog built with **Astro 7**, **TypeScript**, **Tailwind CSS v4**, and **React islands**. Deployed to Cloudflare as static output served via Workers static assets. Features a single-page homepage (Hero, Highlights, Projects, Recent Writing, Contact), additional marketing/profile pages (`/about`, `/resume`, `/divkix`, `/pricing`, `/socials`, `/mentions`, `/privacy`), a blog system using Astro Content Collections with MDX, and comprehensive SEO/structured data (JSON-LD, OG images, IndexNow, `llms.txt`).

## Project Structure

````
/
├── src/
│   ├── components/
│   │   ├── blog/             # Blog-specific React (ReadingProgress)
│   │   ├── sections/         # Page sections (Hero, Highlights, Projects, Contact, RecentWriting)
│   │   │   ├── experience/   # ExperienceBentoStatic.astro
│   │   │   └── skills/       # Skills.tsx + skillsUtils.ts + index.ts barrel
│   │   └── shared/           # Cross-page UI (Navbar, Footer, ThemeToggle, Toaster, etc.)
│   ├── layouts/              # BaseLayout, SiteLayout, BlogLayout (Astro)
│   ├── pages/                # Astro routes + API endpoints (rss.xml.ts, robots.txt.ts)
│   ├── content/blog/         # Blog posts (*.mdx)
│   ├── content.config.ts     # Content Collections config + blog Zod schema
│   ├── data/site.config.ts   # Centralized content (bio, skills, projects, experience) + NOINDEX_PATHS
│   ├── lib/                  # utils.ts, seo.ts, schema.ts (JSON-LD), throttledScroll.ts
│   ├── env.d.ts              # Astro/font module + ImportMetaEnv types
│   └── styles/               # tokens.css, globals.css (Tailwind v4 entry), animations.css
├── scripts/                  # Build pipeline + manual QA scripts (see below)
├── content/blog/posts.json   # Generated metadata (consumed by scripts + astro.config.mjs)
├── public/                   # Static assets, OG images, _headers, _redirects, favicons
├── .github/                  # dependabot.yml + opencode.yml (AI bot trigger; no build CI)
├── tsconfig.json             # Strict TypeScript (extends astro/tsconfigs/strict)
├── .oxlintrc.json            # Oxlint rules (JS/TS/React/a11y)
├── .oxfmtrc.json             # Oxfmt formatting (80 width, 2-space, double quotes)
├── vite.config.ts            # vite-plus: lint/staged + fmt config
└── knip.json                 # Unused export/dependency detection

> Note: There is **no** `src/components/ui/` (shadcn) or `src/components/providers/` directory. Component groups are only `blog/`, `sections/` (with `experience/` and `skills/`), and `shared/`. The content config lives at `src/content.config.ts` (not `src/content/config.ts`).
## Build, Test, and Development Commands

```bash
pnpm run dev             # Start dev server (astro dev) on localhost:4321
pnpm run build           # Full production build (4-step pipeline)
pnpm run preview         # Preview production build locally
pnpm run lint            # Lint with Oxlint (oxlint .)
pnpm run lint:fix        # Auto-fix lint issues (oxlint --fix .)
pnpm run format          # Format with Oxfmt (oxfmt --write .)
pnpm run format:check    # Check formatting (oxfmt --check .)
pnpm run type-check      # astro check && tsc --noEmit
pnpm run check:citations # GEO/SEO: enforce citation density in posts (manual)
pnpm run audit:seo       # Assert production SEO/config invariants (manual)
pnpx knip                # Detect unused exports/dependencies
````

Package manager is **pnpm@11.10.0**. `prepare` runs `vp config`; staged `*.{js,jsx,ts,tsx,json,css,md}` files run `oxlint --fix` + `oxfmt --write` via `vite-plus` staged hooks (`vite.config.ts`).
**Build Pipeline (`pnpm run build`, `&&`-chained — any failure aborts):**

1. `prebuild`:
   - `node scripts/generate-posts-metadata.js` — Parses blog MDX → `content/blog/posts.json`
   - `node scripts/generate-og-images.js` — Generates OG images into `public/og/`
2. `pnpm run scripts/validate-content.ts` — Validates published MDX matches `posts.json`
3. `astro build` — Static build to `dist/`
4. `pnpm run scripts/submit-indexnow.ts` — Submits sitemap URLs to IndexNow (only when `CF_PAGES_BRANCH=main`; never fails the build)

**Manual scripts (not in the build):** `check-citation-density.ts`, `seo-production-audit.ts`, and `generate-favicons.ts`.

**Critical:** If you add/remove/rename a blog post, run `pnpm run prebuild` to regenerate `posts.json` or the build fails at step 2 with a count/slug mismatch.

**Languages & Tools:**

- TypeScript extending `astro/tsconfigs/strict` with extra flags: `noUnusedLocals`, `noUnusedParameters`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `noImplicitReturns`, `noFallthroughCasesInSwitch`. (`ignoreDeprecations: "6.0"` for TypeScript 6.)
- Oxlint for linting + Oxfmt for formatting: 2-space indent, double quotes, trailing commas (`all`), semicolons always, line width 80. Config in `.oxlintrc.json` / `.oxfmtrc.json`.
- Tailwind CSS v4 via the `@tailwindcss/vite` plugin (registered in `astro.config.mjs` under `vite.plugins`) — there is no `tailwind.config.js`, no `postcss.config.mjs`, and no `@astrojs/tailwind`.
  **Component Architecture:**
- **Static sections:** Use `.astro` files (zero client JS) — e.g., `Hero.astro`, `RecentWriting.astro`, `Footer.astro`, `ExperienceBentoStatic.astro`.
- **Interactive components:** Use `.tsx` with client directives. Directives used across the app:
  ```astro
  <Highlights client:visible />        <!-- hydrate on scroll into view -->
  <Projects client:visible />
  <Contact client:visible />
  <Navbar client:idle />               <!-- hydrate when idle (SiteLayout) -->
  <ScrollProgress client:idle />
  <Navbar client:load />               <!-- hydrate immediately (BlogLayout) -->
  <ReadingProgress client:only="react" />
  ```

**Naming Patterns:**

- Components: PascalCase (`Hero.astro`, `Contact.tsx`)
- Utilities: camelCase (`throttledScroll.ts`, `skillsUtils.ts`)
- Blog slugs: kebab-case, URL-safe (`/^[a-z0-9-]+$/`)

**Import Paths:**

- Use `@/` alias for `src/*` (configured in tsconfig.json)

## Centralized Content

`src/data/site.config.ts` exports `siteConfig` (`as const`) — bio strings, `address`, `seo`, `faq`, `facts`, `skills`, `experience`, `education`, `projects`, `socials` — plus `NOINDEX_PATHS` (currently `["/mentions"]`, consumed by the sitemap filter and page noindex meta). Edit content here rather than in components.

## Blog Content Guidelines

Blog posts are MDX files in `src/content/blog/` loaded via a glob collection. Frontmatter schema (`src/content.config.ts`):

```yaml
---
title: "Post Title"
date: "2026-01-15" # YYYY-MM-DD (regex + valid-date enforced)
dateModified: "2026-01-20" # Optional, same format
excerpt: "Brief description"
tags: ["tag1", "tag2"]
published: false # Defaults to false; must be true to appear
featured: false # Optional, defaults false
author: "Divanshu Chauhan" # Optional, defaults to this
seoTitle: "..." # Optional
seoDescription: "..." # Optional
coverAlt: "..." # Optional
tldr: "One-line summary" # Optional
keyTakeaways: ["point 1"] # Optional
faq: # Optional
  - q: "Question?"
    a: "Answer."
reviewedBy: "..." # Optional (E-E-A-T)
sources: ["https://..."] # Optional, must be valid URLs
howToSteps: # Optional (HowTo schema)
  - name: "Step"
    text: "Detail"
    url: "https://..." # Optional, must be valid URL
---
```

After adding/modifying blog posts, run `bun run prebuild` to regenerate `posts.json`.

5. **Oxlint/Oxfmt Exclusions:** `.astro` files are NOT linted (via `ignorePatterns` in `.oxlintrc.json`); only JS/TS/TSX is. `content/blog/posts.json` and `public/` are excluded from formatting (via `ignorePatterns` in `.oxfmtrc.json`).

## Deployment

- Platform: Cloudflare (Workers static assets via `wrangler.jsonc`, serving `./dist`).
- Output: Static (`output: "static"`, `trailingSlash: "never"` in `astro.config.mjs`).
- Security/caching headers and redirects: `public/_headers` and `public/_redirects` (includes a CSP allowing `formspree.io` for the contact form and `analytics.divkix.me`).
- No GitHub Actions build/deploy workflow — Cloudflare builds from Git. `.github/workflows/opencode.yml` is only an AI-assistant comment trigger.
- `CF_PAGES_BRANCH=main` (injected by the Cloudflare environment) gates the IndexNow submission step.

## Maintaining This File

This file is **not** auto-generated. When you make changes that affect anything
documented here — build pipeline, scripts, env vars, routes, key systems,
dependencies, directory layout, or code-style rules — update the relevant
section in the same change so it stays accurate. `AGENTS.md` is a symlink to
this file, so edit `CLAUDE.md`.
