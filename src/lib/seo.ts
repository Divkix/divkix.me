export const baseUrl = "https://divkix.me";

export const META_DESCRIPTION_MAX = 160;

export interface ArticleMeta {
  publishedTime: string;
  modifiedTime?: string;
  author: string;
  tags?: string[];
  articleSection?: string;
}

/** URL-safe tag slug: lowercase, spaces to hyphens, keep dots (e.g. next.js). */
export function slugifyTag(tag: string): string {
  return tag
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}.]+/gu, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function tagPath(tag: string): string {
  return `/blog/tags/${slugifyTag(tag)}`;
}

/**
 * Shorten a meta description to ~160 characters without rewriting it.
 * Prefers a sentence that already fits; otherwise clips at a comma/space.
 */
export function clipMetaDescription(
  text: string,
  max = META_DESCRIPTION_MAX,
): string {
  const normalized = text.trim();
  if (normalized.length <= max) return normalized;

  const sentenceEnd = /[.!?](?=\s|$)/g;
  let lastGoodSentence = -1;
  let match = sentenceEnd.exec(normalized);
  while (match !== null) {
    const end = match.index + 1;
    if (end <= max) {
      if (end >= 110) lastGoodSentence = end;
    } else {
      break;
    }
    match = sentenceEnd.exec(normalized);
  }
  if (lastGoodSentence > 0) {
    return normalized.slice(0, lastGoodSentence).trimEnd();
  }

  const slice = normalized.slice(0, max - 1);
  const breakAt = Math.max(
    slice.lastIndexOf("; "),
    slice.lastIndexOf(", "),
    slice.lastIndexOf(" — "),
    slice.lastIndexOf(" – "),
    slice.lastIndexOf(" "),
  );
  const clipped = (breakAt >= 80 ? slice.slice(0, breakAt) : slice).trimEnd();
  return /[.!?]$/.test(clipped) ? clipped : `${clipped}…`;
}
