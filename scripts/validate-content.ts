import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { getAllPosts, type PostMetadata } from "@/lib/blog";

const POSTS_JSON_PATH = join(process.cwd(), "content", "blog", "posts.json");
const SLUG_REGEX = /^[a-z0-9-]+$/;

interface PostsJson {
  posts: Array<PostMetadata>;
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

    const allPosts = getAllPosts();
    const canonicalPosts = allPosts.filter((post) => post.published);
    const canonicalSlugs = canonicalPosts.map((post) => post.slug);
    const jsonSlugs = postsJson.posts.map((post) => post.slug);
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

    // Build lookup of postsJson entries by slug for payload comparison
    const jsonPostsBySlug = new Map(postsJson.posts.map((p) => [p.slug, p]));

    const fieldsToCompare = [
      "title",
      "date",
      "dateModified",
      "excerpt",
      "tags",
      "author",
      "seoTitle",
      "seoDescription",
      "published",
      "tldr",
      "keyTakeaways",
      "faq",
    ] as const;

    for (const post of canonicalPosts) {
      const jsonPost = jsonPostsBySlug.get(post.slug);
      if (!jsonPost) continue; // already reported as missing

      const differences: string[] = [];

      for (const field of fieldsToCompare) {
        const canonicalValue = normalizeValue(post[field]);
        const jsonValue = normalizeValue(jsonPost[field]);

        if (!deepEqual(canonicalValue, jsonValue)) {
          differences.push(field);
        }
      }

      if (differences.length > 0) {
        console.error(
          `❌ Payload mismatch for "${post.slug}": fields differ — ${differences.join(", ")}`,
        );
        hasError = true;
      }
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

function normalizeValue(value: unknown): unknown {
  if (Array.isArray(value)) {
    return [...value].sort();
  }
  return value;
}

function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (a == null || b == null) return a === b;
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((val, i) => deepEqual(val, b[i]));
  }
  if (typeof a === "object" && typeof b === "object") {
    const aObj = a as Record<string, unknown>;
    const bObj = b as Record<string, unknown>;
    const aKeys = Object.keys(aObj).sort();
    const bKeys = Object.keys(bObj).sort();
    if (aKeys.length !== bKeys.length) return false;
    return aKeys.every((key) => deepEqual(aObj[key], bObj[key]));
  }
  return a === b;
}
