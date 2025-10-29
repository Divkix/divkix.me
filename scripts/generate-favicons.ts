/**
 * Favicon Generation Script
 *
 * This script generates all necessary favicon and icon files from a source logo image.
 *
 * What it does:
 * 1. Generates multiple PNG favicon sizes (16x16, 32x32, 48x48) for various browser contexts
 * 2. Creates Apple Touch Icon (180x180) for iOS devices when adding site to home screen
 * 3. Creates Android Chrome icons (192x192, 512x512) for PWA installation
 * 4. Generates favicon.ico file for legacy browser support
 * 5. Creates site.webmanifest for Progressive Web App (PWA) support
 *
 * Usage:
 *   bun run scripts/generate-favicons.ts
 *
 * Requirements:
 *   - Source image must be at public/divkix-logo.png
 *   - Sharp package must be installed (bun add -d sharp)
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

import sharp from "sharp"
import { writeFileSync } from "fs"
import path from "path"

const PUBLIC_DIR = path.join(process.cwd(), "public")
const SOURCE_IMAGE = path.join(PUBLIC_DIR, "divkix-logo.png")

interface FaviconConfig {
  size: number
  name: string
}

const configs: FaviconConfig[] = [
  { size: 16, name: "favicon-16x16.png" },
  { size: 32, name: "favicon-32x32.png" },
  { size: 48, name: "favicon-48x48.png" },
  { size: 180, name: "apple-touch-icon.png" },
  { size: 192, name: "android-chrome-192x192.png" },
  { size: 512, name: "android-chrome-512x512.png" },
]

async function generateFavicons() {
  console.log("🎨 Generating favicons from divkix-logo.png...")

  try {
    // Generate PNG files
    for (const config of configs) {
      await sharp(SOURCE_IMAGE)
        .resize(config.size, config.size, {
          fit: "contain",
          background: { r: 0, g: 0, b: 0, alpha: 0 },
        })
        .png()
        .toFile(path.join(PUBLIC_DIR, config.name))

      console.log(`✓ Generated ${config.name}`)
    }

    // Generate favicon.ico (using 32x32)
    const icoBuffer = await sharp(SOURCE_IMAGE)
      .resize(32, 32, {
        fit: "contain",
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png()
      .toBuffer()

    writeFileSync(path.join(PUBLIC_DIR, "favicon.ico"), icoBuffer)
    console.log("✓ Generated favicon.ico")

    // Generate site.webmanifest
    const manifest = {
      name: "Divanshu Chauhan",
      short_name: "Divkix",
      description: "Full-stack developer passionate about building high-quality software",
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
      theme_color: "#000000",
      background_color: "#000000",
      display: "standalone",
      start_url: "/",
    }

    writeFileSync(
      path.join(PUBLIC_DIR, "site.webmanifest"),
      JSON.stringify(manifest, null, 2)
    )
    console.log("✓ Generated site.webmanifest")

    console.log("✨ All favicons generated successfully!")
  } catch (error) {
    console.error("❌ Error generating favicons:", error)
    process.exit(1)
  }
}

generateFavicons()
