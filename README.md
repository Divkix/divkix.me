# divkix.me

A modern, production-ready portfolio site built with Astro 5, TypeScript, Tailwind CSS v4, and React Islands. Static output deployed to Cloudflare Pages, featuring a single-page homepage with smooth scrolling sections, an MDX-powered blog with SEO optimization, and comprehensive structured data.

[![Astro](https://img.shields.io/badge/Astro-5-BC52EE?logo=astro&logoColor=white)](https://astro.build)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## Features

- **Astro Islands Architecture**: Static-first with selective React hydration for interactivity
- **Single-Page Experience**: Homepage with smooth scrolling sections (Hero, Highlights, Projects, Experience, Skills, Contact)
- **Blog System**: MDX-powered blog with Astro Content Collections, reading time, and table of contents
- **Modern Design**: Clean aesthetic with OKLCH color space, glass surfaces, and gradient effects
- **Dark Mode**: System-aware theme toggle with no flash of unstyled content
- **Responsive**: Mobile-first design that works on all devices
- **SEO Optimized**: JSON-LD structured data, OpenGraph meta tags, sitemap, and RSS feed
- **Type-Safe**: 100% TypeScript with strict mode enabled
- **Fast**: Static output with minimal JavaScript, optimized for edge deployment
- **LLMs.txt**: AI-friendly site documentation for LLM crawlers

## Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Astro 5 with View Transitions |
| **Language** | TypeScript 5 with strict mode |
| **Styling** | Tailwind CSS v4 with PostCSS |
| **UI Components** | shadcn/ui (Radix UI primitives) |
| **Forms** | React Hook Form + Zod validation |
| **Content** | MDX with gray-matter and Astro Content Collections |
| **Icons** | Lucide React |
| **Linting** | Biome (replaces ESLint + Prettier) |
| **Package Manager** | Bun |
| **Hosting** | Cloudflare Pages (or any static host) |

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- Git

### Installation

1. Clone the repository:

```bash
git clone https://github.com/divkix/divkix.me.git
cd divkix.me
```

2. Install dependencies:

```bash
bun install
```

3. Run the development server:

```bash
bun run dev
```

4. Open [http://localhost:4321](http://localhost:4321) in your browser.

## Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start dev server on localhost:4321 |
| `bun run build` | Production build (runs prebuild + astro build) |
| `bun run preview` | Preview production build locally |
| `bun run lint` | Run Biome linter |
| `bun run lint:fix` | Auto-fix lint issues |
| `bun run format` | Format code with Biome |
| `bun run type-check` | Run astro check for TypeScript errors |

### Utility Scripts

Scripts in `/scripts` for asset generation (run automatically in prebuild):

| Script | Description |
|--------|-------------|
| `generate-posts-metadata.js` | Generates `posts.json` from MDX frontmatter |
| `generate-og-images.js` | Generates OG images for blog posts |
| `generate-og-image.js` | Generates site-wide OG image |
| `generate-favicons.ts` | Generates favicons from SVG source |

## Project Structure

```
├── src/
│   ├── pages/              # File-based routing
│   │   ├── index.astro     # Homepage
│   │   ├── blog/           # Blog listing and posts
│   │   ├── about.astro     # About page
│   │   └── rss.xml.ts      # RSS feed generation
│   ├── layouts/
│   │   ├── BaseLayout.astro    # Root HTML, meta tags, View Transitions
│   │   ├── SiteLayout.astro    # Navbar + Footer wrapper
│   │   └── BlogLayout.astro    # Blog-specific layout
│   ├── components/
│   │   ├── sections/       # Page sections (Hero, Projects, etc.)
│   │   ├── shared/         # Navbar, Footer, ThemeToggle
│   │   ├── ui/             # shadcn-style primitives
│   │   └── blog/           # Blog-specific components
│   ├── content/
│   │   ├── blog/*.mdx      # Blog post files
│   │   └── config.ts       # Content collection schema
│   ├── data/
│   │   └── site.config.ts  # All site content (centralized)
│   ├── lib/
│   │   ├── utils.ts        # Helper functions
│   │   ├── schema.ts       # JSON-LD structured data
│   │   └── seo.ts          # SEO utilities
│   └── styles/
│       └── globals.css     # Tailwind imports, CSS variables
├── scripts/                # Build and generation scripts
├── public/                 # Static assets (favicons, images)
├── astro.config.mjs        # Astro configuration
├── postcss.config.mjs      # PostCSS with Tailwind v4
└── wrangler.jsonc          # Cloudflare Pages configuration
```

## Self-Hosting Guide

This project is designed to be easily forked and customized. Follow these steps to deploy your own version:

### 1. Fork & Clone

```bash
git clone https://github.com/YOUR_USERNAME/divkix.me.git
cd divkix.me
```

### 2. Required Customizations

#### Site Configuration (`src/data/site.config.ts`)

Replace all personal information:

```typescript
export const siteConfig = {
  name: "Your Name",
  handle: "yourhandle",
  tagline: "Your tagline here",
  location: "Your Location",
  email: "your@email.com",
  // Update: skills, projects, experience, education, socials
};
```

#### Site URL (`astro.config.mjs`)

Update the site URL:

```javascript
export default defineConfig({
  site: "https://your-domain.com",
  // ...
});
```

#### Contact Form (`src/components/sections/Contact.tsx`)

Replace the Formspree endpoint with your own:

1. Create a free account at [Formspree](https://formspree.io)
2. Create a new form and get your form ID
3. Update line ~39:

```typescript
const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
```

#### Analytics (Optional, `src/layouts/BaseLayout.astro`)

Remove or replace the analytics script (lines 145-151):

```html
<!-- Remove this block or replace with your analytics -->
<script
  is:inline
  async
  src="https://your-analytics-provider.com/script.js"
  data-website-id="YOUR_WEBSITE_ID"
></script>
```

Popular analytics alternatives:
- [Umami](https://umami.is) (self-hosted, privacy-focused)
- [Plausible](https://plausible.io) (privacy-focused)
- [Google Analytics](https://analytics.google.com)
- Remove entirely for no tracking

#### Social Links & Twitter Handle

Update Twitter handle in `src/layouts/BaseLayout.astro` (lines 62-63):

```html
<meta property="twitter:creator" content="@yourhandle" />
<meta property="twitter:site" content="@yourhandle" />
```

### 3. Content Updates

#### Blog Posts

1. Delete existing posts in `src/content/blog/`
2. Create your own posts:

```mdx
---
title: "Your Post Title"
date: "2025-01-15"
excerpt: "Brief description"
tags: ["tag1", "tag2"]
published: true
---

Your content here...
```

#### Images

- Replace `/public/divanshu-chauhan.jpeg` with your photo
- Update `/public/og-image.png` or regenerate with `node scripts/generate-og-image.js`
- Regenerate favicons with `bun run scripts/generate-favicons.ts`

### 4. Deployment Options

#### Cloudflare Pages (Recommended)

1. Push to GitHub
2. Connect to [Cloudflare Pages](https://pages.cloudflare.com)
3. Build command: `bun run build`
4. Output directory: `dist`

The included `wrangler.jsonc` configures static asset serving.

#### Vercel

1. Import repository at [vercel.com](https://vercel.com)
2. Framework preset: Astro
3. Build command: `bun run build`
4. Output directory: `dist`

#### Netlify

1. Import repository at [netlify.com](https://netlify.com)
2. Build command: `bun run build`
3. Publish directory: `dist`

#### GitHub Pages

Add to `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v1
      - run: bun install
      - run: bun run build
      - uses: actions/upload-pages-artifact@v2
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    permissions:
      pages: write
      id-token: write
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/deploy-pages@v3
        id: deployment
```

## Architecture Decisions

### Why Cloudflare Pages?

1. **Global Edge Network**: Static assets served from 300+ locations worldwide
2. **Zero Cold Starts**: No serverless functions = instant response times
3. **Free Tier**: Unlimited bandwidth, generous build limits
4. **Automatic HTTPS**: Free SSL certificates with zero configuration
5. **Git Integration**: Automatic deploys on push
6. **Wrangler CLI**: Easy local development and preview deployments

### Why Astro Islands?

1. **Zero JS by Default**: Static components ship no JavaScript
2. **Selective Hydration**: Only interactive components (forms, toggles) get JS
3. **Framework Agnostic**: Use React where needed, vanilla elsewhere
4. **Optimal Performance**: Ships 90% less JavaScript than typical React sites

### Why Tailwind CSS v4?

1. **Native CSS**: Uses CSS variables and `@layer` instead of JavaScript config
2. **Smaller Bundle**: No purge step needed, native CSS cascade
3. **OKLCH Colors**: Perceptually uniform color space for consistent theming
4. **PostCSS Integration**: Works with standard tooling

### Why Static Output?

1. **No Server Required**: Deploy to any CDN or static host
2. **Maximum Performance**: Pre-rendered HTML, no SSR overhead
3. **Security**: No server-side vulnerabilities, no database
4. **Cost**: Free hosting on most platforms
5. **Simplicity**: No runtime dependencies, just files

## Astro Islands Pattern

Components are either `.astro` (static, zero JS) or `.tsx` (React, client-hydrated):

```astro
<!-- Static - no JavaScript shipped -->
<Hero />
<Skills />
<Experience />

<!-- Interactive - hydrated when visible in viewport -->
<Highlights client:visible />
<Projects client:visible />
<Contact client:visible />

<!-- Hydrated immediately on page load -->
<Toaster client:idle />
```

## Styling

- Tailwind CSS v4 via `@tailwindcss/postcss` (not @astrojs/tailwind)
- OKLCH color space for perceptual uniformity
- CSS variables for theming (`:root` light, `.dark` dark mode)
- View Transitions for smooth page navigation

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Astro](https://astro.build) - The web framework for content-driven websites
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com) - Beautifully designed components
- [Lucide](https://lucide.dev) - Beautiful & consistent icons
- [Formspree](https://formspree.io) - Form backend service
