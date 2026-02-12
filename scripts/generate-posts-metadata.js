#!/usr/bin/env node

/**
 * Build script to generate posts metadata at build time
 * This allows us to avoid filesystem access at runtime in Cloudflare Workers
 * Includes TOC extraction, related posts calculation, and extended frontmatter
 */

const fs = require("node:fs");
const path = require("node:path");
const { execSync } = require("node:child_process");
const matter = require("gray-matter");

const CONTENT_DIR = path.join(process.cwd(), "src", "content", "blog");
const OUTPUT_FILE = path.join(process.cwd(), "content", "blog", "posts.json");

/**
 * Extract table of contents from markdown content
 * Returns array of { id, text, level }
 */
function extractToc(content) {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const toc = [];
  let match = headingRegex.exec(content);

  while (match !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    toc.push({ id, text, level });
    match = headingRegex.exec(content);
  }

  return toc;
}

/**
 * Calculate tag similarity between two posts
 * Returns number of matching tags
 */
function calculateTagSimilarity(tags1 = [], tags2 = []) {
  const set1 = new Set(tags1.map((t) => t.toLowerCase()));
  const set2 = new Set(tags2.map((t) => t.toLowerCase()));
  let intersection = 0;
  for (const tag of set1) {
    if (set2.has(tag)) intersection++;
  }
  return intersection;
}

/**
 * Get the last git commit date for a file
 * Returns ISO date string (YYYY-MM-DD) or null if not in git
 */
function getGitLastModified(filePath) {
  try {
    const result = execSync(`git log -1 --format="%aI" -- "${filePath}"`, {
      encoding: "utf-8",
      stdio: ["pipe", "pipe", "ignore"],
    }).trim();

    if (!result) return null;

    // Return just the date portion (YYYY-MM-DD)
    return result.split("T")[0];
  } catch {
    return null;
  }
}

function getAllPosts() {
  console.log("📚 Generating blog posts metadata...");

  // Check if content directory exists
  if (!fs.existsSync(CONTENT_DIR)) {
    console.error(`❌ Blog directory not found: ${CONTENT_DIR}`);
    process.exit(1);
  }

  // Get all MDX files
  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".mdx"));

  console.log(`📝 Found ${files.length} blog posts`);

  // Process each file
  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const filePath = path.join(CONTENT_DIR, file);
    const fileContent = fs.readFileSync(filePath, "utf-8");

    // Parse frontmatter
    const { data: frontmatter, content } = matter(fileContent);

    // Calculate word count and reading time
    const wordCount = content.split(/\s+/g).length;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));

    // Extract table of contents
    const toc = extractToc(content);

    return {
      slug,
      title: frontmatter.title || "Untitled",
      date: frontmatter.date || new Date().toISOString(),
      dateModified: frontmatter.dateModified || getGitLastModified(filePath),
      excerpt: frontmatter.excerpt || "",
      tags: frontmatter.tags || [],
      author: frontmatter.author || "Divanshu Chauhan",
      seoTitle: frontmatter.seoTitle || null,
      seoDescription: frontmatter.seoDescription || null,
      readingTime,
      wordCount,
      published: frontmatter.published !== false,
      toc,
      // Extended frontmatter for GEO/AI optimization
      tldr: frontmatter.tldr || null,
      keyTakeaways: frontmatter.keyTakeaways || [],
      faq: frontmatter.faq || null,
      howto: frontmatter.howto || null,
    };
  });

  // Sort posts by date (newest first)
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Filter out unpublished posts
  const publishedPosts = posts.filter((post) => post.published);

  // Calculate related posts for each post based on tag similarity
  for (const post of publishedPosts) {
    const otherPosts = publishedPosts.filter((p) => p.slug !== post.slug);

    post.relatedPosts = otherPosts
      .map((p) => ({
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        score: calculateTagSimilarity(post.tags, p.tags),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(({ slug, title, excerpt }) => ({ slug, title, excerpt }));
  }

  // Create the output
  const output = {
    posts: publishedPosts,
    generatedAt: new Date().toISOString(),
    totalPosts: publishedPosts.length,
  };

  // Ensure output directory exists and write to JSON file
  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
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
