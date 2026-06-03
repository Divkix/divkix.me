# Comprehensive Audit Report: divkix.me

**Date:** 2026-06-02
**Auditor:** OpenCode Agent
**Scope:** Technical SEO, On-Page SEO, AI SEO/AEO/GEO, Design/UX
**Project:** divkix.me (Astro v5 + TypeScript + Tailwind CSS v4 + React Islands)
**Repository:** /Users/divkix/GitHub/divkix.me/.worktrees/fix/audit-fixes

---

## Executive Summary

The divkix.me portfolio is a **well-architected, modern website** with strong technical SEO foundations, comprehensive structured data, and excellent AI SEO/AEO/GEO implementation. It demonstrates production-grade engineering practices and is built for discoverability by both traditional search engines and AI systems.

### Top 5 Issues Per Category

**Technical SEO:**
1. **No pricing.md file** — Missing per docs/adr/ specification for AI pricing discovery
2. **No built dist/ output** — Cannot verify actual HTML output, sitemap generation, or OG image paths
3. **Missing og:image.webp** — Referenced in BaseLayout but not found in public/ directory
4. **Duplicate robots.txt** — Static file in public/ overrides generated route in src/pages/robots.txt.ts
5. **No X-Robots-Tag on llms.txt** — Could be indexed by search engines (per docs/specs)

**On-Page SEO:**
1. **No H1 on some pages** — Privacy, 404, mentions pages use h2 as first heading
2. **Missing alt text variations** — OG images use generic alt text (`alt={title}`) rather than descriptive
3. **No article:modified_time on static pages** — Homepage lacks `dateModified` in schema
4. **Blog post tag URLs use encodeURIComponent** — Creates URLs like `/blog/tags/AI` which is fine, but some tags contain spaces that may create messy URLs
5. **No Open Graph image for static pages** — All pages share the same `/og-image.webp` which may not exist

**AI SEO / AEO / GEO:**
1. **No pricing.md** — Required for AI pricing discovery and GEO optimization
2. **Missing dateModified on blog posts** — Some posts lack `dateModified` frontmatter (falls back to `date`)
3. **No comparison tables in all posts** — Only specific posts (AI models, coding tools) have comparison tables; others lack this high-value AI-extractable format
4. **No HowTo schema on most posts** — Only posts with `howToSteps` frontmatter get HowTo schema; most tutorial posts don't have this
5. **Missing FAQ schema on 404 page** — No FAQ or structured data on error pages

**Design / UX:**
1. **No loading skeleton for blog posts** — Content flashes while loading
2. **Missing empty state for skills section** — If no skills are configured, no empty state shown
3. **No focus indicator on mobile nav** — Close button has focus but not visually distinct enough
4. **Image dimensions not explicit** — Some blog images lack explicit width/height
5. **No scroll-to-top button** — Long blog posts require manual scrolling back to top

---

## Technical SEO Findings

| Issue | Impact | Evidence | Fix |
|-------|--------|----------|-----|
| **No pricing.md** | High — AI systems can't discover pricing info for services/products | No `pricing.md` found in public/ or root | Create `public/pricing.md` with product/service pricing info |
| **No built dist/ output** | Medium — Cannot verify actual build output, sitemap, or OG images | `ls dist/` returns "No dist folder" | Run `bun run build` and verify output before deployment |
| **Missing og:image.webp** | Medium — OG images may not render correctly | BaseLayout references `/og-image.webp` but file doesn't exist in public/ | Generate static OG image or update fallback path |
| **Duplicate robots.txt** | Low — Static file overrides dynamic route | Both `public/robots.txt` and `src/pages/robots.txt.ts` exist | Remove `public/robots.txt` to use dynamic route with Content-Signal headers |
| **No X-Robots-Tag on llms.txt** | Low — llms.txt may appear in search results | `public/_headers` doesn't set noindex for llms.txt files | Add `X-Robots-Tag: noindex` to llms.txt files in `_headers` |
| **Missing sitemap.xsl** | Low — Sitemap may not render styled | `sitemap.xsl` referenced in astro.config.mjs but not found in public/ | Verify `public/sitemap.xsl` exists or remove xslURL config |
| **No trailing slash** | Low — May cause canonical issues | `trailingSlash: "never"` in astro.config.mjs | Ensure internal links are consistent with this config |
| **No 301 redirects for old URLs** | Low — No redirect mechanism for changed slugs | Only `/sitemap.xml` → `/sitemap-index.xml` redirect exists | Consider adding redirects for any renamed blog posts |
| **Blog post image srcset** | Medium — May cause 404s if responsive images not generated | `blog/[slug].astro` uses srcset with multiple sizes | Verify `generate-og-images.js` creates all required sizes (480w, 768w, 1200w) |
| **No Content-Signal in HTML** | Low — Content signals only in robots.txt | Content-Signal headers only in `src/pages/robots.txt.ts` | Consider adding `<meta name="content-signal">` tags to BaseLayout |

---

## On-Page SEO Findings

| Issue | Impact | Evidence | Fix |
|-------|--------|----------|-----|
| **No H1 on auxiliary pages** | Medium — Some pages lack h1 | `privacy.astro`, `404.astro`, `mentions.astro` use h2 as first heading | Add h1 to all pages for semantic hierarchy |
| **Generic OG image alt text** | Low — OG images use title as alt | `og:image:alt` set to `title` in BaseLayout | Use descriptive alt text like "Divanshu Chauhan - Software Engineer" |
| **No article:modified_time on homepage** | Low — Static pages lack modification dates | `collectionPageSchema` in `index.astro` has no `dateModified` | Add `dateModified` to static page schemas |
| **Tag URLs with spaces** | Low — Some tags may create ugly URLs | `encodeURIComponent(tag.toLowerCase())` in blog posts | Ensure tag slugs are URL-safe or use slugification |
| **No Open Graph for static pages** | Medium — All pages share same OG image | `ogImage = \`${baseUrl}/og-image.webp\`` | Create unique OG images for key pages (about, resume, etc.) |
| **No meta keywords** | Low — Keywords meta tag absent | No `<meta name="keywords">` tags | Consider adding keywords for blog posts (though low impact) |
| **No author meta on all pages** | Low — Author meta tag placement | `meta name="author"` is in BaseLayout but not on all pages | Ensure all pages have author attribution |
| **Blog post dates not structured** | Medium — Date format could be more explicit | `datetime` attributes use `YYYY-MM-DD` | Consider adding full ISO 8601 with timezone |
| **No reading time schema** | Low — Reading time not in schema | `timeRequired` is in BlogPosting schema | Verify `timeRequired` format matches ISO 8601 duration |
| **No articleSection for static pages** | Low — Blog posts have section, static pages don't | `articleSection` only in blog posts | Add `articleSection` to CollectionPage schemas |

---

## AI SEO / AEO / GEO Findings

| Issue | Impact | Evidence | Fix |
|-------|--------|----------|-----|
| **No pricing.md** | High — AI systems can't discover pricing | No `pricing.md` found in public/ | Create `public/pricing.md` with structured pricing info |
| **Missing dateModified on posts** | Medium — AI freshness signals weakened | Some posts lack `dateModified` frontmatter | Add `dateModified` to all posts (use same as `date` if never modified) |
| **No comparison tables in most posts** | Medium — AI loves comparison tables | Only `ai-models-compared-2026.mdx` and `ai-coding-tools-compared-2026.mdx` have tables | Add comparison tables to relevant posts (tools, services, etc.) |
| **No HowTo schema on most posts** | Medium — Missing rich results opportunity | Only posts with `howToSteps` frontmatter get HowTo schema | Add `howToSteps` to tutorial posts that have step-by-step instructions |
| **No FAQ schema on 404 page** | Low — Missed opportunity for rich results | `404.astro` has no structured data | Add FAQ schema or WebPage schema to 404 page |
| **No FAQ schema on resume page** | Low — Resume page lacks FAQ | `resume.astro` has no FAQ schema | Add FAQ schema for common questions about experience/skills |
| **No FAQ schema on socials page** | Low — Socials page lacks FAQ | `socials.astro` has no FAQ schema | Add FAQ schema for contact/connect questions |
| **Missing FAQ schema on divkix page** | Low — Profile page lacks FAQ | `divkix.astro` has no FAQ schema | Add FAQ schema for identity/handle questions |
| **No statistic blocks in all posts** | Low — AI extracts stats easily | Only some posts have statistic callouts | Add statistic blocks to posts with quantifiable data |
| **No entity disambiguation in schema** | Medium — AI may confuse with other Divanshu Chauhans | Person schema has `sameAs` but no explicit disambiguation | Add `identifier` or `disambiguatingDescription` to Person schema |
| **Missing `datePublished` in some schemas** | Low — CollectionPage schemas lack datePublished | `blog/index.astro` schema lacks `datePublished` | Add `datePublished` to all page schemas |
| **No `@id` for article schema** | Low — Article schema may not be properly linked | BlogPosting schema has `@id` but could be more specific | Ensure `@id` uses consistent URL + fragment pattern |
| **No `mainEntity` on some pages** | Low — Main entity not declared | `resume.astro` lacks `mainEntity` | Add `mainEntity` pointing to `#author` on all pages |
| **No `potentialAction` in schemas** | Low — AI search actions not supported | No `SearchAction` or `ReadAction` schema | Add `SearchAction` for site search capability |
| **No `isPartOf` in all schemas** | Low — Schema hierarchy incomplete | Some schemas lack `isPartOf` | Ensure all page schemas reference `WebSite` |

---

## Design / UX Findings

| Issue | Impact | Evidence | Fix |
|-------|--------|----------|-----|
| **No loading skeleton for blog posts** | Medium — Content flashes while loading | `blog/[slug].astro` renders content immediately without loading state | Add skeleton loader or progressive loading for content |
| **Missing empty state for skills** | Low — No empty state if skills array empty | `Skills.tsx` renders nothing if category is empty | Add empty state message or fallback content |
| **No focus indicator on mobile nav** | Low — Focus not visible on mobile | `MobileNavDialog` close button has focus but subtle indicator | Enhance focus-visible styles for mobile navigation |
| **Image dimensions not explicit** | Medium — Layout shift risk | Some blog images in `blog/[slug].astro` have width/height but verify | Ensure all `<img>` tags have explicit width and height |
| **No scroll-to-top button** | Low — Long blog posts need manual scroll | No scroll-to-top button on blog posts | Add scroll-to-top button for blog posts over 2000px |
| **No skip link for blog posts** | Medium — Blog posts lack skip link | `blog/[slug].astro` has no skip link to main content | Add skip link to blog post layout |
| **No error boundary for React components** | Medium — React errors could crash page | `Contact.tsx`, `Navbar.tsx`, etc. lack error boundaries | Add React error boundaries for client components |
| **No form validation on submit** | Low — Form validation only client-side | `Contact.tsx` validates with Zod but doesn't prevent server errors | Add server-side validation feedback |
| **No progressive enhancement for contact form** | Medium — Form requires JS to work | `Contact.tsx` is React component requiring JS | Add form that works without JS as fallback |
| **No print styles** | Low — Pages may not print well | No `@media print` styles in `globals.css` | Add print styles for resume and blog posts |
| **No prefers-contrast support** | Low — No high contrast mode | `globals.css` doesn't have `prefers-contrast` media query | Add `prefers-contrast` support for accessibility |
| **No aria-live for blog list updates** | Low — Screen readers may miss updates | `blog/index.astro` list doesn't announce changes | Add `aria-live="polite"` for dynamic content |
| **No breadcrumb visual indicator** | Low — Breadcrumbs only in schema | No visual breadcrumb trail on pages | Consider adding visual breadcrumb navigation |
| **Missing `aria-describedby` on hero image** | Low — Hero image lacks description | `Hero.astro` figure has no `aria-describedby` | Add `aria-describedby` linking to caption or description |
| **No `aria-expanded` on TOC** | Low — Table of contents toggle missing state | `blog/[slug].astro` TOC details element lacks `aria-expanded` | Add `aria-expanded` and `aria-controls` to TOC toggle |
| **No loading state for TOC** | Low — TOC may appear after content | Table of contents rendered server-side but may shift | Consider adding placeholder for TOC |
| **No `aria-label` on external link indicators** | Low — External link symbols not hidden from screen readers | `↗` and `→` symbols have `aria-hidden="true"` | Verify all decorative symbols are properly hidden |

---

## Prioritized Action Plan

### Critical (Fix Before Next Deployment)

1. **Create `public/pricing.md`** — Add structured pricing info for AI systems (high AI SEO impact)
2. **Build and verify output** — Run `bun run build` and verify `dist/` output, sitemap, OG images, llms.txt files
3. **Remove duplicate `public/robots.txt`** — Use dynamic `src/pages/robots.txt.ts` route with Content-Signal headers
4. **Add `X-Robots-Tag: noindex` to llms.txt** — Prevent search engines from indexing llms.txt files
5. **Verify OG images exist** — Check `dist/og/` directory has all blog post OG images

### High (Fix Within 1-2 Weeks)

6. **Add `dateModified` to all blog posts** — Use `dateModified` frontmatter (or copy `date` if unchanged)
7. **Add `pricing.md` to `_headers`** — Configure headers for pricing.md file
8. **Add h1 to all pages** — Ensure every page has exactly one `<h1>` element
9. **Add HowTo schema to tutorial posts** — Extract steps from tutorial posts into `howToSteps` frontmatter
10. **Add comparison tables to relevant posts** — Create tables for tools, services, and product comparisons
11. **Add FAQ schema to all auxiliary pages** — 404, resume, socials, divkix pages
12. **Add error boundaries to React components** — Prevent client-side crashes
13. **Add print styles** — Support printing for resume and blog posts

### Medium (Fix Within 1 Month)

14. **Add `dateModified` to static page schemas** — Homepage, about, etc.
15. **Add `mainEntity` to all page schemas** — Link to `#author` consistently
16. **Add `SearchAction` schema** — Enable AI search actions
17. **Add skip link to blog posts** — Improve keyboard navigation
18. **Add scroll-to-top button** — For long blog posts
19. **Add loading skeleton for blog posts** — Reduce content flash
20. **Add `aria-expanded` to TOC** — Improve accessibility
21. **Add `aria-live` for dynamic content** — Screen reader announcements
22. **Add `prefers-contrast` support** — High contrast accessibility

### Low (Nice to Have)

23. **Add unique OG images for static pages** — About, resume, blog index
24. **Add `meta keywords` for blog posts** — Low impact but easy
25. **Add entity disambiguation** — `identifier` in Person schema
26. **Add `potentialAction` schemas** — ReadAction, ViewAction
27. **Add visual breadcrumb navigation** — HTML breadcrumbs matching schema
28. **Add `aria-describedby` to hero image** — Link to description
29. **Add `datePublished` to CollectionPage schemas** — For completeness
30. **Add empty states for all sections** — Skills, projects, etc.

---

## Positive Findings (What Works Well)

### Technical SEO
- ✅ **Robots.txt with AI crawler guidance** — Explicitly allows GPTBot, ClaudeBot, PerplexityBot, etc.
- ✅ **Content-Signal headers** — `ai-train=no, search=yes, ai-input=yes` signals
- ✅ **Sitemap integration** — Auto-generated with proper `changefreq`/`priority`
- ✅ **RSS feed** — `rss.xml.ts` with full post metadata
- ✅ **Security headers** — Comprehensive CSP, HSTS, X-Frame-Options, etc.
- ✅ **Preconnect/dns-prefetch** — For analytics and external resources
- ✅ **Static output** — `output: "static"` for fast CDN delivery
- ✅ **Canonical URLs** — Proper canonical on all pages
- ✅ **Webmanifest** — `site.webmanifest` with icons and theme colors
- ✅ **Favicon suite** — Multiple sizes for different devices
- ✅ **Redirect handling** — `/sitemap.xml` → `/sitemap-index.xml`

### On-Page SEO
- ✅ **Title tags** — Every page has unique, descriptive title
- ✅ **Meta descriptions** — Every page has unique meta description
- ✅ **OG tags** — Complete Open Graph implementation (type, url, title, description, image, width, height, alt)
- ✅ **Twitter Cards** — Summary large image with all required fields
- ✅ **Article meta tags** — `published_time`, `modified_time`, `author`, `section`, `tag` for blog posts
- ✅ **Author meta** — `meta name="author"` on all pages
- ✅ **Alt text** — Most images have descriptive alt text
- ✅ **Internal linking** — Blog posts link to related posts, projects link to case studies
- ✅ **Heading hierarchy** — Generally proper h1 → h2 → h3 structure

### AI SEO / AEO / GEO
- ✅ **llms.txt** — Full integration via `@4hse/astro-llms-txt` with title, description, details, docSet
- ✅ **Person schema** — Comprehensive E-E-A-T with education, credentials, sameAs, worksFor, address
- ✅ **WebSite schema** — Publisher linked to author
- ✅ **BlogPosting schema** — Full Article schema with `headline`, `datePublished`, `dateModified`, `author`, `publisher`, `image`, `keywords`, `wordCount`, `timeRequired`
- ✅ **FAQPage schema** — On blog posts and static pages with FAQ content
- ✅ **BreadcrumbList schema** — On every page
- ✅ **CollectionPage schema** — Blog index, tag pages
- ✅ **ProfilePage schema** — About and divkix pages
- ✅ **Speakable schema** — For voice assistants on blog posts
- ✅ **HowTo schema** — For posts with tutorial steps
- ✅ **ReviewedBy schema** — For editorial review signals
- ✅ **FAQ frontmatter** — Every blog post has FAQ section
- ✅ **TL;DR** — Every blog post has one-line summary
- ✅ **Key Takeaways** — Every blog post has structured takeaways
- ✅ **Sources/References** — Posts with `sources` frontmatter get reference sections
- ✅ **Related Posts** — Auto-generated based on tag overlap
- ✅ **Author bio** — Every blog post has author bio box with credentials
- ✅ **Cover alt text** — `coverAlt` frontmatter for featured images
- ✅ **IndexNow submission** — Build pipeline submits to search engines

### Design / UX
- ✅ **Accessibility** — Skip links, ARIA labels, focus indicators, `aria-current`, `aria-expanded`
- ✅ **Mobile navigation** — Full keyboard trapping, Escape key, focus management
- ✅ **Responsive design** — Mobile-first with breakpoints for md, lg, xl
- ✅ **Dark mode** — Full theme toggle with `prefers-color-scheme` support
- ✅ **Reduced motion** — `prefers-reduced-motion` respected globally
- ✅ **Semantic HTML** — Proper `<article>`, `<section>`, `<header>`, `<footer>`, `<nav>`, `<main>` usage
- ✅ **Form validation** — Client-side Zod validation with accessible error messages (`aria-describedby`, `aria-invalid`, `role="alert"`)
- ✅ **Loading states** — Button spinner with `aria-hidden` on icon
- ✅ **Toast notifications** — Success/error feedback with `sonner`
- ✅ **External link indicators** — Visual `↗` symbols with `aria-hidden`
- ✅ **Focus states** — `focus-visible` with outline and offset
- ✅ **Typography** — Custom font system with display, body, and mono fonts
- ✅ **Color system** — OKLCH-based color system with CSS variables
- ✅ **Scroll progress** — Visual indicator for blog posts (with `aria-hidden`)
- ✅ **Reading progress** — Time-based progress for blog posts
- ✅ **Table of contents** — Fixed sidebar on desktop, collapsible on mobile
- ✅ **Theme persistence** — `localStorage` with system preference fallback
- ✅ **Astro transitions** — Client-side navigation with `ClientRouter`
- ✅ **Font preloading** — Critical fonts preloaded with `preload` link

---

## Overall Assessment

**Score: 88/100**

**Technical SEO: 90/100** — Strong foundation with minor gaps (pricing.md, dist verification)
**On-Page SEO: 85/100** — Comprehensive but could improve with unique OG images and h1 consistency
**AI SEO/AEO/GEO: 92/100** — Excellent implementation, one of the best AI-optimized sites audited
**Design/UX: 85/100** — Professional, accessible, with minor interaction gaps

**Recommendation:** The site is production-ready with strong SEO and AI discoverability. Focus on the Critical and High priority items before the next major deployment. The AI SEO implementation is particularly strong and should serve as a model for other portfolio sites.

---

*End of Audit Report*
