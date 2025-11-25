import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { JsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAllPosts, getPostBySlug } from "@/lib/content";
import { generateBlogPostSchemas } from "@/lib/schema";
import { generateBlogPostSEO } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
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

  return generateBlogPostSEO(
    post.title,
    post.excerpt,
    post.slug,
    post.date,
    post.tags,
    post.author,
  );
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
      ? Number.parseInt(post.readingTime.match(/\d+/)?.[0] || "0", 10)
      : post.readingTime;

  // Generate JSON-LD schemas for this post
  const schemas = generateBlogPostSchemas(
    {
      title: post.title,
      excerpt: post.excerpt,
      slug: post.slug,
      date: post.date,
      author: post.author,
      tags: post.tags,
      readingTime: readingTimeMinutes,
      wordCount: post.wordCount,
    },
    post.faq,
    post.howto,
  );

  return (
    <>
      <JsonLd data={schemas} />
      {/* Table of Contents - fixed sidebar on xl screens */}
      {post.toc && post.toc.length >= 3 && <TableOfContents toc={post.toc} />}

      <article
        className="container mx-auto px-4 py-20"
        itemScope
        itemType="https://schema.org/BlogPosting"
      >
        <div className="max-w-3xl mx-auto space-y-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>

          <header className="space-y-4">
            <h1 className="text-5xl font-display font-bold" itemProp="headline">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-foreground/60">
              <Badge variant="secondary">{post.readingTime}</Badge>
              <time dateTime={post.date} itemProp="datePublished">
                {formatDate(post.date)}
              </time>
              <address
                className="not-italic"
                itemProp="author"
                itemScope
                itemType="https://schema.org/Person"
              >
                by{" "}
                <span itemProp="name">{post.author || "Divanshu Chauhan"}</span>
              </address>
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            <meta itemProp="description" content={post.excerpt} />
          </header>

          <BlogArticleWrapper readingTimeMinutes={readingTimeMinutes}>
            <div
              className="prose prose-slate dark:prose-invert max-w-none"
              itemProp="articleBody"
            >
              <MDXContent />
            </div>
          </BlogArticleWrapper>

          {/* Related Posts Section */}
          {post.relatedPosts && post.relatedPosts.length > 0 && (
            <RelatedPosts posts={post.relatedPosts} />
          )}
        </div>
      </article>
    </>
  );
}
