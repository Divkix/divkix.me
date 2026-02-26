# Architecture

**Analysis Date:** 2026-02-25

## Pattern Overview

**Overall:** Astro Islands Architecture (Hybrid Static + Interactive)

**Key Characteristics:**
- Static Astro pages (zero JS) combined with React islands for interactivity
- Client-side hydration via `client:visible`, `client:idle`, `client:load` directives
- Content Collections for blog system with MDX rendering
- View Transitions for seamless SPA-like navigation
- Data centralized in TypeScript configuration with type inference
- Build-time SEO with JSON-LD structured data generation
- Static site output deployed to Cloudflare Pages

## Layers

**Static Layer (Astro Components):**
- Purpose: Server-rendered HTML with zero JavaScript overhead
- Location: `src/components/sections/Hero.astro`, `src/components/shared/Footer.astro`, `src/layouts/BaseLayout.astro`
- Contains: Page structure, layout shells, SEO metadata
- Depends on: `siteConfig` data, `@astrojs/sitemap`, `@astrojs/mdx`
- Used by: All pages, islands load within these shells

**Interactive Layer (React Components):**
- Purpose: Client-side interactivity with form handling, animations, state management
- Location: `src/components/sections/*.tsx`, `src/components/shared/*.tsx`
- Contains: Navbar, Contact form, animated stats, skills terminal, scroll progress
- Depends on: `react`, `react-hook-form`, `sonner` (toast), Intersection Observer API
- Used by: SiteLayout and BlogLayout via client directives

**Data Layer:**
- Purpose: Centralized configuration and content source of truth
- Location: `src/data/site.config.ts` (profiles, projects, experience, skills), `src/content/config.ts` (Zod schema)
- Contains: Personal metadata, project descriptions, experience timeline, blog frontmatter schema
- Depends on: Zod for runtime validation
- Used by: All components and build scripts

**Content Layer (Blog):**
- Purpose: MDX blog posts with metadata extraction and static generation
- Location: `src/content/blog/*.mdx` → `getCollection('blog')` in pages
- Contains: Blog post content with frontmatter (title, date, tags, optional FAQ/HowTo)
- Depends on: `@astrojs/mdx`, `remark-reading-time` plugin
- Used by: `src/pages/blog/[slug].astro` (dynamic static generation), build pipeline

**Build Pipeline Layer:**
- Purpose: Pre-build transformations required for static site generation
- Location: `scripts/generate-posts-metadata.js`, `scripts/generate-og-images.js`, `scripts/validate-content.ts`
- Contains: Metadata extraction, OpenGraph image generation, content validation
- Depends on: `sharp` (image generation), `gray-matter` (frontmatter parsing)
- Used by: `bun run build` (ordered execution)

**Utility Layer:**
- Purpose: Helper functions and schema generation
- Location: `src/lib/` (utils.ts, schema.ts, seo.ts, remark-reading-time.ts)
- Contains: CSS class merging, date formatting, JSON-LD schema builders, reading time calculation
- Depends on: `clsx`, `tailwind-merge`, `zod`
- Used by: Components and layout templates

## Data Flow

**Homepage Rendering:**

1. `src/pages/index.astro` renders static Hero component
2. Calls `<Highlights client:visible />` → React island hydrates when scrolled into view
3. Static section dividers separate interactive sections
4. `<ExperienceBento client:visible />`, `<Skills client:visible />`, `<Contact client:visible />` hydrate on demand
5. All islands use `siteConfig` data injected at build time (no API calls)
6. SiteLayout wraps with Navbar, Footer, theme script

**Blog Post Rendering:**

1. Build-time: `getStaticPaths()` reads published blog posts from `getCollection('blog')`
2. For each post: `generate-posts-metadata.js` extracts metadata → `posts.json`
3. `astro.config.mjs` reads `posts.json` to populate sitemap `lastmod` dates
4. At runtime: `src/pages/blog/[slug].astro` renders BlogLayout
5. BlogLayout includes `<Navbar client:load />` for immediate interaction
6. Optional `<ReadingProgress client:only="react" />` (no SSR needed)
7. Content rendered via `<Content />` (MDX output)
8. JSON-LD schemas (BlogPosting, BreadcrumbList, FAQ, HowTo) injected inline
9. Table of Contents auto-generated from h2/h3 headings (threshold: ≥3 headings)

**Contact Form Flow:**

1. User clicks Contact section (Intersection Observer triggers hydration)
2. React form initialized with `react-hook-form` + Zod validation
3. On submit: POST to email service (external API via form submission)
4. Toast notification from `sonner` library shows status
5. Success state triggers `<TypewriterSuccess />` animation
6. Form reset on successful submission

**Theme Switching:**

1. Inline script in BaseLayout runs before page content renders (prevents FOUC)
2. Checks localStorage for saved theme, falls back to system preference
3. Applies `dark` class to `<html>` root
4. MutationObserver syncs class changes back to localStorage
5. View Transition hook (`astro:before-swap`) applies theme to incoming document

## Key Abstractions

**SiteConfig Object:**
- Purpose: Single source of truth for all profile data
- Examples: `src/data/site.config.ts` exported as `const siteConfig`
- Pattern: Type-inferred record object (no separate types, uses `as const`)
- Consumed by: All components, build scripts, SEO generation
- Benefit: Changes propagate everywhere; type-safe without type files

**Island Directives:**
- Purpose: Granular control over React component hydration
- Pattern:
  - `client:visible` – Hydrate when element enters viewport (lazy)
  - `client:idle` – Hydrate after page interactive (deferred)
  - `client:load` – Hydrate immediately (blocking)
  - `client:only="react"` – Never SSR, only render on client
- Usage: `<Navbar client:idle />`, `<Contact client:visible />`

**Zod Schema for Content:**
- Purpose: Runtime validation of blog post frontmatter
- Location: `src/content/config.ts`
- Pattern: Defines required (title, date, excerpt, tags, published) and optional fields (tldr, FAQ, HowTo)
- Validation: Date format (YYYY-MM-DD regex), min string lengths
- Benefit: Type-safe content, fails build if post has invalid metadata

**JSON-LD Schema Builders:**
- Purpose: Centralized structured data generation for SEO
- Examples: `generatePersonSchema()`, `generateBlogAuthorSchema()`, `generateBlogPublisherSchema()`
- Location: `src/lib/schema.ts`
- Pattern: Functions that return schema objects injected as `<script type="application/ld+json">`
- Schemas used: Person, WebSite, BlogPosting, BreadcrumbList, FAQPage, HowTo

**Build Pipeline Sequence:**
- Purpose: Ensure blog metadata is available in `astro.config.mjs` (Content Collections not available in config)
- Order:
  1. `generate-posts-metadata.js` → `content/blog/posts.json`
  2. `generate-og-images.js` → `public/og/blog/*.png`
  3. `validate-content.ts` → verify posts.json matches MDX files
  4. `astro build` → static site generation
  5. `submit-indexnow.ts` → notify search engines (production only)

## Entry Points

**Homepage:**
- Location: `src/pages/index.astro`
- Triggers: Browser navigation to `/`
- Responsibilities: Composes section components (Hero, Highlights, Projects, Experience, Skills, Contact) via SiteLayout

**Blog Index:**
- Location: `src/pages/blog/index.astro`
- Triggers: Navigation to `/blog/`
- Responsibilities: Lists published blog posts with filtering/pagination

**Blog Post:**
- Location: `src/pages/blog/[slug].astro`
- Triggers: Navigation to `/blog/{slug}/`
- Responsibilities: Renders individual post with TOC, reading progress, structured data

**API Routes:**
- `src/pages/rss.xml.ts` – RSS feed generation (consumed by `@astrojs/rss`)
- `src/pages/robots.txt.ts` – Robot exclusion file
- `src/pages/sitemap-index.xml` – Sitemap index (generated by `@astrojs/sitemap`)

**Special Pages:**
- `src/pages/404.astro` – 404 Not Found
- `src/pages/about.astro` – About page
- `src/pages/privacy.astro` – Privacy policy

## Error Handling

**Strategy:** Fail-fast at build time; graceful degradation at runtime

**Patterns:**

- **Content Validation:** `validate-content.ts` fails build if blog post count doesn't match `posts.json` (prevents inconsistent deployment)
- **Schema Validation:** Zod validates frontmatter on collection read; invalid YAML causes build error
- **Missing posts.json:** astro.config.mjs logs warning if `posts.json` not found (uses build date for sitemap)
- **Form Validation:** React Hook Form + Zod client-side; toast notifies user of validation errors
- **Intersection Observer:** Graceful fallback if unsupported (older browsers); elements render without animation
- **Theme Script:** Runs inline to prevent FOUC; localStorage errors caught silently (uses system preference)

## Cross-Cutting Concerns

**Logging:** Console-based during build (`console.warn` for missing metadata); no runtime logging

**Validation:**
- Build-time: Zod schema for content, slug format validation (`^[a-z0-9-]+$`)
- Runtime: React Hook Form for user input; form submission validation

**Authentication:** None (static site); contact form likely uses third-party service (endpoint not visible)

**Theme:**
- Managed via CSS classes (`.dark` on root)
- Persisted to localStorage
- Synced via MutationObserver
- Prefers `@media (prefers-color-scheme: dark)` if no stored preference
- Applied before DOM render to prevent theme flash

**SEO:**
- Meta tags in BaseLayout (title, description, OG, Twitter, canonical)
- JSON-LD schemas inline in page head
- View Transitions preserve meta tags across navigation
- Sitemap with custom serialization for blog dates
- RSS feed for blog discovery
- Identity verification via `rel="me"` links

**Performance:**
- Static output (no server rendering overhead)
- Inline critical CSS (`build.inlineStylesheets: "always"`)
- Prefetch all pages (`prefetch.prefetchAll: true`)
- Lazy hydration for islands (`client:visible`, `client:idle`)
- Sharp image optimization for OG images
- Gzip compression configured server-side (Cloudflare Pages)

---

*Architecture analysis: 2026-02-25*
