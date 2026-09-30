# AGENTS.md

Personal portfolio + blog for divkix.me. Astro 7 static output (`output: "static"`, `trailingSlash: "never"`), TypeScript strictest, Tailwind v4 via `@tailwindcss/vite`, React 19 islands, MDX blog via Content Collections. Deployed as pure static assets on Cloudflare Workers (`wrangler.jsonc`, no Worker script); Cloudflare builds from Git. Human-facing overview: [README.md](README.md).

## Commands

All verified locally 2026-09-27 (pnpm 12.6.0, Node 26; CI uses Node 22.22.1).

```bash
pnpm install --frozen-lockfile   # install (CI uses the same flag)
pnpm run dev                     # astro dev → http://localhost:4321
pnpm run verify                  # THE gate: vp check (lint+fmt) → knip → astro check && tsc --noEmit
pnpm run build                   # automatic prebuild → validate-content → astro build → flat sitemap → IndexNow
pnpm run preview                 # serve dist/ (run build first)
pnpm run audit:seo               # asserts SEO invariants in source files; CI runs it
pnpm run check:citations         # per-post citation density (manual, not in CI)
pnpm run prebuild                # regenerate content/blog/posts.json + OG images only
pnpm run lint:fix && pnpm run format   # autofix
```

- **There is no test suite** (no vitest, no test files). "Single test" does not exist; `verify` + `build` + `audit:seo` is the whole safety net.
- Run a single script: `pnpm exec tsx scripts/<name>.ts` or `node scripts/<name>.js`.
- `pnpm run build` locally prints `IndexNow: Skipping (branch: local)`. It only submits when `CF_PAGES_BRANCH=main`. CI forces `CF_PAGES_BRANCH=""`.

## Repo map (non-obvious parts only)

- `src/data/site.config.ts`: all site copy (bio, faq, skills, experience, projects, socials) plus `NOINDEX_PATHS`. Edit copy here, not in components.
- `src/content.config.ts`: blog Zod schema (frontmatter source of truth). Posts live in `src/content/blog/*.mdx`.
- `content/blog/posts.json` (repo root `content/`, not `src/content/`): **generated and gitignored**. `astro.config.mjs` reads it for sitemap lastmod and for filtering thin tag pages.
- `src/lib/schema.ts`: JSON-LD generators (`generateBreadcrumbSchema`, `generateFAQPageSchema`, …). `src/lib/seo.ts`: `baseUrl`, `slugifyTag`, `clipMetaDescription`.
- `scripts/`: the build pipeline plus manual tools. `.js` files are **ESM** (`type: "module"` in `package.json`); `.ts` files run via `tsx`.
- `public/_headers` (CSP, caching) and `public/_redirects` (301s: `/projects`, `/contact`, sitemap aliases, space-encoded tag URLs).
- `design.md`: the locked design system (palette tokens, type, spacing, CTA rules). Read it before any visual change.
- `docs/superpowers/`: past plans/specs. Historical only, not current truth.

## Conventions

- **Zero-JS by default.** Static UI is `.astro` (`Hero.astro`, `Footer.astro`, `RecentWriting.astro`). Use React `.tsx` only when the UI is interactive, and hydrate it with the laziest directive that works: `client:visible` for homepage sections, `client:idle` for Navbar/ScrollProgress in `SiteLayout`, `client:only="react"` for `ReadingProgress`.
- Import via `@/` (`import { siteConfig } from "@/data/site.config"`). Derive types from config instead of redeclaring them: `type Project = (typeof siteConfig.projects)[number]` (`Projects.tsx`).
- Pages compose JSON-LD from `@/lib/schema` helpers and wrap in `SiteLayout` (see `src/pages/pricing.astro`). New indexable pages need a unique title and a description of about 160 chars (`clipMetaDescription`).
- Styling: Tailwind utilities plus design tokens from `src/styles/tokens.css` via arbitrary values, e.g. `py-(--space-xl)`. Use named tokens, not raw spacing values (`design.md`).
- TS config extends `astro/tsconfigs/strictest`, including `exactOptionalPropertyTypes` and `noUncheckedIndexedAccess`. Indexed reads are `T | undefined` and optional props cannot receive `undefined` explicitly. Handle both instead of casting.
- Formatting and lint are configured **only** in `vite.config.ts` (`lint`/`fmt` blocks). `vp` ignores `.oxlintrc.json`/`.oxfmtrc.json`. `.astro` files are not linted.
- Tag URLs are hyphenated slugs from `slugifyTag` (`"Claude Code"` → `/blog/tags/claude-code`).
- Commits follow `type(scope): summary` (`fix(seo): …`, `chore(deps): …`).

## Gotchas

- **Adding, removing or renaming a post:** run `pnpm run prebuild`. Otherwise `scripts/validate-content.ts` fails the build on a count/slug mismatch.
- A post only appears with `published: true` (the schema default is `false`). Dates are `"YYYY-MM-DD"` strings, regex-checked.
- **A new tag with spaces** needs a matching `%20` → hyphen 301 in `public/_redirects` (the existing tags follow this pattern). Tag pages with fewer than 2 posts are excluded from the sitemap.
- **`audit:seo` greps source files** (Hero, Contact, about, BaseLayout, site.config, `_headers`, `_redirects`, robots, schema) for specific strings and invariants. Changing copy or headers can fail CI even when the build passes; read `scripts/seo-production-audit.ts` before editing those files.
- New third-party origins (fetch, script, font) must be added to the CSP in `public/_headers`. Formspree (`Contact.tsx`) and `analytics.divkix.me` are the existing allowances.
- `NOINDEX_PATHS` drives both the page `noindex` meta and the sitemap filter. Add new noindex routes there, not ad hoc.
- `src/middleware.ts` (trailing-slash 301) only runs in dev and at build. In production, `wrangler.jsonc` `html_handling: "drop-trailing-slash"` does that job, so don't switch it back to `auto-trailing-slash` (that causes a redirect loop with `_redirects`).
- Generated and gitignored, so don't hand-edit them: `content/blog/posts.json`, `public/og/blog/`, `public/og-image*`, `public/llms*.txt`, `public/rss.xml`, `dist/`, `.astro/`. `llms.txt` comes from the `astroLlmsTxt` config in `astro.config.mjs`, so edit it there.
- TypeScript is declared as `^6.0.3` in `package.json`, with no pnpm override: `astro check` needs the TS 6 API. `vite`/`vite-plus` versions come from the pnpm `catalog:` in `pnpm-workspace.yaml`.
- Tailwind must stay on `@tailwindcss/vite`. `@tailwindcss/postcss` breaks under Astro 7's rolldown Vite (see the comment in `astro.config.mjs`). `components.json` is a shadcn leftover; there is no `src/components/ui/`.
- The pre-commit hook (`.vite-hooks/pre-commit`) runs `vp staged` and then the full `pnpm run verify`, so expect commits to take a few seconds.

## Definition of done

1. `pnpm run verify` exits 0.
2. `pnpm run build` exits 0. Required whenever you touch content, pages, `astro.config.mjs`, or `scripts/`.
3. `pnpm run audit:seo` exits 0. Required whenever you touch copy, layouts, `_headers`/`_redirects`, schema, or site.config.
4. For blog posts, also run `pnpm run check:citations`.
5. For UI changes, check the page in `pnpm run dev` in both light and dark themes.
6. If a change invalidates anything in this file, update this file in the same commit.
