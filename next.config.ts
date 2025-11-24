import createMDX from "@next/mdx";
import type { NextConfig } from "next";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";

const nextConfig: NextConfig = {
  // Enable static export
  output: "export",

  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],

  images: {
    // Required for static export
    unoptimized: true,
  },

  experimental: {
    // Tree-shaking optimizations for large packages
    optimizePackageImports: [
      "lucide-react",
      "react-icons",
      "framer-motion",
      "@radix-ui/react-dialog",
      "@radix-ui/react-label",
      "@radix-ui/react-slot",
      "@radix-ui/react-tabs",
      "@radix-ui/react-tooltip",
      "@react-three/fiber",
      "@react-three/drei",
      "three",
    ],
  },

  compiler: {
    // Remove console.* statements in production
    removeConsole:
      process.env.NODE_ENV === "production"
        ? {
            exclude: ["error", "warn"], // Keep error and warn for debugging
          }
        : false,

    // Remove React test IDs in production
    reactRemoveProperties:
      process.env.NODE_ENV === "production"
        ? {
            properties: ["^data-testid$"],
          }
        : false,
  },

  // Enable compression
  compress: true,

  // Strict mode for better error catching
  reactStrictMode: true,
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
