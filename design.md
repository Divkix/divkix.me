# Design — divkix.me

A locked design system for this app. Every page redesign reads this file before
emitting code. Do not regenerate per page — extend or amend this file when the
system needs to grow.

## Genre

editorial

## Macrostructure family

- Marketing homepage: Photographic — portrait-led hero fold, narrow text bands, image edge as divider
- Marketing sections (projects): border-top list rows with typographic proof links
- Content pages: Long Document — continuous prose, inline section heads, generous measure

## Theme

Atelier layout · Atelier palette — cool near-white cream · Didone-serif display · muted slate-indigo accent

- `--color-paper`   oklch(0.986 0.003 250) — smooth cool cream, near-white (no brown/yellow cast)
- `--color-paper-2` oklch(0.968 0.004 248) — lifted cream for cards
- `--color-ink`     oklch(0.29 0.02 260) — cool blue-gray charcoal
- `--color-ink-2`   oklch(0.47 0.014 258)
- `--color-rule`    oklch(0.92 0.004 260) — neutral cool hairline
- `--color-accent`  oklch(0.44 0.09 265) — muted indigo on cream
- `--color-focus`   oklch(0.44 0.09 265)
- Dark `--color-paper` oklch(0.20 0.006 265) · `--color-ink` oklch(0.92 0.005 265) · `--color-accent` oklch(0.62 0.1 265)

## Typography

- Display: Playfair Display, weight 900, style normal
- Body: Geist Sans, weight 400
- Mono: Geist Mono, weight 400 (data only — not section labels)
- Display tracking: -0.018em
- Type scale anchor: `--text-display` = clamp(2.75rem, 5.5vw + 1rem, 4.75rem)

## Spacing

4-point named scale. Values in `src/styles/tokens.css`. Pages must use named
tokens (`var(--space-md)`), never raw values.

## Motion

- Easings: `--ease-out` cubic-bezier(0.16, 1, 0.3, 1)
- Reveal pattern: none in fold (Atelier); opacity-only below-fold if needed
- Reduced-motion fallback: opacity-only, ≤ 150 ms

## Microinteractions stance

- Silent success toasts (no celebratory confetti)
- Hover delay 800 ms on tooltips · focus delay 0 ms
- Link underline grow on text links

## CTA voice

- Primary CTA: filled, square corners (`--radius-input: 0`), verb-led copy
- Secondary CTA: hairline outline, same radius

## Nav + Footer

- Nav: N6 Newspaper masthead
- Footer: Ft1 Mast-headed

## Per-page allowances

- Marketing pages MAY use author photo in hero figure (real portrait only)
- Content pages: typography only, no enrichment

## What pages MUST share

- Wordmark: "Divanshu Chauhan" in display face
- Accent colour placement ≤ 5% per viewport
- Display + body fonts
- CTA button shape and padding rhythm
- Section headings: display serif only — no numbered mono kickers

## What pages MAY differ on

- Photo fold vs prose fold rhythm on marketing pages
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
    "paper": { "$value": "oklch(0.986 0.003 250)", "$type": "color" },
    "ink": { "$value": "oklch(0.29 0.02 260)", "$type": "color" },
    "accent": { "$value": "oklch(0.44 0.09 265)", "$type": "color" }
  },
  "font": {
    "display": { "$value": "Playfair Display", "$type": "fontFamily" },
    "body": { "$value": "Geist Sans", "$type": "fontFamily" }
  },
  "space": {
    "md": { "$value": "1rem", "$type": "dimension" }
  }
}
```

### shadcn/ui CSS variables

Mapped via `--background`, `--foreground`, `--primary`, `--ring` in globals.css.
