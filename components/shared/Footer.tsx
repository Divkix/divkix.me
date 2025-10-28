import { siteConfig } from "@/content/site.config"
import { SocialIcons } from "./SocialIcons"

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-foreground/60">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <SocialIcons size="sm" />
        </div>
      </div>
    </footer>
  )
}
