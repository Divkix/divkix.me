# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Portfolio site built with Astro 5, TypeScript, Tailwind CSS v4, and React (islands). Static output deployed to Cloudflare Pages. Features a single-page homepage with sections (Hero, Highlights, Projects, Experience, Skills, Contact), a blog system using Astro Content Collections with MDX, and comprehensive SEO/structured data.

## Build & Development Commands

```bash
bun run dev           # Start dev server on localhost:4321
bun run build         # Full production build (see Build Pipeline below)
bun run preview       # Preview production build locally
bun run lint          # Run Biome linter (biome check .)
bun run lint:fix      # Auto-fix lint issues (biome check --write)
bun run format        # Format code with Biome (biome format --write .)
bun run type-check    # Run astro check for TypeScript errors
bunx knip             # Detect unused exports, dependencies, and files
```

## Build Pipeline

`bun run build` executes a multi-step chain — order matters:

1. **`generate-posts-metadata.js`** — Parses all `src/content/blog/*.mdx` frontmatter, extracts TOC/reading time/related posts, and writes `content/blog/posts.json`. This JSON is consumed by `astro.config.mjs` for sitemap `lastmod` dates (content collections aren't available in astro config).
2. **`generate-og-images.js`** — Generates OpenGraph images for blog posts.
3. **`validate-content.ts`** — Ensures MDX files and `posts.json` are in sync (counts, slugs). Fails the build on mismatch.
4. **`astro build`** — Astro static build to `dist/`.
5. **`submit-indexnow.ts`** — Submits URLs to search engines via IndexNow. Only runs when `CF_PAGES_BRANCH=main` (Cloudflare Pages production deploy); skips on local builds and preview branches.

If you add/remove/rename a blog post, `posts.json` must be regenerated (`bun run prebuild`) or the build will fail at step 3.

## Architecture

### Astro Islands Pattern

Components are either `.astro` (static, zero JS) or `.tsx` (React, client-hydrated). React components requiring interactivity use client directives:

```astro
<Highlights client:visible />  <!-- Hydrate when scrolled into viewport -->
<Contact client:visible />
<Toaster client:load />        <!-- Hydrate immediately on page load -->
```

Static sections (Hero, Footer, SocialIcons) are `.astro` files — no client JS shipped.

### Content Pipeline

The blog content flows through a non-obvious pipeline spanning multiple files:

```
src/content/blog/*.mdx          → Source of truth for blog posts
    ↓ (prebuild)
scripts/generate-posts-metadata.js → Extracts frontmatter, TOC, reading time, related posts
    ↓
content/blog/posts.json         → Consumed by astro.config.mjs for sitemap lastmod dates
    ↓                             (content collections unavailable in config context)
astro.config.mjs                → Uses posts.json in sitemap serialize()
```

Schema defined in `src/content/config.ts` (Zod):
```
title, date (YYYY-MM-DD), dateModified?, excerpt, tags[], published, author?
tldr?, keyTakeaways[]?, faq[]?, howto?
```

### Site Configuration

All content centralized in `src/data/site.config.ts`: personal info, skills (with categories and proficiency scores), projects (with tags, links, periods), experience (nested positions per company), education, and social links. Exported as `const` for type inference.

### Styling

- Tailwind CSS v4 via `@tailwindcss/postcss` in `postcss.config.mjs` (not `@astrojs/tailwind` — that's v3 only)
- OKLCH color space with CSS variables in `src/styles/globals.css` (`:root` light, `.dark` dark mode)
- View Transitions via `<ClientRouter />` in BaseLayout

### Theme Handling

Theme script in BaseLayout runs inline (no FOUC):
1. Reads from localStorage or system preference
2. MutationObserver syncs class changes back to localStorage
3. View Transition hooks (`astro:before-swap`) apply theme to incoming document

### SEO & Structured Data

- JSON-LD schemas in `src/lib/schema.ts` (Person, WebSite, BlogPosting, BreadcrumbList, optional FAQ/HowTo)
- OpenGraph and Twitter meta tags in BaseLayout
- Sitemap via `@astrojs/sitemap` with custom serialization for blog dates
- RSS feed at `/rss.xml`, LLMs.txt via `@4hse/astro-llms-txt`

## TypeScript Strictness

The `tsconfig.json` uses aggressive strictness flags that affect how code must be written:
- `noUncheckedIndexedAccess`: Array/object bracket access returns `T | undefined`
- `exactOptionalPropertyTypes`: Can't assign `undefined` to optional properties
- `noUnusedLocals` / `noUnusedParameters`: No dead variables

## Common Pitfalls

1. **Tailwind v4**: No `@astrojs/tailwind` integration — use `@tailwindcss/postcss` in postcss config
2. **Client Directives**: React components need `client:visible` or `client:load` to hydrate
3. **Content Collections**: Only available in `.astro` files during build, not in `astro.config.mjs` — that's why `posts.json` exists
4. **TypeScript Paths**: Use `@/` alias (maps to `./src/*`)
5. **Biome, not ESLint/Prettier**: `.astro` files are excluded from Biome linting (only TS/TSX/JS)
6. **posts.json sync**: Adding/removing blog posts requires `bun run prebuild` to regenerate metadata, otherwise build validation fails
7. **Slug format**: Blog slugs must be URL-safe (`/^[a-z0-9-]+$/`), validated at build time
