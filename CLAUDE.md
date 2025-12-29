# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Portfolio site built with Astro 5, TypeScript, Tailwind CSS v4, and React (islands). Static output deployed to any static host. Features a single-page homepage with sections (Hero, Highlights, Projects, Experience, Skills, Contact), a blog system using Astro Content Collections with MDX, and comprehensive SEO/structured data.

## Build & Development Commands

```bash
bun run dev           # Start dev server on localhost:4321
bun run build         # Production build (outputs to dist/)
bun run preview       # Preview production build locally
bun run lint          # Run Biome linter
bun run lint:fix      # Auto-fix lint issues
bun run format        # Format code with Biome
bun run type-check    # Run astro check for TypeScript errors
```

## Architecture

### Astro Islands Pattern

Components are either `.astro` (static, server-rendered) or `.tsx` (React, client-hydrated). React components requiring interactivity use client directives:

```astro
<Highlights client:visible />  <!-- Hydrate when visible in viewport -->
<Contact client:visible />
<Toaster client:load />        <!-- Hydrate immediately on page load -->
```

Static sections (Hero, Experience, Skills, Footer, SocialIcons) are `.astro` files - no client JS shipped.

### Content Collections

Blog posts use Astro's Content Collections API. Schema defined in `src/content/config.ts`:

```typescript
// Frontmatter fields
title, date, dateModified?, excerpt, tags[], published, author?
tldr?, keyTakeaways[]?, faq[]?, howto?
```

Posts live in `src/content/blog/*.mdx`. Access via `getCollection("blog")` at build time.

**Important:** A parallel `content/blog/posts.json` is pre-generated for the sitemap integration (Astro config runs before content collections are available). This is read in `astro.config.mjs` to populate `lastmod` dates.

### File Structure

```
src/
├── pages/              # File-based routing
│   ├── index.astro     # Homepage (Hero → Highlights → Projects → Experience → Skills → Contact)
│   ├── blog/
│   │   ├── index.astro # Blog listing
│   │   └── [slug].astro # Dynamic blog post pages
│   ├── about.astro, privacy.astro, 404.astro
│   ├── rss.xml.ts      # RSS feed generation
│   └── robots.txt.ts   # Dynamic robots.txt
├── layouts/
│   ├── BaseLayout.astro    # Root HTML, meta tags, View Transitions, theme script
│   ├── SiteLayout.astro    # Navbar + Footer wrapper
│   └── BlogLayout.astro    # Blog-specific layout with reading progress
├── components/
│   ├── sections/       # Page sections (Hero.astro, Projects.tsx, etc.)
│   ├── shared/         # Navbar.tsx, Footer.astro, ThemeToggle.tsx
│   ├── ui/             # shadcn-style primitives (Button, Card, Input, etc.)
│   └── blog/           # Blog-specific components
├── content/
│   ├── blog/*.mdx      # Blog post files
│   └── config.ts       # Content collection schema (Zod)
├── data/
│   └── site.config.ts  # All site content (skills, projects, experience, socials)
├── lib/
│   ├── utils.ts        # cn() helper, formatDate(), etc.
│   ├── schema.ts       # JSON-LD structured data generators
│   ├── seo.ts          # SEO utilities, baseUrl constant
│   └── remark-reading-time.mjs  # Remark plugin for reading time
└── styles/
    ├── globals.css     # Tailwind imports, CSS variables, custom styles
    └── animations.css  # Keyframe animations
```

### Styling

- Tailwind CSS v4 configured via `postcss.config.mjs` (not @astrojs/tailwind - that's v3 only)
- OKLCH color space for perceptual uniformity
- CSS variables in `src/styles/globals.css` for theming (`:root` light, `.dark` dark mode)
- View Transitions enabled via `<ClientRouter />` in BaseLayout

### Site Configuration

All content centralized in `src/data/site.config.ts`:
- Personal info, tagline, contact
- Skills array with categories and proficiency scores
- Projects array with tags, links, periods
- Experience with nested positions per company
- Education and social links

Exported as `const` for type inference.

## Key Patterns

### Adding Blog Posts

1. Create `src/content/blog/your-post.mdx`:
```mdx
---
title: "Post Title"
date: "2025-01-15"
excerpt: "Brief description"
tags: ["tag1", "tag2"]
published: true
---

Content with MDX support...
```

2. Post automatically appears on `/blog` and `/blog/your-post`

### SEO & Structured Data

- JSON-LD schemas generated in `src/lib/schema.ts` (Person, WebSite)
- Blog posts include BlogPosting, BreadcrumbList, optional FAQ/HowTo schemas
- OpenGraph and Twitter meta tags in BaseLayout
- Sitemap via `@astrojs/sitemap` with custom serialization for blog dates
- RSS feed at `/rss.xml`
- LLMs.txt files via `@4hse/astro-llms-txt` integration

### React Islands

Interactive components are React with client hydration:
- `Highlights.tsx` - Count-up animations triggered by viewport visibility
- `Projects.tsx` - Tag filtering with state
- `Contact.tsx` - Form with react-hook-form + Zod validation
- `Navbar.tsx` - Mobile menu state, smooth scrolling
- `ThemeToggle.tsx` - Dark/light mode toggle

### Theme Handling

Theme script in BaseLayout runs inline (no FOUC):
1. Reads from localStorage or system preference
2. MutationObserver syncs class changes back to localStorage
3. View Transition hooks (`astro:before-swap`) apply theme to incoming document

## Common Pitfalls

1. **Tailwind v4**: No `@astrojs/tailwind` integration - use `@tailwindcss/postcss` in postcss config
2. **Client Directives**: React components need `client:visible` or `client:load` to hydrate
3. **Content Collections**: Only available in `.astro` files during build, not in `astro.config.mjs`
4. **TypeScript Paths**: Use `@/` alias (maps to `./src/*`)
5. **Biome**: This project uses Biome, not ESLint/Prettier
