import { Metadata } from "next"
import { siteConfig } from "@/content/site.config"

export function generateSEO(overrides?: Metadata): Metadata {
  return {
    title: {
      default: `${siteConfig.name} — ${siteConfig.tagline}`,
      template: `%s — ${siteConfig.name}`,
    },
    description: siteConfig.about,
    keywords: ["developer", "portfolio", "software engineer", ...siteConfig.skills],
    authors: [{ name: siteConfig.name, url: `mailto:${siteConfig.email}` }],
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: siteConfig.name,
      title: siteConfig.name,
      description: siteConfig.about,
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.name,
      description: siteConfig.about,
    },
    ...overrides,
  }
}
