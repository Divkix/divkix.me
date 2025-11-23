# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Modern portfolio site built with Next.js 15, TypeScript, Tailwind CSS v4, and Framer Motion. Deployed on Cloudflare Workers using OpenNext for edge runtime compatibility. Features a single-page homepage with smooth scrolling sections (Hero, Highlights, Projects, Experience, Skills, Contact) and a separate blog system powered by MDX with build-time metadata generation.

## Build & Development Commands

```bash
# Development
bun run dev                 # Start development server on localhost:3000

# Build
bun run build              # Run prebuild script + Next.js build
bun run prebuild           # Generate blog posts metadata (runs automatically before build)

# Linting
bun run lint               # Run ESLint

# Cloudflare Deployment
bun run preview            # Build and preview locally with OpenNext
bun run deploy             # Build and deploy to Cloudflare Workers
bun run upload             # Build and upload without deploying
bun run cf-typegen         # Generate Cloudflare Worker types
```

**Important:** Always run `bun run prebuild` before building. This generates `content/blog/posts.json` from MDX files, which is required for the blog to work in Cloudflare Workers (filesystem access not available at runtime).

## Architecture

### Deployment Model

The site uses **@opennextjs/cloudflare** to adapt Next.js for Cloudflare Workers. Key constraint: no filesystem access at runtime. All dynamic content (blog posts) must be pre-generated at build time into JSON files.

### App Router Structure

```
app/
├── (site)/              # Main site route group
│   ├── layout.tsx       # Site-specific layout
│   └── page.tsx         # Single-page homepage (Hero, Highlights, Projects, Experience, Skills, Contact)
├── blog/
│   ├── [slug]/          # Dynamic blog post pages
│   │   └── page.tsx     # Loads MDX content dynamically
│   ├── layout.tsx       # Blog-specific layout
│   └── page.tsx         # Blog listing (reads from posts.json)
├── api/contact/         # Contact form API endpoint
│   └── route.ts
├── rss.xml/             # RSS feed generation
│   └── route.ts
└── layout.tsx           # Root layout (providers, metadata)
```

### Content System

**Blog Posts:**

- MDX files in `content/blog/*.mdx` with frontmatter (title, date, excerpt, tags, author, published)
- Build script (`scripts/generate-posts-metadata.js`) generates `content/blog/posts.json`
- Runtime code (`lib/content.ts`) reads from JSON, never filesystem
- Reading time calculated at build time (200 words/min)

**Site Configuration:**

- All site content centralized in `content/site.config.ts`
- Includes personal info, skills, projects, experience, education, socials
- Type-safe exports with `as const` for strict typing

### Animations

Hero section uses Framer Motion with stagger effects for smooth entrance animations:

```typescript
// From components/sections/Hero3D.tsx
<motion.div
  variants={staggerContainer}
  initial="hidden"
  animate="show"
>
  <motion.h1 variants={staggerItem}>...</motion.h1>
  <motion.p variants={staggerItem}>...</motion.p>
</motion.div>
```

**Highlights section** features count-up animations using `useInView` hook to trigger when scrolled into viewport. Numbers animate from 0 to target value over 2 seconds.

### Styling

- Tailwind CSS v4 with custom design system
- Colors use OKLCH color space for better perceptual uniformity
- CSS variables in `app/globals.css` (`:root` for light, `.dark` for dark mode)
- shadcn/ui components in `components/ui/` (Radix UI primitives)

### Forms & Validation

- React Hook Form + Zod for form handling and validation
- Contact form in `components/sections/Contact.tsx` posts to `/api/contact`

## Key Files & Patterns

### Adding Blog Posts

1. Create `content/blog/your-post.mdx`:

```mdx
---
title: "Post Title"
date: "2025-10-28"
excerpt: "Brief description"
tags: ["tag1", "tag2"]
published: true
---

Content here...
```

2. Run `bun run prebuild` to regenerate `posts.json`
3. Post appears automatically on blog page

### Modifying Site Content

Edit `content/site.config.ts` to update:

- Personal information
- Skills list
- Projects array (name, desc, tags, period, links)
- Experience and education
- Social links

### TypeScript Configuration

- Strict mode enabled
- Path alias: `@/*` maps to project root
- ESM with bundler module resolution
- No unused locals/parameters allowed

### Image Optimization

Next.js image config supports AVIF/WebP with multiple device sizes. Use `next/image` for all images.

## Testing in Edge Environment

The site must work in Cloudflare Workers (no Node.js APIs). Test locally with:

```bash
bun run preview
```

This builds with OpenNext and previews in a local Worker environment.

## Key Components

### Homepage Sections (in order)

1. **Hero3D** - Animated hero with name, tagline, social icons, and CTA buttons
2. **Highlights** - Statistics dashboard with count-up animations (impact, projects, OSS)
3. **Projects** - Project cards with filtering by tags
4. **Experience** - Timeline of work experience with expandable positions
5. **Skills** - Grid display of technical skills
6. **Contact** - Contact form with validation

### Shared Components

- **Navbar** - Navigation with smooth scrolling, theme toggle, and mobile menu
- **Footer** - Site footer with social links
- **GradientText** - Wrapper for gradient text effects
- **SocialIcons** - Social media icon links
- **ThemeToggle** - Dark/light mode switcher

## Common Pitfalls

1. **Filesystem Access:** Never use `fs` module in runtime code. Pre-generate data at build time.
2. **Blog Metadata:** Must run prebuild script before deploying, or blog will break. The blog listing depends on `posts.json`.
3. **Cloudflare Compatibility:** Check compatibility flags in `wrangler.jsonc` when using Node.js APIs.
4. **Animation Performance:** Use `viewport={{ once: true }}` for scroll-triggered animations to prevent re-triggering.
5. **Client Components:** Framer Motion requires `"use client"` directive. Hero3D and Highlights are client components.

## Scripts

- `generate-posts-metadata.js`: Generates blog metadata JSON from MDX files
- `generate-favicons.ts`: Generates multiple favicon formats (referenced in git status)

## Deployment

The project is configured for Cloudflare Workers:

- Worker name: `divkix-me` (in `wrangler.jsonc`)
- Assets directory: `.open-next/assets`
- Compatibility flags: `nodejs_compat`, `global_fetch_strictly_public`

Use `bun run deploy` to build and deploy in one command.
