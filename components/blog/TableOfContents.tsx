"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/lib/content";
import { cn } from "@/lib/utils";

interface TableOfContentsProps {
  toc: TocItem[];
}

/**
 * Table of Contents component with scroll spy
 * Shows on xl screens as a fixed sidebar
 */
export function TableOfContents({ toc }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      {
        rootMargin: "-20% 0% -80% 0%",
        threshold: 0,
      },
    );

    // Observe all heading elements
    for (const { id } of toc) {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    }

    return () => observer.disconnect();
  }, [toc]);

  // Don't show for posts with fewer than 3 headings
  if (toc.length < 3) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="hidden xl:block fixed right-8 top-32 w-64 max-h-[calc(100vh-12rem)] overflow-y-auto"
    >
      <h2 className="text-sm font-semibold mb-4 text-foreground">
        On this page
      </h2>
      <ul className="space-y-2 text-sm border-l border-border pl-4">
        {toc.map((item) => (
          <li
            key={item.id}
            style={{ paddingLeft: `${(item.level - 2) * 12}px` }}
          >
            <a
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById(item.id);
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                  // Update URL without triggering scroll
                  window.history.pushState(null, "", `#${item.id}`);
                }
              }}
              className={cn(
                "block py-1 transition-colors hover:text-primary line-clamp-2",
                activeId === item.id
                  ? "text-primary font-medium"
                  : "text-muted-foreground",
              )}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
