# SEO, AEO & GEO Optimization — Design Spec

**Date:** 2026-04-27
**Goal:** Make divkix.me rank #1 on Google for searches of "Divanshu Chauhan" and "divkix", and be cited as the authoritative source by AI answer engines (ChatGPT, Perplexity, Google AI Overviews, Claude).

## Background

The site already has a strong traditional SEO foundation: Person + WebSite JSON-LD with `sameAs`, Open Graph/Twitter Cards on every page, `robots.txt` allowing all major AI crawlers, Content-Signal headers, `llms.txt`, IndexNow submission, sitemap with proper `changefreq`/`priority`, BreadcrumbList on sub-pages, and per-post OG images.

However, 2026 research shows that SEO alone is no longer sufficient. **GEO (Generative Engine Optimization)** requires entity consolidation via Wikidata, sameAs linking, and Knowledge Graph presence. **AEO (Answer Engine Optimization)** requires answer-first formatting, FAQ schema, Speakable schema, and direct answer blocks that AI systems can extract.

## Three-Tier Implementation

---

## Tier 1: Fast Wins (Low Effort, High Impact)

### 1. Wikidata Entry for Entity Consolidation

**What:** Create a Wikidata entry (`Q-item`) for "Divanshu Chauhan".

**Properties:**
- `instance of (P31)`: human (Q5)
- `occupation (P106)`: software engineer (Q170359)
- `educated at (P69)`: Arizona State University (Q670897)
- `official website (P856)`: `https://divkix.me`
- `country of citizenship (P27)`: India (Q668)
- `place of birth`: India
- `GitHub username (P2037)`: divkix
- `X username (P2002)`: divkix
- `LinkedIn personal profile ID (P6634)`: divkix
- `ORCID iD (P496)`: 0009-0004-0423-2471
- `image (P18)`: (author photo)

**Why:** Wikidata is the structured data backbone for Google Knowledge Graph and all major AI models. Without it, the Person entity is unverified and AI models may confuse or skip it.

**Files affected:** None (external action)

### 2. Add ORCID to `sameAs` in Person Schema

**What:** Add `https://orcid.org/0009-0004-0423-2471` to the `sameAs` array in `generatePersonSchema()`.

**File:** `src/lib/schema.ts:41-43`

**Current:**
```ts
sameAs: siteConfig.socials
  .filter((s) => s.label !== "Email")
  .map((s) => s.href),
```

**New approach:** Append ORCID explicitly to the sameAs array (it's in GitHub README but not in site config).

**Also:** Add ORCID to `siteConfig.socials` array in `src/data/site.config.ts` so it appears in `rel="me"` links and `sameAs`.

### 3. Homepage Schema Fix

**What:** Add `CollectionPage` JSON-LD on the homepage that references `#author`.

**File:** `src/pages/index.astro`

**Schema to add:**
```json
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://divkix.me/",
  "mainEntity": { "@id": "https://divkix.me/#author" },
  "name": "Divanshu Chauhan (divkix) — Portfolio",
  "description": "Portfolio of Divanshu Chauhan (divkix), a Software Engineer specializing in AI and full-stack development.",
  "url": "https://divkix.me/"
}
```

**Why:** Currently homepage inherits only Person + WebSite from BaseLayout. No page-specific schema = weaker entity signal on the most important page.

### 4. Speakable Schema on Blog Posts

**What:** Add `speakable` property to `BlogPosting` schema on each blog post, using CSS selectors to point at the title and excerpt/description.

**File:** `src/pages/blog/[slug].astro`

**Schema addition:**
```json
{
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": [".post-title", ".post-excerpt"]
  }
}
```

**Why:** The most underused AEO schema in 2026. Google explicitly documents that `Speakable` markup helps voice assistants select the right passage to read aloud.

### 5. Answer Capsules on Blog Posts

**What:** For each blog post, render the `tldr` frontmatter as a visually prominent "answer capsule" at the top of the post — a concise 40-60 word summary in a styled callout box placed before the main content.

**File:** `src/pages/blog/[slug].astro` and/or a new blog component

**Why:** GEO research shows AI systems extract and cite content formatted as direct answers in the first 50 words. The `tldr` frontmatter already exists — it just needs to be surfaced visually for both human readers and AI extraction.

### 6. `dateModified` Visibility Badge

**What:** Add a visible "Last updated: [date]" badge on blog posts that have a `dateModified` field in frontmatter.

**File:** `src/pages/blog/[slug].astro` (or a blog post component)

**Why:** AI retrieval systems treat content without visible publication dates as potentially stale. The `dateModified` exists in schema but isn't visible on the page. Freshness is an active citation signal.

### 7. `/socials` Page Schema

**What:** Add a `CollectionPage` JSON-LD schema with links to all external profiles on the `/socials` page.

**File:** `src/pages/socials.astro`

**Schema to add:**
```json
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Social Profiles — Divanshu Chauhan (divkix)",
  "description": "Find Divanshu Chauhan (divkix) across the web",
  "url": "https://divkix.me/socials",
  "about": { "@id": "https://divkix.me/#author" }
}
```

**Why:** Currently `/socials` has zero page-specific JSON-LD.

### 8. `/privacy` Page Breadcrumb

**What:** Add `BreadcrumbList` JSON-LD to the `/privacy` page.

**File:** `src/pages/privacy.astro`

**Breadcrumb:** Home → Privacy

**Why:** Currently missing — breadcrumbs exist on every other major page.

---

## Tier 2: Content & AEO Enhancement

### 9. Blog Post Answer-First Restructuring

**What:** For ALL existing blog posts, ensure:
- A `tldr` (answer capsule) exists in frontmatter and renders visibly at the top
- An FAQ section (3-5 Q&A pairs) exists in frontmatter `faq` and renders at the bottom
- H2 headings use question phrasing where applicable

**Files:** All `.mdx` files in `src/content/blog/` + `src/pages/blog/[slug].astro`

**Why:** AEO research shows that question-based headings + direct answers + FAQ sections are the three pillars of AI citation. The frontmatter schema already supports all three fields — they need content population and rendering.

### 10. `FAQPage` JSON-LD from Frontmatter

**What:** Auto-generate `FAQPage` structured data from the `faq` frontmatter array on each blog post.

**File:** `src/pages/blog/[slug].astro`

**Schema to add (when `faq` exists):**
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faq.map(qa => ({
    "@type": "Question",
    "name": qa.q,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": qa.a
    }
  }))
}
```

**Why:** Pages with `FAQPage` schema are 3.2x more likely to appear in Google AI Overviews (2026 research finding).

### 11. Citation Density Lint (Build-Time Warning)

**What:** Add a post-build validation step (or extend `validate-content.ts`) that checks:
- Each blog post has ≥ 3 external links (data/source citations)
- Each post has ≥ 3 specific data points/statistics
- Warns (non-blocking) if thresholds not met

**File:** New `scripts/validate-citations.ts` or extend `scripts/validate-content.ts`

**Why:** GEO research shows that AI systems prioritize content with verifiable facts and cited sources. At minimum 1 data point per 150 words. This keeps content quality high without being a hard build blocker.

### 12. Author Bio Enhancement

**What:** Enhance `/about` page with explicit credentials and add `hasCredential` to the Person schema.

**File:** `src/pages/about.astro`, `src/lib/schema.ts`

**Schema addition:**
```json
{
  "hasCredential": [
    { "@type": "EducationalOccupationalCredential", "credentialCategory": "MS Computer Science", "recognizedBy": { "@type": "CollegeOrUniversity", "name": "Arizona State University" } },
    { "@type": "EducationalOccupationalCredential", "credentialCategory": "BS Computer Science", "recognizedBy": { "@type": "CollegeOrUniversity", "name": "Arizona State University" } }
  ]
}
```

**Why:** E-E-A-T signals are increasingly weighted for authority. Explicit credentials mapped in schema strengthen the Knowledge Graph entity.

### 13. Key Takeaways Visual Callout

**What:** Render `keyTakeaways` frontmatter as a styled callout box at the bottom of each blog post, above the FAQ section.

**File:** `src/pages/blog/[slug].astro` (or a dedicated blog component)

**Why:** Structured lists are high-extraction content for AI. `keyTakeaways` data already exists in frontmatter — it just needs rendering.

---

## Tier 3: Long-Game Entity Building

### 14. Crunchbase Profile

**What:** Create a Crunchbase profile for Divanshu Chauhan. Add to `sameAs` in Person schema.

**Action:** External — create account at crunchbase.com, add to `siteConfig.socials` and schema `sameAs`.

### 15. Cross-Platform Identity Audit

**What:** Ensure identical naming/descriptions across all platforms:
- GitHub: Divanshu Chauhan (divkix) — already set
- LinkedIn: Divanshu Chauhan — already set
- X: @divkix — already set
- HuggingFace: check display name consistency
- ORCID: already set
- Instagram: @_divkix — differs from "divkix" pattern (noted, likely intentional)
- Dev.to: create if not exists for cross-posting
- Hashnode: create if not exists for cross-posting

**Why:** AI models reconcile entity identity across platforms. Inconsistency fragments entity signals. Cross-posting on Dev.to/Hashnode provides backlinks from high-authority domains.

### 16. Knowledge Panel Trigger Strategy

**Actions over 3-6 months:**
1. Wikidata entry (Tier 1 #1)
2. Consistent `sameAs` linking
3. Cross-post blog content to Dev.to/Hashnode with canonical back to divkix.me
4. Get mentioned in industry publications (guest posts, interviews)
5. Google Scholar profile creation
6. Consistent posting cadence on blog + LinkedIn

**Why:** Google Knowledge Panels require multiple corroborating signals over time. No single action triggers it — compound effect required.

### 17. llms.txt Enhancement

**What:** Enhance the auto-generated `llms.txt` from `@4hse/astro-llms-txt`:
- Ensure `Content-Type: text/markdown` header
- Curated page descriptions in blockquotes (currently auto-generated — review quality)
- Priority ordering: homepage first, then blog, then about/socials, then posts sorted by recency
- Add `X-Robots-Tag: noindex` to prevent llms.txt from appearing in search results

**File:** `astro.config.mjs` (plugin config)

### 18. Google Scholar Profile

**What:** Create a Google Scholar profile using the existing ORCID. Even without published papers, the profile URL added to `sameAs` is an authority signal.

**Action:** External — create at scholar.google.com, link ORCID, add to `siteConfig.socials` and schema `sameAs`.

---

## Summary of Changes by File

| File | Changes |
|---|---|
| `src/data/site.config.ts` | Add ORCID, Crunchbase, Google Scholar to socials; add credential detail fields |
| `src/lib/schema.ts` | Add ORCID to sameAs; add `hasCredential` to Person; add `speakable` to BlogPosting generator |
| `src/pages/index.astro` | Add CollectionPage JSON-LD |
| `src/pages/blog/[slug].astro` | Add FAQPage JSON-LD; add speakable to BlogPosting; render tldr answer capsule; render dateModified badge; render keyTakeaways callout |
| `src/pages/socials.astro` | Add CollectionPage JSON-LD |
| `src/pages/privacy.astro` | Add BreadcrumbList JSON-LD |
| `src/pages/about.astro` | Enhanced credential display + hasCredential schema |
| `src/content/blog/*.mdx` | Populate missing tldr/faq/keyTakeaways frontmatter; add external citations |
| `astro.config.mjs` | Review llms.txt plugin config |
| `scripts/validate-citations.ts` | New — citation density lint |
| `src/content.config.ts` | No changes needed (schema already has all fields) |
| External | Wikidata entry, Crunchbase profile, Google Scholar, Dev.to/Hashnode accounts |

## Non-Goals

- Paid backlinks or sponsored content
- Keyword stuffing or black-hat SEO
- Changing the visual design/site aesthetic
- Adding a CMS (static generation stays)
- Moving off Cloudflare Pages

## Success Metrics

1. **Google Search:** "Divanshu Chauhan" returns divkix.me as #1 result (currently likely not)
2. **Knowledge Panel:** Google shows a Knowledge Panel for "Divanshu Chauhan" within 3-6 months
3. **AI Citations:** Asking ChatGPT/Perplexity "Who is Divanshu Chauhan?" returns accurate info sourced from divkix.me
4. **Branded Search Traffic:** Increase in organic traffic for "divkix" and "Divanshu Chauhan" keywords
5. **Zero-Click Visibility:** divkix.me appears in AI Overviews and featured snippets for relevant queries
