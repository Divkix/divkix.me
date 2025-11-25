import Link from "next/link";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { RelatedPost } from "@/lib/content";

interface RelatedPostsProps {
  posts: RelatedPost[];
}

/**
 * Related posts section based on tag similarity
 * Displays up to 3 related articles to reduce bounce rate
 */
export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <section
      aria-label="Related articles"
      className="mt-16 pt-8 border-t border-border"
    >
      <h2 className="text-2xl font-display font-bold mb-6">
        You might also like
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <Card className="h-full hover:border-primary/50 transition-colors group">
              <CardHeader>
                <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {post.excerpt}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
