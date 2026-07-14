# Design System — Racing Italy (light)

## Concept

Light, airy base inspired by Lombardy — cream whites, soft stone, lake blues. Accents from the Italian tricolore: **verde** (racing green) and **rosso** (Ferrari red) used sparingly for CTAs, pins, and active states.

## Palette

| Token | Usage |
|-------|--------|
| `--background` | Warm off-white `#FAFAF8` |
| `--foreground` | Charcoal `#1A1A1A` |
| `--primary` | Italian green — CTAs, links |
| `--accent` | Italian red — pin, highlights, racing tab |
| `--muted` | Stone gray for secondary text |
| `--lake` | Lake Garda blue for map water |
| `--cream` | Section alternates |

## Typography

- **Sans:** Inter Variable (existing)
- Headings: semibold, tight tracking
- Body: relaxed line-height for hospitality feel

## Motion

- Hero map: SVG stroke draw ~2.5s, pin drop + pulse
- POI carousel: crossfade + slide on category change (300ms ease)
- Cards: subtle hover lift
- Respect `prefers-reduced-motion`

## Components

- Rounded-2xl cards, soft shadows
- Pin markers: red dot + white ring + photo thumbnail on hover/select
- No dark mode — light theme only
