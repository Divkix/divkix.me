import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import { remarkReadingTime } from "./src/lib/remark-reading-time.mjs";

// Note: Tailwind v4 is configured via postcss.config.mjs with @tailwindcss/postcss
// No @astrojs/tailwind needed - it's only for Tailwind v3

export default defineConfig({
  site: "https://divkix.me",
  output: "static",
  integrations: [
    react(),
    mdx(),
    sitemap({
      filter: (page) => !page.includes("/draft/"),
    }),
  ],
  markdown: {
    remarkPlugins: [remarkReadingTime],
    shikiConfig: {
      theme: "github-dark-dimmed",
      wrap: true,
    },
  },
  vite: {
    optimizeDeps: {
      exclude: ["motion"],
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
