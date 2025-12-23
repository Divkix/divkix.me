import Link from "next/link";
import { siteConfig } from "@/content/site.config";
import { SocialIcons } from "./SocialIcons";

const footerLinks = [
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Privacy", href: "/privacy" },
];

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
            <p className="text-sm text-foreground/60">
              © {new Date().getFullYear()} {siteConfig.name}
            </p>
            <nav className="flex items-center gap-4">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-foreground/60 hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <SocialIcons size="sm" />
        </div>
      </div>
    </footer>
  );
}
