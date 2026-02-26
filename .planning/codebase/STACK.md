# Technology Stack

**Analysis Date:** 2026-02-25

## Languages

**Primary:**
- TypeScript 5.9.3 - All source code, configuration, and scripts
- JavaScript (Node.js) - Build scripts and tooling
- JSX/TSX - React component syntax

**Secondary:**
- MDX - Blog content (`.mdx` files in `src/content/blog/`)
- CSS/PostCSS - Styling via Tailwind v4
- HTML - Astro template syntax (`.astro` files)

## Runtime

**Environment:**
- Node.js / Bun runtime
- No explicit version file (`.nvmrc` or `.node-version`) - relies on Bun's bundled runtime

**Package Manager:**
- Bun (primary)
- Lockfile: `bun.lockb` present

## Frameworks

**Core:**
- Astro 5.17.3 - Static site generation, islands architecture
- React 19.2.4 - Client-side interactivity (islands)

**Build & Dev:**
- Vite (via Astro) - Dev server and build orchestration
- PostCSS 8.5.6 - CSS processing
- Sharp 0.34.5 - Image processing (OG generation)

**Content & MDX:**
- @astrojs/mdx 4.3.13 - Markdown/MDX compilation
- MDast utilities - Markdown AST manipulation
- gray-matter 4.0.3 - YAML frontmatter parsing

**Integrations:**
- @astrojs/react 4.4.2 - React island support
- @astrojs/sitemap 3.7.0 - XML sitemap generation
- @astrojs/rss 4.0.15 - RSS feed generation
- @4hse/astro-llms-txt 1.0.4 - LLM-accessible content export

## Key Dependencies

**Critical:**
- Tailwind CSS 4.2.0 via @tailwindcss/postcss 4.2.0 - Styling engine
- Zod 4.3.6 - Schema validation (blog frontmatter, form data)
- Lucide React 0.575.0 - Icon components

**Form Handling:**
- React Hook Form 7.71.1 - Form state management
- @hookform/resolvers 5.2.2 - Zod integration for RHF

**UI/Styling:**
- clsx 2.1.1 - Conditional className utility
- tailwind-merge 3.5.0 - Tailwind class merging
- class-variance-authority 0.7.1 - Component variant system
- sonner 2.0.7 - Toast notifications
- tw-animate-css 1.4.0 - Animation utilities

**Typography:**
- @tailwindcss/typography 0.5.19 - Prose styling
- @fontsource/geist-mono 5.2.7 - Mono typeface
- @fontsource/geist-sans 5.2.5 - Sans serif typeface
- @fontsource/instrument-serif 5.2.8 - Serif typeface

**Utilities:**
- @radix-ui/react-slot 1.2.4 - Render delegation (component composition)

## Development Tools

**Linting & Formatting:**
- Biome 2.4.3 - Unified linter/formatter (replaces ESLint/Prettier)
- Configuration: `biome.json` (shared rules for TS/TSX/JS)

**Type Checking:**
- TypeScript 5.9.3 - Type compilation
- @astrojs/check 0.9.6 - Astro component type checking

**Dependency Analysis:**
- knip 5.84.1 - Unused exports, dependencies, and files detection

**Build Scripts:**
- png-to-ico 3.0.1 - Favicon generation

**Testing Framework:**
- Not detected in this codebase

## Configuration Files

**TypeScript:**
- `tsconfig.json` - Strict mode enabled with aggressive flags:
  - `noUncheckedIndexedAccess`: Array/object access returns `T | undefined`
  - `exactOptionalPropertyTypes`: Can't assign `undefined` to optional props
  - `noUnusedLocals` / `noUnusedParameters`: Dead code detection
  - Path alias: `@/*` → `./src/*`

**Build & Dev:**
- `astro.config.mjs` - Astro configuration with integrations and sitemap customization
- `postcss.config.mjs` - PostCSS pipeline with Tailwind v4
- `biome.json` - Linting, formatting, and IDE assist configuration

**CSS:**
- `src/styles/globals.css` - Global CSS variables (OKLCH color space), theme system

## Build Pipeline

The build process is multi-stage (executed via `bun run build`):

1. **`scripts/generate-posts-metadata.js`** - Extracts blog post frontmatter, calculates reading time and TOC, outputs `content/blog/posts.json`
2. **`scripts/generate-og-images.js`** - Generates OpenGraph images (PNG + WebP) using Sharp, cached if unchanged
3. **`scripts/validate-content.ts`** - Ensures blog post counts and slugs match between MDX files and `posts.json`
4. **`astro build`** - Static HTML generation to `dist/`
5. **`scripts/submit-indexnow.ts`** - Submits sitemap URLs to IndexNow API (production only, gated by `CF_PAGES_BRANCH=main`)

Failure at any stage halts the build.

## Environment & Configuration

**Environment Variables:**
- `CF_PAGES_BRANCH` - Cloudflare Pages branch name, triggers IndexNow submission only on `main`

**Biome Exclusions** (see `biome.json`):
- `.next/`, `out/`, `build/`, `node_modules/`
- `.astro` files (not linted)
- `content/blog/posts.json` (generated)
- `bun.lockb` (lockfile)

**Astro Configuration:**
- Site: `https://divkix.me`
- Output: `static` (full static build, no SSR)
- Trailing slashes: Always append (e.g., `/blog/` not `/blog`)
- Image service: Sharp (local image optimization)
- Prefetch: All internal links on page load

## Platform Requirements

**Development:**
- Node.js or Bun runtime
- macOS/Linux/Windows
- Modern shell (no specific version pinning)

**Production:**
- Cloudflare Pages (static hosting)
- No server-side runtime needed
- IndexNow API key embedded in `scripts/submit-indexnow.ts`

---

*Stack analysis: 2026-02-25*
