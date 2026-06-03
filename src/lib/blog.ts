import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = join(process.cwd(), "src", "content", "blog");

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export interface RelatedPost {
  slug: string;
  title: string;
  excerpt: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  dateModified: string | null;
  excerpt: string;
  tags: string[];
  author: string;
  seoTitle: string | null;
  seoDescription: string | null;
  readingTime: number;
  wordCount: number;
  published: boolean;
  toc: TocItem[];
  tldr: string | null;
  keyTakeaways: string[];
  faq: Array<{ q: string; a: string }> | null;
  relatedPosts?: RelatedPost[];
}

export interface PostsOutput {
  posts: BlogPost[];
  generatedAt: string;
  totalPosts: number;
}

export function calculateReadingTime(content: string): {
  minutes: number;
  wordCount: number;
} {
  const wordCount = content.split(/\s+/g).length;
  const minutes = Math.max(1, Math.ceil(wordCount / 200));
  return { minutes, wordCount };
}

export function extractToc(content: string): TocItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const toc: TocItem[] = [];
  let match = headingRegex.exec(content);

  while (match !== null) {
    const [, hashes, headingText] = match;
    if (!hashes || !headingText) continue;
    const level = hashes.length;
    const text = headingText.trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    toc.push({ id, text, level });
    match = headingRegex.exec(content);
  }

  return toc;
}

function calculateTagSimilarity(
  tags1: string[] = [],
  tags2: string[] = [],
): number {
  const set1 = new Set(tags1.map((t) => t.toLowerCase()));
  const set2 = new Set(tags2.map((t) => t.toLowerCase()));
  let intersection = 0;
  for (const tag of set1) {
    if (set2.has(tag)) intersection++;
  }
  return intersection;
}

export function getAllPosts(): BlogPost[] {
  if (!existsSync(CONTENT_DIR)) {
    console.error(`❌ Blog directory not found: ${CONTENT_DIR}`);
    process.exit(1);
  }

  const files = readdirSync(CONTENT_DIR).filter((file) =>
    file.endsWith(".mdx"),
  );

  const posts: BlogPost[] = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const filePath = join(CONTENT_DIR, file);
    const fileContent = readFileSync(filePath, "utf-8");

    const { data: frontmatter, content } = matter(fileContent);

    const wordCount = content.split(/\s+/g).length;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));

    const toc = extractToc(content);

    return {
      slug,
      title: frontmatter.title || "Untitled",
      date: frontmatter.date || new Date().toISOString(),
      dateModified: frontmatter.dateModified || null,
      excerpt: frontmatter.excerpt || "",
      tags: frontmatter.tags || [],
      author: frontmatter.author || "Divanshu Chauhan",
      seoTitle: frontmatter.seoTitle || null,
      seoDescription: frontmatter.seoDescription || null,
      readingTime,
      wordCount,
      published: frontmatter.published !== false,
      toc,
      tldr: frontmatter.tldr || null,
      keyTakeaways: frontmatter.keyTakeaways || [],
      faq: frontmatter.faq || null,
    };
  });

  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const publishedPosts = posts.filter((post) => post.published);

  for (const post of publishedPosts) {
    const otherPosts = publishedPosts.filter((p) => p.slug !== post.slug);

    post.relatedPosts = otherPosts
      .map((p) => ({
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        score: calculateTagSimilarity(post.tags, p.tags),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(({ slug, title, excerpt }) => ({ slug, title, excerpt }));
  }

  return publishedPosts;
}
