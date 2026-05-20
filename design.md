# Design — divkix.me

A locked design system for this app. Every page redesign reads this file before
emitting code. Do not regenerate per page — extend or amend this file when the
system needs to grow.

## Genre

editorial

## Macrostructure family

- Marketing homepage: Letter — first-person salutation, belief-led prose, portrait as quiet proof; sections follow POV → writing → signature work → contact
- Marketing sections (projects): Split Studio diptychs where text/proof pairing helps
- Content pages: Long Document — continuous prose, inline section heads, generous measure

## Theme

Salon — light paper · roman-serif display · warm terracotta accent

- `--color-paper`   oklch(0.96 0.008 85)
- `--color-paper-2` oklch(0.93 0.012 82)
- `--color-ink`     oklch(0.22 0.02 55)
- `--color-ink-2`   oklch(0.45 0.02 55)
- `--color-rule`    oklch(0.86 0.015 80)
- `--color-accent`  oklch(0.52 0.14 35)
- `--color-focus`   oklch(0.52 0.14 35)

## Typography

- Display: Fraunces, weight 500, style normal
- Body: Source Serif 4, weight 400
- Mono: Geist Mono, weight 400 (data only — not section labels)
- Display tracking: -0.02em
- Type scale anchor: `--text-display` = clamp(2.75rem, 5vw + 1rem, 4.5rem)

## Spacing

4-point named scale. Values in `src/styles/tokens.css`. Pages must use named
tokens (`var(--space-md)`), never raw values.

## Motion

- Easings: `--ease-out` cubic-bezier(0.16, 1, 0.3, 1)
- Reveal pattern: fade + subtle translate on scroll (view timeline)
- Reduced-motion fallback: opacity-only, ≤ 150 ms

## Microinteractions stance

- Silent success toasts (no celebratory confetti)
- Hover delay 800 ms on tooltips · focus delay 0 ms
- Link underline grow on text links

## CTA voice

- Primary CTA: filled, `--radius-input` (4px), verb-led copy
- Secondary CTA: hairline outline, same radius

## Nav + Footer

- Nav: N9 Edge-aligned minimal
- Footer: Ft6 Letter close

## Per-page allowances

- Marketing pages MAY use author photo in hero figure
- Content pages: typography only, no enrichment

## What pages MUST share

- Wordmark: "Divanshu Chauhan" in display face
- Accent colour placement ≤ 5% per viewport
- Display + body fonts
- CTA button shape and padding rhythm
- Section headings: display serif only — no numbered mono kickers

## What pages MAY differ on

- Split Studio column order (alternate left/right per section)
- Blog list vs post prose width

## Exports

### tokens.css

See [`src/styles/tokens.css`](src/styles/tokens.css).

### Tailwind v4 `@theme`

Mapped in [`src/styles/globals.css`](src/styles/globals.css) via shadcn semantic tokens.

### DTCG `tokens.json`

```json
{
  "color": {
    "paper": { "$value": "oklch(0.96 0.008 85)", "$type": "color" },
    "ink": { "$value": "oklch(0.22 0.02 55)", "$type": "color" },
    "accent": { "$value": "oklch(0.52 0.14 35)", "$type": "color" }
  },
  "font": {
    "display": { "$value": "Fraunces", "$type": "fontFamily" },
    "body": { "$value": "Source Serif 4", "$type": "fontFamily" }
  },
  "space": {
    "md": { "$value": "1.5rem", "$type": "dimension" }
  }
}
```

### shadcn/ui CSS variables

Mapped via `--background`, `--foreground`, `--primary`, `--ring` in globals.css.
