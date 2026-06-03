import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import GitHubSlugger from "github-slugger";
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

export interface PostMetadata {
  slug: string;
  title: string;
  date: string;
  dateModified: string | null;
  excerpt: string;
  tags: string[];
  author: string;
  seoTitle: string | null;
  seoDescription: string | null;
  published: boolean;
  tldr: string | null;
  keyTakeaways: string[];
  faq: Array<{ q: string; a: string }> | null;
  readingTime: number;
  wordCount: number;
  toc: TocItem[];
  relatedPosts?: RelatedPost[];
}

function stripCodeBlocks(content: string): string {
  return content.replace(/```[\s\S]*?```/g, "").replace(/`[^`]*`/g, "");
}

export function calculateReadingTime(content: string): {
  minutes: number;
  wordCount: number;
} {
  const stripped = stripCodeBlocks(content);
  const wordCount = stripped.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(wordCount / 200));
  return { minutes, wordCount };
}

export function extractToc(
  content: string,
): Array<{ id: string; text: string; level: number }> {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const toc: Array<{ id: string; text: string; level: number }> = [];
  const slugger = new GitHubSlugger();
  let match = headingRegex.exec(content);

  while (match !== null) {
    const [, hashes, headingText] = match;
    if (!hashes || !headingText) {
      match = headingRegex.exec(content);
      continue;
    }
    const level = hashes.length;
    const text = headingText.trim();
    const id = slugger.slug(text);

    toc.push({ id, text, level });
    match = headingRegex.exec(content);
  }

  return toc;
}

export function parsePostFile(slug: string, fileContent: string): PostMetadata {
  const { data: frontmatter, content } = matter(fileContent);

  const { minutes: readingTime, wordCount } = calculateReadingTime(content);
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
    published: frontmatter.published !== false,
    tldr: frontmatter.tldr || null,
    keyTakeaways: frontmatter.keyTakeaways || [],
    faq: frontmatter.faq || null,
    readingTime,
    wordCount,
    toc,
  };
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

export function getAllPosts(options?: { published?: boolean }): PostMetadata[] {
  if (!existsSync(CONTENT_DIR)) {
    throw new Error(`Blog directory not found: ${CONTENT_DIR}`);
  }

  const files = readdirSync(CONTENT_DIR).filter((file) =>
    file.endsWith(".mdx"),
  );

  const posts: PostMetadata[] = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const filePath = join(CONTENT_DIR, file);
    const fileContent = readFileSync(filePath, "utf-8");
    return parsePostFile(slug, fileContent);
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

  if (options?.published === true) {
    return posts.filter((post) => post.published);
  }

  return posts;
}
