import { ComponentPropsWithoutRef } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const components = {
  h1: ({ className, ...props }: ComponentPropsWithoutRef<"h1">) => (
    <h1 className={cn("text-4xl font-display font-bold mt-8 mb-4", className)} {...props} />
  ),
  h2: ({ className, ...props }: ComponentPropsWithoutRef<"h2">) => (
    <h2 className={cn("text-3xl font-display font-bold mt-8 mb-4", className)} {...props} />
  ),
  h3: ({ className, ...props }: ComponentPropsWithoutRef<"h3">) => (
    <h3 className={cn("text-2xl font-display font-semibold mt-6 mb-3", className)} {...props} />
  ),
  p: ({ className, ...props }: ComponentPropsWithoutRef<"p">) => (
    <p className={cn("leading-7 mb-4", className)} {...props} />
  ),
  a: ({ className, href, ...props }: ComponentPropsWithoutRef<"a">) => (
    <Link
      href={href || "#"}
      className={cn("text-primary underline underline-offset-4 hover:text-primary/80", className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }: ComponentPropsWithoutRef<"ul">) => (
    <ul className={cn("list-disc list-inside mb-4 space-y-2", className)} {...props} />
  ),
  ol: ({ className, ...props }: ComponentPropsWithoutRef<"ol">) => (
    <ol className={cn("list-decimal list-inside mb-4 space-y-2", className)} {...props} />
  ),
  code: ({ className, ...props }: ComponentPropsWithoutRef<"code">) => (
    <code
      className={cn("bg-muted px-1.5 py-0.5 rounded text-sm font-mono", className)}
      {...props}
    />
  ),
  pre: ({ className, ...props }: ComponentPropsWithoutRef<"pre">) => (
    <pre
      className={cn("bg-muted p-4 rounded-lg overflow-x-auto mb-4", className)}
      {...props}
    />
  ),
  blockquote: ({ className, ...props }: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className={cn("border-l-4 border-primary pl-4 italic my-4", className)}
      {...props}
    />
  ),
}

export default components
