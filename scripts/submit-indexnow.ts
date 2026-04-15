import { readFileSync } from "node:fs";
import { join } from "node:path";

const API_KEY = "b8f4e2a1c9d7e3f5";
const HOST = "divkix.me";
const SITEMAP_PATH = join(process.cwd(), "dist/sitemap-0.xml");
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

async function submitIndexNow(): Promise<void> {
  const branch = process.env.CF_PAGES_BRANCH;

  // Only run on production (main branch) deploys
  if (branch !== "main") {
    console.log(`🔍 IndexNow: Skipping (branch: ${branch || "local"})`);
    return;
  }

  console.log("📡 IndexNow: Submitting URLs to search engines...");

  // Read sitemap
  let sitemap: string;
  try {
    sitemap = readFileSync(SITEMAP_PATH, "utf-8");
  } catch (error) {
    console.error(
      `⚠️  IndexNow: Failed to read sitemap: ${error instanceof Error ? error.message : error}`,
    );
    return; // Don't fail build
  }

  const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);

  if (urls.length === 0) {
    console.warn("⚠️  IndexNow: No URLs found in sitemap");
    return;
  }

  console.log(`📋 IndexNow: Found ${urls.length} URLs to submit`);

  // Submit to IndexNow API
  try {
    const response = await fetch(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        host: HOST,
        key: API_KEY,
        keyLocation: `https://${HOST}/${API_KEY}.txt`,
        urlList: urls,
      }),
    });

    if (response.ok || response.status === 202) {
      console.log(
        `✅ IndexNow: Successfully submitted ${urls.length} URLs (status: ${response.status})`,
      );
    } else {
      const text = await response.text().catch(() => "");
      console.warn(
        `⚠️  IndexNow: API returned status ${response.status}${text ? `: ${text}` : ""}`,
      );
    }
  } catch (error) {
    console.warn(
      `⚠️  IndexNow: Failed to submit: ${error instanceof Error ? error.message : error}`,
    );
    // Don't fail build - IndexNow is optional
  }
}

submitIndexNow();
