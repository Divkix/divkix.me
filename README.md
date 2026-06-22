# divkix.me

My personal site. Built with Astro, TypeScript, Tailwind v4, and an embarrassing amount of coffee. It's a static portfolio + blog that lives on Cloudflare Pages.

[![Astro](https://img.shields.io/badge/Astro-5-BC52EE?logo=astro&logoColor=white)](https://astro.build)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## What's here

- **Homepage** — Single page with smooth-scrolling sections (Hero, Highlights, Projects, Experience, Skills, Contact)
- **Blog** — MDX posts with reading time, table of contents, and OG images that get auto-generated at build time
- **Dark mode** — Follows your system preference, no flash of unstyled content
- **SEO stuff** — JSON-LD, OpenGraph, sitemap, RSS, all the usual suspects
- **LLMs.txt** — For the AI crawlers that want a quick summary

## Tech stack

| Thing | Choice |
|-------|--------|
| Framework | Astro 5 |
| Language | TypeScript (strict mode, because why not) |
| Styling | Tailwind CSS v4 via PostCSS |
| UI | shadcn/ui primitives |
| Forms | React Hook Form + Zod |
| Icons | Lucide React |
| Linting | Biome (one tool beats two tools) |
| Package manager | Bun |
| Hosting | Cloudflare Pages |

## Getting started

```bash
# Clone it
git clone https://github.com/divkix/divkix.me.git
cd divkix.me

# Install deps
bun install

# Dev server
bun run dev
# → http://localhost:4321
```

## Scripts

| Command | What it does |
|---------|-------------|
| `bun run dev` | Start dev server |
| `bun run build` | Full production build (regenerates metadata, validates content, builds static files, submits to search engines) |
| `bun run preview` | Preview the production build locally |
| `bun run lint` | Run Biome linter |
| `bun run lint:fix` | Auto-fix lint issues |
| `bun run format` | Format everything with Biome |
| `bun run type-check` | TypeScript + Astro type checking |
| `bun run check:citations` | Check blog post citation density |
| `bun run audit:seo` | Run SEO production audit |

### Build pipeline scripts (in `/scripts/`)

These run automatically during `bun run build`, but you can run them individually:

| Script | What it does |
|--------|-------------|
| `generate-posts-metadata.js` | Parse MDX frontmatter → `content/blog/posts.json` |
| `generate-og-images.js` | Generate OG images for each blog post |
| `generate-favicons.ts` | Generate favicons from the SVG source |
| `validate-content.ts` | Make sure MDX files and `posts.json` are in sync |
| `submit-indexnow.ts` | Tell search engines about new content (production only) |
| `check-citation-density.ts` | Check how "citation-dense" blog posts are |
| `seo-production-audit.ts` | Production SEO audit |

**Note:** If you add, remove, or rename a blog post, run `bun run prebuild` to regenerate `posts.json` or the build will fail at the validation step.

## Project structure

```
src/
  pages/              # Astro routes
    index.astro       # Homepage
    blog/             # Blog listing + posts
    about.astro       # About page
    divkix.astro      # Quick links / bio page
    privacy.astro     # Privacy policy
    socials.astro     # Social links page
    404.astro         # 404 page
    robots.txt.ts     # Robots.txt generation
    rss.xml.ts        # RSS feed
  layouts/
    BaseLayout.astro  # Root HTML, meta, View Transitions
    SiteLayout.astro  # Navbar + Footer wrapper
    BlogLayout.astro  # Blog-specific layout
  components/
    sections/         # Homepage sections (Hero, Projects, ExperienceBento, etc.)
    shared/           # Navbar, Footer, ThemeToggle, Toaster, etc.
    blog/             # Blog-specific components
    ui/               # shadcn-style primitives
    providers/        # React context providers
  content/
    blog/*.mdx        # Blog post files
  data/
    site.config.ts    # All site content (skills, projects, experience, etc.)
  lib/
    utils.ts          # Helper functions
    schema.ts         # JSON-LD structured data
    seo.ts            # SEO utilities
    hooks/            # React hooks
    examples/         # Code examples
  styles/
    globals.css       # Tailwind v4, OKLCH colors, custom utilities
scripts/              # Build pipeline scripts
public/               # Static assets (favicons, images)
content/blog/
  posts.json          # Generated metadata (consumed by astro.config.mjs)
```

## Want to fork this?

Go for it. It's MIT-licensed. Here's what you'll want to change:

### 1. Personal info

Edit `src/data/site.config.ts`:

```typescript
export const siteConfig = {
  name: "Your Name",
  handle: "yourhandle",
  tagline: "What you do",
  location: "Your Location",
  email: "your@email.com",
  // ...update skills, projects, experience, etc.
};
```

### 2. Site URL

Update `astro.config.mjs`:

```javascript
export default defineConfig({
  site: "https://your-domain.com",
  // ...
});
```

### 3. Contact form

The contact form uses Formspree. Replace the endpoint in `src/components/sections/Contact.tsx` (~line 71):

```typescript
const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
```

### 4. Analytics

The analytics script is in `src/layouts/BaseLayout.astro` (~lines 153–158). Replace with your own or remove it:

```html
<script
  is:inline
  async
  src="https://your-analytics-provider.com/script.js"
  data-website-id="YOUR_WEBSITE_ID"
></script>
```

Some privacy-friendly options: [Umami](https://umami.is), [Plausible](https://plausible.io), or just remove it entirely.

### 5. Twitter handle

Update the Twitter meta tags in `src/layouts/BaseLayout.astro` (~lines 78–79):

```html
<meta name="twitter:creator" content="@yourhandle" />
<meta name="twitter:site" content="@yourhandle" />
```

### 6. Content

**Blog posts:** Delete the existing ones in `src/content/blog/` and write your own. Frontmatter looks like:

```mdx
---
title: "Your Post Title"
date: "2026-01-15"
excerpt: "Brief description"
tags: ["tag1", "tag2"]
published: true
---

Your content here...
```

**Images:**
- Replace `/public/divanshu-chauhan.jpeg` with your photo
- Update `/public/og-image.png` (the site-wide OG image is generated by `scripts/generate-og-images.js` during build)
- Regenerate favicons with `bun run scripts/generate-favicons.ts`

### 7. Deploy

**Cloudflare Pages (what I use):**
1. Push to GitHub
2. Connect repo at [pages.cloudflare.com](https://pages.cloudflare.com)
3. Build command: `bun run build`
4. Output directory: `dist`

**Vercel:** Import at [vercel.com](https://vercel.com), framework preset: Astro, build command: `bun run build`, output: `dist`.

**Netlify:** Import at [netlify.com](https://netlify.com), build command: `bun run build`, publish directory: `dist`.

**GitHub Pages:** Add a workflow (see the README of any Astro template for the exact YAML).

## Why I chose this stack

**Cloudflare Pages:** Global edge network, zero cold starts, free tier, automatic HTTPS. Basically it just works and I don't have to think about it.

**Astro Islands:** Ships zero JS by default. Only the interactive bits (contact form, theme toggle) get hydrated. The site is fast without me having to do anything special.

**Tailwind v4:** Native CSS variables, smaller bundle, OKLCH colors, and it works with PostCSS without fighting me.

**Static output:** No server needed. Deploy anywhere. It's fast, secure, and hosting is free pretty much everywhere.

## License

MIT — see [LICENSE](LICENSE).

## Credits

- [Astro](https://astro.build) — The framework that made me stop hating static sites
- [Tailwind CSS](https://tailwindcss.com) — The styling tool I complain about but keep using
- [shadcn/ui](https://ui.shadcn.com) — Copy-paste components that actually look good
- [Lucide](https://lucide.dev) — Clean icons without the bloat
- [Formspree](https://formspree.io) — Handling contact forms so I don't have to build a backend
