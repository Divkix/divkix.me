# Repository Guidelines

This file provides guidance for AI assistants working with the divkix.me portfolio codebase.

## Project Overview

Portfolio and blog built with **Astro 7**, **TypeScript**, **Tailwind CSS v4**, and **React islands**. Deployed to Cloudflare as static output served via Workers static assets. Features a single-page homepage (Hero, Highlights, Recent Writing, Projects, Contact), additional marketing/profile pages (`/about`, `/resume`, `/divkix`, `/pricing`, `/socials`, `/mentions`, `/privacy`), a blog system using Astro Content Collections with MDX, and comprehensive SEO/structured data (JSON-LD, OG images, IndexNow, `llms.txt`).

## Project Structure

```
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
├── astro.config.mjs          # Astro config: integrations + sitemap serialization + llms.txt
├── wrangler.jsonc            # Cloudflare Workers static-assets config (serves ./dist)
├── tsconfig.json             # Strict TypeScript (extends astro/tsconfigs/strict)
├── biome.json                # Linting and formatting rules
├── knip.json                 # Unused export/dependency detection
└── postcss.config.mjs        # Tailwind v4 via @tailwindcss/postcss
```

> Note: There is **no** `src/components/ui/` (shadcn) or `src/components/providers/` directory. Component groups are only `blog/`, `sections/` (with `experience/` and `skills/`), and `shared/`. The content config lives at `src/content.config.ts` (not `src/content/config.ts`).

## Build, Test, and Development Commands

```bash
bun run dev              # Start dev server (astro dev) on localhost:4321
bun run build            # Full production build (4-step pipeline)
bun run preview          # Preview production build locally
bun run lint             # Run Biome check (biome check .)
bun run lint:fix         # Auto-fix lint issues (biome check --write)
bun run format           # Format with Biome (biome format --write .)
bun run type-check       # astro check && tsc --noEmit
bun run check:citations  # GEO/SEO: enforce citation density in posts (manual)
bun run audit:seo        # Assert production SEO/config invariants (manual)
bunx knip                # Detect unused exports/dependencies
```

Package manager is **bun@1.3.14**. `prepare` runs `husky`; staged `*.{js,jsx,ts,tsx,json,css,md}` files run `biome check --write` + `biome format --write` via lint-staged.

**Build Pipeline (`bun run build`, `&&`-chained — any failure aborts):**
1. `prebuild`:
   - `node scripts/generate-posts-metadata.js` — Parses blog MDX → `content/blog/posts.json`
   - `node scripts/generate-og-images.js` — Generates OG images into `public/og/`
2. `bun run scripts/validate-content.ts` — Validates published MDX matches `posts.json`
3. `astro build` — Static build to `dist/`
4. `bun run scripts/submit-indexnow.ts` — Submits sitemap URLs to IndexNow (only when `CF_PAGES_BRANCH=main`; never fails the build)

**Manual scripts (not in the build):** `check-citation-density.ts`, `seo-production-audit.ts`, and `generate-favicons.ts`.

**Critical:** If you add/remove/rename a blog post, run `bun run prebuild` to regenerate `posts.json` or the build fails at step 2 with a count/slug mismatch.

## Coding Style and Conventions

**Languages & Tools:**
- TypeScript extending `astro/tsconfigs/strict` with extra flags: `noUnusedLocals`, `noUnusedParameters`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `noImplicitReturns`, `noFallthroughCasesInSwitch`. (`ignoreDeprecations: "6.0"` for TypeScript 6.)
- Biome for linting and formatting: 2-space indent, double quotes, trailing commas (`all`), semicolons always, line width 80.
- Tailwind CSS v4 via PostCSS (`@tailwindcss/postcss`) — there is no `tailwind.config.js` and no `@astrojs/tailwind`.

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
date: "2026-01-15"           # YYYY-MM-DD (regex + valid-date enforced)
dateModified: "2026-01-20"   # Optional, same format
excerpt: "Brief description"
tags: ["tag1", "tag2"]
published: false             # Defaults to false; must be true to appear
featured: false              # Optional, defaults false
author: "Divanshu Chauhan"   # Optional, defaults to this
seoTitle: "..."              # Optional
seoDescription: "..."        # Optional
coverAlt: "..."              # Optional
tldr: "One-line summary"     # Optional
keyTakeaways: ["point 1"]    # Optional
faq:                         # Optional
  - q: "Question?"
    a: "Answer."
reviewedBy: "..."            # Optional (E-E-A-T)
sources: ["https://..."]     # Optional, must be valid URLs
howToSteps:                  # Optional (HowTo schema)
  - name: "Step"
    text: "Detail"
    url: "https://..."       # Optional, must be valid URL
---
```

After adding/modifying blog posts, run `bun run prebuild` to regenerate `posts.json`.

## Common Pitfalls

1. **Tailwind v4:** Do not use `@astrojs/tailwind` — use `@tailwindcss/postcss` in `postcss.config.mjs`. No `tailwind.config.js` exists; theme is mapped in `src/styles/globals.css` via `@theme`.
2. **Client Directives:** React components need a `client:*` directive to hydrate; without one they render static.
3. **Content Collections in config:** `astro:content` is unavailable in `astro.config.mjs`, so `content/blog/posts.json` supplies blog dates to the sitemap `serialize()`.
4. **TypeScript Strictness:** Bracket access returns `T | undefined` (`noUncheckedIndexedAccess`) — handle undefined cases.
5. **Biome Exclusions:** `.astro` files are NOT linted (excluded in `biome.json`); only JS/TS/TSX is. `content/blog/posts.json` and `public/` are excluded from formatting.
6. **Slug Validation:** Slugs are checked against `/^[a-z0-9-]+$/` in `validate-content.ts` (warning), and `posts.json` must match published MDX (hard failure).
7. **Date Format:** All dates must be `YYYY-MM-DD` (Zod regex + valid-date refinement in `content.config.ts`).
8. **Generated files:** Do not hand-edit `content/blog/posts.json` or files under `public/og/` — they are generated by the prebuild scripts.

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
