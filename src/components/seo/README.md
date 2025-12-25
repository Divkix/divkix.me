# SEO Components Usage

## SEO Component

The main SEO component for adding meta tags to pages.

### Basic Usage (Homepage)

```astro
---
import { SEO } from "@/components/seo";
---

<head>
  <SEO />
</head>
```

### Blog Post Usage

```astro
---
import { SEO } from "@/components/seo";

const { title, excerpt, slug, date, tags } = post;
---

<head>
  <SEO
    title={title}
    description={excerpt}
    canonical={`https://divkix.me/blog/${slug}`}
    ogImage={`/og/blog/${slug}.png`}
    ogType="article"
    publishedTime={date}
    tags={tags}
  />
</head>
```

### Props Interface

```typescript
interface Props {
  title?: string;              // Page title (falls back to site default)
  description?: string;         // Meta description
  canonical?: string;           // Canonical URL (auto-generated from Astro.url if not provided)
  ogImage?: string;            // OG image URL (relative or absolute)
  ogType?: string;             // OG type (default: "website", use "article" for blog posts)
  publishedTime?: string;      // Article published time (ISO 8601 format)
  modifiedTime?: string;       // Article modified time (ISO 8601 format)
  tags?: string[];             // Keywords/tags for the page
}
```

## JsonLd Component

Component for adding structured data (JSON-LD) to pages.

### Single Schema Usage

```astro
---
import { JsonLd } from "@/components/seo";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Divanshu Chauhan",
  url: "https://divkix.me",
  jobTitle: "Software Engineer",
};
---

<head>
  <JsonLd data={personSchema} />
</head>
```

### Multiple Schemas Usage

```astro
---
import { JsonLd } from "@/components/seo";

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Divanshu Chauhan",
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: "https://divkix.me",
  },
];
---

<head>
  <JsonLd data={schemas} />
</head>
```

## ThemeScript Component

Inline script to prevent FOUC (Flash of Unstyled Content) when applying dark mode.

### Usage

```astro
---
import { ThemeScript } from "@/components/providers";
---

<head>
  <ThemeScript />
  <!-- Other head elements -->
</head>
```

### Features

- Reads theme from localStorage
- Falls back to system preference (prefers-color-scheme)
- Applies 'dark' class to documentElement immediately
- Listens for storage events for cross-tab synchronization
- Listens for system preference changes
- Runs inline before page render to prevent flash

### How It Works

1. Checks localStorage for saved theme preference
2. If no preference found, checks system dark mode preference
3. Applies theme immediately (before page renders)
4. Sets up listeners for:
   - Cross-tab synchronization (storage events)
   - System preference changes

## Complete Layout Example

```astro
---
import { SEO, JsonLd } from "@/components/seo";
import { ThemeScript } from "@/components/providers";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Divanshu Chauhan",
  url: "https://divkix.me",
};
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- Theme script MUST come first to prevent FOUC -->
    <ThemeScript />

    <!-- SEO meta tags -->
    <SEO />

    <!-- Structured data -->
    <JsonLd data={personSchema} />
  </head>
  <body>
    <slot />
  </body>
</html>
```
