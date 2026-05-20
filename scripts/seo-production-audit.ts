import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures: string[] = [];

function read(relativePath: string): string {
  return readFileSync(join(root, relativePath), "utf8");
}

function assert(condition: boolean, message: string): void {
  if (!condition) failures.push(message);
}

const hero = read("src/components/sections/Hero.astro");
const contact = read("src/components/sections/Contact.tsx");
const headers = read("public/_headers");
const redirects = read("public/_redirects");
const robots = read("src/pages/robots.txt.ts");
const astroConfig = read("astro.config.mjs");

assert(
  (!hero.includes('href="/resume"') && !hero.includes('href="/resume/"')) ||
    redirects.includes("/resume /Divanshu_Chauhan_Resume.pdf 302") ||
    redirects.includes("/resume/ /Divanshu_Chauhan_Resume.pdf 302"),
  "Hero resume CTA should either point directly to the PDF or have a deployed /resume redirect.",
);
assert(
  (!contact.includes('href="/resume"') &&
    !contact.includes('href="/resume/"')) ||
    redirects.includes("/resume /Divanshu_Chauhan_Resume.pdf 302") ||
    redirects.includes("/resume/ /Divanshu_Chauhan_Resume.pdf 302"),
  "Contact resume CTA should either point directly to the PDF or have a deployed /resume redirect.",
);
assert(
  headers.includes("https://formspree.io"),
  "Content-Security-Policy should allow the Formspree contact endpoint.",
);
assert(
  headers.includes("form-action 'self' https://formspree.io"),
  "Content-Security-Policy should allow form submissions to Formspree.",
);
assert(
  robots.includes("Content-Signal: ai-train=no, search=yes, ai-input=yes"),
  "robots.txt should allow AI assistants to use indexed content as answer context.",
);
assert(
  astroConfig.includes("SWE Intern @ Cloudflare") &&
    astroConfig.includes("full-time SWE"),
  "LLM discovery metadata should reflect current Cloudflare role and full-time SWE search.",
);

if (failures.length > 0) {
  console.error(
    [
      "Divkix production SEO audit failed:",
      ...failures.map((f) => `- ${f}`),
    ].join("\n"),
  );
  process.exit(1);
}

console.log("Divkix production SEO audit passed.");
