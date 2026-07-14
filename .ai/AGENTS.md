# Agent instructions: Karting Apartment

Static Astro 6 site for a holiday rental in Castel Mella, Lombardy. Styling: Tailwind CSS 4. Interactive islands: React.

## Where to look first

| Topic | Location |
|-------|----------|
| **Product spec** | [`.ai/spec/`](./spec/README.md) |
| **Translations** | `src/i18n/translations.ts` — every user-facing string must have EN, IT, PL |
| **Content data** | `src/data/apartment.ts`, `src/data/nearby.ts` |
| **Map projection** | `src/lib/geo.ts` — lat/lng → SVG coordinates |

## Non-negotiables

1. **Spec-driven:** Change `.ai/spec/` before implementation when requirements shift.
2. **i18n:** No hardcoded user-facing strings outside `translations.ts`.
3. **Light theme only** — racing-italy palette (green primary, red accent).
4. **Static site** — no CMS; content lives in `src/data/` and `src/i18n/`.
5. **Frozen map SVG:** Do not modify the geographic hero map (`HeroMap.tsx` SVG layers, `northern-italy-map.ts`, `generate-northern-italy-map.mjs`) unless the user explicitly requests it. Hero wrappers and overlays outside `<svg>` are fine.

## Conventions

- Pages: `src/pages/[lang]/index.astro` for localized routes
- React islands: `client:load` for map, carousel, gallery
- Images: `public/images/apartment/`, `public/images/poi/`
- Geo: POIs use real lat/lng; map positions computed via `projectToMap()`
