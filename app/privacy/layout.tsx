import type { Metadata } from "next";
import { generateSEO } from "@/lib/seo";

export const metadata: Metadata = generateSEO({
  title: "Privacy Policy",
  description:
    "Privacy policy for divkix.me. Learn how we collect, use, and protect your personal information when you visit this site.",
  alternates: {
    canonical: "https://divkix.me/privacy",
  },
  robots: {
    index: true,
    follow: true,
  },
});

// Force static rendering for Cloudflare Workers compatibility
export const dynamic = "force-static";
export const revalidate = false;

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
