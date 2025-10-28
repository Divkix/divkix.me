import { siteConfig } from "@/content/site.config"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-foreground/60">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex gap-4">
            {siteConfig.socials.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                className="text-sm text-foreground/60 hover:text-foreground transition-colors"
              >
                {social.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
