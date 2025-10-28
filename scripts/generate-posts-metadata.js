#!/usr/bin/env node

/**
 * Build script to generate posts metadata at build time
 * This allows us to avoid filesystem access at runtime in Cloudflare Workers
 */

const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");
const OUTPUT_FILE = path.join(CONTENT_DIR, "posts.json");

function getAllPosts() {
  console.log("📚 Generating blog posts metadata...");

  // Check if content directory exists
  if (!fs.existsSync(CONTENT_DIR)) {
    console.error(`❌ Blog directory not found: ${CONTENT_DIR}`);
    process.exit(1);
  }

  // Get all MDX files
  const files = fs.readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".mdx"));

  console.log(`📝 Found ${files.length} blog posts`);

  // Process each file
  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const filePath = path.join(CONTENT_DIR, file);
    const fileContent = fs.readFileSync(filePath, "utf-8");

    // Parse frontmatter
    const { data: frontmatter, content } = matter(fileContent);

    // Calculate reading time (rough estimate: 200 words per minute)
    const wordCount = content.split(/\s+/g).length;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));

    return {
      slug,
      title: frontmatter.title || "Untitled",
      date: frontmatter.date || new Date().toISOString(),
      excerpt: frontmatter.excerpt || "",
      tags: frontmatter.tags || [],
      author: frontmatter.author || "Divanshu Chauhan",
      readingTime,
      published: frontmatter.published !== false, // default to true if not specified
      // Add any other frontmatter fields you need
    };
  });

  // Sort posts by date (newest first)
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Filter out unpublished posts
  const publishedPosts = posts.filter((post) => post.published);

  // Create the output
  const output = {
    posts: publishedPosts,
    generatedAt: new Date().toISOString(),
    totalPosts: publishedPosts.length,
  };

  // Write to JSON file
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2));

  console.log(`✅ Generated metadata for ${publishedPosts.length} posts`);
  console.log(`📄 Output: ${OUTPUT_FILE}`);

  return output;
}

// Run if called directly
if (require.main === module) {
  try {
    getAllPosts();
    process.exit(0);
  } catch (error) {
    console.error("❌ Error generating posts metadata:", error.message);
    process.exit(1);
  }
}

module.exports = { getAllPosts };
