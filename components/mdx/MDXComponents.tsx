import { ExternalLink } from "lucide-react";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { CopyButton } from "@/components/blog/CopyButton";
import { MDXImage } from "@/components/mdx/MDXImage";
import { cn } from "@/lib/utils";

/**
 * Extract text content from children prop, handling nested structures
 */
function extractCodeContent(children: React.ReactNode): string {
  if (typeof children === "string") {
    return children;
  }

  if (Array.isArray(children)) {
    return children.map(extractCodeContent).join("");
  }

  if (children && typeof children === "object" && "props" in children) {
    const childWithProps = children as {
      props: { children?: React.ReactNode };
    };
    return extractCodeContent(childWithProps.props.children);
  }

  return "";
}

/**
 * Generate slug ID from heading text for anchor links
 */
function generateHeadingId(children: React.ReactNode): string {
  const text = extractCodeContent(children);
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const components = {
  h1: ({ className, children, ...props }: ComponentPropsWithoutRef<"h1">) => (
    <h1
      id={generateHeadingId(children)}
      className={cn(
        "text-4xl font-display font-bold mt-8 mb-4 scroll-mt-24",
        className,
      )}
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ className, children, ...props }: ComponentPropsWithoutRef<"h2">) => (
    <h2
      id={generateHeadingId(children)}
      className={cn(
        "text-3xl font-display font-bold mt-8 mb-4 scroll-mt-24",
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ className, children, ...props }: ComponentPropsWithoutRef<"h3">) => (
    <h3
      id={generateHeadingId(children)}
      className={cn(
        "text-2xl font-display font-semibold mt-6 mb-3 scroll-mt-24",
        className,
      )}
      {...props}
    >
      {children}
    </h3>
  ),
  p: ({ className, ...props }: ComponentPropsWithoutRef<"p">) => (
    <p className={cn("leading-7 mb-4", className)} {...props} />
  ),
  a: ({
    className,
    href,
    children,
    ...props
  }: ComponentPropsWithoutRef<"a">) => {
    if (!href) {
      return <span className={className}>{children}</span>;
    }

    const isAnchor = href.startsWith("#");
    const isInternal = href.startsWith("/") || isAnchor;

    // Anchor link (same page)
    if (isAnchor) {
      return (
        <a
          href={href}
          className={cn(
            "text-primary underline underline-offset-4 hover:text-primary/80",
            className,
          )}
          {...props}
        >
          {children}
        </a>
      );
    }

    // Internal link (same site)
    if (isInternal) {
      return (
        <Link
          href={href}
          className={cn(
            "text-primary underline underline-offset-4 hover:text-primary/80",
            className,
          )}
          {...props}
        >
          {children}
        </Link>
      );
    }

    // External link
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "text-primary underline underline-offset-4 hover:text-primary/80 inline-flex items-center gap-1",
          className,
        )}
        {...props}
      >
        {children}
        <ExternalLink className="h-3 w-3 flex-shrink-0" aria-hidden="true" />
        <span className="sr-only">(opens in new tab)</span>
      </a>
    );
  },
  ul: ({ className, ...props }: ComponentPropsWithoutRef<"ul">) => (
    <ul
      className={cn("list-disc list-inside mb-4 space-y-2", className)}
      {...props}
    />
  ),
  ol: ({ className, ...props }: ComponentPropsWithoutRef<"ol">) => (
    <ol
      className={cn("list-decimal list-inside mb-4 space-y-2", className)}
      {...props}
    />
  ),
  code: ({ className, ...props }: ComponentPropsWithoutRef<"code">) => (
    <code
      className={cn(
        "bg-muted px-1.5 py-0.5 rounded text-sm font-mono",
        className,
      )}
      {...props}
    />
  ),
  pre: ({ className, children, ...props }: ComponentPropsWithoutRef<"pre">) => {
    const codeContent = extractCodeContent(children);

    return (
      <div className="relative group">
        <pre
          className={cn(
            "bg-muted p-4 rounded-lg overflow-x-auto mb-4",
            className,
          )}
          {...props}
        >
          {children}
        </pre>
        <CopyButton code={codeContent} />
      </div>
    );
  },
  blockquote: ({
    className,
    ...props
  }: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className={cn("border-l-4 border-primary pl-4 italic my-4", className)}
      {...props}
    />
  ),
  // Image component with optimization
  img: ({ src, alt }: ComponentPropsWithoutRef<"img">) => (
    <MDXImage src={typeof src === "string" ? src : undefined} alt={alt} />
  ),
};

export default components;
