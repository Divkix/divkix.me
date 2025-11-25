import Image from "next/image";
import { cn } from "@/lib/utils";

interface MDXImageProps {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
}

// Inline SVG blur placeholder (dark gray rectangle)
const blurDataURL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMWExYTFhIi8+PC9zdmc+";

/**
 * Optimized image component for MDX content
 * Uses next/image with blur placeholder for better CLS
 */
export function MDXImage({
  src,
  alt = "",
  width = 800,
  height = 450,
  priority = false,
  className,
}: MDXImageProps) {
  if (!src) return null;

  return (
    <figure className="my-8">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        className={cn("rounded-lg w-full h-auto", className)}
        unoptimized // Required for static export to Cloudflare
        placeholder="blur"
        blurDataURL={blurDataURL}
      />
      {alt && (
        <figcaption className="text-center text-sm text-muted-foreground mt-2">
          {alt}
        </figcaption>
      )}
    </figure>
  );
}
