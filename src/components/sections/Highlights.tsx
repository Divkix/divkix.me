import { siteConfig } from "@/data/site.config";

export function Highlights() {
  return (
    <section id="highlights" className="text-band min-w-0">
      <p className="mast-line mb-[var(--space-sm)]">Why this site exists</p>
      <p className="prose-measure text-[length:var(--text-md)] md:text-lg text-foreground leading-relaxed">
        {siteConfig.founderPov}
      </p>
      <p className="mt-[var(--space-md)] text-base text-muted-foreground leading-relaxed">
        <a
          href="/about"
          className="text-primary link-underline-grow whitespace-nowrap uppercase text-xs tracking-[0.18em]"
        >
          Full background, experience, and skills →
        </a>
      </p>
    </section>
  );
}
