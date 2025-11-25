/**
 * JSON-LD injection component for SEO structured data
 * Safely injects JSON-LD scripts into the page head
 */

interface JsonLdProps {
  // biome-ignore lint/suspicious/noExplicitAny: JSON-LD can be any valid schema object
  data: Record<string, any> | Array<Record<string, any>>;
}

/**
 * Injects JSON-LD structured data into the page
 * Handles both single schema objects and arrays of schemas
 */
export function JsonLd({ data }: JsonLdProps) {
  // Handle array of schemas - render multiple script tags
  if (Array.isArray(data)) {
    return (
      <>
        {data.map((schema) => (
          <script
            key={`jsonld-${schema["@type"] || schema["@id"] || JSON.stringify(schema).slice(0, 50)}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
            }}
          />
        ))}
      </>
    );
  }

  // Single schema object
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
