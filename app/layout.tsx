import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Divanshu Chauhan - Full-Stack Developer & AI/ML Engineer",
  description:
    "Graduate student at Arizona State University specializing in AI/ML and Full-Stack Development. Creator of Alita Robot with 1M+ users.",
  keywords: [
    "Divanshu Chauhan",
    "Full-Stack Developer",
    "AI/ML Engineer",
    "Software Engineer",
    "Arizona State University",
    "ASU",
    "Open Source",
    "Alita Robot",
    "Go Developer",
    "Python Developer",
    "TypeScript Developer",
  ],
  authors: [{ name: "Divanshu Chauhan", url: "https://divkix.me" }],
  creator: "Divanshu Chauhan",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://divkix.me",
    title: "Divanshu Chauhan - Full-Stack Developer & AI/ML Engineer",
    description:
      "Graduate student at Arizona State University specializing in AI/ML and Full-Stack Development. Creator of Alita Robot with 1M+ users.",
    siteName: "Divanshu Chauhan Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Divanshu Chauhan - Full-Stack Developer & AI/ML Engineer",
    description:
      "Graduate student at Arizona State University specializing in AI/ML and Full-Stack Development.",
    creator: "@divkix",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
