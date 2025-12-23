import type { Metadata } from "next";
import { Footer } from "@/components/shared/Footer";
import { Navbar } from "@/components/shared/Navbar";
import { generateSEO } from "@/lib/seo";

export const metadata: Metadata = generateSEO({
  title: "About",
  description:
    "Learn more about Divanshu Chauhan (Divkix) — Software Developer, Graduate Student at ASU, and Open Source Contributor with 250,000+ users impacted across projects.",
  alternates: {
    canonical: "https://divkix.me/about",
  },
});

// Force static rendering for Cloudflare Workers compatibility
export const dynamic = "force-static";
export const revalidate = false;

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
}
