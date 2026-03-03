<!--
Sync Impact Report
==================
Version change: N/A (template) → 1.0.0
Modified principles: N/A (initial creation)
Added sections:
  - Core Principles (7 principles)
  - Technology Stack & Constraints
  - Development Workflow
  - Governance
Removed sections: N/A
Templates requiring updates:
  - .specify/templates/plan-template.md — ✅ reviewed, Constitution Check
    section aligns with principles (gates derived from constitution)
  - .specify/templates/spec-template.md — ✅ reviewed, scope/requirements
    sections compatible with principle-driven constraints
  - .specify/templates/tasks-template.md — ✅ reviewed, task categorization
    reflects code quality gates and build pipeline validation tasks
  - No command files found in .specify/templates/commands/
Follow-up TODOs: None
-->

# divkix.me Constitution

## Core Principles

### I. Static-First Performance

All pages and components MUST default to zero client-side JavaScript.
Astro `.astro` files are the default for any component that does not
require browser interactivity. React `.tsx` components MUST only be
used when the component requires state, event handlers, or browser
APIs. Every React island MUST declare an explicit client directive
(`client:visible`, `client:load`, `client:idle`) — never hydrate
without justification.

**Rationale**: The site deploys to Cloudflare Pages as static output.
Every kilobyte of JS shipped degrades Core Web Vitals and
contradicts the architecture's core value proposition.

### II. Component Reuse & shadcn/ui

UI primitives MUST come from `src/components/ui/` following the
shadcn/ui pattern (CVA variants + Radix primitives + `cn()` merge).
Before creating a new component, check if an existing shared
component in `src/components/shared/` or UI primitive in
`src/components/ui/` already covers the use case. Duplication of
styling logic across components is prohibited — extract to a shared
component or variant instead.

**Rationale**: shadcn/ui provides a composable, accessible component
foundation. Reuse prevents style drift and reduces maintenance
surface.

### III. Strict TypeScript (NON-NEGOTIABLE)

All TypeScript code MUST compile under the project's strict config:
`noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`,
`noUnusedLocals`, `noUnusedParameters`, `noImplicitReturns`,
`noImplicitAny`, `strictNullChecks`. The use of `any` is prohibited.
The `@/` path alias MUST be used for all imports from `src/`.
Type assertions (`as`) MUST be justified and minimized.

**Rationale**: Strict typing catches bugs at compile time that would
otherwise surface as runtime errors in production. The aggressive
flags exist for a reason — respect them.

### IV. Code Quality Gates (NON-NEGOTIABLE)

Every change MUST pass the following gates before merge:

1. `bun run lint` (Biome check) — zero errors
2. `bunx knip` — zero unused exports, dependencies, or files
3. `bun run type-check` (astro check) — zero TypeScript errors
4. `bun run build` — full production build succeeds

`.astro` files are excluded from Biome linting (only TS/TSX/JS).
Biome formatter MUST use spaces (indent width 2), LF line endings,
double quotes, and trailing commas. These settings are locked in
`biome.json` and MUST NOT be overridden per-file.

**Rationale**: Automated quality gates are cheaper than code review
catch-all. If the tooling says it's wrong, it's wrong.

### V. Content Pipeline Integrity

The blog content pipeline (`*.mdx` → `posts.json` → sitemap) MUST
remain in sync at all times. Adding, removing, or renaming a blog
post MUST be followed by `bun run prebuild` to regenerate
`content/blog/posts.json`. The build validation script
(`scripts/validate-content.ts`) enforces slug/count parity and MUST
NOT be bypassed. Blog slugs MUST match `/^[a-z0-9-]+$/`.
Frontmatter MUST conform to the Zod schema in
`src/content/config.ts`.

**Rationale**: The multi-step build pipeline exists because Astro
content collections are unavailable in `astro.config.mjs`. Breaking
this chain silently corrupts sitemap dates and OG images.

### VI. SEO & Structured Data

Every page MUST include: canonical URL, Open Graph meta tags,
Twitter Card meta tags, and appropriate JSON-LD structured data.
Blog posts MUST additionally include `BlogPosting` schema with
author, dates, and optional FAQ/HowTo schemas when applicable.
The sitemap, RSS feed, and LLMs.txt endpoints MUST remain
functional after any routing or content change. Accessibility
standards (semantic HTML, ARIA attributes, alt text) MUST be
maintained.

**Rationale**: This is a portfolio site. Discoverability and
correct indexing directly impact its purpose. Broken structured
data means invisible pages.

### VII. Centralized Configuration

All site-wide data (personal info, skills, projects, experience,
education, socials) MUST live in `src/data/site.config.ts` as a
single source of truth exported with `as const` for type inference.
Components MUST import from this config rather than hardcoding
values. Duplicating site data across components is prohibited.

**Rationale**: A portfolio site's content changes frequently.
Centralizing data means updating one file, not hunting across
dozens of components.

## Technology Stack & Constraints

| Layer | Technology | Version | Notes |
|-------|-----------|---------|-------|
| Framework | Astro | 5.x | Static output, Islands architecture |
| UI Library | React | 19.x | Islands only, not full SPA |
| Language | TypeScript | 5.x | Strict mode, `@/` path alias |
| Styling | Tailwind CSS | v4 | Via `@tailwindcss/postcss`, NOT `@astrojs/tailwind` |
| UI System | shadcn/ui | latest | CVA + Radix + `cn()` pattern |
| Runtime | Bun | latest | Package manager and script runner |
| Linter/Formatter | Biome | 2.x | Replaces ESLint + Prettier |
| Dead Code | Knip | 5.x | Unused exports/deps detection |
| Content | MDX | via `@astrojs/mdx` | Content Collections with Zod schema |
| Deployment | Cloudflare Pages | — | Static output, no SSR |
| Colors | OKLCH | — | CSS variables, dark/light themes |
| Fonts | Geist Sans/Mono, Instrument Serif | — | Via `@fontsource` |

**Prohibited technologies**:
- ESLint, Prettier (Biome replaces both)
- `@astrojs/tailwind` (Tailwind v3 only — we use v4)
- npm, yarn, pnpm (Bun is the sole package manager)
- `React.FC` type (use explicit props interface)
- CSS-in-JS libraries (Tailwind handles styling)

## Development Workflow

### Commit Standards

All commits MUST follow Conventional Commits format with a
descriptive body when the change is non-trivial:

```
<type>(<scope>): <description>

[optional body]
```

Valid types: `feat`, `fix`, `chore`, `docs`, `style`, `refactor`,
`perf`, `test`, `build`, `ci`.

### Branch Strategy

- `main` is the production branch deployed to Cloudflare Pages
- Feature branches MUST be created for non-trivial changes
- Direct pushes to `main` are acceptable only for single-file
  fixes (typos, config tweaks)

### Build Pipeline Order

The build pipeline executes in strict order — do not reorder:

1. `generate-posts-metadata.js` — parse MDX → `posts.json`
2. `generate-og-images.js` — create OG images from posts
3. `validate-content.ts` — verify MDX ↔ `posts.json` sync
4. `astro build` — static site generation to `dist/`
5. `submit-indexnow.ts` — search engine submission (prod only)

### File Organization

```
src/
├── components/
│   ├── ui/          # shadcn/ui primitives (Button, etc.)
│   ├── shared/      # Reusable components (Navbar, Footer, etc.)
│   ├── sections/    # Homepage sections (Hero, Projects, etc.)
│   └── blog/        # Blog-specific components
├── content/
│   └── blog/        # MDX blog posts
├── data/            # Site configuration (site.config.ts)
├── layouts/         # Page layouts (Base, Site, Blog)
├── lib/             # Utilities (cn, schema, seo, remark plugins)
├── pages/           # Astro page routes
└── styles/          # Global CSS, animations
```

New files MUST be placed in the appropriate existing directory.
Creating new top-level directories under `src/` requires
justification in the PR description.

## Governance

This constitution is the authoritative reference for all
development decisions on divkix.me. When a code review or PR
conflicts with these principles, the constitution wins.

**Amendment process**:
1. Propose the change with rationale
2. Update the constitution version according to semver:
   - MAJOR: Principle removal or incompatible redefinition
   - MINOR: New principle or material expansion
   - PATCH: Clarification, wording, or non-semantic fix
3. Update `LAST_AMENDED_DATE` to the date of change
4. Propagate changes to dependent templates

**Compliance review**: Every PR MUST be checked against
Principles IV (quality gates) and III (strict TypeScript) at
minimum. Violations MUST be resolved before merge — no exceptions,
no "we'll fix it later" deferrals.

**Version**: 1.0.0 | **Ratified**: 2026-03-02 | **Last Amended**: 2026-03-02
