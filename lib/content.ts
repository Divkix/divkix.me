// Import generated metadata instead of using filesystem at runtime
// This allows the code to work in Cloudflare Workers and edge environments
import postsData from "@/content/blog/posts.json";

// Types for table of contents
export interface TocItem {
  id: string;
  text: string;
  level: number;
}

// Types for FAQ schema
export interface FAQ {
  q: string;
  a: string;
}

// Types for HowTo schema
export interface HowToStep {
  name: string;
  text: string;
}

export interface HowTo {
  name: string;
  totalTime: string;
  steps: HowToStep[];
}

// Types for related posts
export interface RelatedPost {
  slug: string;
  title: string;
  excerpt: string;
}

export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content?: string;
  readingTime: string | number;
  tags?: string[];
  author?: string;
  published?: boolean;
  // Extended fields for SEO
  tldr?: string | null;
  keyTakeaways?: string[];
  faq?: FAQ[] | null;
  howto?: HowTo | null;
  wordCount?: number;
  toc?: TocItem[];
  relatedPosts?: RelatedPost[];
}

export function getAllPosts(): Post[] {
  try {
    // Use the pre-generated metadata from build time
    if (!postsData || !postsData.posts) {
      console.error("No posts data available");
      return [];
    }

    // Map the posts and format readingTime as a string
    const posts = postsData.posts.map((post) => ({
      ...post,
      readingTime:
        typeof post.readingTime === "number"
          ? `${post.readingTime} min read`
          : post.readingTime,
    }));

    // Posts are already sorted by date in the JSON
    return posts;
  } catch (error) {
    console.error("Error reading blog posts:", error);
    return [];
  }
}

export function getPostBySlug(slug: string): Post | null {
  try {
    // Find the post in the pre-generated metadata
    if (!postsData || !postsData.posts) {
      console.error("No posts data available");
      return null;
    }

    const post = postsData.posts.find((p) => p.slug === slug);

    if (!post) {
      console.error(`Post not found: ${slug}`);
      return null;
    }

    // Format readingTime as a string if needed
    return {
      ...post,
      readingTime:
        typeof post.readingTime === "number"
          ? `${post.readingTime} min read`
          : post.readingTime,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}
