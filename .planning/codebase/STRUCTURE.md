# Codebase Structure

**Analysis Date:** 2026-02-25

## Directory Layout

```
divkix.me/
├── src/                           # Source code (TypeScript/Astro/React)
│   ├── components/                # Reusable UI components
│   │   ├── blog/                  # Blog-specific components
│   │   ├── providers/             # React context providers
│   │   ├── sections/              # Homepage section components
│   │   │   ├── experience/        # Experience section
│   │   │   └── skills/            # Skills section
│   │   ├── shared/                # Shared layout components
│   │   └── ui/                    # Base UI components
│   ├── content/                   # Astro Content Collections
│   │   └── blog/                  # Blog post MDX files
│   ├── data/                      # Configuration and data
│   ├── layouts/                   # Layout templates
│   ├── lib/                       # Utility functions and hooks
│   │   └── examples/              # Example data
│   ├── pages/                     # Astro pages (file-based routing)
│   │   └── blog/                  # Blog routes
│   └── styles/                    # Global stylesheets
├── scripts/                       # Build scripts
├── content/                       # Generated content metadata
├── public/                        # Static assets
├── docs/                          # Documentation (if needed)
├── .planning/                     # GSD planning files
├── dist/                          # Build output (generated)
├── astro.config.mjs               # Astro configuration
├── tsconfig.json                  # TypeScript configuration
├── package.json                   # Dependencies
├── tailwind.config.mjs            # Tailwind CSS config (if separate)
├── postcss.config.mjs             # PostCSS config (Tailwind v4)
└── biome.json                     # Biome linter config
```

## Directory Purposes

**src/components/:**
- Purpose: All reusable React/Astro components
- Contains: `.astro` (zero-JS) and `.tsx` (React islands) files

**src/components/blog/:**
- Purpose: Blog-specific interactive components
- Contains: `ReadingProgress.tsx` (scroll progress indicator)

**src/components/sections/:**
- Purpose: Homepage section components matching SEO section structure
- Contains: Hero (static), Highlights, Projects, Experience, Skills, Contact
- Sub-dirs: `experience/`, `skills/` for grouped functionality

**src/components/shared/:**
- Purpose: Layout shell and chrome components used across pages
- Contains: `Navbar.tsx`, `Footer.astro`, `Toaster.tsx`, `ThemeToggle.tsx`, `ScrollProgress.tsx`

**src/components/ui/:**
- Purpose: Primitive UI components built with CVA (Class Variance Authority)
- Contains: `button.tsx` with variant props (default, secondary, ghost, link, destructive)

**src/content/:**
- Purpose: Astro Content Collections definitions and content
- Location: `config.ts` defines schema; `blog/` contains .mdx files

**src/data/:**
- Purpose: Central configuration object
- Contains: `site.config.ts` – single TypeScript const with all site metadata

**src/layouts/:**
- Purpose: Page layout templates
- Contains:
  - `BaseLayout.astro` – HTML shell with meta tags, theme script, analytics
  - `SiteLayout.astro` – Homepage layout (navbar, footer, optional scroll progress)
  - `BlogLayout.astro` – Blog post layout (navbar with client:load, reading progress)

**src/lib/:**
- Purpose: Utility functions and schemas
- Contains:
  - `utils.ts` – `cn()` (class merging), `formatDate()`
  - `schema.ts` – JSON-LD builders for Person, WebSite, BlogPosting, BreadcrumbList, FAQ, HowTo
  - `seo.ts` – baseUrl constant
  - `remark-reading-time.ts` – Astro Remark plugin for calculating reading time
- Sub-dirs: `examples/`, `hooks/` (if custom hooks exist)

**src/pages/:**
- Purpose: Astro file-based routing (maps to URLs)
- Contains:
  - `index.astro` → `/`
  - `about.astro` → `/about/`
  - `privacy.astro` → `/privacy/`
  - `socials.astro` → `/socials/`
  - `404.astro` → 404 handler
  - `rss.xml.ts` → `/rss.xml` (RSS feed)
  - `robots.txt.ts` → `/robots.txt`
  - `blog/index.astro` → `/blog/`
  - `blog/[slug].astro` → `/blog/{slug}/` (dynamic)

**src/styles/:**
- Purpose: Global CSS and animations
- Contains:
  - `globals.css` – Tailwind v4 setup, theme variables (OKLCH color space)
  - `animations.css` – Custom animation definitions

**scripts/:**
- Purpose: Build-time automation
- Contains:
  - `generate-posts-metadata.js` – Extract frontmatter from MDX → `content/blog/posts.json`
  - `generate-og-images.js` – Generate OpenGraph images for blog posts
  - `validate-content.ts` – Verify posts.json matches MDX files
  - `submit-indexnow.ts` – Notify search engines (production only)

**content/:**
- Purpose: Generated metadata (not committed)
- Contains: `blog/posts.json` – pre-generated blog metadata for `astro.config.mjs`

**public/:**
- Purpose: Static assets served at root
- Contains: Favicon, profile images, manually created OG images

## Key File Locations

**Entry Points:**
- `src/pages/index.astro` – Homepage (primary entry)
- `src/pages/blog/index.astro` – Blog listing page
- `src/pages/blog/[slug].astro` – Individual blog post (dynamic)
- `src/layouts/BaseLayout.astro` – All pages inherit this (meta, theme, analytics)

**Configuration:**
- `astro.config.mjs` – Astro build config (integrations, markdown, sitemap)
- `tsconfig.json` – TypeScript strict mode + path aliases (`@/*` → `./src/*`)
- `postcss.config.mjs` – PostCSS with Tailwind v4 `@tailwindcss/postcss`
- `biome.json` – Linter rules (excludes `.astro` files from TS/JS rules)
- `src/content/config.ts` – Blog content schema (Zod)

**Core Logic:**
- `src/data/site.config.ts` – Central data source (all content lives here)
- `src/lib/schema.ts` – JSON-LD schema generation
- `src/pages/blog/[slug].astro` – Blog post rendering (complex orchestration)

**Styling:**
- `src/styles/globals.css` – Tailwind v4 imports and theme variables
- `src/styles/animations.css` – Custom keyframe animations

**Testing:**
- Not detected in codebase (no test files)

## Naming Conventions

**Files:**

- **Astro components:** PascalCase, `.astro` extension
  - `src/components/sections/Hero.astro`
  - `src/layouts/BaseLayout.astro`

- **React components:** PascalCase, `.tsx` extension
  - `src/components/sections/Highlights.tsx`
  - `src/components/shared/Navbar.tsx`

- **Utilities:** camelCase, `.ts` extension
  - `src/lib/utils.ts`
  - `src/lib/schema.ts`

- **Pages:** lowercase-kebab-case for file-based routes
  - `src/pages/404.astro` → `/404`
  - `src/pages/blog/[slug].astro` → `/blog/{slug}/`

- **Scripts:** kebab-case, `.js` or `.ts`
  - `scripts/generate-posts-metadata.js`
  - `scripts/validate-content.ts`

**Directories:**

- **Semantic sections:** lowercase, plural
  - `components/`, `pages/`, `layouts/`, `styles/`

- **Feature grouping:** lowercase, matches component structure
  - `sections/`, `shared/`, `ui/`, `experience/`, `skills/`

- **Generated:** lowercase
  - `content/`, `dist/`, `public/`

## Where to Add New Code

**New Feature (Homepage Section):**

1. **Create component file:** `src/components/sections/[FeatureName].tsx` (React) or `.astro` (static)
2. **Add section data to:** `src/data/site.config.ts` (if config needed)
3. **Import and compose in:** `src/pages/index.astro` with appropriate client directive
4. **Add layout spacing:** Use `<div class="section-divider mx-auto max-w-4xl" />` to separate sections

**Example:**
```tsx
// src/components/sections/NewFeature.tsx
import { SectionLabel } from "@/components/shared/SectionLabel";
import { siteConfig } from "@/data/site.config";

export function NewFeature() {
  return (
    <section id="new-feature" className="container mx-auto px-4 py-12">
      <SectionLabel number="XX" label="feature name" />
      {/* Content here */}
    </section>
  );
}
```

**New Blog Post:**

1. **Create file:** `src/content/blog/post-slug.mdx` (slug must match `^[a-z0-9-]+$`)
2. **Add frontmatter:** title, date (YYYY-MM-DD), excerpt, tags, published: true
3. **Optional fields:** dateModified, tldr, keyTakeaways, faq, howto
4. **Run pre-build:** `bun run prebuild` to generate metadata
5. **Test:** `bun run build` validates post metadata matches posts.json

**Example frontmatter:**
```yaml
---
title: "Post Title"
date: "2026-02-25"
excerpt: "Brief description shown in listings."
tags: ["tag1", "tag2"]
published: true
tldr: "One-line summary"
keyTakeaways:
  - "Point 1"
  - "Point 2"
---
```

**New UI Component:**

1. **Create file:** `src/components/ui/[ComponentName].tsx`
2. **Use CVA for variants:** See `button.tsx` pattern
3. **Export function:** `export function ComponentName({ ... }) { }`
4. **Use in sections:** Import and compose, or export from shared

**New Utility Function:**

- **String manipulation, type helpers:** Add to `src/lib/utils.ts`
- **Date/time:** Add to `src/lib/utils.ts` (see `formatDate()`)
- **Hooks (React):** Create `src/lib/hooks/useHookName.ts`

**New Page:**

1. **For simple pages (about, privacy):** Create `src/pages/[name].astro`
2. **For dynamic routes:** Use brackets: `src/pages/blog/[slug].astro` (see blog pattern)
3. **For API routes:** Use `.ts` extension: `src/pages/api/endpoint.ts`

## Special Directories

**content/:**
- Purpose: Generated blog metadata
- Generated: Yes (by `scripts/generate-posts-metadata.js`)
- Committed: No (add to `.gitignore`)
- Regenerate: Run `bun run prebuild` after modifying blog posts

**dist/:**
- Purpose: Production build output (static HTML/CSS/JS)
- Generated: Yes (by `astro build`)
- Committed: No (generated on deploy)
- Deploy target: Cloudflare Pages points to `dist/`

**public/:**
- Purpose: Static assets served at site root
- Generated: No (manually created or committed)
- Committed: Yes (images, favicons, etc.)
- Note: OG images generated by `generate-og-images.js` → `public/og/blog/`

**.planning/:**
- Purpose: GSD orchestrator planning documents
- Generated: Yes (by `/gsd:*` commands)
- Committed: No (temporary planning)

**node_modules/:**
- Purpose: Package dependencies
- Generated: Yes (by `bun install`)
- Committed: No (use `bun.lock` for lockfile)

## Slug Format Validation

Blog slugs must match the pattern: `^[a-z0-9-]+$`

This is validated at build time by `validate-content.ts`. Invalid slugs:
- `post_with_underscores` ✗
- `POST-IN-CAPS` ✗
- `post title with spaces` ✗

Valid slugs:
- `post-title` ✓
- `my-post-123` ✓

---

*Structure analysis: 2026-02-25*
