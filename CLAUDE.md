# Repository Guidelines

This file provides guidance for AI assistants working with the divkix.me portfolio codebase.

## Project Overview

Portfolio and blog built with **Astro 5**, **TypeScript**, **Tailwind CSS v4**, and **React islands**. Deployed to Cloudflare Pages as static output. Features a single-page homepage with sections (Hero, Highlights, Projects, Experience, Skills, Contact), a blog system using Astro Content Collections with MDX, and comprehensive SEO/structured data.

## Project Structure

```
/
├── src/
│   ├── components/           # React and Astro components
│   │   ├── sections/         # Homepage sections (Hero, Projects, etc.)
│   │   ├── shared/           # Shared UI components
│   │   ├── blog/             # Blog-specific components
│   │   ├── ui/               # shadcn/ui components
│   │   └── providers/        # React context providers
│   ├── layouts/              # Astro layouts (BaseLayout, BlogLayout)
│   ├── pages/                # Astro routes
│   ├── content/              # Blog posts (*.mdx)
│   ├── data/
│   │   └── site.config.ts    # Centralized content (skills, projects, experience)
│   ├── lib/                  # Utilities, schema.ts for JSON-LD
│   └── styles/
│       └── globals.css       # Tailwind v4, OKLCH color system, custom utilities
├── scripts/                  # Build pipeline scripts
│   ├── generate-posts-metadata.ts   # Extracts blog metadata → content/blog/posts.json
│   ├── generate-og-images.js        # Creates OpenGraph images
│   ├── validate-content.ts          # Validates MDX content vs posts.json sync
│   └── submit-indexnow.ts           # Search engine submission (production only)
├── content/
│   └── blog/
│       └── posts.json        # Generated metadata (consumed by astro.config.mjs)
├── astro.config.mjs          # Astro config with sitemap serialization
├── tsconfig.json             # Strict TypeScript (noUncheckedIndexedAccess, etc.)
├── biome.json                # Linting and formatting rules
└── postcss.config.mjs        # Tailwind v4 via @tailwindcss/postcss
```

## Build, Test, and Development Commands

```bash
bun run dev              # Start dev server on localhost:4321
bun run build            # Full production build (5-step pipeline)
bun run preview          # Preview production build locally
bun run lint             # Run Biome linter
bun run lint:fix         # Auto-fix lint issues
bun run format           # Format with Biome
bun run type-check       # Run astro check for TypeScript
bunx knip                # Detect unused exports/dependencies
```

**Build Pipeline (order matters):**
1. `generate-posts-metadata.ts` — Parses blog MDX via `src/lib/blog.ts` → `content/blog/posts.json`
2. `generate-og-images.js` — Generates OG images
3. `validate-content.ts` — Validates MDX frontmatter and posts.json synchronization (fails if blog posts are not regenerated)
4. `astro build` — Static build to `dist/`
5. `submit-indexnow.ts` — Submits to search engines (production only)

**Critical:** If you add/remove/rename a blog post, run `bun run prebuild` to regenerate `posts.json`. The blog module (`src/lib/blog.ts`) guarantees the artifact is always in sync with the source MDX files. Running `validate-content.ts` after metadata generation verifies the sync — it will fail if posts are stale.

## Coding Style and Conventions

**Languages & Tools:**
- TypeScript with strict flags (`noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `noUnusedLocals`)
- Biome for linting and formatting (2-space indentation, double quotes, trailing commas)
- Tailwind CSS v4 via PostCSS (not `@astrojs/tailwind` which is v3-only)

**Component Architecture:**
- **Static sections:** Use `.astro` files (zero client JS) — e.g., Hero, Footer
- **Interactive components:** Use `.tsx` with client directives:
  ```astro
  <Highlights client:visible />  <!-- Hydrate on scroll into view -->
  <Contact client:visible />
  <Toaster client:load />        <!-- Hydrate immediately -->
  ```

**Naming Patterns:**
- Components: PascalCase (`HeroSection.astro`, `ContactForm.tsx`)
- Utilities: camelCase (`remark-reading-time.ts`)
- Blog slugs: kebab-case, URL-safe (`/^[a-z0-9-]+$/`)

**Import Paths:**
- Use `@/` alias for `src/*` (configured in tsconfig.json)

## Blog Content Guidelines

Blog posts are MDX files in `src/content/blog/` with frontmatter schema:

```yaml
---
title: "Post Title"
date: "2026-01-15"           # YYYY-MM-DD format required
dateModified: "2026-01-20"   # Optional
excerpt: "Brief description"
tags: ["tag1", "tag2"]
published: true              # Must be true to appear
featured: true               # Optional, for highlighting
tldr: "One-line summary"     # Optional
keyTakeaways: ["point 1", "point 2"]  # Optional
faq:
  - q: "Question?"
    a: "Answer."
---
```

After adding/modifying blog posts, run `bun run prebuild` to regenerate metadata.

## Common Pitfalls

1. **Tailwind v4:** Do not use `@astrojs/tailwind` — use `@tailwindcss/postcss` in `postcss.config.mjs`
2. **Client Directives:** React components need `client:visible` or `client:load` to hydrate; without these they remain static
3. **Content Collections:** Unavailable in `astro.config.mjs` — that's why `posts.json` exists for sitemap dates
4. **TypeScript Strictness:** Bracket access returns `T | undefined` — handle undefined cases
5. **Biome Exclusions:** `.astro` files are excluded from linting (only TS/TSX/JS is linted)
6. **Slug Validation:** Blog slugs must match `/^[a-z0-9-]+$/` — validated at build time
7. **Date Format:** All dates must be `YYYY-MM-DD` (validated by Zod schema)

## Deployment

- Platform: Cloudflare Pages
- Output: Static (`output: "static"` in astro.config.mjs)
- Environment variable: `CF_PAGES_BRANCH=main` triggers IndexNow submission
