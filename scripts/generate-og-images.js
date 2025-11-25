#!/usr/bin/env node

/**
 * Generate OG images for all blog posts at build time
 * Creates 1200x630 images with post title and metadata
 */

const sharp = require("sharp");
const path = require("node:path");
const fs = require("node:fs");

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");
const POSTS_JSON = path.join(CONTENT_DIR, "posts.json");
const OUTPUT_DIR = path.join(process.cwd(), "public", "og", "blog");

/**
 * Escape XML special characters
 */
function escapeXml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Wrap text to fit within max width
 * Returns array of lines
 */
function wrapText(text, maxCharsPerLine = 35) {
  const words = text.split(" ");
  const lines = [];
  let currentLine = "";

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    if (testLine.length <= maxCharsPerLine) {
      currentLine = testLine;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }

  if (currentLine) lines.push(currentLine);

  // Limit to 3 lines max, truncate if needed
  if (lines.length > 3) {
    lines.length = 3;
    lines[2] = `${lines[2].substring(0, lines[2].length - 3)}...`;
  }

  return lines;
}

/**
 * Format date for display
 */
function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Generate SVG for a blog post OG image
 */
function generatePostSvg(post) {
  const width = 1200;
  const height = 630;

  const titleLines = wrapText(post.title, 32);
  const titleStartY = 200;
  const lineHeight = 70;

  const titleElements = titleLines
    .map(
      (line, i) =>
        `<text x="80" y="${titleStartY + i * lineHeight}"
           font-family="system-ui, -apple-system, sans-serif"
           font-size="56"
           font-weight="bold"
           fill="white">
        ${escapeXml(line)}
      </text>`,
    )
    .join("\n");

  const metaY = titleStartY + titleLines.length * lineHeight + 40;
  const readingTime =
    typeof post.readingTime === "number"
      ? `${post.readingTime} min read`
      : post.readingTime;

  return `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#0a0a0a;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#1a1a2e;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#0a0a0a;stop-opacity:1" />
        </linearGradient>

        <!-- Accent gradient for decorative element -->
        <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:#6366f1;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:1" />
        </linearGradient>
      </defs>

      <!-- Background -->
      <rect width="${width}" height="${height}" fill="url(#grad)" />

      <!-- Grid pattern -->
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
        </pattern>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#grid)" />

      <!-- Accent bar -->
      <rect x="80" y="100" width="80" height="6" rx="3" fill="url(#accent)" />

      <!-- Blog label -->
      <text x="180" y="108"
            font-family="system-ui, -apple-system, sans-serif"
            font-size="18"
            fill="rgba(255,255,255,0.5)"
            text-anchor="start">
        BLOG
      </text>

      <!-- Title -->
      ${titleElements}

      <!-- Metadata -->
      <text x="80" y="${metaY}"
            font-family="system-ui, -apple-system, sans-serif"
            font-size="22"
            fill="rgba(255,255,255,0.6)">
        ${escapeXml(formatDate(post.date))} · ${escapeXml(readingTime)}
      </text>

      <!-- Tags -->
      ${
        post.tags && post.tags.length > 0
          ? `<text x="80" y="${metaY + 40}"
              font-family="system-ui, -apple-system, sans-serif"
              font-size="18"
              fill="rgba(255,255,255,0.4)">
            ${escapeXml(post.tags.slice(0, 4).join(" · "))}
          </text>`
          : ""
      }

      <!-- Author and site -->
      <text x="80" y="${height - 50}"
            font-family="system-ui, -apple-system, sans-serif"
            font-size="20"
            fill="rgba(255,255,255,0.7)">
        Divanshu Chauhan
      </text>

      <text x="${width - 80}" y="${height - 50}"
            font-family="system-ui, -apple-system, sans-serif"
            font-size="20"
            fill="rgba(255,255,255,0.5)"
            text-anchor="end">
        divkix.me
      </text>
    </svg>
  `;
}

async function generateOGImages() {
  console.log("Generating blog post OG images...");

  // Check if posts.json exists
  if (!fs.existsSync(POSTS_JSON)) {
    console.log("posts.json not found. Run generate-posts-metadata.js first.");
    console.log("Skipping OG image generation.");
    return;
  }

  // Create output directory
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`Created directory: ${OUTPUT_DIR}`);
  }

  // Read posts data
  const postsData = JSON.parse(fs.readFileSync(POSTS_JSON, "utf-8"));
  const posts = postsData.posts || [];

  console.log(`Found ${posts.length} posts to generate OG images for`);

  let generated = 0;
  let skipped = 0;

  for (const post of posts) {
    const outputPath = path.join(OUTPUT_DIR, `${post.slug}.png`);

    // Check if image already exists and is newer than posts.json
    if (fs.existsSync(outputPath)) {
      const imageStats = fs.statSync(outputPath);
      const postsStats = fs.statSync(POSTS_JSON);

      if (imageStats.mtime > postsStats.mtime) {
        skipped++;
        continue;
      }
    }

    try {
      const svg = generatePostSvg(post);
      await sharp(Buffer.from(svg)).png().toFile(outputPath);
      generated++;
      console.log(`Generated: ${post.slug}.png`);
    } catch (error) {
      console.error(
        `Error generating OG image for ${post.slug}:`,
        error.message,
      );
    }
  }

  console.log(
    `\nOG images: ${generated} generated, ${skipped} skipped (unchanged)`,
  );
}

// Run if called directly
if (require.main === module) {
  generateOGImages()
    .then(() => {
      console.log("OG image generation complete!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Failed to generate OG images:", error);
      process.exit(1);
    });
}

module.exports = { generateOGImages };
