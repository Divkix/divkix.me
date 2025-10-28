import * as fs from "fs"
import * as path from "path"
import matter from "gray-matter"
import readingTime from "reading-time"

// Fix for Cloudflare Workers: process.cwd() returns empty string in Workers runtime
const postsDirectory = path.resolve(process.cwd() || ".", "content/blog")

export interface Post {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
  readingTime: string
}

export function getAllPosts(): Post[] {
  try {
    if (!fs.existsSync(postsDirectory)) {
      console.error(`Posts directory not found: ${postsDirectory}`)
      console.error(`process.cwd(): "${process.cwd()}"`)
      console.error(`Resolved path: "${path.resolve(process.cwd() || ".", "content/blog")}"`)
      return []
    }

    const fileNames = fs.readdirSync(postsDirectory)
    const posts = fileNames
      .filter((fileName) => fileName.endsWith(".mdx"))
      .map((fileName) => {
        const slug = fileName.replace(/\.mdx$/, "")
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, "utf8")
        const { data, content } = matter(fileContents)

        return {
          slug,
          title: data.title || slug,
          date: data.date || new Date().toISOString(),
          excerpt: data.excerpt || "",
          content,
          readingTime: readingTime(content).text,
        }
      })

    return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
  } catch (error) {
    console.error("Error reading blog posts:", error)
    return []
  }
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)

    if (!fs.existsSync(fullPath)) {
      console.error(`Post file not found: ${fullPath}`)
      return null
    }

    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title || slug,
      date: data.date || new Date().toISOString(),
      excerpt: data.excerpt || "",
      content,
      readingTime: readingTime(content).text,
    }
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error)
    return null
  }
}
