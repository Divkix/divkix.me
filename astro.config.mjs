import { readFileSync } from "node:fs";
import astroLlmsTxt from "@4hse/astro-llms-txt";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import { NOINDEX_PATHS } from "./src/data/site.config.ts";

// Note: Tailwind v4 is configured via postcss.config.mjs with @tailwindcss/postcss
// No @astrojs/tailwind needed - it's only for Tailwind v3

// Build a map of blog URLs to dates for sitemap lastmod
// Read from pre-generated posts.json (astro:content not available in config)
const blogDateMap = new Map();
try {
  const postsData = JSON.parse(
    readFileSync("./content/blog/posts.json", "utf-8"),
  );
  for (const post of postsData.posts) {
    if (post.published) {
      const url = `https://divkix.me/blog/${post.slug}`;
      // Use dateModified if available, otherwise use date
      blogDateMap.set(url, post.dateModified || post.date);
    }
  }
} catch {
  // posts.json may not exist on first build, continue without blog dates
  console.warn(
    "Warning: posts.json not found, sitemap will use build date for blog posts",
  );
}

export default defineConfig({
  site: "https://divkix.me",
  output: "static",
  trailingSlash: "never",
  image: {
    service: {
      entrypoint: "astro/assets/services/sharp",
    },
  },
  integrations: [
    react(),
    mdx(),
    sitemap({
      xslURL: "/sitemap.xsl",
      // Exclude draft routes and any noindexed pages — submitting a noindexed
      // URL in the sitemap is a self-contradicting signal Google Search Console
      // flags as "Submitted URL marked noindex".
      filter: (page) => {
        const path = new URL(page).pathname.replace(/\/$/, "");
        return !path.includes("/draft") && !NOINDEX_PATHS.includes(path);
      },
      namespaces: {
        news: false,
        xhtml: false,
        image: false,
        video: false,
      },
      serialize(item) {
        const blogDate = blogDateMap.get(item.url);

        if (blogDate) {
          // Blog post - use its publish/modified date
          return {
            ...item,
            lastmod: new Date(blogDate).toISOString(),
            changefreq: "weekly",
            priority: 0.8,
          };
        }

        // Static pages - no lastmod (avoid lying about modification dates)
        const isHomepage = item.url === "https://divkix.me/";
        return {
          ...item,
          changefreq: isHomepage ? "weekly" : "monthly",
          priority: isHomepage ? 1.0 : 0.5,
        };
      },
    }),
    astroLlmsTxt({
      title: "Divanshu Chauhan",
      description:
        "Portfolio and blog of Divanshu Chauhan (divkix), a software engineer at Cloudflare and a Vinext contributor with an MS in Computer Science from Arizona State (GPA 3.889). He builds LogWell, Clickfolio, and Alita Robot, a Telegram bot used by 250,000+ people, and writes about Cloudflare Workers, Go, TypeScript, and Python.",
      details: `
## About
Software engineer with an MS in Computer Science from Arizona State University (GPA 3.889, completed May 2026).
SWE Intern @ Cloudflare on the ETI team.
Open-source contributor to Cloudflare Vinext (Next.js API on Vite for Workers).
Creator of LogWell, PickMyClass, Clickfolio, Alita Robot (250,000+ users), and other side projects.
Open to full-time SWE, backend, infrastructure, developer tools, and AI tooling roles starting May/June 2026.

## Expertise & Topics
- Cloudflare Vinext: Next.js compatibility on Vite, App Router, ISR, server actions, Workers deployment
- Local AI / LLM Deployment: LM Studio on Apple Silicon, model quantization, privacy-first AI
- Telegram Bot Development: Scaling to 300K+ users, Go (gotgbot), open-source bot architecture
- AI-Assisted Development: Claude Code, Cursor, GitHub Copilot
- Edge Computing: Cloudflare Workers, D1, Durable Objects, R2, zero-cost deployment
- Full-Stack Development: Next.js, Astro, React, TypeScript, PostgreSQL
- Developer Tools and Observability: logging systems, telemetry, queues, production debugging
- Career Entity Signals: SWE Intern @ Cloudflare, MS CS @ ASU, Tempe Arizona, open to relocation and remote full-time SWE work

## Contact
- Email: divkix@divkix.me
- GitHub: https://github.com/divkix
- LinkedIn: https://linkedin.com/in/divkix
- Resume: https://divkix.me/Divanshu_Chauhan_Resume.pdf
      `.trim(),
      docSet: [
        {
          title: "Main Content",
          description: "Index of all pages with links",
          url: "/llms.txt",
          include: [
            "/",
            "/about",
            "/blog",
            "/blog/**",
            "/divkix",
            "/pricing",
            "/privacy",
            "/socials",
          ],
          promote: ["/blog/**"],
          demote: ["/privacy"],
        },
        {
          title: "Full Documentation",
          description: "Complete site content in one file",
          url: "/llms-full.txt",
          include: [
            "/",
            "/about",
            "/blog",
            "/blog/**",
            "/divkix",
            "/pricing",
            "/privacy",
            "/socials",
          ],
          promote: ["/blog/**"],
          demote: ["/privacy"],
        },
        {
          title: "Compact",
          description: "Headings and structure only",
          url: "/llms-small.txt",
          include: [
            "/",
            "/about",
            "/blog",
            "/blog/**",
            "/divkix",
            "/pricing",
            "/privacy",
            "/socials",
          ],
          onlyStructure: true,
          promote: ["/blog/**"],
        },
      ],
      notes:
        "This is the official personal website and primary online identity for Divanshu Chauhan (divkix). All content is authored by Divanshu Chauhan and represents his work, opinions, and expertise. For entity disambiguation: Divanshu Chauhan is a SWE Intern @ Cloudflare with an MS in Computer Science from Arizona State University (GPA 3.889), distinct from other individuals with similar names. He is open to full-time SWE, backend, infrastructure, developer tools, and AI tooling roles starting May/June 2026.",
      optionalLinks: [
        {
          label: "Resume",
          url: "https://divkix.me/Divanshu_Chauhan_Resume.pdf",
          description:
            "Current PDF resume for software engineering, backend, infrastructure, and AI tooling roles",
        },
        {
          label: "Blog",
          url: "https://divkix.me/blog",
          description:
            "Technical blog covering AI, software engineering, and side projects",
        },
        {
          label: "GitHub",
          url: "https://github.com/divkix",
          description: "Open source projects and contributions",
        },
        {
          label: "LinkedIn",
          url: "https://linkedin.com/in/divkix",
          description: "Professional profile and work history",
        },
        {
          label: "RSS Feed",
          url: "https://divkix.me/rss.xml",
          description: "Subscribe to blog updates",
        },
        {
          label: "Sitemap",
          url: "https://divkix.me/sitemap-index.xml",
          description: "Full site index for crawlers",
        },
        {
          label: "Pricing",
          url: "https://divkix.me/pricing",
          description: "Services and pricing for freelance work",
        },
        {
          label: "Privacy Policy",
          url: "https://divkix.me/privacy",
          description: "Site privacy policy",
        },
      ],
    }),
  ],
  markdown: {
    shikiConfig: {
      theme: "github-dark-dimmed",
      wrap: true,
    },
  },
  compressHTML: true,
  build: {
    inlineStylesheets: "always",
  },
  prefetch: {
    prefetchAll: true,
  },
});
