import { siteConfig } from "@/data/site.config";
import { baseUrl } from "@/lib/seo";

/**
 * Generate Person schema for E-E-A-T signals
 */
export function generatePersonSchema() {
  const jobTitle =
    siteConfig.seo?.jobTitle ||
    siteConfig.experience[0]?.positions[0]?.title ||
    "Software Engineer";

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
 * Generate WebSite schema for site-wide SEO
 */
export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    name: siteConfig.name,
    alternateName: siteConfig.handle,
    description: siteConfig.seo?.metaDescription || siteConfig.about,
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
  return {
    "@type": "Person",
    "@id": `${baseUrl}/#author`,
    name: siteConfig.name,
    alternateName: siteConfig.handle,
    url: baseUrl,
  };
}
