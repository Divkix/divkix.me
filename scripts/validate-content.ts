import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { getAllPosts } from "../src/lib/blog.ts";

const POSTS_JSON_PATH = join(process.cwd(), "content", "blog", "posts.json");
const SLUG_REGEX = /^[a-z0-9-]+$/;

interface PostsJson {
  posts: Array<{ slug: string }>;
  totalPosts: number;
}

if (import.meta.main) {
  try {
    console.log("🔍 Validating blog content...");

    if (!existsSync(POSTS_JSON_PATH)) {
      console.error(`❌ posts.json not found: ${POSTS_JSON_PATH}`);
      process.exit(1);
    }

    const postsJsonContent = readFileSync(POSTS_JSON_PATH, "utf-8");
    const postsJson: PostsJson = JSON.parse(postsJsonContent);

    const canonicalPosts = getAllPosts({ published: true });
    const canonicalSlugs = canonicalPosts.map((post) => post.slug);
    const jsonSlugs = postsJson.posts.map((post) => post.slug);

    const allPosts = getAllPosts();
    const allSlugs = allPosts.map((post) => post.slug);

    let hasError = false;

    // Validate counts
    if (canonicalPosts.length !== postsJson.totalPosts) {
      console.error(
        `❌ Count mismatch: posts.json says ${postsJson.totalPosts} posts, but MDX files have ${canonicalPosts.length} published posts`,
      );
      hasError = true;
    }

    // Check for missing posts in posts.json
    const missingInJson = canonicalSlugs.filter(
      (slug) => !jsonSlugs.includes(slug),
    );
    if (missingInJson.length > 0) {
      console.error(`❌ Missing in posts.json: ${missingInJson.join(", ")}`);
      hasError = true;
    }

    // Check for extra posts in posts.json
    const extraInJson = jsonSlugs.filter(
      (slug) => !canonicalSlugs.includes(slug),
    );
    if (extraInJson.length > 0) {
      console.error(
        `❌ Extra in posts.json (not in MDX): ${extraInJson.join(", ")}`,
      );
      hasError = true;
    }

    // Validate slug format for all MDX files (including drafts)
    const invalidSlugs = allSlugs.filter((slug) => !SLUG_REGEX.test(slug));
    if (invalidSlugs.length > 0) {
      console.error(
        `❌ Invalid slug format (must be lowercase letters, numbers, hyphens): ${invalidSlugs.join(", ")}`,
      );
      hasError = true;
    }

    if (hasError) {
      console.error(
        "\n❌ Validation failed. Run `bun run prebuild` to regenerate posts.json.",
      );
      process.exit(1);
    }

    console.log(
      `✅ All ${canonicalPosts.length} posts validated successfully.`,
    );
    console.log(`📄 Slugs checked: ${allSlugs.length} total MDX files`);
  } catch (error) {
    console.error("❌ Error validating content:", error);
    process.exit(1);
  }
}
