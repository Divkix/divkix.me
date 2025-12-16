/**
 * Favicon Generation Script
 *
 * Generates all necessary favicon and icon files from the SVG favicon.
 *
 * What it does:
 * 1. Generates multiple PNG favicon sizes (16x16, 32x32, 48x48) for various browser contexts
 * 2. Creates Apple Touch Icon (180x180) for iOS devices when adding site to home screen
 * 3. Creates Android Chrome icons (192x192, 512x512) for PWA installation
 * 4. Generates proper favicon.ico file for legacy browser support
 * 5. Creates site.webmanifest for Progressive Web App (PWA) support
 *
 * Usage:
 *   bun run scripts/generate-favicons.ts
 *
 * Requirements:
 *   - Source SVG must be at public/favicon.svg
 *   - Sharp package must be installed (bun add -d sharp)
 *   - png-to-ico package must be installed (bun add -d png-to-ico)
 *
 * Output files:
 *   - public/favicon-16x16.png
 *   - public/favicon-32x32.png
 *   - public/favicon-48x48.png
 *   - public/apple-touch-icon.png
 *   - public/android-chrome-192x192.png
 *   - public/android-chrome-512x512.png
 *   - public/favicon.ico
 *   - public/site.webmanifest
 */

import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import pngToIco from "png-to-ico";
import sharp from "sharp";

const PUBLIC_DIR = path.join(process.cwd(), "public");
const SOURCE_SVG = path.join(PUBLIC_DIR, "favicon.svg");

interface FaviconConfig {
  size: number;
  name: string;
}

const configs: FaviconConfig[] = [
  { size: 16, name: "favicon-16x16.png" },
  { size: 32, name: "favicon-32x32.png" },
  { size: 48, name: "favicon-48x48.png" },
  { size: 180, name: "apple-touch-icon.png" },
  { size: 192, name: "android-chrome-192x192.png" },
  { size: 512, name: "android-chrome-512x512.png" },
];

async function generateFavicons() {
  console.log("Generating favicons from favicon.svg...");

  try {
    const svgBuffer = readFileSync(SOURCE_SVG);

    // Generate PNG files from SVG
    for (const config of configs) {
      await sharp(svgBuffer, { density: 300 })
        .resize(config.size, config.size)
        .png()
        .toFile(path.join(PUBLIC_DIR, config.name));

      console.log(`Generated ${config.name}`);
    }

    // Generate proper favicon.ico using png-to-ico
    // ICO format supports multiple sizes embedded in one file
    const ico16 = await sharp(svgBuffer, { density: 300 })
      .resize(16, 16)
      .png()
      .toBuffer();

    const ico32 = await sharp(svgBuffer, { density: 300 })
      .resize(32, 32)
      .png()
      .toBuffer();

    const ico48 = await sharp(svgBuffer, { density: 300 })
      .resize(48, 48)
      .png()
      .toBuffer();

    const icoBuffer = await pngToIco([ico16, ico32, ico48]);
    writeFileSync(path.join(PUBLIC_DIR, "favicon.ico"), icoBuffer);
    console.log(
      "Generated favicon.ico (proper ICO format with 16x16, 32x32, 48x48)",
    );

    // Generate site.webmanifest
    const manifest = {
      name: "Divanshu Chauhan",
      short_name: "Divkix",
      description:
        "Full-stack developer passionate about building high-quality software",
      icons: [
        {
          src: "/android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
      theme_color: "#DC2626",
      background_color: "#000000",
      display: "standalone",
      start_url: "/",
    };

    writeFileSync(
      path.join(PUBLIC_DIR, "site.webmanifest"),
      JSON.stringify(manifest, null, 2),
    );
    console.log("Generated site.webmanifest");

    console.log("All favicons generated successfully!");
  } catch (error) {
    console.error("Error generating favicons:", error);
    process.exit(1);
  }
}

generateFavicons();
