import { siteConfig } from "@/data/site.config";
import { baseUrl } from "@/lib/seo";

export function getJobTitle(): string {
  return siteConfig.seo.jobTitle;
}

const ISO_8601_DURATION_RE =
  /^P(?:\d+Y)?(?:\d+M)?(?:\d+D)?(?:T(?:\d+H)?(?:\d+M)?(?:\d+(?:\.\d+)?S)?)?$/;

export function validateDuration(duration: string): string {
  if (!ISO_8601_DURATION_RE.test(duration)) {
    console.warn(`Invalid ISO 8601 duration: ${duration}`);
  }
  return duration;
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
    mainEntityOfPage: `${baseUrl}/about`,
    disambiguatingDescription: `Software Engineer and blogger based in ${siteConfig.address.locality}, ${siteConfig.address.region}`,
    email: siteConfig.email,
    image: `${baseUrl}/divanshu-chauhan.webp`,
    nationality: siteConfig.nationality,
    sameAs: siteConfig.socials
      .reduce<string[]>((acc, s) => {
        if (s.label !== "Email") acc.push(s.href);
        return acc;
      }, [])
      .concat(`${baseUrl}/mentions`),
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
    hasCredential: siteConfig.education.map((edu) => {
      const parts = edu.title.split(" — ");
      const degreeParts = parts[0]?.split(", ") ?? ["", ""];
      const degree = degreeParts[0] ?? "";
      const field = degreeParts[1] ?? "";
      const institution = parts[1] ?? "";
      const level = degree.startsWith("MS")
        ? "Master's"
        : degree.startsWith("BS")
          ? "Bachelor's"
          : "Degree";
      return {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "degree",
        name: `${degree} in ${field}`,
        educationalLevel: level,
        ...(() => {
          if ("honors" in edu && edu.honors) {
            const match = edu.honors.match(/\bGPA[:\s]+(.+)/i);
            if (match?.[1]) {
              return { grade: match[1].trim() };
            }
          }
          return {};
        })(),
        recognizedBy: {
          "@type": "CollegeOrUniversity",
          name: institution,
        },
      };
    }),
    knowsAbout: [
      ...new Set([
        // Cloudflare ecosystem
        "Cloudflare Workers",
        "Cloudflare Pages",
        "Cloudflare D1",
        "Cloudflare R2",
        "Cloudflare Queues",
        "Cloudflare DO",
        "Cloudflare Vinext",
        "Serverless Architecture",
        "D1 Database",
        "Durable Objects",
        "Edge Computing",

        // Programming & frameworks
        "TypeScript",
        "Go",
        "Go Programming",
        "JavaScript",
        "Node.js",
        "React",
        "Next.js App Router",
        "Astro",
        "Vite",
        "Express",
        "REST APIs",
        "WebSockets",
        "WebSocket Hibernation",
        "SSE",
        "Docker",
        "Linux",
        "PostgreSQL",
        "SQLite",
        "MongoDB",
        "Python",
        "Java",
        "C/C++",
        "Tailwind CSS",

        // Telegram
        "Telegram Bot API",
        "Telegram Bot Development",

        // AI
        "Gemini API",
        "LLM workflows",
        "AI Agents",
        "Local AI",
        "LM Studio",
        "AI-Assisted Development",

        // Open Source
        "Git",
        "Open Source",
        "GitHub",

        // Other
        "Developer Tools",
        "Self-Hosted Logging",
        "Observability",
        "Software Engineering",
      ]),
    ],
    worksFor: {
      "@type": "Organization",
      name: "Cloudflare",
      url: "https://www.cloudflare.com",
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
    description: siteConfig.seo.metaDescription,
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
 * Generate SoftwareApplication schema for projects
 */
export function generateSoftwareApplicationSchema(
  name: string,
  description: string,
  url: string,
  authorId: string,
  options?: {
    applicationCategory?: string;
    keywords?: string[];
    isFree?: boolean;
    codeRepository?: string;
  },
) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    url,
    author: { "@type": "Person", "@id": authorId },
    applicationCategory: options?.applicationCategory ?? "DeveloperApplication",
    isAccessibleForFree: options?.isFree ?? true,
    keywords:
      options?.keywords && options.keywords.length > 0
        ? options.keywords.join(", ")
        : undefined,
    codeRepository: options?.codeRepository ?? undefined,
  };
}

/**
 * Generate CollectionPage schema for index pages
 */
export function generateCollectionPageSchema(
  name: string,
  description: string,
  url: string,
  options?: {
    dateModified?: string;
    datePublished?: string;
    articleSection?: string;
    mainEntity?: Record<string, unknown>;
  },
) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": url,
    name,
    description,
    url,
    isPartOf: { "@type": "WebSite", "@id": `${baseUrl}/#website` },
    mainEntity: options?.mainEntity ?? { "@id": `${baseUrl}/#author` },
    inLanguage: "en-US",
    ...(options?.dateModified ? { dateModified: options.dateModified } : {}),
    ...(options?.datePublished ? { datePublished: options.datePublished } : {}),
    ...(options?.articleSection
      ? { articleSection: options.articleSection }
      : {}),
  };
}

/**
 * Generate ProfilePage schema for profile pages
 */
export function generateProfilePageSchema(
  name: string,
  description: string,
  url: string,
  options?: {
    dateModified?: string;
    datePublished?: string;
    articleSection?: string;
  },
) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": url,
    name,
    description,
    url,
    isPartOf: { "@type": "WebSite", "@id": `${baseUrl}/#website` },
    mainEntity: { "@id": `${baseUrl}/#author` },
    about: { "@id": `${baseUrl}/#author` },
    inLanguage: "en-US",
    ...(options?.dateModified ? { dateModified: options.dateModified } : {}),
    ...(options?.datePublished ? { datePublished: options.datePublished } : {}),
    ...(options?.articleSection
      ? { articleSection: options.articleSection }
      : {}),
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
export function generateSpeakableSchema(
  articleId: string,
  cssSelector: string,
) {
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
  pageUrl: string,
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

/**
 * Generate reviewedBy schema for technical posts
 * Signals editorial review process for E-E-A-T
 */
export function generateReviewedBySchema(
  reviewerName: string,
  reviewerCredentials?: string,
) {
  return {
    "@type": "Person",
    name: reviewerName,
    ...(reviewerCredentials
      ? {
          hasCredential: {
            "@type": "EducationalOccupationalCredential",
            credentialCategory: reviewerCredentials,
          },
        }
      : {}),
  };
}

/**
 * Generate HowTo schema for tutorial posts
 * Targets Google's HowTo rich results
 */
export function generateHowToSchema(
  title: string,
  description: string,
  steps: Array<{ name: string; text: string; url?: string }>,
  totalTime?: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: title,
    description,
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.url ? { url: step.url } : {}),
    })),
    ...(totalTime ? { totalTime } : {}),
  };
}

export function generateBlogPostingSchema(
  post: {
    id: string;
    title: string;
    excerpt: string;
    date: string;
    dateModified?: string;
    author?: string;
    tags: string[];
    reviewedBy?: string;
    howToSteps?: Array<{ name: string; text: string; url?: string }>;
  },
  readingTimeMinutes: number,
  wordCount: number,
) {
  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${baseUrl}/blog/${post.id}#article`,
    headline: post.title,
    description: post.excerpt,
    url: `${baseUrl}/blog/${post.id}`,
    datePublished: `${post.date}T00:00:00Z`,
    dateModified: post.dateModified
      ? `${post.dateModified}T00:00:00Z`
      : `${post.date}T00:00:00Z`,
    author: generateBlogAuthorSchema(post.author),
    publisher: generateBlogPublisherSchema(),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/blog/${post.id}`,
    },
    isPartOf: { "@type": "WebSite", "@id": `${baseUrl}/#website` },
    image: `${baseUrl}/og/blog/${post.id}.png`,
    keywords: post.tags.join(", "),
    articleSection: post.tags[0] ?? "Technology",
    wordCount: wordCount,
    timeRequired: `PT${readingTimeMinutes}M`,
    inLanguage: "en-US",
    ...(post.reviewedBy
      ? {
          reviewedBy: generateReviewedBySchema(post.reviewedBy),
        }
      : {}),
  };

  const howToSchema =
    post.howToSteps && post.howToSteps.length > 0
      ? generateHowToSchema(
          post.title,
          post.excerpt,
          post.howToSteps,
          validateDuration(`PT${readingTimeMinutes}M`),
        )
      : null;

  return { blogPostingSchema, howToSchema };
}
