#!/usr/bin/env node

/**
 * Build step: generate a markdown variant for every built page so the edge
 * Worker can serve text/markdown to AI agents via Accept-header negotiation
 * (see worker/index.ts). Each page's dist/<dir>/index.html gets a sibling index.md.
 */

const fs = require("node:fs");
const path = require("node:path");
const TurndownService = require("turndown");
const { gfm } = require("turndown-plugin-gfm");

const DIST = path.join(process.cwd(), "dist");

const turndown = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
  bulletListMarker: "-",
});
turndown.use(gfm);

/** Strip markup that carries no readable content and bloats the output. */
function cleanHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<nav[\s\S]*?<\/nav>/gi, "")
    .replace(/<footer[\s\S]*?<\/footer>/gi, "");
}

function findHtmlPages(dir) {
  const pages = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      pages.push(...findHtmlPages(full));
    } else if (entry.name === "index.html") {
      pages.push(full);
    }
  }
  return pages;
}

const pages = findHtmlPages(DIST);
let generated = 0;
for (const htmlPath of pages) {
  const md = turndown.turndown(cleanHtml(fs.readFileSync(htmlPath, "utf8")));
  fs.writeFileSync(path.join(path.dirname(htmlPath), "index.md"), `${md}\n`);
  generated++;
}

console.log(`Generated ${generated} markdown pages into dist/`);
