import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
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
