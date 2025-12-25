import type { APIRoute } from "astro";
import { baseUrl } from "@/lib/seo";

export const GET: APIRoute = () => {
  const robotsTxt = `
# *
User-agent: *
Allow: /

# Disallow admin or private paths (if any exist in the future)
# Disallow: /admin/

# Host
Host: ${baseUrl}

# Sitemaps
Sitemap: ${baseUrl}/sitemap-index.xml
`.trim();

  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
