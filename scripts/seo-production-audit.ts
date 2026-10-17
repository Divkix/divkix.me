import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  clipMetaDescription,
  META_DESCRIPTION_MAX,
  slugifyTag,
} from "../src/lib/seo.ts";

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
const baseLayout = read("src/layouts/BaseLayout.astro");
const schema = read("src/lib/schema.ts");
const hasResumePage = read("src/pages/resume.astro").includes("<SiteLayout");

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
    hasResumePage,
    "Hero CTA references /resume, but the resume page is missing.",
  );
} else if (hero.includes('href="/Divanshu_Chauhan_Resume.pdf"')) {
  assert(
    redirects.includes("/resume /Divanshu_Chauhan_Resume.pdf 302") ||
      redirects.includes("/resume/ /Divanshu_Chauhan_Resume.pdf 302"),
    "Hero CTA references a PDF path, but the resume redirect is missing or misconfigured in _redirects.",
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
    hasResumePage,
    "Contact CTA references /resume, but the resume page is missing.",
  );
} else if (contact.includes('href="/Divanshu_Chauhan_Resume.pdf"')) {
  assert(
    redirects.includes("/resume /Divanshu_Chauhan_Resume.pdf 302") ||
      redirects.includes("/resume/ /Divanshu_Chauhan_Resume.pdf 302"),
    "Contact CTA references a PDF path, but the resume redirect is missing or misconfigured in _redirects.",
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
  robots.includes("Content-Signal: ai-train=yes, search=yes, ai-input=yes"),
  "robots.txt should allow AI assistants to use indexed content as answer context.",
);
assert(
  astroConfig.includes("Systems Engineer @ Cloudflare") &&
    !/SWE Intern @ Cloudflare|engineer intern at Cloudflare/i.test(astroConfig),
  "LLM discovery metadata should reflect the current full-time Cloudflare role, not the internship.",
);
assert(
  !/open to full-time/i.test(astroConfig),
  "LLM discovery metadata should not advertise a job search.",
);
const siteConfigSource = read("src/data/site.config.ts");
assert(
  siteConfigSource.includes('jobTitle: "Systems Engineer"'),
  "JSON-LD jobTitle should be Systems Engineer.",
);
assert(
  !/engineer intern at Cloudflare/i.test(siteConfigSource) &&
    !/Engineer Intern/.test(read("src/layouts/BaseLayout.astro")) &&
    !/Engineer Intern/.test(read("src/layouts/SiteLayout.astro")) &&
    !hero.includes("intern"),
  "Public copy should present Divanshu as a full-time Cloudflare engineer, not an intern.",
);
assert(
  !/open to full-time|open to work/i.test(siteConfigSource) &&
    !/open to full-time|open to work/i.test(hero) &&
    !/open to full-time/i.test(contact),
  "Open-to-work copy should be gone now that Divanshu works full-time.",
);
assert(
  astroConfig.includes('trailingSlash: "never"'),
  'astro.config.mjs should keep trailingSlash: "never" for canonical URLs.',
);
assert(
  !hero.includes("sr-only") || !hero.includes("Software Engineer and Builder"),
  "Homepage H1 should not hide extra crawler-only text inside the heading.",
);
assert(
  robots.includes("/sitemap.xml") && !robots.includes("sitemap-index.xml"),
  "robots.txt should advertise the canonical /sitemap.xml urlset, not sitemap-index.xml.",
);
assert(
  headers.includes('</sitemap.xml>; rel="sitemap"') &&
    !headers.includes("sitemap-index.xml"),
  "HTML Link headers should advertise /sitemap.xml as the sitemap.",
);
assert(
  baseLayout.includes('href="/sitemap.xml"') &&
    !baseLayout.includes("sitemap-index.xml"),
  'BaseLayout should <link rel="sitemap"> to /sitemap.xml.',
);
assert(
  /^\s*\/projects\s+\/\s+301\s*$/m.test(redirects) &&
    /^\s*\/contact\s+\/\s+301\s*$/m.test(redirects),
  "/projects and /contact should 301 to the homepage (sections live there).",
);
assert(
  schema.includes('["Article", "BlogPosting"]'),
  "Blog posts should emit Article JSON-LD (with BlogPosting).",
);
assert(
  slugifyTag("Claude Code") === "claude-code" &&
    slugifyTag("next.js") === "next.js",
  "Tag slugs should hyphenate spaces and keep dots.",
);
assert(
  /^\s*\/blog\/tags\/claude%20code\s+\/blog\/tags\/claude-code\s+301\s*$/m.test(
    redirects,
  ),
  "Space-encoded tag URLs should 301 to hyphenated slugs via public/_redirects.",
);
assert(
  /^\s*\/sitemap-index\.xml\s+\/sitemap\.xml\s+301\s*$/m.test(redirects) &&
    /^\s*\/sitemap-0\.xml\s+\/sitemap\.xml\s+301\s*$/m.test(redirects) &&
    /^\s*\/projects\s+\/\s+301\s*$/m.test(redirects) &&
    /^\s*\/contact\s+\/\s+301\s*$/m.test(redirects),
  "Sitemap aliases and /projects /contact should 301 to their canonical paths.",
);
assert(
  clipMetaDescription(
    "Divanshu Chauhan (divkix) is a systems engineer at Cloudflare and a Vinext contributor with an MS in Computer Science from Arizona State. He builds LogWell, Clickfolio, and Alita Robot, a Telegram bot used by 300,000+ people, and writes about edge computing, developer tools, and shipping side projects.",
  ).length <= META_DESCRIPTION_MAX,
  "clipMetaDescription should keep meta descriptions at ~160 characters.",
);
{
  const noSentence = "word ".repeat(50).trim();
  const clipped = clipMetaDescription(noSentence);
  assert(
    clipped.length <= META_DESCRIPTION_MAX && clipped.endsWith("…"),
    "clipMetaDescription ellipsis path must stay within META_DESCRIPTION_MAX.",
  );
  const noBreak = "x".repeat(200);
  const clippedNoBreak = clipMetaDescription(noBreak);
  assert(
    clippedNoBreak.length <= META_DESCRIPTION_MAX &&
      clippedNoBreak.endsWith("…"),
    "clipMetaDescription must not exceed max when the fallback slice has no break.",
  );
}
for (const path of ["/blog/", "/about/", "/privacy/", "/socials/"]) {
  const stripTrailingSlashRule = new RegExp(
    `^${path.replace(/\//g, "\\/")}\\s+\\S+\\s+30[12]`,
    "m",
  );
  assert(
    !stripTrailingSlashRule.test(redirects),
    `public/_redirects must not strip trailing slashes from ${path} (causes redirect loops: Cloudflare Pages serves index.html directories with a trailing slash).`,
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
