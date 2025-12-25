import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    // Core metadata
    title: z.string(),
    date: z.string(),
    dateModified: z.string().optional(),
    excerpt: z.string(),
    tags: z.array(z.string()),
    published: z.boolean().default(false),
    author: z.string().optional().default("Divanshu Chauhan"),

    // Extended SEO fields
    tldr: z.string().optional(),
    keyTakeaways: z.array(z.string()).optional(),
    faq: z
      .array(
        z.object({
          q: z.string(),
          a: z.string(),
        }),
      )
      .optional(),
    howto: z
      .object({
        name: z.string(),
        totalTime: z.string(),
        steps: z.array(
          z.object({
            name: z.string(),
            text: z.string(),
          }),
        ),
      })
      .optional(),
  }),
});

export const collections = {
  blog,
};
