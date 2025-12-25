import { siteConfig } from "@/data/site.config";

export const baseUrl = "https://divkix.me";

export type SEOMetadata = {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  openGraph?: {
    type?: string;
    locale?: string;
    url?: string;
    siteName?: string;
    title?: string;
    description?: string;
    images?: Array<{
      url: string;
      width?: number;
      height?: number;
      alt?: string;
    }>;
    publishedTime?: string;
    modifiedTime?: string;
    authors?: string[];
    tags?: string[];
  };
  twitter?: {
    card?: string;
    site?: string;
    creator?: string;
    title?: string;
    description?: string;
    images?: string[];
  };
  robots?: {
    index?: boolean;
    follow?: boolean;
  };
};

export function generateSEO(overrides?: Partial<SEOMetadata>): SEOMetadata {
  return {
    title:
      overrides?.title ||
      `${siteConfig.name} (${siteConfig.handle.toLowerCase()}) | Software Engineer & CS Student at ASU`,
    description:
      overrides?.description ||
      siteConfig.seo?.metaDescription ||
      siteConfig.about,
    keywords: overrides?.keywords || [
      siteConfig.name,
      siteConfig.handle,
      siteConfig.handle.toLowerCase(),
      "software engineer",
      "developer",
      "portfolio",
      "ASU",
      "Arizona State University",
      ...siteConfig.skills.map((skill) => skill.name),
    ],
    canonical: overrides?.canonical || baseUrl,
    openGraph: {
      type: overrides?.openGraph?.type || "website",
      locale: overrides?.openGraph?.locale || "en_US",
      url: overrides?.openGraph?.url || baseUrl,
      siteName: overrides?.openGraph?.siteName || siteConfig.name,
      title: overrides?.openGraph?.title || siteConfig.name,
      description: overrides?.openGraph?.description || siteConfig.about,
      images: overrides?.openGraph?.images || [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} - ${siteConfig.tagline}`,
        },
      ],
      ...(overrides?.openGraph?.publishedTime && {
        publishedTime: overrides.openGraph.publishedTime,
      }),
      ...(overrides?.openGraph?.modifiedTime && {
        modifiedTime: overrides.openGraph.modifiedTime,
      }),
      ...(overrides?.openGraph?.authors && {
        authors: overrides.openGraph.authors,
      }),
      ...(overrides?.openGraph?.tags && { tags: overrides.openGraph.tags }),
    },
    twitter: {
      card: overrides?.twitter?.card || "summary_large_image",
      site: overrides?.twitter?.site || "@divkix",
      creator: overrides?.twitter?.creator || "@divkix",
      title:
        overrides?.twitter?.title ||
        `${siteConfig.name} (${siteConfig.handle.toLowerCase()})`,
      description:
        overrides?.twitter?.description ||
        siteConfig.seo?.metaDescription ||
        siteConfig.about,
      images: overrides?.twitter?.images || [`${baseUrl}/og-image.png`],
    },
    robots: {
      index:
        overrides?.robots?.index !== undefined ? overrides.robots.index : true,
      follow:
        overrides?.robots?.follow !== undefined
          ? overrides.robots.follow
          : true,
    },
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
): SEOMetadata {
  const postUrl = `${baseUrl}/blog/${slug}`;
  const ogImageUrl = `${baseUrl}/og/blog/${slug}.png`;

  return generateSEO({
    title,
    description: excerpt,
    keywords: tags,
    canonical: postUrl,
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
