import { siteConfig } from "@/data/site.config";

export function Highlights() {
  return (
    <section
      id="highlights"
      className="container mx-auto px-4 py-16 md:py-20 max-w-3xl"
    >
      <p
        className="text-center text-muted-foreground tracking-widest text-sm mb-8"
        aria-hidden="true"
      >
        * * *
      </p>
      <p className="text-lg md:text-xl text-foreground/90 leading-relaxed">
        {siteConfig.founderPov}
      </p>
      <p className="mt-6 text-base text-muted-foreground leading-relaxed">
        <a
          href="/about"
          className="text-primary link-underline-grow whitespace-nowrap"
        >
          Full background, experience, and skills →
        </a>
      </p>
    </section>
  );
}
