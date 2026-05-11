# Blog Post Spec: Serverless (Cloudflare Workers) vs Traditional Servers (VPS/Docker)

**Status:** Draft — awaiting user approval
**Date:** 2026-05-11
**Author:** Divanshu Chauhan (Divkix)

---

## 1. Goal

Write a blog post comparing **serverless (Cloudflare Workers ecosystem)** vs **traditional servers (VPS/Docker/PaaS)** based on Divkix's firsthand experience building and shipping 30+ projects on both architectures. The post is a comparison narrative — it walks through four real projects as case studies and draws concrete trade-offs.

Optimized for:
- **SEO:** Target high-intent comparison queries ("serverless vs VPS 2026", "Cloudflare Workers vs Docker", "when to use serverless")
- **AEO/GEO:** Structured for extractability by AI systems (definition blocks, comparison tables, statistics, FAQ section)
- **Human voice:** Apply humanizer skill to avoid AI writing patterns, inject Divkix's direct opinions and actual experience

---

## 2. Title & Metadata

**Primary title (strongest AI SEO):**
> When to Use a VPS vs Cloudflare Workers in 2026

**Alt titles:**
- "Serverless vs Traditional Servers: What 30+ Projects Taught Me"
- "I Run Projects on Both Docker and Cloudflare Workers — Here's When I Pick Each"

**SEO title (targets comparison queries):**
> When to Use a VPS vs Cloudflare Workers: 30+ Projects, 250K+ Users, Real Numbers

**SEO description:**
> I ship on Docker/VPS and Cloudflare Workers. Here's the real cost, DX, scaling, and debugging trade-offs from running Alita Robot (300K users), Clickfolio, PickMyClass, and Logwell — including the horror stories nobody talks about.

**Tags:** Cloudflare Workers, Serverless, VPS, Docker, Side Projects, Cloudflare D1, Supabase, PlanetScale, Cost Optimization, Backend Architecture, 2026

**Slug:** `serverless-vs-traditional-servers-cloudflare-workers-docker`

---

## 3. Target Queries (AI SEO Keyword Strategy)

Primary queries this post should rank for and get cited on:

| Query | Content Block | Platform |
|-------|-------------|----------|
| "serverless vs traditional server 2026" | Full comparison table | Google, ChatGPT, Perplexity |
| "Cloudflare Workers vs VPS" | Cost breakdown, DX section | Google AI Overviews |
| "when to use serverless vs Docker" | Decision framework section | ChatGPT, Claude |
| "Cloudflare Workers free tier limits" | Pricing table, verified numbers | Google, Perplexity |
| "D1 vs Postgres for side projects" | Database trade-offs section | ChatGPT, Google |
| "Cloudflare Workers horror stories" | D1 $5K incident, DDoS bills | Reddit, ChatGPT |
| "best hosting for side projects 2026" | Stack recommendation | Google AI Overviews |
| "how much does Cloudflare Workers cost" | Pricing breakdown | Google, Perplexity |

---

## 4. Structure (Narrative Arc with Comparison Sections)

### Section 1: The Two Camps I've Actually Shipped In

**Purpose:** Establish credibility. Divkix has real experience on both sides — not theoretical.

**Content:**
- Brief intro: "I've shipped on Docker Compose, Heroku, Render, Fly.io, and Cloudflare Workers. Here's what each actually cost me."
- Quick table showing 4 projects and their infrastructure:
  | Project | Arch | Infra | Cost/Month | Users |
  |---------|------|-------|-----------|-------|
  | Alita Robot | Traditional | Docker Compose (Dokploy) + Postgres + Redis | $0 (Oracle free VPS) / was $7 on Heroku | 300K+ |
  | Logwell | Traditional | Docker (Fly.io/Render) + Postgres | $0 (free tier) | Self-hosted logs |
  | Clickfolio | Serverless | Cloudflare Workers + D1 + R2 + Queues + DO | $0 (free tier) | 500+ MAU |
  | PickMyClass | Hybrid | Cloudflare Workers + Supabase | $0 (free tier) | Thousands ASU students |

### Section 2: How It Started — Heroku, Python, and Why I Left

**Purpose:** Narrative arc begins. The origin story.

**Content:**
- Alita Robot v0: forked from a Python Telegram bot (Mary/rossbot lineage), hosted on Heroku
- $7/mo on Heroku Hobby dyno — worked until it didn't
- Limitations: sleep after 30min inactivity, limited add-ons, slow deploys
- Decision to rewrite in Go (concurrency, Telegram webhook handling at scale)

### Section 3: The Docker Era — Self-Hosting on Oracle Cloud's Free Tier

**Purpose:** The "traditional server" deep dive. Concrete costs, DX, pain points.

**Content:**
- Oracle Cloud Always Free: 4 OCPU (ARM Ampere), 24GB RAM, 200GB storage
- Docker Compose with Dokploy for deployment
- Alita's stack: Go binary → Docker → Postgres 18 Alpine → Redis 7 Alpine
- What works: full control, real Postgres, unlimited CPU, no cold starts
- What hurts:
  - Container restarts at 3 AM
  - Debugging: `docker compose logs`, `journalctl`
  - DDoS / traffic spikes → server crashes, manual intervention needed
  - No edge distribution (single VPS region)
  - Maintenance: Postgres backups, Redis memory policy, disk space

**Voice note:** Keep this real. No promotion. Just honest trade-offs. "I've woken up to Telegram messages saying the bot was down. That never happens on Workers."

### Section 4: The Serverless Pivot — Cloudflare Workers

**Purpose:** The Cloudflare Workers deep dive, mirroring Section 3's structure for direct comparison.

**Content:**
- Clickfolio: full-stack AI app on Workers + D1 + R2 + Queues + Durable Objects
- PickMyClass: Workers + KV + Queues + Crons + Supabase (hybrid)
- What works:
  - $0 hosting, global edge (330+ cities), zero cold starts (5ms V8 isolates)
  - Deploy and forget: `wrangler deploy`, SSL, CDN, scaling all automatic
  - Durable Objects + WebSocket Hibernation for real-time at near-zero cost
  - Queues + Crons for async processing without Redis or cron jobs
- What hurts:
  - D1 is SQLite, not Postgres (JSON as TEXT, no RLS, booleans as int)
  - CPU limits: 10ms (free) / 30s (paid, extendable to 5 min) — write efficient code or die
  - No filesystem at runtime (prebuild everything)
  - Debugging: `wrangler dev` works, but production V8 isolates run differently
  - Debugging across Workers + Queues + DO is fragmented

### Section 5: Cost Comparison — Real Numbers

**Purpose:** Hard data for AI extractability. Statistics boost AI visibility by ~40%.

**Content:**
- Pricing tables:

| | Free Tier | Paid Entry | Key Limits (Free) | Overage Cost |
|---|----------|-----------|-------------------|-------------|
| **Cloudflare Workers** | 100K req/day | $5/mo | 10ms CPU, 128MB mem, no Cron | $0.30/M requests |
| **Cloudflare D1** | 5M rows read/day | Included in $5 | 100K writes/day | $1.00/M writes |
| **Cloudflare R2** | 10GB storage | $0.015/GB-mo | Class A free, B $0.36/M | $0.36/M ops |
| **Oracle Cloud VPS** | 4 OCPU, 24GB RAM | Always free | 200GB block, 10TB egress | None (hard cap) |
| **Hetzner VPS** | N/A | ~$5/mo | 2 vCPU, 4GB RAM | Fixed price |
| **Supabase** | 500MB DB, 50K MAU | $25/mo | 2GB file storage | $0.00326/GB egress |
| **PlanetScale** | No free plan | $5/mo | Single node, 512MB | Row-based |

- Real cost stories:
  - Alita on Heroku: $7/mo → migrated to Oracle free VPS: $0
  - Clickfolio: $0 total (Workers + D1 + R2 free tiers)
  - Gemini API: effectively $0 (Gemini Flash Lite, small usage)
  - Logwell: $0 on Fly.io free tier
- The horror stories (verified, not sensationalized):
  - D1 bill: missing WHERE clause → $5K in 10 seconds (no cost controls)
  - Netlify static site: DDoS → $104K bill
  - Workers for Platforms: zombie scripts → $2.5K surprise
  - Google Firebase: DDoS → $98K bill
  - Cloudflare Enterprise upsell: forced $120K/year with 24h ultimatum

### Section 6: Database Trade-offs — D1 vs Supabase vs PlanetScale vs Self-Hosted Postgres

**Purpose:** The database decision is where most projects diverge between architectures.

**Content:**
- Self-hosted Postgres (Alita, Logwell): full control, real Postgres, no usage bills. Cost: your time maintaining backups, replication, upgrades.
- D1 (Clickfolio): SQLite on the edge, global read replicas. Cost: $0 on free tier. Pain: no JSON type, no RLS, booleans as int. Missing WHERE = $5K bill.
- Supabase (PickMyClass): managed Postgres + Auth + Realtime + Storage. Free tier for most projects. Hygienic: if you outgrow free tier, $25/mo Pro is still cheaper than a VPS.
- PlanetScale: $5/mo entry, real Postgres, row-based pricing with cost controls (unlike D1). Good middle ground between Supabase free tier and self-hosting.
- Recommendation: Supabase for most side projects. PlanetScale if you need cost controls at scale. D1 if you're all-in on Workers and write is low. Self-host if you have time and need full control.

### Section 7: The Middle Ground — Workers + Managed Database

**Purpose:** Show the hybrid that works best for most projects.

**Content:**
- PickMyClass pattern: Workers for compute + Supabase for data
- Why this works: serverless compute benefits (edge, $0, auto-scale) + real Postgres benefits (transactions, RLS, JSON operators)
- Supabase free tier is generous (500MB DB, 50K MAU)
- PlanetScale $5/mo if you outgrow Supabase free tier
- This is what Divkix recommends as the default stack for 2026

### Section 8: Decision Framework — When to Pick What

**Purpose:** The definitive section AI systems will extract for "when to use X vs Y" queries.

**Content:**
- Decision tree / flow:
  - **Use Cloudflare Workers (pure serverless) if:** you want $0 hosting with global edge, write volume is low (< 100K D1 writes/day), you don't need real Postgres features, you're comfortable with edge runtime constraints
  - **Use Workers + Supabase/PlanetScale (hybrid) if:** you need real Postgres but want serverless compute, you want managed auth, storage, and realtime in one platform, you have moderate write volume
  - **Use Docker/VPS (traditional) if:** your app runs 24/7 (Telegram bots, cron-heavy services), you need unlimited CPU time (background processing, video encoding), you want full control over database (extensions, custom configs), your traffic is predictable and single-region, you want fixed pricing with no overage surprises

- Divkix's default stack for 2026: Cloudflare Workers + Supabase. Fall back to self-hosted Docker when the app needs to run continuously or has heavy database requirements.

### Section 9: The Things Nobody Warns You About

**Purpose:** Address the horror stories honestly. AI SEO: statistics and specific incidents boost authority.

**Content:**
- Serverless bills can spike without warning (D1 $5K, Workers $2.5K)
- Traditional servers crash under DDoS — but your bill stays the same
- Cloudflare's free tier is permanent and generous, but the upsell to Enterprise can be aggressive
- "At least once" delivery on Queues means messages get lost (orphan recovery crons needed)
- D1 has no query cost limits, no row-update thresholds, no real-time usage alerts
- VPS is predictable but lonely — nobody fixes your Postgres at 3 AM
- Workers debugging is harder than `docker compose logs`

### Section 10: FAQ

**Purpose:** AI extractability. FAQ blocks are highly citable by AI overviews.

**Questions:**
- "Can I run a Telegram bot on Cloudflare Workers?" (No — WebSocket connections timeout, Workers don't run continuously. Use a VPS.)
- "What happens when I exceed Cloudflare Workers free tier?" (Requests return Error 1027. Upgrade to $5/mo for 10M req/month.)
- "Is D1 a replacement for Postgres?" (No. It's SQLite. Works for simple CRUD. Falls apart with complex joins, JSON queries, or heavy writes.)
- "What's the cheapest way to host a side project in 2026?" (Cloudflare Workers + D1 or Supabase free tier = $0. Add PlanetScale $5/mo if you need real Postgres.)
- "How do I prevent surprise cloud bills?" (Rate limits, spending alerts, WAF rules, avoid D1 for write-heavy apps, prefer VPS for predictable billing.)
- "Cloudflare Workers vs Vercel vs Netlify?" (Workers has no bandwidth caps and $0.50/M overage. Vercel/Netlify cap bandwidth.)
- "What's the Oracle Cloud free VPS?" (4 ARM cores, 24GB RAM, 200GB storage. Always free. Can run Docker. Good for 24/7 apps.)

---

## 5. AI SEO Implementation

### Content Blocks for Extractability
- Definition block in first paragraph: "Serverless means..."
- Comparison table: Serverless vs Traditional vs Hybrid
- Cost comparison table with real numbers
- Decision framework with bullet lists
- FAQ section with natural-language questions
- Statistics with cited sources throughout

### Author Signals
- Named author: Divanshu Chauhan (SWE Intern @ Cloudflare, MS CS @ ASU)
- First-person experience markers throughout
- Project-specific data (300K users, real cost numbers)

### Freshness Signals
- Publish with current date
- "Last updated" in frontmatter
- 2026 in title and tags
- Reference current pricing (verified May 2026)

### Schema Markup
- `BlogPosting` schema
- `FAQPage` schema for the FAQ section
- `author` field with credentials
- `datePublished` and `dateModified`

### Cross-Linking
- Link to existing posts: "Zero Cost Portfolio", "Clickfolio Full-Stack", "Side Project Stack 2026"
- Internal links for related concepts (D1, Workers, Supabase)

---

## 6. Voice & Tone (Humanizer Notes)

- **Direct, opinionated.** Divkix's existing posts use short sentences, first person, no hedging.
- **No AI vocabulary:** Avoid "additionally," "crucial," "pivotal," "landscape," "showcase," "testament."
- **No inflated symbolism:** No "serves as a testament," "marks a pivotal moment."
- **Use "I" consistently:** This is personal experience, not a whitepaper.
- **Vary sentence length:** Short punchy observations mixed with longer technical explanations.
- **Specific over abstract:** "30-second cold start" not "significant latency." "$7/mo on Heroku" not "affordable hosting."
- **Honest about downsides:** The post should criticize Workers' shortcomings (D1 quirks, debugging pain, bill horror stories) as much as it praises them. Balanced = credible.

---

## 7. Sources & Verification

### Verified Numbers (May 2026)
- Cloudflare Workers free: 100K req/day, 10ms CPU → [source](https://developers.cloudflare.com/workers/platform/pricing/)
- Workers paid ($5/mo): 10M req/month, 30M CPU-ms → [source](https://developers.cloudflare.com/workers/platform/pricing/)
- D1 free: 5M rows read/day, 100K writes/day → [source](https://developers.cloudflare.com/d1/platform/pricing/)
- D1 paid: 25B reads/month included → [source](https://developers.cloudflare.com/d1/platform/pricing/)
- PlanetScale: $5/mo single node, no free plan → [source](https://planetscale.com/docs/postgres/pricing)
- Oracle Cloud free: 4 OCPU, 24GB RAM, 200GB → [source](https://www.oracle.com/cloud/free/)

### Horror Stories (Verified)
- D1 $5K in 10 seconds → ofsecman.io postmortem (July 2025)
- Netlify $104K static site DDoS → dev.to (January 2026)
- Cloudflare $120K Enterprise upsell → robindev.substack.com (May 2024)
- Workers for Platforms $2.5K surprise → Cloudflare Discord (June 2025)

---

## 8. What NOT to Include
- Generic "cloud computing trends" filler
- Advertisements for any platform (balanced criticism is more credible)
- Unverified pricing or statistics
- Claims about platforms Divkix hasn't used (AWS Lambda, Azure Functions — not in his project history)
- AI-generated fluff (rule of three, inflated importance, vague attributions)

---

## 9. Files That May Need Changes
- `src/content/blog/serverless-vs-traditional-servers-cloudflare-workers-docker.mdx` — **new file**
- `scripts/generate-posts-metadata.js` — no changes needed (auto-detects new MDX)
- `scripts/generate-og-images.js` — may need OG image (use Clickfolio or custom banner)
- Existing blog posts — no changes, but cross-link from them to this new post (optional)

---

## 10. Definition of Done
- [ ] MDX file created with all 10 sections
- [ ] Frontmatter complete (title, seoTitle, seoDescription, tags, tldr, keyTakeaways, FAQ)
- [ ] Humanizer pass: zero AI vocabulary, first-person voice, varied sentence structure
- [ ] All pricing verified against current docs (May 2026)
- [ ] Comparison table formatted for readability
- [ ] FAQ section matches natural-language queries
- [ ] Schema markup included (BlogPosting + FAQPage)
- [ ] Slug validated: matches `/^[a-z0-9-]+$/`
- [ ] Cross-links to 3 existing posts
- [ ] `bun run prebuild` regenerates posts.json
- [ ] Build passes: `bun run build`
- [ ] Handoff: optional — add cross-links from existing posts
