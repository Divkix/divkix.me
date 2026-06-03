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
}

function stripCodeBlocks(content: string): string {
  return content
    .replace(/```[\s\S]*?```/g, "")
    .replace(/~~~[\s\S]*?~~~/g, "")
    .replace(/`[^`]*`/g, "");
}

export function calculateReadingTime(content: string): {
  minutes: number;
  wordCount: number;
} {
  const stripped = stripCodeBlocks(content);
  const trimmed = stripped.trim();
  const wordCount = trimmed ? trimmed.split(/\s+/).length : 0;
  const minutes = Math.max(1, Math.ceil(wordCount / 200));
  return { minutes, wordCount };
}

export function extractToc(
  content: string,
): Array<{ id: string; text: string; level: number }> {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const toc: Array<{ id: string; text: string; level: number }> = [];
  const slugger = new GitHubSlugger();
  const stripped = content
    .replace(/```[\s\S]*?```/g, "")
    .replace(/~~~[\s\S]*?~~~/g, "");
  let match = headingRegex.exec(stripped);

  while (match !== null) {
    const [, hashes, headingText] = match;
    if (!hashes || !headingText) {
      match = headingRegex.exec(stripped);
      continue;
    }
    const level = hashes.length;
    const text = headingText.trim();
    const id = slugger.slug(text);

    toc.push({ id, text, level });
    match = headingRegex.exec(stripped);
  }

  return toc;
}

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

function validateFrontmatter(
  frontmatter: Record<string, unknown>,
  slug: string,
): void {
  if (!frontmatter.title || typeof frontmatter.title !== "string") {
    throw new Error(`[${slug}] Missing or invalid required field: title`);
  }
  if (
    !frontmatter.date ||
    typeof frontmatter.date !== "string" ||
    !DATE_REGEX.test(frontmatter.date)
  ) {
    throw new Error(
      `[${slug}] Missing or invalid required field: date (must be YYYY-MM-DD)`,
    );
  }
  if (
    frontmatter.dateModified &&
    (typeof frontmatter.dateModified !== "string" ||
      !DATE_REGEX.test(frontmatter.dateModified))
  ) {
    throw new Error(`[${slug}] Invalid dateModified (must be YYYY-MM-DD)`);
  }
  if (!frontmatter.excerpt || typeof frontmatter.excerpt !== "string") {
    throw new Error(`[${slug}] Missing or invalid required field: excerpt`);
  }
  if (!frontmatter.tags || !Array.isArray(frontmatter.tags)) {
    throw new Error(`[${slug}] Missing or invalid required field: tags`);
  }
}

export function parsePostFile(slug: string, fileContent: string): PostMetadata {
  const { data: frontmatter, content } = matter(fileContent);

  validateFrontmatter(frontmatter, slug);

  const { minutes: readingTime, wordCount } = calculateReadingTime(content);
  const toc = extractToc(content);

  return {
    slug,
    title: frontmatter.title as string,
    date: frontmatter.date as string,
    dateModified: (frontmatter.dateModified as string) || null,
    excerpt: frontmatter.excerpt as string,
    tags: frontmatter.tags as string[],
    author: (frontmatter.author as string) || "Divanshu Chauhan",
    seoTitle: (frontmatter.seoTitle as string) || null,
    seoDescription: (frontmatter.seoDescription as string) || null,
    published: frontmatter.published !== false,
    tldr: (frontmatter.tldr as string) || null,
    keyTakeaways: (frontmatter.keyTakeaways as string[]) || [],
    faq: (frontmatter.faq as Array<{ q: string; a: string }>) || null,
    readingTime,
    wordCount,
    toc,
  };
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

  if (options?.published !== undefined) {
    return posts.filter((post) => post.published === options.published);
  }

  return posts;
}
