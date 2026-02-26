# Codebase Concerns

**Analysis Date:** 2025-02-25

## Tech Debt

### Build Pipeline Dependency Chain Fragility

**Issue:** Multi-step build pipeline with interdependent script execution order creates brittleness. If any step fails silently or partially, downstream steps may produce corrupted output without obvious cause.

**Files:**
- `package.json` (build script ordering)
- `scripts/generate-posts-metadata.js`
- `scripts/generate-og-images.js`
- `scripts/validate-content.ts`

**Impact:**
- Mistmatch between `src/content/blog/*.mdx` and `content/blog/posts.json` causes validation failure
- OG image generation silently skips posts if metadata is out of sync
- `astro.config.mjs` depends on posts.json existing and being valid (line 14-31)
- If posts.json is malformed, sitemap generation fails with cryptic errors

**Fix approach:**
- Add pre-build sanity checks that validate posts.json schema before astro build
- Make posts.json parsing explicit with descriptive errors
- Consider consolidating metadata generation into single TypeScript script to share types
- Add build phase checkpoints that verify invariants

### Type Safety Escape Hatches

**Issue:** One instance of `as unknown as` type casting, indicating forced type coercion that bypasses TypeScript's strict checking. This defeats the benefit of `exactOptionalPropertyTypes` strictness.

**Files:** `src/components/sections/skills/Skills.tsx` (line 45)

**Impact:** If `siteConfig.skills` type shape changes, component will compile but silently produce runtime errors or incorrect behavior

**Fix approach:**
- Remove cast: `siteConfig.skills` already has correct type from `site.config.ts` as `const` (line 32)
- Type parameter on `groupSkillsByCategory` should infer from input type
- Ensure readonly constraint in component matches siteConfig type

### Hardcoded Formspree ID in Client Code

**Issue:** Formspree endpoint ID `xgvreprq` is hardcoded in `Contact.tsx` (line 71) and exposed in client-side bundle. While Formspree IDs are semi-public by design, this creates a centralized attack surface for form spam or abuse.

**Files:** `src/components/sections/Contact.tsx` (line 71)

**Impact:**
- Any bot scraping the site can extract the Formspree ID and send unlimited spam messages
- No rate limiting or CSRF protection visible (relies entirely on Formspree's server-side validation)
- No API key required, form submission succeeds if Formspree service is operational

**Fix approach:**
- Consider moving form submission to edge function/API route to add server-side validation
- Add honeypot field or challenge response
- Evaluate if Formspree offers CAPTCHA or rate-limiting options
- Document expected spam rate and monitoring approach

### Posts Metadata Sync Risk

**Issue:** Two separate systems track blog post metadata: `src/content/blog/*.mdx` files (source of truth) and `content/blog/posts.json` (generated at build time). Schema validation in `validate-content.ts` catches mismatches but only after they occur.

**Files:**
- `scripts/generate-posts-metadata.js`
- `scripts/validate-content.ts`
- `astro.config.mjs` (consumes posts.json)

**Impact:**
- Renaming, adding, or deleting MDX files without running `prebuild` breaks build
- Posts metadata (reading time, TOC, related posts) becomes stale if MDX content changes but `prebuild` isn't re-run
- `astro build` fails with validation error only after OG images are generated (wasted CPU)

**Fix approach:**
- Move validation earlier in build pipeline (before OG image generation)
- Add watch mode to regenerate posts.json on MDX file changes during dev
- Consider inline metadata extraction in Astro instead of separate JSON file

## Known Bugs

### OG Image Generation Partial Failure Silencing

**Issue:** OG image generation loops through all posts but silently continues on individual post errors (line 259 in `generate-og-images.js`). If a post's title or date is malformed, that post's image generation fails, but build succeeds and returns 0.

**Symptoms:** Missing OG images for specific blog posts; social media previews show broken image

**Files:** `scripts/generate-og-images.js` (lines 259-264)

**Trigger:** Blog post with special characters in title that SVG escaping doesn't handle, or missing required fields

**Workaround:** Run generation script directly to see error output; manually regenerate: `bun run scripts/generate-og-images.js`

**Fix approach:**
- Aggregate errors and fail build if any post image fails to generate
- Log which posts failed with specific error reason
- Add pre-check to validate all frontmatter before image generation

### IndexNow Submission Silently Fails Without Notification

**Issue:** IndexNow submission (line 43-71 in `submit-indexnow.ts`) warns on errors but doesn't fail the build. If all URLs fail to submit, the build completes as successful, and no one may notice the URLs weren't submitted to search engines.

**Symptoms:** New blog posts not indexed in search engines; old posts not updated with new lastmod dates

**Files:** `scripts/submit-indexnow.ts`

**Trigger:** Network timeout, IndexNow API unavailable, or invalid API key

**Workaround:** Manually submit URLs via IndexNow web interface or check GitHub Action logs for submission status

**Fix approach:**
- Log submission results to structured logs for external monitoring
- Trigger alerts if submission fails on production deployments
- Store last successful submission date and surface in admin tools

## Security Considerations

### Formspree Integration Without Rate Limiting

**Risk:** Contact form at `/` accepts submissions to Formspree without client-side or server-side rate limiting. Attacker can submit unlimited messages.

**Files:** `src/components/sections/Contact.tsx`

**Current mitigation:** Formspree's backend presumably filters spam; form validates email format with Zod

**Recommendations:**
- Add client-side debouncing (5 second cooldown between submissions)
- Implement server-side rate limiting via middleware or edge function (1 submission per IP per hour)
- Add CAPTCHA (hCaptcha for privacy) to form
- Monitor Formspree inbox for spam patterns and adjust accordingly

### Schema.org Structured Data Injection Risk

**Risk:** Blog post schema (line 63-85 in `src/pages/blog/[slug].astro`) embeds user-provided post.data fields (title, excerpt) directly into JSON-LD without sanitization. If MDX frontmatter contains special characters or script-like content, it could corrupt the JSON structure.

**Files:** `src/pages/blog/[slug].astro` (lines 63-85)

**Current mitigation:** JSON serialization via `JSON.stringify()` handles escaping; Zod schema validates title/excerpt are strings

**Recommendations:**
- Validate that post.data.title/excerpt don't contain unescaped quotes or control characters
- Add regex validation: `/^[a-zA-Z0-9\s\-,.:!?"'()]*$/` or similar whitelist
- Document schema.org field constraints in `src/content/config.ts` schema

### API Key in Build Script

**Risk:** IndexNow API key `b8f4e2a1c9d7e3f5` is hardcoded in `scripts/submit-indexnow.ts` (line 4) in plaintext. If repo is public, key is compromised.

**Files:** `scripts/submit-indexnow.ts` (line 4)

**Current mitigation:** Key appears to be a placeholder or test key (suspicious format: short hex string)

**Recommendations:**
- Move to environment variable: `process.env.INDEXNOW_API_KEY`
- Verify this is the real key—if so, rotate immediately
- Document key rotation process
- Add to `.env.local` (already in `.gitignore`)

## Performance Bottlenecks

### OG Image Generation on Every Build

**Issue:** OG images regenerate for all blog posts on every `bun run build`, even if posts haven't changed. Generation uses Sharp to render 5 image formats per post (PNG, WebP, 2x responsive variants).

**Problem:** For N posts, scales as O(N*5), taking ~500ms-1s per post on Apple Silicon

**Files:** `scripts/generate-og-images.js` (lines 206-270)

**Cause:** Mtime comparison (lines 216-222) correctly skips unchanged posts, but first build regenerates everything

**Improvement path:**
- On first build, skip image generation if `content/blog/` exists and is older than 1 hour (assume images exist)
- Cache image metadata by slug; only regenerate if post content hash changes
- Consider async image generation in separate process to unblock astro build
- Evaluate pre-generated placeholders instead of runtime SVG → PNG

### Repeated Git Log Calls During Metadata Generation

**Issue:** `scripts/generate-posts-metadata.js` calls `git log` once per blog post (line 61) to fetch `dateModified`. N posts = N subprocess spawns.

**Problem:** 20 posts × 50ms per git call = 1 second overhead

**Files:** `scripts/generate-posts-metadata.js` (lines 59-73)

**Cause:** No batching or memoization; each file spawns independent git process

**Improvement path:**
- Single `git log --name-status` to fetch all file dates in one call
- Cache results by filename
- Consider storing `dateModified` in git metadata cache instead

### Recursive Reading and Re-validation of Content

**Issue:** Blog content is read and validated in three separate steps: `generate-posts-metadata.js` reads all MDX files, `generate-og-images.js` reads posts.json, `validate-content.ts` reads both MDX and posts.json again.

**Problem:** Unnecessary I/O; content could be cached across steps

**Files:** `scripts/generate-posts-metadata.js`, `scripts/generate-og-images.js`, `scripts/validate-content.ts`, `package.json` build step

**Cause:** Scripts are independent; no shared data structure

**Improvement path:**
- Consolidate into single script that generates metadata, validates, and produces output
- Pass data through shared module exports instead of filesystem reads
- Consider monolithic build orchestrator or unified script

## Fragile Areas

### Date Handling in Blog Frontmatter

**Fragility:** Multiple places manually parse and format dates as ISO strings. If timezone is introduced or format varies, mismatches occur.

**Files:**
- `src/content/config.ts` (Zod schema regex `/^\d{4}-\d{2}-\d{2}$/`)
- `scripts/generate-posts-metadata.js` (line 69: `result.split("T")[0]`)
- `src/pages/blog/[slug].astro` (lines 70-73: hardcodes `T00:00:00Z`)

**Safe modification:**
- Create shared utility: `parseISODate(str: string): Date` in `src/lib/date.ts`
- All date parsing routes through this single point
- Add unit tests for edge cases (Feb 29 leap year, date boundaries)
- Document: frontmatter dates are UTC midnight, never local time

### TOC Extraction Regex

**Fragility:** Table of contents extracted via regex `/^(#{2,3})\s+(.+)$/gm` in `scripts/generate-posts-metadata.js` (line 22). Won't match headings with inline code, images, or HTML.

**Safe modification:**
- Use remark plugin to walk AST instead of regex
- Extract headings during Astro build using `post.render().headings`
- Store headings in posts.json instead of recalculating

**Test coverage:**
- Edge cases: headings with `[link](url)`, `**bold**`, `` `code` ``, emoji

### Skills Config Type Definition

**Fragility:** `siteConfig.skills` is exported as `const` (line 52 in `src/data/site.config.ts`), which TypeScript infers as readonly tuple. Components consuming this either use `as const` or escape with `as unknown as Skill[]`.

**Files:** `src/data/site.config.ts` (line 52), `src/components/sections/skills/Skills.tsx` (line 45)

**Safe modification:**
- Add explicit type annotation to `siteConfig.skills`: `as const satisfies readonly Skill[]`
- Update components to use `typeof siteConfig.skills[number]` pattern
- Add types file `src/types/config.ts` with precise skill type

### Content Validation Order

**Fragility:** `validate-content.ts` runs AFTER OG image generation. If validation fails, OG images were generated unnecessarily, and user doesn't know which blog post caused the failure until late in build.

**Safe modification:**
- Move validation to earliest build step (before `prebuild` returns)
- Output which specific MDX file/slug mismatches before generating images
- Add detailed error messages: "Slug 'my-post' in MDX but not in posts.json"

## Missing Critical Features

### No Monitoring for Broken Blog Links

**Problem:** Blog posts contain internal and external links. No automated check for broken links at build time or in CI.

**Blocks:** Dead link detection; users get 404s clicking internal blog references

**Fix:**
- Add `link-checker` or `broken-link-checker` to build pipeline
- Crawl generated HTML and validate all `href` attributes
- Fail build if internal links are broken; warn on external links (external check can be flaky)

### No Blog Post Search Index

**Problem:** Blog page at `/blog/` lists all posts, but no full-text search. Users must scroll to find content.

**Blocks:** Discoverability of older blog posts; users frustrated by lack of search

**Fix:**
- Generate JSON search index at build time from posts.json and post content
- Embed in page or lazy-load for client-side search (Lunr, MiniSearch)
- Add search UI to blog page

### No Monitoring for Stale Blog Posts

**Problem:** Blog posts can become outdated, but no mechanism flags "last updated 2 years ago" or suggests review dates.

**Blocks:** Readers don't know if post is current; outdated info spreads

**Fix:**
- Add optional `reviewDate` field to frontmatter schema
- Display warning if `reviewDate` is >6 months old
- Add script to report posts needing review

## Test Coverage Gaps

### No Tests for Build Scripts

**Untested area:** All build scripts (`generate-posts-metadata.js`, `generate-og-images.js`, `validate-content.ts`, `submit-indexnow.ts`) have no unit or integration tests.

**Files:** `scripts/*.js`, `scripts/*.ts`

**Risk:**
- Metadata generation bugs go undetected until build fails in CI
- OG image edge cases (long titles, emoji) crash silently
- Validation false negatives miss real mismatches

**Priority:** High

**Fix approach:**
- Add Jest tests for metadata extraction (mock MDX files, assert TOC/reading time)
- Mock Sharp for OG image generation tests
- Mock git/fs for date extraction tests
- Mock fetch for IndexNow submission tests
- Add fixtures directory with sample MDX files and expected outputs

### No Tests for Blog Content Schema

**Untested area:** Zod schema in `src/content/config.ts` validates frontmatter, but no tests for edge cases.

**Files:** `src/content/config.ts`

**Risk:** Invalid dates, missing required fields, or malformed arrays not caught until build time

**Priority:** Medium

**Fix approach:**
- Add schema tests: valid input, invalid dates, missing fields, array violations
- Test all regex constraints: `YYYY-MM-DD` format, URL-safe slugs

### No Tests for Contact Form

**Untested area:** Contact form component (`src/components/sections/Contact.tsx`) has client-side validation but no tests for form submission, error handling, or API response parsing.

**Files:** `src/components/sections/Contact.tsx`

**Risk:** Form silently fails on malformed Formspree response; user doesn't know if message sent

**Priority:** Medium

**Fix approach:**
- Test form validation with invalid inputs
- Mock Formspree API: success, 4xx error, network timeout
- Test toast notifications appear correctly
- Test form state: loading, success, reset

### No Tests for SEO/Schema.org Generation

**Untested area:** Blog post schema generation (`src/pages/blog/[slug].astro`, `src/lib/schema.ts`) produces JSON-LD. No tests validate schema correctness or Google Rich Result compliance.

**Files:** `src/pages/blog/[slug].astro`, `src/lib/schema.ts`

**Risk:** Malformed schema doesn't validate in Google Search Console; structured data ignored by search engines

**Priority:** Medium

**Fix approach:**
- Test BlogPosting schema matches Google documentation
- Validate JSON-LD with external validator
- Test optional fields (FAQ, HowTo) generate valid schema
- Add schema.org compliance tests

---

*Concerns audit: 2025-02-25*
