import type { NextConfig } from 'next'
import createMDX from '@next/mdx'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', '@react-three/fiber', '@react-three/drei', 'three'],
  },
  // Enable compression
  compress: true,
  // Strict mode for better error catching
  reactStrictMode: true,
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
    rehypePlugins: [],
  },
})

export default withMDX(nextConfig)
