import type { Locale } from "@/i18n/config";
import { canonicalLocalePath, fallbackLocale, locales } from "@/i18n/config";
import { apartment, galleryImages, gallerySrc } from "@/data/apartment";
import { absoluteUrl, site } from "@/data/site";

export interface PageMeta {
	title: string;
	description: string;
	ogDescription: string;
	keywords: string;
	amenities: readonly string[];
	faq: readonly { q: string; a: string }[];
}

const ogLocaleMap: Record<Locale, string> = {
	en: "en_US",
	it: "it_IT",
	pl: "pl_PL",
};

const inLanguageMap: Record<Locale, string> = {
	en: "en",
	it: "it",
	pl: "pl",
};

/** Canonical URLs always on kartingapartment.pl (PL unprefixed). */
export function pageUrl(locale: Locale): string {
	return absoluteUrl(canonicalLocalePath(locale));
}

export function ogImageUrl(locale: Locale): string {
	return absoluteUrl(site.ogImageByLocale[locale] ?? site.ogImage);
}

export function hreflangLinks() {
	return [
		...locales.map((l) => ({
			hreflang: l,
			href: pageUrl(l),
		})),
		{ hreflang: "x-default", href: pageUrl(fallbackLocale) },
	];
}

export function ogLocaleAlternates(locale: Locale): string[] {
	return locales.filter((l) => l !== locale).map((l) => ogLocaleMap[l]);
}

export function buildWebSiteSchema(locale: Locale, description: string) {
	return {
		"@context": "https://schema.org",
		"@type": "WebSite",
		"@id": `${pageUrl(locale)}#website`,
		url: pageUrl(locale),
		name: site.name,
		description,
		inLanguage: inLanguageMap[locale],
		publisher: {
			"@id": `${site.url}/#organization`,
		},
	};
}

export function buildOrganizationSchema() {
	return {
		"@context": "https://schema.org",
		"@type": "Organization",
		"@id": `${site.url}/#organization`,
		name: site.manager.name,
		url: site.manager.url,
		email: site.email,
	};
}

export function buildVacationRentalSchema(locale: Locale, meta: PageMeta) {
	const images = galleryImages.slice(0, 8).map((id) => absoluteUrl(gallerySrc(id)));

	return {
		"@context": "https://schema.org",
		"@type": "VacationRental",
		"@id": `${pageUrl(locale)}#vacation-rental`,
		additionalType: "Apartment",
		name: site.name,
		description: meta.description,
		url: pageUrl(locale),
		inLanguage: inLanguageMap[locale],
		knowsLanguage: ["en-US", "it-IT", "pl-PL"],
		image: images,
		identifier: site.license,
		latitude: site.geo.latitude,
		longitude: site.geo.longitude,
		geo: {
			"@type": "GeoCoordinates",
			latitude: site.geo.latitude,
			longitude: site.geo.longitude,
		},
		address: {
			"@type": "PostalAddress",
			streetAddress: apartment.address.street,
			addressLocality: apartment.address.city,
			addressRegion: apartment.address.province,
			postalCode: apartment.address.postalCode,
			addressCountry: apartment.address.country,
		},
		containsPlace: {
			"@type": "Accommodation",
			additionalType: "EntirePlace",
			name: site.name,
			numberOfBedrooms: site.bedrooms,
			numberOfBathroomsTotal: site.bathrooms,
			numberOfRooms: site.bedrooms + 1,
			bed: site.beds.map((bed) => ({
				"@type": "BedDetails" as const,
				numberOfBeds: bed.numberOfBeds,
				typeOfBed: bed.typeOfBed,
			})),
			occupancy: {
				"@type": "QuantitativeValue",
				value: site.occupancy,
			},
			floorSize: {
				"@type": "QuantitativeValue",
				value: site.floorSize,
				unitCode: site.floorSizeUnit,
			},
			amenityFeature: site.amenities.map((amenity) => ({
				"@type": "LocationFeatureSpecification" as const,
				name: amenity.name,
				value: amenity.value,
			})),
		},
		checkinTime: site.checkIn,
		checkoutTime: site.checkOut,
		...(site.rating.reviewCount != null
			? {
					aggregateRating: {
						"@type": "AggregateRating" as const,
						ratingValue: site.rating.value,
						bestRating: site.rating.best,
						worstRating: 1,
						reviewCount: site.rating.reviewCount,
					},
				}
			: {}),
		managedBy: {
			"@type": "Organization",
			name: site.manager.name,
			url: site.manager.url,
		},
		sameAs: site.sameAs,
		potentialAction: {
			"@type": "ReserveAction",
			target: {
				"@type": "EntryPoint",
				urlTemplate: `${pageUrl(locale)}#contact`,
				actionPlatform: [
					"https://schema.org/DesktopWebPlatform",
					"https://schema.org/MobileWebPlatform",
				],
			},
			result: {
				"@type": "LodgingReservation",
				name: `Book ${site.name}`,
			},
		},
	};
}

export function buildFaqSchema(locale: Locale, meta: PageMeta) {
	return {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		"@id": `${pageUrl(locale)}#faq`,
		inLanguage: inLanguageMap[locale],
		mainEntity: meta.faq.map((item) => ({
			"@type": "Question",
			name: item.q,
			acceptedAnswer: {
				"@type": "Answer",
				text: item.a,
			},
		})),
	};
}

export function buildBreadcrumbSchema(locale: Locale) {
	return {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: [
			{
				"@type": "ListItem",
				position: 1,
				name: site.name,
				item: pageUrl(locale),
			},
		],
	};
}

export function buildJsonLdGraph(locale: Locale, meta: PageMeta) {
	const graph = [
		buildOrganizationSchema(),
		buildWebSiteSchema(locale, meta.description),
		buildVacationRentalSchema(locale, meta),
		buildFaqSchema(locale, meta),
		buildBreadcrumbSchema(locale),
	];

	return {
		"@context": "https://schema.org",
		"@graph": graph,
	};
}

export { ogLocaleMap };
