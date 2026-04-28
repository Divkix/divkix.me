import { siteConfig } from "@/data/site.config";
import { baseUrl } from "@/lib/seo";

export function getJobTitle(): string {
  return siteConfig.seo.jobTitle;
}

type BreadcrumbItem = { name: string; item?: string };

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      ...(crumb.item !== undefined ? { item: crumb.item } : {}),
    })),
  };
}

/**
 * Generate Person schema for E-E-A-T signals
 */
export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${baseUrl}/#author`,
    name: siteConfig.name,
    alternateName: siteConfig.handle,
    givenName: siteConfig.name.split(" ")[0],
    familyName: siteConfig.name.split(" ")[1],
    jobTitle: getJobTitle(),
    description: siteConfig.seo.metaDescription,
    url: baseUrl,
    email: siteConfig.email,
    image: `${baseUrl}${siteConfig.authorImage}`,
    nationality: siteConfig.nationality,
    sameAs: siteConfig.socials
      .filter((s) => s.label !== "Email")
      .map((s) => s.href),
    alumniOf: siteConfig.education.map((edu) => {
      const parts = edu.title.split(" — ");
      return {
        "@type": "CollegeOrUniversity",
        name: parts[1] || edu.title,
        ...(parts[0] && {
          hasCredential: {
            "@type": "EducationalOccupationalCredential",
            credentialCategory: parts[0],
          },
        }),
      };
    }),
    knowsAbout: siteConfig.skills.map((s) => s.name),
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.address.locality,
      addressRegion: siteConfig.address.region,
      addressCountry: siteConfig.address.country,
    },
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
    description: siteConfig.seo.metaDescription,
    url: baseUrl,
    publisher: {
      "@id": `${baseUrl}/#author`,
    },
    inLanguage: "en-US",
  };
}

/**
 * Generate author schema for blog posts
 * Links to main Person schema when author is site owner
 */
export function generateBlogAuthorSchema(authorName?: string) {
  const isSiteOwner = !authorName || authorName === siteConfig.name;

  if (isSiteOwner) {
    return {
      "@type": "Person",
      "@id": `${baseUrl}/#author`,
      name: siteConfig.name,
      alternateName: siteConfig.handle,
      url: baseUrl,
    };
  }

  return {
    "@type": "Person",
    name: authorName,
  };
}

/**
 * Generate publisher schema for blog posts
 * Always references the site owner
 */
export function generateBlogPublisherSchema() {
  return generateBlogAuthorSchema();
}

/**
 * Generate Speakable schema for AEO (Answer Engine Optimization)
 * Identifies content that can be spoken by voice assistants
 */
export function generateSpeakableSchema(articleId: string, cssSelector: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": articleId,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [cssSelector],
    },
  };
}

/**
 * Generate FAQPage schema for posts with FAQ sections
 * Enhances visibility in search results with rich FAQ snippets
 */
export function generateFAQPageSchema(
  faqs: Array<{ q: string; a: string }>,
  pageUrl: string
) {
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
    url: pageUrl,
  };
}
