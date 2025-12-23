import { siteConfig } from "@/content/site.config";
import type { FAQ, HowTo } from "@/lib/content";
import { baseUrl } from "@/lib/seo";

type BlogPostSchemaData = {
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  author?: string;
  tags?: string[];
  readingTime?: number;
  wordCount?: number;
  dateModified?: string;
};

type BreadcrumbItem = {
  name: string;
  url: string;
};

/**
 * Generate Person schema for E-E-A-T signals
 */
export function generatePersonSchema() {
  const jobTitle = siteConfig.seo?.jobTitle || siteConfig.experience[0]?.positions[0]?.title || "Software Engineer";

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${baseUrl}/#author`,
    name: siteConfig.name,
    alternateName: siteConfig.handle,
    givenName: siteConfig.name.split(" ")[0],
    familyName: siteConfig.name.split(" ")[1],
    jobTitle: jobTitle,
    description: siteConfig.seo?.metaDescription || siteConfig.about,
    url: baseUrl,
    email: siteConfig.email,
    image: `${baseUrl}${siteConfig.authorImage}`,
    nationality: siteConfig.nationality,
    sameAs: siteConfig.socials
      .filter((s) => s.label !== "Email")
      .map((s) => s.href),
    alumniOf: siteConfig.education.map((edu) => ({
      "@type": "CollegeOrUniversity",
      name: edu.title.split(" — ")[1] || edu.title,
    })),
    knowsAbout: siteConfig.skills.map((s) => s.name),
    worksFor: {
      "@type": "Organization",
      name: siteConfig.experience[0].company,
      address: {
        "@type": "PostalAddress",
        addressLocality: siteConfig.address.locality,
        addressRegion: siteConfig.address.region,
        addressCountry: siteConfig.address.country,
      },
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.address.locality,
      addressRegion: siteConfig.address.region,
      addressCountry: siteConfig.address.country,
    },
  };
}

/**
 * Generate ProfilePage schema for About page
 */
export function generateProfilePageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${baseUrl}/about#webpage`,
    name: `About ${siteConfig.name}`,
    description: siteConfig.about,
    mainEntity: {
      "@id": `${baseUrl}/#author`,
    },
    dateCreated: siteConfig.profileCreatedDate,
    dateModified: new Date().toISOString().split("T")[0],
  };
}

/**
 * Generate WebSite schema for site-wide SEO
 */
export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    name: siteConfig.name,
    alternateName: siteConfig.handle,
    description: siteConfig.about,
    url: baseUrl,
    publisher: {
      "@id": `${baseUrl}/#author`,
    },
    inLanguage: "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Generate SoftwareApplication schema for tool reviews
 */
export function generateSoftwareApplicationSchema(
  name: string,
  description: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: name,
    description: description,
    applicationCategory: "DeveloperApplication",
  };
}

/**
 * Generate BlogPosting schema for individual blog posts
 */
function generateBlogPostingSchema(post: BlogPostSchemaData) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${baseUrl}/blog/${post.slug}#article`,
    headline: post.title,
    description: post.excerpt,
    url: `${baseUrl}/blog/${post.slug}`,
    datePublished: post.date,
    dateModified: post.dateModified || post.date,
    author: {
      "@id": `${baseUrl}/#author`,
    },
    publisher: {
      "@id": `${baseUrl}/#author`,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/blog/${post.slug}`,
    },
    image: `${baseUrl}/og/blog/${post.slug}.png`,
    keywords: post.tags?.join(", "),
    wordCount: post.wordCount,
    timeRequired: post.readingTime ? `PT${post.readingTime}M` : undefined,
    inLanguage: "en-US",
    isPartOf: {
      "@id": `${baseUrl}/#website`,
    },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".tldr-summary", ".key-takeaways"],
    },
  };
}

/**
 * Generate BreadcrumbList schema for navigation
 */
function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate FAQPage schema for FAQ sections
 */
function generateFAQSchema(faqs: FAQ[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}

/**
 * Generate HowTo schema for tutorial/guide content
 */
function generateHowToSchema(howTo: HowTo) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: howTo.name,
    totalTime: howTo.totalTime,
    step: howTo.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

/**
 * Generate combined schemas for blog posts
 * Returns an array of all applicable schemas
 */
export function generateBlogPostSchemas(
  post: BlogPostSchemaData,
  faq?: FAQ[] | null,
  howTo?: HowTo | null,
  // biome-ignore lint/suspicious/noExplicitAny: JSON-LD schemas can have various shapes
): Record<string, any>[] {
  // biome-ignore lint/suspicious/noExplicitAny: JSON-LD schemas can have various shapes
  const schemas: Record<string, any>[] = [
    generateBlogPostingSchema(post),
    generateBreadcrumbSchema([
      { name: "Home", url: baseUrl },
      { name: "Blog", url: `${baseUrl}/blog` },
      { name: post.title, url: `${baseUrl}/blog/${post.slug}` },
    ]),
  ];

  if (faq && faq.length > 0) {
    schemas.push(generateFAQSchema(faq));
  }

  if (howTo && howTo.steps.length > 0) {
    schemas.push(generateHowToSchema(howTo));
  }

  return schemas;
}
