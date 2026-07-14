# Karting Apartment — Spec-Driven Development

Source of truth for product, design, content, and i18n. Implementation must follow these specs.

| Spec | Purpose |
|------|---------|
| [product.md](./product.md) | Goals, audience, page structure, booking flow |
| [design-system.md](./design-system.md) | Colors, typography, motion, racing-italy theme |
| [i18n.md](./i18n.md) | EN / IT / PL rules, locale detection |
| [content.md](./content.md) | Apartment copy, amenities, reviews |
| [nearby-poi.md](./nearby-poi.md) | Airports, attractions, racing circuits |

## Workflow

1. Change spec first.
2. Update `src/data/` and `src/i18n/` to match.
3. Adjust components only when spec or data requires it.
