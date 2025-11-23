import { getAllPosts, getPostBySlug } from "@/lib/content";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { generateBlogPostSEO } from "@/lib/seo";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BlogArticleWrapper } from "./blog-article-wrapper";

// Force static rendering to prevent hydration issues in Cloudflare Workers
export const dynamic = "force-static";
export const revalidate = false;

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {};
  }

  return generateBlogPostSEO(post.title, post.excerpt, post.slug, post.date);
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Dynamically import the MDX file
  const MDXContent = (await import(`@/content/blog/${slug}.mdx`)).default;

  // Extract numeric reading time from string (e.g., "5 min read" -> 5)
  const readingTimeMinutes =
    typeof post.readingTime === "string"
      ? parseInt(post.readingTime.match(/\d+/)?.[0] || "0", 10)
      : post.readingTime;

  return (
    <article className="container mx-auto px-4 py-20">
      <div className="max-w-3xl mx-auto space-y-8">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>

        <header className="space-y-4">
          <h1 className="text-5xl font-display font-bold">{post.title}</h1>

          <div className="flex items-center gap-4 text-foreground/60">
            <Badge variant="secondary">{post.readingTime}</Badge>
            <span>{formatDate(post.date)}</span>
          </div>
        </header>

        <BlogArticleWrapper readingTimeMinutes={readingTimeMinutes}>
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <MDXContent />
          </div>
        </BlogArticleWrapper>
      </div>
    </article>
  );
}
