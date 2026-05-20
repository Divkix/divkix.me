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

const hasHeroCta =
  hero.includes('href="/Divanshu_Chauhan_Resume.pdf"') ||
  hero.includes('href="/resume"') ||
  hero.includes('href="/resume/"');
assert(
  hasHeroCta,
  "Hero should contain a resume CTA pointing to the PDF or a /resume path.",
);

if (hero.includes('href="/resume"') || hero.includes('href="/resume/"')) {
  assert(
    redirects.includes("/resume /Divanshu_Chauhan_Resume.pdf 302") ||
      redirects.includes("/resume/ /Divanshu_Chauhan_Resume.pdf 302"),
    "Hero CTA references a redirect path, but the redirect is missing or misconfigured in _redirects.",
  );
}

const hasContactCta =
  contact.includes('href="/Divanshu_Chauhan_Resume.pdf"') ||
  contact.includes('href="/resume"') ||
  contact.includes('href="/resume/"');
assert(
  hasContactCta,
  "Contact should contain a resume CTA pointing to the PDF or a /resume path.",
);

if (contact.includes('href="/resume"') || contact.includes('href="/resume/"')) {
  assert(
    redirects.includes("/resume /Divanshu_Chauhan_Resume.pdf 302") ||
      redirects.includes("/resume/ /Divanshu_Chauhan_Resume.pdf 302"),
    "Contact CTA references a redirect path, but the redirect is missing or misconfigured in _redirects.",
  );
}
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
assert(
  astroConfig.includes('trailingSlash: "always"'),
  'astro.config.mjs should keep trailingSlash: "always" for canonical URLs.',
);
for (const path of ["/blog/", "/about/", "/privacy/", "/socials/"]) {
  const stripTrailingSlashRule = new RegExp(
    `^${path.replace(/\//g, "\\/")}\\s+\\S+\\s+30[12]`,
    "m",
  );
  assert(
    !stripTrailingSlashRule.test(redirects),
    `public/_redirects must not strip trailing slashes from ${path} while trailingSlash is "always" (causes redirect loops with Astro).`,
  );
}

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
