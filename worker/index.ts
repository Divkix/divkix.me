/**
 * Edge Worker in front of the static assets.
 *
 * Responsibilities:
 * 1. 301 stale aliases to their canonical path (sitemap index/chunks,
 *    /projects and /contact, space-encoded blog tag slugs).
 * 2. Markdown content negotiation (acceptmarkdown.com): when a request sends
 *    `Accept: text/markdown`, serve the prebuilt markdown variant of the page
 *    (generated at build time into dist/) with a correct `Vary: Accept`.
 * 3. Ensure HTML responses also declare `Vary: Accept` so shared caches never
 *    mix the HTML and markdown variants for the same URL.
 */

import { canonicalRedirectPath } from "../src/lib/seoRedirects";

interface Env {
  ASSETS: {
    fetch: typeof fetch;
  };
}

/** Asset paths that may hold a markdown variant for a given URL path. */
function markdownCandidates(pathname: string): string[] {
  if (pathname === "/" || pathname === "") return ["/index.md"];
  return [`${pathname}.md`, `${pathname}/index.md`];
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const pathname = url.pathname.replace(/\/+$/, "") || "/";

    const redirectTo = canonicalRedirectPath(pathname);
    if (redirectTo !== null) {
      return Response.redirect(new URL(redirectTo, url.origin), 301);
    }

    if ((request.headers.get("Accept") ?? "").includes("text/markdown")) {
      for (const candidate of markdownCandidates(pathname)) {
        const asset = await env.ASSETS.fetch(
          new Request(new URL(candidate, url.origin), request),
        );
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
    const contentType = asset.headers.get("Content-Type") ?? "";
    if (!contentType.startsWith("text/html")) return asset;

    const headers = new Headers(asset.headers);
    headers.set("Vary", "Accept");
    return new Response(asset.body, {
      status: asset.status,
      statusText: asset.statusText,
      headers,
    });
  },
};
