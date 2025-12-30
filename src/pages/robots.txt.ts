import type { APIRoute } from "astro";
import { baseUrl } from "@/lib/seo";

export const GET: APIRoute = () => {
  const robotsTxt = `
# Robots.txt for divkix.me

# Allow all crawlers
User-agent: *
Allow: /

# AI Crawler Guidance - Allow AI bots to index content
User-agent: GPTBot
User-agent: ChatGPT-User
User-agent: Claude-Web
User-agent: Anthropic-AI
User-agent: PerplexityBot
User-agent: Applebot-Extended
User-agent: Google-Extended
User-agent: Amazonbot
User-agent: Meta-ExternalAgent
User-agent: cohere-ai
Allow: /

# Host
Host: ${baseUrl}

# Sitemap location
Sitemap: ${baseUrl}/sitemap-index.xml
`.trim();

  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
