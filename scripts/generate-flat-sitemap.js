#!/usr/bin/env node

/**
 * Build step: merge the @astrojs/sitemap chunks (sitemap-0.xml, ...) into a
 * single flat sitemap at dist/sitemap.xml listing every indexable URL.
 *
 * /sitemap.xml is the canonical sitemap (urlset). robots.txt, <link rel="sitemap">,
 * IndexNow, and llms.txt all point here. The Astro index at sitemap-index.xml
 * and chunk files 301 to /sitemap.xml at the edge so crawlers see one story.
 */

const fs = require("node:fs");
const path = require("node:path");

const DIST = path.join(process.cwd(), "dist");

function findSitemapChunks(dir) {
  const chunks = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      chunks.push(...findSitemapChunks(full));
    } else if (/^sitemap-\d+\.xml$/.test(entry.name)) {
      chunks.push(full);
    }
  }
  return chunks;
}

const chunks = findSitemapChunks(DIST);
if (chunks.length === 0) {
  console.warn("Warning: no sitemap chunks found, skipping flat sitemap");
  process.exit(0);
}

const urls = [];
for (const chunk of chunks) {
  const xml = fs.readFileSync(chunk, "utf8");
  for (const match of xml.matchAll(/<url>[\s\S]*?<\/url>/g)) {
    urls.push(match[0]);
  }
}

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...urls,
  "</urlset>",
  "",
].join("\n");

fs.writeFileSync(path.join(DIST, "sitemap.xml"), sitemap);
console.log(`Generated dist/sitemap.xml with ${urls.length} URLs`);
