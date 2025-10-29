import { Metadata } from "next"
import { siteConfig } from "@/content/site.config"

const baseUrl = "https://divkix.me"

export function generateSEO(overrides?: Metadata): Metadata {
  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: `${siteConfig.name} — ${siteConfig.tagline}`,
      template: `%s — ${siteConfig.name}`,
    },
    description: siteConfig.about,
    keywords: [
      "developer",
      "software engineer",
      "portfolio",
      "full stack",
      ...siteConfig.skills,
    ],
    authors: [{ name: siteConfig.name, url: `mailto:${siteConfig.email}` }],
    creator: siteConfig.name,
    openGraph: {
      type: "website",
      locale: "en_US",
      url: baseUrl,
      siteName: siteConfig.name,
      title: siteConfig.name,
      description: siteConfig.about,
      images: [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} - ${siteConfig.tagline}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.name,
      description: siteConfig.about,
      images: [`${baseUrl}/og-image.png`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: [
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      ],
      shortcut: "/favicon.ico",
      apple: "/apple-touch-icon.png",
      other: [
        {
          rel: "android-chrome-192x192",
          url: "/android-chrome-192x192.png",
        },
        {
          rel: "android-chrome-512x512",
          url: "/android-chrome-512x512.png",
        },
      ],
    },
    manifest: `${baseUrl}/site.webmanifest`,
    ...overrides,
  }
}

export function generateBlogPostSEO(
  title: string,
  excerpt: string,
  slug: string,
  date: string
): Metadata {
  return generateSEO({
    title,
    description: excerpt,
    openGraph: {
      type: "article",
      publishedTime: date,
      url: `${baseUrl}/blog/${slug}`,
      images: [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  })
}
