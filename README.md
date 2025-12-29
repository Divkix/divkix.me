# Divkix Portfolio

A modern, production-ready portfolio site built with Astro 5, TypeScript, Tailwind CSS v4, and React Islands. Static output deployed to Cloudflare Pages, featuring a single-page homepage with smooth scrolling sections, an MDX-powered blog with SEO optimization, and comprehensive structured data.

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

## Tech Stack

- **Framework**: Astro 5 with View Transitions
- **Language**: TypeScript 5 with strict mode
- **Styling**: Tailwind CSS v4 with PostCSS
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Forms**: React Hook Form + Zod validation
- **Content**: MDX with gray-matter and Astro Content Collections
- **Icons**: Lucide React
- **Linting**: Biome (replaces ESLint + Prettier)
- **Package Manager**: Bun

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- Git

### Installation

1. Clone the repository:

```bash
git clone https://github.com/divkix/portfolio.git
cd portfolio
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

Scripts in `/scripts` for asset generation (run manually as needed):

| Script | Description |
|--------|-------------|
| `generate-posts-metadata.js` | Generates `posts.json` from MDX (runs automatically in prebuild) |
| `generate-og-images.js` | Generates OG images for blog posts (runs automatically in prebuild) |
| `generate-og-image.js` | Generates site-wide OG image |
| `generate-favicons.ts` | Generates favicons from SVG source |

## Project Structure

```
├── src/
│   ├── pages/              # File-based routing
│   │   ├── index.astro     # Homepage (Hero → Highlights → Projects → Experience → Skills → Contact)
│   │   ├── blog/
│   │   │   ├── index.astro # Blog listing
│   │   │   └── [slug].astro # Dynamic blog post pages
│   │   ├── about.astro     # About page
│   │   ├── privacy.astro   # Privacy policy
│   │   ├── 404.astro       # Not found page
│   │   ├── rss.xml.ts      # RSS feed generation
│   │   └── robots.txt.ts   # Dynamic robots.txt
│   ├── layouts/
│   │   ├── BaseLayout.astro    # Root HTML, meta tags, View Transitions
│   │   ├── SiteLayout.astro    # Navbar + Footer wrapper
│   │   └── BlogLayout.astro    # Blog-specific layout with reading progress
│   ├── components/
│   │   ├── sections/       # Page sections (Hero.astro, Projects.tsx, etc.)
│   │   ├── shared/         # Navbar.tsx, Footer.astro, ThemeToggle.tsx
│   │   ├── ui/             # shadcn-style primitives (Button, Card, etc.)
│   │   └── blog/           # Blog-specific components
│   ├── content/
│   │   ├── blog/*.mdx      # Blog post files
│   │   └── config.ts       # Content collection schema (Zod)
│   ├── data/
│   │   └── site.config.ts  # All site content (skills, projects, experience)
│   ├── lib/
│   │   ├── utils.ts        # cn() helper, formatDate(), etc.
│   │   ├── schema.ts       # JSON-LD structured data generators
│   │   └── seo.ts          # SEO utilities
│   └── styles/
│       └── globals.css     # Tailwind imports, CSS variables
├── scripts/                # Build and generation scripts
├── public/                 # Static assets (favicons, images)
├── content/blog/           # Generated posts.json (gitignored)
├── astro.config.mjs        # Astro configuration
├── postcss.config.mjs      # PostCSS with Tailwind v4
├── tsconfig.json           # TypeScript configuration
└── biome.json              # Biome linter configuration
```

## Configuration

### Editing Site Content

All site content is centralized in `src/data/site.config.ts`:

```typescript
export const siteConfig = {
  name: "Your Name",
  handle: "yourhandle",
  tagline: "Your tagline here",
  location: "Your Location",
  email: "your@email.com",
  // Skills, projects, experience, education, social links...
};
```

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

## Architecture

### Astro Islands

Components are either `.astro` (static, zero JS) or `.tsx` (React, client-hydrated):

```astro
<!-- Static - no JS shipped -->
<Hero />
<Skills />

<!-- Interactive - hydrated when visible -->
<Highlights client:visible />
<Projects client:visible />
<Contact client:visible />
```

### Styling

- Tailwind CSS v4 via `@tailwindcss/postcss` (not @astrojs/tailwind)
- OKLCH color space for perceptual uniformity
- CSS variables for theming (`:root` light, `.dark` dark mode)
- View Transitions for smooth page navigation

## License

MIT
