import { apartment, galleryImages, gallerySrc } from "./apartment";

export const site = {
	url: "https://karting-apartment.it",
	name: apartment.name,
	license: "017042-LNI-00002",
	manager: {
		name: "MI ISEO LAKE HOUSE",
		url: apartment.links.manager,
	},
	email: apartment.links.email,
	floorSize: 60,
	floorSizeUnit: "MTK",
	occupancy: 4,
	bedrooms: 1,
	bathrooms: 1,
	rating: {
		value: 9.7,
		best: 10,
		reviewCount: null as number | null,
		source: "Booking.com",
	},
	checkIn: "14:00",
	checkOut: "10:00",
	ogImage: gallerySrc(galleryImages[3]),
	ogImageWidth: 1200,
	ogImageHeight: 800,
	geo: {
		latitude: apartment.coordinates.lat,
		longitude: apartment.coordinates.lng,
		region: "IT-BS",
		placename: "Castel Mella, Lombardy, Italy",
	},
	sameAs: [
		apartment.links.booking,
		apartment.links.airbnb,
		apartment.links.map,
	],
	credits: {
		website: "https://sziarko.pl",
		label: "SZRacing",
	},
} as const;

export function absoluteUrl(path = ""): string {
	const normalized = path.startsWith("/") ? path : `/${path}`;
	return new URL(normalized, site.url).href;
}
