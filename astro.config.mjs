import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import astroLlmsTxt from "@4hse/astro-llms-txt";
import { defineConfig } from "astro/config";
import { readFileSync } from "node:fs";
import { remarkReadingTime } from "./src/lib/remark-reading-time.mjs";

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
      const url = `https://divkix.me/blog/${post.slug}/`;
      // Use dateModified if available, otherwise use date
      blogDateMap.set(url, post.dateModified || post.date);
    }
  }
} catch {
  // posts.json may not exist on first build, continue without blog dates
  console.warn("Warning: posts.json not found, sitemap will use build date for blog posts");
}

export default defineConfig({
  site: "https://divkix.me",
  output: "static",
  integrations: [
    react(),
    mdx(),
    sitemap({
      filter: (page) => !page.includes("/draft/"),
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

        // Static pages - use build date
        const isHomepage = item.url === "https://divkix.me/";
        return {
          ...item,
          lastmod: new Date().toISOString(),
          changefreq: isHomepage ? "weekly" : "monthly",
          priority: isHomepage ? 1.0 : 0.5,
        };
      },
    }),
    astroLlmsTxt({
      title: "Divanshu Chauhan",
      description:
        "Portfolio and blog of Divanshu Chauhan (divkix), a Software Engineer and CS grad student at Arizona State University. Building tools with Go, Python, TypeScript, and AI.",
      details: `
## About
Developer with 5+ years experience specializing in Go, Python, and TypeScript.
Creator of Alita Robot (1M+ Telegram users) and PickMyClass (ASU class monitoring).
Currently: MS Computer Science at Arizona State University.

## Contact
- Email: divkix@divkix.me
- GitHub: https://github.com/divkix
- LinkedIn: https://linkedin.com/in/divkix
      `.trim(),
      docSet: [
        {
          title: "Main Content",
          description: "Index of all pages with links",
          url: "/llms.txt",
          include: ["**/*"],
          promote: ["/blog/**"],
          demote: ["/404", "/privacy"],
        },
        {
          title: "Full Documentation",
          description: "Complete site content in one file",
          url: "/llms-full.txt",
          include: ["**/*"],
          promote: ["/blog/**"],
          demote: ["/404", "/privacy"],
        },
        {
          title: "Compact",
          description: "Headings and structure only",
          url: "/llms-small.txt",
          include: ["**/*"],
          onlyStructure: true,
          promote: ["/blog/**"],
        },
      ],
      optionalLinks: [
        {
          label: "Privacy Policy",
          url: "/privacy/",
          description: "Site privacy policy",
        },
      ],
    }),
  ],
  markdown: {
    remarkPlugins: [remarkReadingTime],
    shikiConfig: {
      theme: "github-dark-dimmed",
      wrap: true,
    },
  },
  compressHTML: true,
  build: {
    inlineStylesheets: "auto",
  },
  prefetch: {
    prefetchAll: true,
  },
});
