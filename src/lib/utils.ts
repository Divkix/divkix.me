import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function calculateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / 200);
}

/**
 * Return the set of lowercase tag names that appear in 2+ posts.
 * Used to keep tag links consistent with the tag-page getStaticPaths filter.
 */
export function getMultiPostTags(
  posts: ReadonlyArray<{ tags: readonly string[] }>,
): Set<string> {
  const tagCounts = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.tags) {
      const normalized = tag.toLowerCase();
      tagCounts.set(normalized, (tagCounts.get(normalized) ?? 0) + 1);
    }
  }
  const multiPostTags = new Set<string>();
  for (const [tag, count] of tagCounts) {
    if (count >= 2) multiPostTags.add(tag);
  }
  return multiPostTags;
}
