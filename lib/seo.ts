import type { Metadata } from "next";
import { siteConfig } from "@/content/site.config";

export const baseUrl = "https://divkix.me";

/**
 * Enhance title with compelling hooks and year context
 */
export function enhanceTitle(
  title: string,
  _type: "blog" | "page" = "blog",
): string {
  // Return original title for now - can be enhanced with patterns later
  // Examples of enhancements:
  // - Add year if relevant: "Guide to X in 2025"
  // - Add compelling hooks: "The Complete Guide to X"
  // - Add context: "How to X: A Practical Guide"
  return title;
}

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
      ...siteConfig.skills.map((skill) => skill.name),
    ],
    authors: [{ name: siteConfig.name, url: `mailto:${siteConfig.email}` }],
    creator: siteConfig.name,
    alternates: {
      canonical: overrides?.alternates?.canonical || baseUrl,
    },
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
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      ],
      shortcut: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
    manifest: `${baseUrl}/site.webmanifest`,
    ...overrides,
  };
}

export function generateBlogPostSEO(
  title: string,
  excerpt: string,
  slug: string,
  date: string,
  tags?: string[],
  author?: string,
  dateModified?: string,
): Metadata {
  const postUrl = `${baseUrl}/blog/${slug}`;
  const ogImageUrl = `${baseUrl}/og/blog/${slug}.png`;

  return generateSEO({
    title,
    description: excerpt,
    keywords: tags,
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      type: "article",
      publishedTime: date,
      ...(dateModified && { modifiedTime: dateModified }),
      url: postUrl,
      authors: [author || siteConfig.name],
      tags: tags,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description:
        excerpt.length > 200 ? `${excerpt.slice(0, 197)}...` : excerpt,
      images: [ogImageUrl],
    },
  });
}
