#!/usr/bin/env node

/**
 * Generate static OG image for the site
 * Creates a 1200x630 image with site branding
 */

const sharp = require("sharp");
const path = require("node:path");
const fs = require("node:fs");

const PUBLIC_DIR = path.join(process.cwd(), "public");
const OUTPUT_FILE = path.join(PUBLIC_DIR, "og-image.png");

async function generateOGImage() {
  console.log("Generating static OG image...");

  // OG image dimensions
  const width = 1200;
  const height = 630;

  // Create gradient background with dark theme
  const svgBackground = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#0a0a0a;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#1a1a2e;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#0a0a0a;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#grad)" />

      <!-- Subtle grid pattern -->
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
        </pattern>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#grid)" />

      <!-- Text content -->
      <text x="${width / 2}" y="${height / 2 - 40}"
            font-family="system-ui, -apple-system, sans-serif"
            font-size="72"
            font-weight="bold"
            fill="white"
            text-anchor="middle">
        Divanshu Chauhan
      </text>

      <text x="${width / 2}" y="${height / 2 + 40}"
            font-family="system-ui, -apple-system, sans-serif"
            font-size="28"
            fill="rgba(255,255,255,0.7)"
            text-anchor="middle">
        Developer building useful tools with code and curiosity.
      </text>

      <!-- Website URL -->
      <text x="${width / 2}" y="${height - 40}"
            font-family="system-ui, -apple-system, sans-serif"
            font-size="20"
            fill="rgba(255,255,255,0.5)"
            text-anchor="middle">
        divkix.me
      </text>
    </svg>
  `;

  try {
    // Generate PNG (for OG meta tags - social platforms require it)
    await sharp(Buffer.from(svgBackground)).png().toFile(OUTPUT_FILE);

    console.log(`Generated: ${OUTPUT_FILE}`);

    // Verify PNG file was created
    const stats = fs.statSync(OUTPUT_FILE);
    console.log(`File size: ${(stats.size / 1024).toFixed(2)} KB`);

    // Generate WebP (for display in Image components - smaller file size)
    const WEBP_OUTPUT = OUTPUT_FILE.replace(".png", ".webp");
    await sharp(Buffer.from(svgBackground))
      .webp({ quality: 80 })
      .toFile(WEBP_OUTPUT);

    console.log(`Generated: ${WEBP_OUTPUT}`);

    // Verify WebP file was created
    const webpStats = fs.statSync(WEBP_OUTPUT);
    console.log(`File size: ${(webpStats.size / 1024).toFixed(2)} KB`);
  } catch (error) {
    console.error("Error generating OG image:", error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  generateOGImage()
    .then(() => {
      console.log("Static OG image generated successfully!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Failed to generate OG image:", error);
      process.exit(1);
    });
}

module.exports = { generateOGImage };
