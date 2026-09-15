/**
 * Edge Worker in front of the static assets.
 *
 * Responsibilities:
 * 1. 301 stale aliases to their canonical path (sitemap index/chunks,
 *    /projects and /contact, space-encoded blog tag slugs).
 * 2. Markdown content negotiation (acceptmarkdown.com): when the request
 *    Accept header prefers `text/markdown` (RFC 9110 q-value parsing),
 *    serve the prebuilt markdown variant of the page (generated at build
 *    time into dist/) with a correct `Vary: Accept`.
 * 3. Ensure HTML responses declare `Vary: Accept` (appended, never
 *    overwriting) and advertise the markdown sibling via
 *    `Link: rel="alternate"`, so shared caches never mix the HTML and
 *    markdown variants for the same URL.
 * 4. Serve an agent-recoverable markdown 404 (with recovery links) when
 *    markdown was requested for a missing page.
 *
 * Pure helpers are exported for testing (no node APIs here).
 */

import { canonicalRedirectPath } from "../src/lib/seoRedirects";

interface Env {
  ASSETS: {
    fetch: typeof fetch;
  };
}

type AcceptEntry = { type: string; q: number; specificity: number };

export function parseAccept(header: string): AcceptEntry[] {
  return header
    .split(",")
    .map((raw) => {
      const parts = raw
        .trim()
        .split(";")
        .map((s) => s.trim());
      const type = parts[0]?.toLowerCase() ?? "";
      if (!type) return null;
      let q = 1;
      for (const param of parts.slice(1)) {
        const eq = param.indexOf("=");
        const name = (eq === -1 ? param : param.slice(0, eq)).trim();
        const value = eq === -1 ? "" : param.slice(eq + 1).trim();
        if (name === "q") {
          const parsed = Number(value);
          if (!Number.isNaN(parsed)) q = Math.max(0, Math.min(1, parsed));
        }
      }
      const specificity = type === "*/*" ? 0 : type.endsWith("/*") ? 1 : 2;
      return { type, q, specificity };
    })
    .filter((e): e is AcceptEntry => e !== null);
}

function matches(entry: AcceptEntry, candidate: string): boolean {
  if (entry.type === "*/*") return true;
  if (entry.type.endsWith("/*")) {
    return candidate.startsWith(entry.type.slice(0, -1));
  }
  return entry.type === candidate;
}

const PRODUCES = ["text/html", "text/markdown"];

// RFC 9110 §12.5.1: most-specific matching range wins per candidate,
// then highest q.
export function preferredType(header: string | null, produces: string[]): string | null {
  if (!header) return produces[0] ?? null;
  const entries = parseAccept(header);
  if (entries.length === 0) return produces[0] ?? null;

  let bestType: string | null = null;
  let bestQ = -1;
  let bestPosition = Number.POSITIVE_INFINITY;

  for (const candidate of produces) {
    let matched: AcceptEntry | null = null;
    let matchedPosition = Number.POSITIVE_INFINITY;
    for (let idx = 0; idx < entries.length; idx++) {
      const e = entries[idx];
      if (!e || !matches(e, candidate)) continue;
      if (
        matched === null ||
        e.specificity > matched.specificity ||
        (e.specificity === matched.specificity && idx < matchedPosition)
      ) {
        matched = e;
        matchedPosition = idx;
      }
    }
    if (matched === null || matched.q <= 0) continue;
    if (matched.q > bestQ || (matched.q === bestQ && matchedPosition < bestPosition)) {
      bestQ = matched.q;
      bestPosition = matchedPosition;
      bestType = candidate;
    }
  }

  return bestType;
}

export function appendVaryAccept(headers: Headers): void {
  const existing = headers.get("Vary");
  if (!existing) {
    headers.set("Vary", "Accept");
    return;
  }
  const tokens = existing.split(",").map((s) => s.trim().toLowerCase());
  if (!tokens.includes("accept")) headers.set("Vary", `${existing}, Accept`);
}

/** Asset paths that may hold a markdown variant for a given URL path. */
function markdownCandidates(pathname: string): string[] {
  if (pathname === "/" || pathname === "") return ["/index.md"];
  return [`${pathname}.md`, `${pathname}/index.md`];
}

/** First markdown sibling that exists in dist/, or null. */
async function markdownSibling(url: URL, env: Env, pathname: string): Promise<string | null> {
  for (const candidate of markdownCandidates(pathname)) {
    const head = await env.ASSETS.fetch(
      new Request(new URL(candidate, url.origin), { method: "HEAD" }),
    );
    if (head.status === 200) return candidate;
  }
  return null;
}

const MARKDOWN_404_LINKS: Array<[string, string]> = [
  ["Homepage", "/"],
  ["About", "/about"],
  ["Blog", "/blog"],
  ["Sitemap", "/sitemap.xml"],
  ["Machine-readable overview", "/llms.txt"],
  ["Blog RSS feed", "/rss.xml"],
];

export function markdownNotFound(pathname: string): Response {
  const lines = [
    "# Page not found",
    "",
    `No page exists at \`${pathname}\`.`,
    "",
    "## Where to look next",
    "",
    ...MARKDOWN_404_LINKS.map(([label, path]) => `- [${label}](https://divkix.me${path})`),
    "",
  ];
  const res = new Response(lines.join("\n"), {
    status: 404,
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
  appendVaryAccept(res.headers);
  return res;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const pathname = url.pathname.replace(/\/+$/, "") || "/";

    const redirectTo = canonicalRedirectPath(pathname);
    if (redirectTo !== null) {
      return Response.redirect(new URL(redirectTo, url.origin), 301);
    }

    const accept = request.headers.get("Accept");
    const wantsMarkdown = preferredType(accept, PRODUCES) === "text/markdown";

    if (wantsMarkdown) {
      for (const candidate of markdownCandidates(pathname)) {
        const asset = await env.ASSETS.fetch(new Request(new URL(candidate, url.origin), request));
        if (asset.status === 200) {
          return new Response(asset.body, {
            status: 200,
            headers: {
              "Content-Type": "text/markdown; charset=utf-8",
              Vary: "Accept",
              // Mirrors the Cache-Control set in public/_headers so both
              // variants share the same freshness policy.
              "Cache-Control": "public, max-age=3600, must-revalidate",
            },
          });
        }
      }
    }

    const asset = await env.ASSETS.fetch(request);
    if (asset.status === 404 && wantsMarkdown) {
      return markdownNotFound(pathname);
    }
    const contentType = asset.headers.get("Content-Type") ?? "";
    if (!contentType.startsWith("text/html")) return asset;

    const headers = new Headers(asset.headers);
    appendVaryAccept(headers);

    const sibling = await markdownSibling(url, env, pathname);
    if (sibling !== null) {
      const linkValue = `<${sibling}>; rel="alternate"; type="text/markdown"`;
      const existing = headers.get("Link");
      headers.set("Link", existing ? `${existing}, ${linkValue}` : linkValue);
    }

    return new Response(asset.body, {
      status: asset.status,
      statusText: asset.statusText,
      headers,
    });
  },
};
