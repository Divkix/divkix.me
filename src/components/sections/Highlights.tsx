import { ErrorBoundary } from "@/components/shared/ErrorBoundary";
import { siteConfig } from "@/data/site.config";

function Highlights() {
  return (
    <section id="highlights" className="text-band min-w-0">
      <div className="split-studio">
        <div className="min-w-0 space-y-(--space-md)">
          <h2 className="font-display text-(length:--text-display-s) leading-[1.05] tracking-(--tracking-display) m-0">
            Why I build
          </h2>
          <p className="prose-measure text-(length:--text-md) md:text-lg text-foreground leading-relaxed">
            {siteConfig.founderPov}
          </p>
          <p className="text-base text-muted-foreground leading-relaxed">
            <a
              href="/about"
              className="text-primary link-underline-grow"
              aria-label="Full background, experience, and skills"
            >
              Full background, experience, and skills{" "}
              <span aria-hidden="true">→</span>
            </a>
          </p>
        </div>

        <ul className="m-0 list-none space-y-0 border-t border-border p-0 min-w-0">
          {siteConfig.proofPoints.map((point) => (
            <li
              key={point.label}
              className="border-b border-border py-(--space-md) first:pt-(--space-md)"
            >
              <p className="m-0 text-sm font-medium text-foreground">
                {point.label}
              </p>
              <p className="mt-1 m-0 text-sm text-muted-foreground leading-relaxed">
                {point.detail}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function HighlightsWithBoundary() {
  return (
    <ErrorBoundary>
      <Highlights />
    </ErrorBoundary>
  );
}
