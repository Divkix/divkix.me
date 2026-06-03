import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { getAllPosts } from "../src/lib/blog.ts";

const OUTPUT_FILE = join(process.cwd(), "content", "blog", "posts.json");

if (import.meta.main) {
  try {
    console.log("📚 Generating blog posts metadata...");

    const allPosts = getAllPosts({ published: true });
    const output = {
      posts: allPosts,
      generatedAt: new Date().toISOString(),
      totalPosts: allPosts.length,
    };

    mkdirSync(dirname(OUTPUT_FILE), { recursive: true });
    writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2));

    console.log(`✅ Generated metadata for ${allPosts.length} posts`);
    console.log(`📄 Output: ${OUTPUT_FILE}`);
  } catch (error) {
    console.error("❌ Error generating posts metadata:", error);
    process.exit(1);
  }
}
