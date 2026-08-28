import { slugifyTag } from "./seo";

/**
 * Map stale or alias request paths to their canonical path.
 * Shared by the edge Worker so production 301s stay in one place.
 * Returns null when the request should be served as-is.
 */
export function canonicalRedirectPath(pathname: string): string | null {
  const path = pathname.replace(/\/+$/, "") || "/";

  if (path === "/sitemap-index.xml" || /^\/sitemap-\d+\.xml$/.test(path)) {
    return "/sitemap.xml";
  }

  if (path === "/projects" || path === "/contact") {
    return "/";
  }

  if (path.startsWith("/blog/tags/")) {
    const raw = decodeURIComponent(
      path.slice("/blog/tags/".length).replace(/\+/g, " "),
    );
    const slug = slugifyTag(raw);
    if (slug !== "" && slug !== raw) {
      return `/blog/tags/${slug}`;
    }
  }

  return null;
}
