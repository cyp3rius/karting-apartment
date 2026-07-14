# Product Spec — Karting Apartment

## Property

- **Name:** Karting Apartment
- **Address:** Via Onzato, 16/2, 25030 Castel Mella (BS), Lombardy, Italy
- **Coordinates:** 45.508811, 10.148824
- **Size:** 60 m², 1 bedroom, balcony, garden view
- **Rating:** 9.7 / 10 (Booking)

## Audience

Motorsport enthusiasts, couples, and families visiting Lombardy — Lake Garda, Franciacorta, Brescia, and nearby karting circuits.

## Page structure (single-page)

1. **Hero** — animated Northern Italy sketch map + apartment pin + primary CTA
2. **Nearby** — tabbed carousel: Airports | Attractions | Racing circuits
3. **Gallery** — 32 apartment photos
4. **About** — description, location context
5. **Amenities** — facilities grid
6. **Reviews** — guest highlights
7. **Contact** — direct booking form (primary) + platform links

## Booking flow

| Priority | Channel | Action |
|----------|---------|--------|
| Primary | Direct | Contact form → email (placeholder until owner provides address) |
| Secondary | Booking.com | External link |
| Secondary | Airbnb | External link (placeholder URL) |

Direct booking messaging: cheaper than OTAs, no platform fees.

## Tech

- Static Astro 6, no CMS
- React islands for interactive map carousel and gallery lightbox
- Static output, deploy anywhere
