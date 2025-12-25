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
interface HowToStep {
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
  dateModified?: string | null;
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
