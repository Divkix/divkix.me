import type { CollectionEntry } from "astro:content";
import { getCollection } from "astro:content";
import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { siteConfig } from "@/data/site.config";
import { baseUrl } from "@/lib/seo";

export async function GET(context: APIContext) {
  // Get all published blog posts
  const posts = await getCollection("blog");
  const publishedPosts = posts
    .filter((post: CollectionEntry<"blog">) => post.data.published === true)
    .sort(
      (a: CollectionEntry<"blog">, b: CollectionEntry<"blog">) =>
        new Date(b.data.date).getTime() - new Date(a.data.date).getTime(),
    );

  return rss({
    title: `${siteConfig.name} - Blog`,
    description:
      siteConfig.seo?.metaDescription ||
      "Thoughts on software development, technology, and building products.",
    site: context.site || baseUrl,
    items: publishedPosts.map((post: CollectionEntry<"blog">) => ({
      title: post.data.title,
      description: post.data.excerpt,
      pubDate: new Date(post.data.date),
      link: `/blog/${post.slug}/`,
      categories: post.data.tags || [],
      author: post.data.author || siteConfig.name,
      customData: post.data.dateModified
        ? `<lastModified>${new Date(post.data.dateModified).toUTCString()}</lastModified>`
        : undefined,
    })),
    customData: `<language>en-us</language>
<copyright>Copyright ${new Date().getFullYear()} ${siteConfig.name}</copyright>
<managingEditor>${siteConfig.email} (${siteConfig.name})</managingEditor>
<webMaster>${siteConfig.email} (${siteConfig.name})</webMaster>`,
    stylesheet: false,
  });
}
