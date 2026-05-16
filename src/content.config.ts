import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/blog" }),
  schema: z.object({
    // Core metadata
    title: z.string(),
    date: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format")
      .refine(
        (date) => !Number.isNaN(Date.parse(date)),
        "Date must be a valid date",
      ),
    dateModified: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format")
      .refine(
        (date) => !Number.isNaN(Date.parse(date)),
        "Date must be a valid date",
      )
      .optional(),
    excerpt: z.string(),
    tags: z.array(z.string()),
    published: z.boolean().default(false),
    featured: z.boolean().optional().default(false),
    author: z.string().optional().default("Divanshu Chauhan"),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),

    // Extended SEO fields
    coverAlt: z.string().optional(),
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

    // E-E-A-T and GEO fields
    reviewedBy: z.string().optional(),
    sources: z
      .array(
        z.string().refine(
          (val) => {
            try {
              new URL(val);
              return true;
            } catch {
              return false;
            }
          },
          { message: "Invalid URL" },
        ),
      )
      .optional(),
    howToSteps: z
      .array(
        z.object({
          name: z.string(),
          text: z.string(),
          url: z
            .string()
            .refine(
              (val) => {
                try {
                  new URL(val);
                  return true;
                } catch {
                  return false;
                }
              },
              { message: "Invalid URL" },
            )
            .optional(),
        }),
      )
      .optional(),
  }),
});

export const collections = {
  blog,
};
