/**
 * Generates favicon PNGs, a multi-size favicon.ico, and site.webmanifest
 * from public/full-logo.png.
 *
 * Usage: bun run scripts/generate-favicons.ts
 * Requires: sharp, png-to-ico
 */

import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import pngToIco from "png-to-ico";
import sharp from "sharp";

const PUBLIC_DIR = path.join(process.cwd(), "public");
const SOURCE_PNG = path.join(PUBLIC_DIR, "full-logo.png");

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
  console.log("Generating favicons from full-logo.png...");

  try {
    const pngBuffer = readFileSync(SOURCE_PNG);

    // Generate PNG files at various sizes
    for (const config of configs) {
      await sharp(pngBuffer)
        .resize(config.size, config.size)
        .png()
        .toFile(path.join(PUBLIC_DIR, config.name));

      console.log(`Generated ${config.name}`);
    }

    // ICO embeds 16, 32, and 48px sizes in one file
    const ico16 = await sharp(pngBuffer).resize(16, 16).png().toBuffer();

    const ico32 = await sharp(pngBuffer).resize(32, 32).png().toBuffer();

    const ico48 = await sharp(pngBuffer).resize(48, 48).png().toBuffer();

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
