import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ToastProvider } from "@/components/providers/ToastProvider";
import { JsonLd } from "@/components/seo/JsonLd";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { generatePersonSchema, generateWebSiteSchema } from "@/lib/schema";
import { generateSEO } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = generateSEO();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <JsonLd data={generatePersonSchema()} />
        <JsonLd data={generateWebSiteSchema()} />
        <Script
          src="/u/s.js"
          data-website-id="c27cdff0-16e4-49c7-b4c8-6b229ef3fd83"
          strategy="afterInteractive"
        />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="aurora-background" />
          <CustomCursor />
          {children}
          <ToastProvider />
        </ThemeProvider>
      </body>
    </html>
  );
}
