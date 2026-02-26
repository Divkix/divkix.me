import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";

interface PostMetadata {
  slug: string;
  title: string;
  date: string;
}

interface PostsJson {
  totalPosts: number;
  posts: PostMetadata[];
}

const CONTENT_DIR = join(process.cwd(), "src/content/blog");
const POSTS_JSON = join(process.cwd(), "content/blog/posts.json");

function validateContent(): void {
  console.log("🔍 Validating content sync...");

  // Check if content directory exists
  if (!existsSync(CONTENT_DIR)) {
    console.error(`❌ Content directory not found: ${CONTENT_DIR}`);
    console.error("   Make sure you have blog posts in src/content/blog/");
    process.exit(1);
  }

  // Check if posts.json exists
  if (!existsSync(POSTS_JSON)) {
    console.error("❌ posts.json not found. Run prebuild first.");
    process.exit(1);
  }

  // Get all MDX files with error handling
  let mdxFiles: string[];
  try {
    mdxFiles = readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));
  } catch (error) {
    console.error(
      `❌ Failed to read content directory: ${error instanceof Error ? error.message : error}`,
    );
    process.exit(1);
  }

  // Filter to only published posts (matches generate-posts-metadata.js behavior)
  const publishedMdxFiles = mdxFiles.filter((f) => {
    const content = readFileSync(join(CONTENT_DIR, f), "utf-8");
    const { data } = matter(content);
    return data.published !== false;
  });

  console.log(
    `Found ${mdxFiles.length} MDX files (${publishedMdxFiles.length} published, ${mdxFiles.length - publishedMdxFiles.length} drafts)`,
  );

  const mdxSlugs = publishedMdxFiles.map((f) => f.replace(/\.mdx$/, "")).sort();

  // Parse posts.json with error handling
  let postsJson: PostsJson;
  try {
    postsJson = JSON.parse(readFileSync(POSTS_JSON, "utf-8"));
  } catch (error) {
    console.error(
      `❌ Failed to parse posts.json: ${error instanceof Error ? error.message : error}`,
    );
    console.error("   The file may be malformed. Try running prebuild again.");
    process.exit(1);
  }

  const jsonSlugs = postsJson.posts.map((p) => p.slug).sort();

  // Compare counts (published posts only — matches posts.json)
  if (publishedMdxFiles.length !== postsJson.totalPosts) {
    console.error(
      `❌ Mismatch: ${publishedMdxFiles.length} published MDX files but posts.json has ${postsJson.totalPosts}`,
    );
    process.exit(1);
  }

  // Compare slugs
  const missingInJson = mdxSlugs.filter((s) => !jsonSlugs.includes(s));
  const extraInJson = jsonSlugs.filter((s) => !mdxSlugs.includes(s));

  if (missingInJson.length > 0) {
    console.error(
      `❌ Posts missing from posts.json: ${missingInJson.join(", ")}`,
    );
    process.exit(1);
  }

  if (extraInJson.length > 0) {
    console.error(`❌ Extra posts in posts.json: ${extraInJson.join(", ")}`);
    process.exit(1);
  }

  // Validate slug format (URL-safe) — check ALL files, including drafts
  const allMdxSlugs = mdxFiles.map((f) => f.replace(/\.mdx$/, ""));
  const invalidSlugs = allMdxSlugs.filter((s) => !/^[a-z0-9-]+$/.test(s));
  if (invalidSlugs.length > 0) {
    console.warn(`⚠️  Non-URL-safe slugs: ${invalidSlugs.join(", ")}`);
  }

  console.log(
    `✅ Content validated: ${publishedMdxFiles.length} published posts in sync (${mdxFiles.length} total, ${mdxFiles.length - publishedMdxFiles.length} drafts)`,
  );
}

validateContent();
