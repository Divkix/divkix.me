import { siteConfig } from "@/data/site.config";

export function Highlights() {
  return (
    <section id="highlights" className="text-band min-w-0">
      <p className="text-lg md:text-xl text-foreground/90 leading-relaxed prose-measure">
        {siteConfig.founderPov}
      </p>
      <p className="mt-[var(--space-lg)] text-base text-muted-foreground leading-relaxed">
        <a
          href="/about"
          className="text-primary link-underline-grow whitespace-nowrap uppercase text-sm tracking-[0.06em]"
        >
          Full background, experience, and skills →
        </a>
      </p>
    </section>
  );
}
