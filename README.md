# Karting Apartment

Multilingual landing page (EN / IT / PL) for a holiday apartment in Castel Mella, Lombardy, Italy.

## Development

```bash
npm install
npm run dev
```

Background mode:

```bash
npx astro dev --background
npx astro dev status
npx astro dev logs
npx astro dev stop
```

## Spec-driven development

Product and design specs live in [`.ai/spec/`](./.ai/spec/README.md). Update specs before changing content or behaviour.

## Structure

- `src/i18n/` — translations (EN, IT, PL)
- `src/data/` — apartment info, nearby POIs
- `src/components/` — React islands (map, carousel, gallery)
- `src/pages/[lang]/` — localized routes
- `public/images/` — apartment and POI photos

## Contact

- Email: hello@webninja.ei
- Booking: [booking.com](https://www.booking.com/hotel/it/karting-apartment.pl.html)
- Airbnb: [listing](https://www.airbnb.co.in/rooms/1574660498202989419)
