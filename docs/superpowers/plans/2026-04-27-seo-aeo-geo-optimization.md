# SEO, AEO & GEO Optimization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Layer AEO + GEO on top of existing SEO foundation to rank #1 for "Divanshu Chauhan" and "divkix" on Google and AI engines.

**Architecture:** Add structured data (JSON-LD) to pages currently missing it, enrich existing Person schema with credentials, populate missing blog frontmatter fields, add build-time citation lint, and enhance llms.txt. No new dependencies required.

**Tech Stack:** Astro 5, TypeScript, Zod, blog content is MDX.

**Note:** The `dateModified` badge (Tier 1 #6) is already implemented at `src/pages/blog/[slug].astro:162-168`. The tldr/keyTakeaways/faq rendering in blog posts is also already in place at lines 198-248. Only the JSON-LD schemas are missing.

---

## File Structure

| File | Action | Responsibility |
|---|---|---|
| `src/data/site.config.ts` | Modify | Add ORCID to socials array |
| `src/lib/schema.ts` | Modify | Add hasCredential to Person schema |
| `src/pages/index.astro` | Modify | Add CollectionPage JSON-LD |
| `src/pages/blog/[slug].astro` | Modify | Add FAQPage + Speakable JSON-LD |
| `src/pages/socials.astro` | Modify | Add CollectionPage JSON-LD |
| `src/pages/privacy.astro` | Modify | Add BreadcrumbList JSON-LD |
| `scripts/validate-citations.ts` | Create | Citation density build-time check |
| `astro.config.mjs` | Modify | Minor llms.txt config tweaks |
| `src/content/blog/ai-models-compared-2026.mdx` | Modify | Add tldr/faq/keyTakeaways |
| `src/content/blog/clickfolio-full-stack-cloudflare-workers.mdx` | Modify | Add tldr/faq/keyTakeaways |
| `src/content/blog/logwell-self-hosted-logging-platform.mdx` | Modify | Add tldr/faq/keyTakeaways |
| `src/content/blog/openclaw-ai-agent-review-2026.mdx` | Modify | Add tldr/faq/keyTakeaways |
| `src/content/blog/scaling-telegram-bot-300k-users.mdx` | Modify | Add tldr/faq/keyTakeaways |
| `src/content/blog/vibe-coding-truth-ai-programming-2026.mdx` | Modify | Add tldr/faq/keyTakeaways |

---

### Task 1: Add ORCID to Site Config and Person Schema

**Files:**
- Modify: `src/data/site.config.ts:269-275`
- Modify: `src/lib/schema.ts:41-43`

- [ ] **Step 1: Add ORCID to socials array**

In `src/data/site.config.ts`, insert ORCID entry before Email in the socials array (keep Email last):

```ts
socials: [
  { label: "GitHub", href: "https://github.com/divkix" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/divkix/" },
  { label: "X", href: "https://x.com/divkix" },
  { label: "Hugging Face", href: "https://huggingface.co/divkix" },
  { label: "Instagram", href: "https://instagram.com/_divkix" },
  { label: "ORCID", href: "https://orcid.org/0009-0004-0423-2471" },
  { label: "Email", href: "mailto:divkix@divkix.me" },
],
```

- [ ] **Step 2: Update generatePersonSchema to include ORCID explicitly in sameAs**

In `src/lib/schema.ts`, the current filter already excludes Email from sameAs. ORCID will be automatically picked up since it won't be filtered out. The existing code on lines 41-43 handles this — no change needed to `schema.ts` for this task.

```ts
// Current code already does the right thing:
sameAs: siteConfig.socials
  .filter((s) => s.label !== "Email")
  .map((s) => s.href),
// ORCID will pass the Email filter and be included automatically
```

- [ ] **Step 3: Verify**

Run: `bun run type-check`

Expected: No type errors.

- [ ] **Step 4: Commit**

```bash
git add src/data/site.config.ts
git commit -m "feat: add ORCID to site config socials for entity consolidation"
```

---

### Task 2: Add CollectionPage Schema to Homepage

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Add CollectionPage JSON-LD to the index page**

In `src/pages/index.astro`, add the imports and schema in the frontmatter section, then inject the JSON-LD script after `<SiteLayout>` opening tag:

Add these imports to the frontmatter:

```astro
import { baseUrl } from "@/lib/seo";
import { siteConfig } from "@/data/site.config";
```

Add the schema definition in the frontmatter:

```ts
const collectionPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${baseUrl}/`,
  mainEntity: { "@id": `${baseUrl}/#author` },
  name: `${siteConfig.name} (${siteConfig.handle}) — Portfolio`,
  description: siteConfig.seo.metaDescription,
  url: baseUrl,
};
```

Add JSON-LD script right after `<SiteLayout showScrollProgress={true}>`:

```astro
<script is:inline type="application/ld+json" set:html={JSON.stringify(collectionPageSchema)} />
```

The full modified frontmatter section should be:

```astro
---
import { Contact } from "@/components/sections/Contact";
import { ExperienceBento } from "@/components/sections/experience/ExperienceBento";
import Hero from "@/components/sections/Hero.astro";
import { Highlights } from "@/components/sections/Highlights";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/skills";
import SiteLayout from "@/layouts/SiteLayout.astro";
import { baseUrl } from "@/lib/seo";
import { siteConfig } from "@/data/site.config";

const collectionPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${baseUrl}/`,
  mainEntity: { "@id": `${baseUrl}/#author` },
  name: `${siteConfig.name} (${siteConfig.handle}) — Portfolio`,
  description: siteConfig.seo.metaDescription,
  url: baseUrl,
};
---

<SiteLayout showScrollProgress={true}>
  <script is:inline type="application/ld+json" set:html={JSON.stringify(collectionPageSchema)} />
  <Hero />
  ...
```

- [ ] **Step 2: Verify**

Run: `bun run type-check && bun run build`

Expected: Clean build, check `dist/index.html` for the CollectionPage JSON-LD script tag.

- [ ] **Step 3: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: add CollectionPage JSON-LD to homepage for entity signals"
```

---

### Task 3: Add Speakable and FAQPage Schema to Blog Posts

**Files:**
- Modify: `src/pages/blog/[slug].astro`

**Note:** The tldr/keyTakeaways/faq rendering is already in place at lines 198-248. Only the JSON-LD structured data is missing.

- [ ] **Step 1: Add Speakable to BlogPosting schema**

In `src/pages/blog/[slug].astro`, add `speakable` property to the existing `blogPostingSchema` object (after the `inLanguage` field on line 70):

```ts
const blogPostingSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "@id": `${baseUrl}/blog/${post.id}/#article`,
  headline: post.data.title,
  description: post.data.excerpt,
  url: `${baseUrl}/blog/${post.id}/`,
  datePublished: `${post.data.date}T00:00:00Z`,
  dateModified: post.data.dateModified
    ? `${post.data.dateModified}T00:00:00Z`
    : `${post.data.date}T00:00:00Z`,
  author: generateBlogAuthorSchema(post.data.author),
  publisher: generateBlogPublisherSchema(),
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${baseUrl}/blog/${post.id}/`,
  },
  image: `${baseUrl}/og/blog/${post.id}.png`,
  keywords: post.data.tags.join(", "),
  wordCount: wordCount,
  timeRequired: `PT${readingTimeMinutes}M`,
  inLanguage: "en-US",
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: [".post-title", ".post-excerpt"],
  },
};
```

Also add `class="post-title"` to the `<h1>` on line 151 and `class="post-excerpt"` to the tldr `<div>` on line 199:

```astro
<h1 class="text-5xl font-display font-bold post-title">
  {post.data.title}
</h1>
```

```astro
{post.data.tldr && (
  <div class="tldr-summary glass-surface p-6 rounded-lg border-l-4 border-primary post-excerpt">
```

- [ ] **Step 2: Generate FAQPage JSON-LD from frontmatter faq array**

Add this code in the frontmatter section after the existing `blogPostingSchema` definition (after line 77):

```ts
const faqPageSchema = post.data.faq && post.data.faq.length > 0
  ? {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: post.data.faq.map((qa: { q: string; a: string }) => ({
        "@type": "Question",
        name: qa.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: qa.a,
        },
      })),
    }
  : null;
```

Add the FAQPage JSON-LD script after the breadcrumb schema script (after line 104), before the TOC section:

```astro
{faqPageSchema && (
  <script is:inline type="application/ld+json" set:html={JSON.stringify(faqPageSchema)} />
)}
```

- [ ] **Step 3: Verify**

Run: `bun run type-check && bun run build`

Expected: Clean build. Check a blog post with `faq` frontmatter (e.g., `ai-coding-tools-compared-2026`) in `dist/blog/ai-coding-tools-compared-2026/index.html` for both FAQPage and Speakable JSON-LD.

- [ ] **Step 4: Commit**

```bash
git add src/pages/blog/\[slug\].astro
git commit -m "feat: add Speakable and FAQPage JSON-LD to blog posts for AEO"
```

---

### Task 4: Add hasCredential to Person Schema

**Files:**
- Modify: `src/lib/schema.ts`

- [ ] **Step 1: Add top-level hasCredential to generatePersonSchema**

In `src/lib/schema.ts`, add `hasCredential` to the Person schema return object (after `alumniOf` on line 56, before `knowsAbout`):

```ts
hasCredential: siteConfig.education.map((edu) => {
  const parts = edu.title.split(" — ");
  return {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: parts[0],
    ...(parts[1]
      ? {
          recognizedBy: {
            "@type": "CollegeOrUniversity",
            name: parts[1],
          },
        }
      : {}),
  };
}),
```

The full `generatePersonSchema` should now return:

```ts
export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${baseUrl}/#author`,
    name: siteConfig.name,
    alternateName: siteConfig.handle,
    givenName: siteConfig.name.split(" ")[0],
    familyName: siteConfig.name.split(" ")[1],
    jobTitle: getJobTitle(),
    description: siteConfig.seo.metaDescription,
    url: baseUrl,
    email: siteConfig.email,
    image: `${baseUrl}${siteConfig.authorImage}`,
    nationality: siteConfig.nationality,
    sameAs: siteConfig.socials
      .filter((s) => s.label !== "Email")
      .map((s) => s.href),
    hasCredential: siteConfig.education.map((edu) => {
      const parts = edu.title.split(" — ");
      return {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: parts[0],
        ...(parts[1]
          ? {
              recognizedBy: {
                "@type": "CollegeOrUniversity",
                name: parts[1],
              },
            }
          : {}),
      };
    }),
    alumniOf: siteConfig.education.map((edu) => {
      const parts = edu.title.split(" — ");
      return {
        "@type": "CollegeOrUniversity",
        name: parts[1] || edu.title,
        ...(parts[0] && {
          hasCredential: {
            "@type": "EducationalOccupationalCredential",
            credentialCategory: parts[0],
          },
        }),
      };
    }),
    knowsAbout: siteConfig.skills.map((s) => s.name),
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.address.locality,
      addressRegion: siteConfig.address.region,
      addressCountry: siteConfig.address.country,
    },
  };
}
```

- [ ] **Step 2: Verify**

Run: `bun run type-check && bun run build`

Expected: Clean build. Check `dist/index.html` for `hasCredential` in the Person JSON-LD.

- [ ] **Step 3: Commit**

```bash
git add src/lib/schema.ts
git commit -m "feat: add hasCredential to Person schema for E-E-A-T signals"
```

---

### Task 5: Add CollectionPage Schema to Socials Page

**Files:**
- Modify: `src/pages/socials.astro`

- [ ] **Step 1: Add CollectionPage JSON-LD**

In `src/pages/socials.astro`, add `baseUrl` import and schema definition in the frontmatter:

Add to imports:

```astro
import { baseUrl } from "@/lib/seo";
```

Add schema definition after the existing variable declarations:

```ts
const collectionPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: `Social Profiles — ${siteConfig.name} (${siteConfig.handle.toLowerCase()})`,
  description: `Find ${siteConfig.name} (${siteConfig.handle}) across the web`,
  url: `${baseUrl}/socials/`,
  about: { "@id": `${baseUrl}/#author` },
};
```

Add JSON-LD script after `<SiteLayout>` opening tag:

```astro
<SiteLayout
  title="Connect"
  description={`Connect with ${siteConfig.name} on social media - GitHub, LinkedIn, X, and more.`}
>
  <script is:inline type="application/ld+json" set:html={JSON.stringify(collectionPageSchema)} />
  ...
```

- [ ] **Step 2: Verify**

Run: `bun run type-check && bun run build`

- [ ] **Step 3: Commit**

```bash
git add src/pages/socials.astro
git commit -m "feat: add CollectionPage JSON-LD to socials page"
```

---

### Task 6: Add BreadcrumbList Schema to Privacy Page

**Files:**
- Modify: `src/pages/privacy.astro`

- [ ] **Step 1: Add BreadcrumbList JSON-LD**

In `src/pages/privacy.astro`, add imports and schema:

```astro
import { generateBreadcrumbSchema } from "@/lib/schema";
import { baseUrl } from "@/lib/seo";

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", item: baseUrl },
  { name: "Privacy Policy", item: `${baseUrl}/privacy/` },
]);
```

Add JSON-LD script after `<SiteLayout>` opening tag:

```astro
<SiteLayout
  title="Privacy Policy"
  description={`Privacy Policy for ${siteConfig.name}'s portfolio website`}
>
  <script is:inline type="application/ld+json" set:html={JSON.stringify(breadcrumbSchema)} />
  ...
```

- [ ] **Step 2: Verify**

Run: `bun run type-check && bun run build`

- [ ] **Step 3: Commit**

```bash
git add src/pages/privacy.astro
git commit -m "feat: add BreadcrumbList JSON-LD to privacy page"
```

---

### Task 7: Citation Density Validation Script

**Files:**
- Create: `scripts/validate-citations.ts`

- [ ] **Step 1: Create the validation script**

Create `scripts/validate-citations.ts`:

```ts
import { readFileSync, readdirSync } from "node:fs";
import matter from "gray-matter";

const CONTENT_DIR = "src/content/blog";

interface CheckResult {
  slug: string;
  passed: boolean;
  issues: string[];
}

function validatePost(filePath: string): CheckResult {
  const slug = filePath.split("/").pop()!.replace(".mdx", "");
  const raw = readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const issues: string[] = [];

  if (data.published !== true) return { slug, passed: true, issues };

  // Check for tldr
  if (!data.tldr) {
    issues.push("missing tldr (TL;DR answer capsule)");
  }

  // Check for faq
  if (!data.faq || data.faq.length < 3) {
    issues.push(`faq: need >= 3 Q&A pairs (has ${data.faq?.length ?? 0})`);
  }

  // Check for keyTakeaways
  if (!data.keyTakeaways || data.keyTakeaways.length < 3) {
    issues.push(`keyTakeaways: need >= 3 items (has ${data.keyTakeaways?.length ?? 0})`);
  }

  // Check external link count
  const externalLinks = content.match(/https?:\/\/(?!divkix\.me|localhost)[^\s)"'<>]+/g) || [];
  if (externalLinks.length < 3) {
    issues.push(`external links: need >= 3 citations (has ${externalLinks.length})`);
  }

  return { slug, passed: issues.length === 0, issues };
}

function main() {
  const files = readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));
  const results: CheckResult[] = files.map((f) => validatePost(`${CONTENT_DIR}/${f}`));

  const failed = results.filter((r) => !r.passed && r.issues.length > 0);
  const passed = results.filter((r) => r.passed);

  console.log(`\nCitation & Content Quality Check:`);
  console.log(`  Passed: ${passed.length}`);
  console.log(`  Warnings: ${failed.length}`);

  for (const r of failed) {
    console.log(`\n  [WARN] ${r.slug}:`);
    for (const issue of r.issues) {
      console.log(`    - ${issue}`);
    }
  }

  // Non-blocking: always exit 0
  process.exit(0);
}

main();
```

- [ ] **Step 2: Add to package.json scripts**

In `package.json`, add the new script to the `prebuild` pipeline. Read the current scripts section and add:

```json
"validate-citations": "bun run scripts/validate-citations.ts"
```

Note: Add this to the `prebuild` script so it runs before the build:

```json
"prebuild": "bun run scripts/generate-posts-metadata.js && bun run scripts/generate-og-images.js && bun run scripts/validate-content.ts && bun run scripts/validate-citations.ts"
```

This uses `&&` to chain (not `||`) so build continues even if citations have warnings.

If `prebuild` currently uses `&&` between steps, maintain it — the citation script exits 0 so it won't block the build.

- [ ] **Step 3: Verify**

Run: `bun run prebuild`

Expected: Build succeeds. Warnings should appear for the 6 blog posts missing tldr/faq/keyTakeaways.

- [ ] **Step 4: Commit**

```bash
git add scripts/validate-citations.ts package.json
git commit -m "feat: add citation density validation script for content quality"
```

---

### Task 8: Populate Missing Frontmatter for 6 Blog Posts

**Files:**
- Modify: `src/content/blog/ai-models-compared-2026.mdx`
- Modify: `src/content/blog/clickfolio-full-stack-cloudflare-workers.mdx`
- Modify: `src/content/blog/logwell-self-hosted-logging-platform.mdx`
- Modify: `src/content/blog/openclaw-ai-agent-review-2026.mdx`
- Modify: `src/content/blog/scaling-telegram-bot-300k-users.mdx`
- Modify: `src/content/blog/vibe-coding-truth-ai-programming-2026.mdx`

Each post needs `tldr`, `keyTakeaways` (3-5 items), and `faq` (3-5 Q&A pairs) added to its frontmatter.

- [ ] **Step 1: ai-models-compared-2026.mdx**

Insert after `published: true` (before the `---` closing frontmatter):

```yaml
tldr: "After testing ten flagship AI models daily for five months: GPT 5.5 leads coding benchmarks but DeepSeek V4 wins cost efficiency at 1/20th the price. Choose the right model for each task, not the strongest one for everything."
keyTakeaways:
  - "GPT 5.5 scores highest on coding benchmarks but costs 18x more than DeepSeek V4 per token"
  - "Claude Opus 4.7 is the most context-aware model for large codebase analysis with 1M token context"
  - "Kimi K2.6 is the most underrated model — matches Claude on coding, supports 256K context, MIT licensed"
  - "Gemini 3.1 Pro has the best multimodal capabilities for diagrams and UI analysis"
  - "DeepSeek V4 is the best value — 95% of GPT 5.5's coding ability at 1/20th the cost"
faq:
  - q: "Which AI model is best for coding in 2026?"
    a: "GPT 5.5 leads raw coding benchmarks, but the best depends on your task. DeepSeek V4 gives 95% of the performance at 5% of the cost. Claude Opus 4.7 excels at large codebase refactors with 1M token context. Kimi K2.6 is the dark horse with competitive performance and an open license."
  - q: "Is GPT 5.5 worth the cost over DeepSeek V4?"
    a: "Only if you need the absolute best code generation quality and can afford $0.15-$0.30 per request. For 95% of use cases, DeepSeek V4 or Claude Opus 4.7 provide sufficient quality at dramatically lower costs. I use DeepSeek V4 for most tasks and GPT 5.5 for mission-critical production code."
  - q: "Are open-source models catching up to proprietary ones?"
    a: "Yes, the gap is closing rapidly. DeepSeek V4 and Kimi K2.6 are competitive with proprietary flagships on most benchmarks. Local models run via LM Studio (like Qwen3-VL) now handle coding, vision, and reasoning tasks that required cloud models a year ago."
  - q: "What happened to Gemini 2.5 Pro?"
    a: "Gemini 3.1 Pro is the current flagship. Gemini 2.5 Pro was an intermediate release. The current lineup as of April 2026 is Gemini 3.0 Flash, 3.1 Pro, and 3.1 Ultra for enterprise. For most developers, 3.1 Pro is the right tier."
```

- [ ] **Step 2: clickfolio-full-stack-cloudflare-workers.mdx**

Insert after the tags field (before `---` closing frontmatter):

```yaml
tldr: "Built a full-stack AI resume-to-portfolio app on Cloudflare's free tier: D1 for data, R2 for file storage, Queues for PDF processing, Durable Objects for real-time WebSockets, and Gemini for AI parsing. Zero hosting costs, 50ms response times. Here's every technical decision and the ones I regret."
keyTakeaways:
  - "Cloudflare D1 + Drizzle ORM works well but watch out for SQLite limitations — no ALTER TABLE ADD CONSTRAINT"
  - "Durable Objects with WebSockets provide real-time progress updates during AI processing without polling"
  - "Queues are essential for async processing — PDF parsing takes 10-30 seconds, users shouldn't wait"
  - "R2 is perfect for user uploads — no egress fees and S3-compatible API"
  - "Biggest regret: should have used Hono instead of Next.js for better edge runtime compatibility"
faq:
  - q: "Can you really host a full-stack app for $0 on Cloudflare?"
    a: "Yes, for small to medium apps. Cloudflare's free tier includes 100K Workers requests/day, 5GB R2 storage, 500 D1 rows read/second, and 1M Queues operations/month. clickfolio.me operates well within these limits. For higher traffic, the $5/month Workers Paid plan covers 10M requests."
  - q: "Why D1 instead of Supabase or PlanetScale?"
    a: "D1 stays within Cloudflare's ecosystem, avoiding external network calls and egress costs. For a resume builder that's read-heavy with occasional writes, SQLite via D1 is more than sufficient. Supabase would be overkill at this scale."
  - q: "What are the limitations of Cloudflare Workers for full-stack apps?"
    a: "No filesystem access at runtime (prebuild everything), CPU time limits (30s on free, 30s-15min on paid), no native WebSocket support from client (must use Durable Objects), and SQLite via D1 means no concurrent writes to the same database. These are manageable with good architecture."
```

- [ ] **Step 3: logwell-self-hosted-logging-platform.mdx**

Insert after tags field (before `---` closing frontmatter):

```yaml
tldr: "Most logging tools are either too complex (ELK), too expensive (Datadog at $170+/month), or too weird (Loki's LogQL). Built Logwell as a single Docker Compose, PostgreSQL-native logging platform with real-time streaming, full-text search, and OTLP compatibility."
keyTakeaways:
  - "PostgreSQL full-text search handles millions of log entries faster than Elasticsearch for single-node setups"
  - "OTLP compatibility means Logwell works with any OpenTelemetry-instrumented app without vendor lock-in"
  - "One Docker Compose file vs ELK's 4+ services — operational simplicity matters more than features you won't use"
  - "Built entirely with Claude Code + TDD — 85% test coverage from day one, caught 3 architectural bugs before deployment"
  - "Self-hosting logging is viable if you're willing to handle backups and retention yourself"
faq:
  - q: "Isn't self-hosting logging a bad idea? What if the server goes down?"
    a: "For production-critical services, yes — use a managed provider. For side projects, internal tools, and dev environments, self-hosting saves hundreds per month. Logwell runs on a $6 VPS with automatic PostgreSQL backups to S3. If the server goes down, you lose logs during the outage period but not historical data."
  - q: "How does Logwell compare to Grafana Loki?"
    a: "Loki is more mature and scales horizontally. Logwell is simpler — one binary, one database, no LogQL learning curve. For teams under 20 people or projects with <100GB of logs, Logwell's simplicity wins. For larger deployments, Loki or Elasticsearch make more sense."
  - q: "Why PostgreSQL instead of Elasticsearch for log search?"
    a: "Elasticsearch is powerful but operationally expensive — it needs significant RAM, careful cluster management, and dedicated expertise. PostgreSQL's built-in full-text search with GIN indexes handles log queries efficiently for smaller deployments. The trade-off is simpler operations for slightly less advanced query capabilities."
```

- [ ] **Step 4: openclaw-ai-agent-review-2026.mdx**

Insert after tags field (before `---` closing frontmatter):

```yaml
tldr: "OpenClaw is the most-hyped AI agent of 2026 (180K GitHub stars), but after 2 weeks of daily use it's not ready to be your Jarvis. The paradigm it represents — agentic operating with real APIs and cross-platform messaging — is genuinely important, even if the current implementation has critical security and cost issues."
keyTakeaways:
  - "180K GitHub stars doesn't mean production-ready — OpenClaw has 512+ unpatched security vulnerabilities"
  - "Running costs of $10-25/day in API fees make it impractical for personal use without strict rate limiting"
  - "The most useful workflow was WhatsApp-to-AI bridge for personal task management and reminders"
  - "Agent-to-agent communication (Moltbot → Clawdbot) shows real promise but is too unreliable for daily use"
  - "Wait 3-6 months for the security audit + cost optimization wave before adopting for production work"
faq:
  - q: "Is OpenClaw worth installing today?"
    a: "Only if you're an AI agent enthusiast willing to spend $10-25/day and deal with frequent breakage. The technology is impressive but the security surface is unacceptable for any environment with sensitive data. Wait for the community to address the 512+ open security issues."
  - q: "What can OpenClaw actually do?"
    a: "It connects AI models to messaging platforms (WhatsApp, Telegram, Discord) and gives them agentic tools — web search, code execution, file system access, API calls. Think of it as giving ChatGPT the ability to send you WhatsApp messages, browse the web, and execute code autonomously."
  - q: "How does it compare to Claude Code's agent mode?"
    a: "Claude Code is purpose-built for coding and has strong guardrails. OpenClaw is a general-purpose agent framework with broader scope but weaker safety guarantees. For coding tasks, stick with Claude Code. For experimental personal automation, OpenClaw is more flexible but riskier."
```

- [ ] **Step 5: scaling-telegram-bot-300k-users.mdx**

Insert after tags field (before `---` closing frontmatter):

```yaml
tldr: "Grew an open-source Telegram bot from zero to 300K+ real users using a mix of honest community building and growth tactics I now question. The Python-to-Go rewrite was the technical turning point — 10x throughput, 1/5th the server cost."
keyTakeaways:
  - "Directory listing blitz on 25+ bot directories drove 40% of initial growth — but attracted low-quality users"
  - "Python-to-Go rewrite was the single best technical decision: 10x throughput, $25/month → $5/month server costs"
  - "Korean and Russian user bases grew 3x faster than English once localization was added"
  - "Telegram group admin favor-trading is effective but ethically questionable — I regret doing it"
  - "300K users at $5/month hosting: Go's efficiency is unmatched for high-concurrency real-time applications"
faq:
  - q: "Why rewrite from Python to Go instead of optimizing Python?"
    a: "Python's asyncio handles concurrency well, but for 300K+ users hitting the bot simultaneously, goroutines and Go's compiled nature give 10x throughput at a fraction of the memory. The rewrite took 2 weeks and immediately reduced server costs from $25 to $5/month."
  - q: "How did you get the first 1000 users?"
    a: "Telegram's Botfather directory + posting on Reddit and Telegram groups. Initial users were from the open-source community who found the GitHub repo organically. Growth really took off after adding Korean localization — the Korean Telegram bot community is surprisingly active."
  - q: "What's the most important lesson from scaling to 300K users?"
    a: "User acquisition tactics that feel wrong probably are wrong. The bot directories and admin favor-trading felt sketchy at the time. Looking back, I wish I'd focused 100% on organic growth through genuine community value instead of growth hacking."
```

- [ ] **Step 6: vibe-coding-truth-ai-programming-2026.mdx**

Insert after `published: true` (before `---` closing frontmatter):

```yaml
tldr: "Vibe coding — building software entirely through AI prompts — is the most divisive trend in 2026. After 3 months of using it, I can confirm: it's incredible for prototypes and MVPs, but will destroy your production codebase if you don't know what you're doing. 25% of YC startups have 95% AI-generated code — and it shows in their bug reports."
keyTakeaways:
  - "Vibe coding excels at prototypes: built a full-stack app in 4 hours that would have taken 2 weeks manually"
  - "The maintenance cliff is real: AI code has no architectural coherence, making refactoring 3x harder"
  - "25% of YC W25 batch has 95% AI-generated code — follow-up analysis shows 3x more production incidents"
  - "The sweet spot: AI generates 60-70% of code, you write the architecture, glue logic, and tests"
  - "Review all AI-generated code as if a junior dev wrote it — because a junior dev essentially did"
faq:
  - q: "Is vibe coding just a hype cycle, or is it the future?"
    a: "It's both. The hype will die down, but AI-assisted development isn't going away. The future is a hybrid — AI handles boilerplate, repetitive patterns, and scaffold work, while humans handle architecture, security, and business logic. Pure vibe coding (zero human review) is dangerous for anything that matters."
  - q: "When should I use vibe coding vs traditional development?"
    a: "Use vibe coding for prototypes, internal tools, hackathon projects, and MVPs where speed matters more than quality. Use traditional development for production systems, security-critical code, and anything you'll need to maintain for more than 6 months."
  - q: "What's the biggest risk of vibe coding?"
    a: "The maintenance cliff. AI generates code that works but isn't architected — no separation of concerns, duplicate logic, inconsistent patterns. When you need to change behavior 3 months later, you're fighting an incoherent codebase. The fix is to refactor AI output immediately after generation, before moving to the next feature."
  - q: "How do you review AI-generated code effectively?"
    a: "Three checks: (1) Does it follow the project's existing patterns and conventions? (2) Are edge cases handled — nulls, errors, rate limits? (3) Would a developer with 6 months experience understand this code in 3 months? If any answer is no, rewrite it before merging."
```

- [ ] **Step 7: Regenerate posts metadata**

Run: `bun run prebuild`

Expected: All 12 posts should now have tldr, keyTakeaways, and faq in the generated `content/blog/posts.json`. The citation validation script should show 0 warnings for the content fields (external links warnings OK — non-blocking).

- [ ] **Step 8: Commit**

```bash
git add src/content/blog/*.mdx content/blog/posts.json
git commit -m "feat: add tldr/faq/keyTakeaways frontmatter to all blog posts for AEO"
```

---

### Task 9: Enhance llms.txt Config

**Files:**
- Modify: `astro.config.mjs`

- [ ] **Step 1: Review current llms.txt plugin config**

The current config is already comprehensive. Only two minor tweaks:
1. For the `promote` and `demote` arrays, blog URL patterns use `/blog/**` but actual URLs are `/blog/slug/` — verify the plugin handles trailing slashes correctly (since `trailingSlash: "always"` adds them).
2. Ensure `Content-Type: text/markdown` header is set by the plugin (check plugin documentation — likely automatic).

No code changes needed if the plugin already handles trailing slashes. Add a comment for future maintainers:

In `astro.config.mjs`, after the `optionalLinks` array closing bracket, add a note about llms.txt serving:

The current config at line 154 should remain as-is. If the plugin docs confirm Content-Type is automatic, no change is needed.

- [ ] **Step 2: Verify llms.txt output**

Run: `bun run build`

Check: `dist/llms.txt`, `dist/llms-full.txt`, `dist/llms-small.txt` exist and contain correct content.

- [ ] **Step 3: Commit (only if changes were needed)**

```bash
git add astro.config.mjs
git commit -m "chore: verify llms.txt config for correct blog URL patterns"
```

If no changes needed, skip the commit.

---

### Task 10: Full Build Verification

- [ ] **Step 1: Run the complete build pipeline**

```bash
bun run build
```

Expected: Clean build with all 5 pipeline steps succeeding:
1. generate-posts-metadata.js — 12 posts processed
2. generate-og-images.js — OG images generated
3. validate-content.ts — MDX count matches posts.json
4. astro build — static build complete
5. validate-citations.ts — content quality warnings (non-blocking)

- [ ] **Step 2: Spot-check structured data in dist/**

```bash
# Check homepage has CollectionPage + Person + WebSite JSON-LD
grep -c 'application/ld+json' dist/index.html
# Expected: 3 (Person, WebSite from BaseLayout + CollectionPage)

# Check a blog post has all schemas
grep -c 'application/ld+json' dist/blog/ai-coding-tools-compared-2026/index.html
# Expected: 4 (BlogPosting + BreadcrumbList + FAQPage from post, Person + WebSite from BaseLayout = 5 total)
# Note: BaseLayout injects Person + WebSite on every page

# Check socials page has CollectionPage
grep 'CollectionPage' dist/socials/index.html
# Expected: 1 match

# Check privacy page has BreadcrumbList
grep 'BreadcrumbList' dist/privacy/index.html
# Expected: 1 match
```

- [ ] **Step 3: Type-check and lint**

```bash
bun run type-check
bun run lint
```

Expected: Both pass cleanly.

- [ ] **Step 4: Commit final verification**

```bash
git add -A
git commit -m "chore: final build verification after SEO/AEO/GEO optimization pass"
```

Wait — the file didn't write. Let me retry with the content. Actually it says "Wrote file successfully." The content was cut off at the end. Let me check. Actually the file was written successfully but the content might have been truncated. Let me verify.

Actually, looking at it, the Tool Result says "Wrote file successfully." so it should be fine. But looking at the end, the verification steps go through Step 4. Let me check by reading back the end of the file.<｜end▁of▁thinking｜>

<｜DSML｜tool_calls>
<｜DSML｜invoke name="read">
<｜DSML｜parameter name="filePath" string="true">/Users/divkix/GitHub/divkix.me/docs/superpowers/plans/2026-04-27-seo-aeo-geo-optimization.md