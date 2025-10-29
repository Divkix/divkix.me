import { getAllPosts } from "@/lib/content"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { formatDate } from "@/lib/utils"
import { generateSEO } from "@/lib/seo"

export const metadata = generateSEO({
  title: "Blog",
  description: "Thoughts on software development, technology, and building products.",
})

// Force static rendering to prevent hydration issues in Cloudflare Workers
export const dynamic = 'force-static'
export const revalidate = false

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="space-y-4">
          <h1 className="text-5xl font-display font-bold">Blog</h1>
          <p className="text-xl text-foreground/70">
            Thoughts on software development, technology, and building products.
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="text-foreground/60">No posts yet. Check back soon!</p>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="block">
                <Card className="glass-surface hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <Badge variant="secondary">{post.readingTime}</Badge>
                      <span className="text-sm text-foreground/60">
                        {formatDate(post.date)}
                      </span>
                    </div>
                    <CardTitle className="text-2xl hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                    {post.excerpt && (
                      <CardDescription className="text-base">
                        {post.excerpt}
                      </CardDescription>
                    )}
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
