import type { LocalizedString } from "../i18n/translations";
import { projectToMap } from "../lib/geo";
import { apartment } from "./apartment";

export type PoiCategory = "airports" | "attractions" | "racing";

interface PoiInput {
	id: string;
	category: PoiCategory;
	name: LocalizedString;
	distanceKm: number;
	image: string;
	lat: number;
	lng: number;
	iataCode?: string;
}

export interface NearbyPoi extends PoiInput {
	mapX: number;
	mapY: number;
}

const poiData: PoiInput[] = [
	{
		id: "bergamo",
		category: "airports",
		iataCode: "BGY",
		name: {
			en: "Bergamo Orio al Serio",
			it: "Bergamo Orio al Serio",
			pl: "Bergamo Orio al Serio",
		},
		distanceKm: 46,
		image: "/images/poi/bergamo.jpg",
		lat: 45.6703,
		lng: 9.7042,
	},
	{
		id: "verona-airport",
		category: "airports",
		iataCode: "VRN",
		name: {
			en: "Verona Villafranca",
			it: "Verona Villafranca",
			pl: "Werona Villafranca",
		},
		distanceKm: 75,
		image: "/images/poi/verona-airport.jpg",
		lat: 45.3957,
		lng: 10.8885,
	},
	{
		id: "linate",
		category: "airports",
		iataCode: "LIN",
		name: {
			en: "Milano Linate",
			it: "Milano Linate",
			pl: "Mediolan Linate",
		},
		distanceKm: 90,
		image: "/images/poi/linate.jpg",
		lat: 45.4451,
		lng: 9.2767,
	},
	{
		id: "malpensa",
		category: "airports",
		iataCode: "MXP",
		name: {
			en: "Milano Malpensa",
			it: "Milano Malpensa",
			pl: "Mediolan Malpensa",
		},
		distanceKm: 120,
		image: "/images/poi/malpensa.jpg",
		lat: 45.6306,
		lng: 8.7281,
	},
	{
		id: "brescia",
		category: "attractions",
		name: {
			en: "Brescia",
			it: "Brescia",
			pl: "Brescia",
		},
		distanceKm: 8,
		image: "/images/poi/brescia.jpg",
		lat: 45.5416,
		lng: 10.2118,
	},
	{
		id: "iseo",
		category: "attractions",
		name: {
			en: "Lake Iseo",
			it: "Lago d'Iseo",
			pl: "Jezioro Iseo",
		},
		distanceKm: 18,
		image: "/images/poi/iseo.jpg",
		lat: 45.708,
		lng: 10.065,
	},
	{
		id: "franciacorta",
		category: "attractions",
		name: {
			en: "Franciacorta",
			it: "Franciacorta",
			pl: "Franciacorta",
		},
		distanceKm: 20,
		image: "/images/poi/franciacorta.jpg",
		lat: 45.55,
		lng: 10.05,
	},
	{
		id: "lugana",
		category: "attractions",
		name: {
			en: "Lugana",
			it: "Lugana",
			pl: "Lugana",
		},
		distanceKm: 38,
		image: "/images/poi/lugana.jpg",
		lat: 45.44,
		lng: 10.69,
	},
	{
		id: "valpolicella",
		category: "attractions",
		name: {
			en: "Valpolicella",
			it: "Valpolicella",
			pl: "Valpolicella",
		},
		distanceKm: 65,
		image: "/images/poi/valpolicella.jpg",
		lat: 45.536,
		lng: 10.941,
	},
	{
		id: "soave",
		category: "attractions",
		name: {
			en: "Soave",
			it: "Soave",
			pl: "Soave",
		},
		distanceKm: 78,
		image: "/images/poi/soave.jpg",
		lat: 45.35,
		lng: 11.25,
	},
	{
		id: "garda",
		category: "attractions",
		name: {
			en: "Lake Garda",
			it: "Lago di Garda",
			pl: "Jezioro Garda",
		},
		distanceKm: 40,
		image: "/images/poi/garda.jpg",
		lat: 45.492,
		lng: 10.608,
	},
	{
		id: "bergamo-city",
		category: "attractions",
		name: {
			en: "Bergamo",
			it: "Bergamo",
			pl: "Bergamo",
		},
		distanceKm: 42,
		image: "/images/poi/bergamo-city.jpg",
		lat: 45.6983,
		lng: 9.6773,
	},
	{
		id: "torino",
		category: "attractions",
		name: {
			en: "Torino",
			it: "Torino",
			pl: "Turyn",
		},
		distanceKm: 200,
		image: "/images/poi/torino.jpg",
		lat: 45.0703,
		lng: 7.6869,
	},
	{
		id: "genova",
		category: "attractions",
		name: {
			en: "Genova",
			it: "Genova",
			pl: "Genua",
		},
		distanceKm: 220,
		image: "/images/poi/genova.jpg",
		lat: 44.4056,
		lng: 8.9463,
	},
	{
		id: "como",
		category: "attractions",
		name: {
			en: "Lake Como",
			it: "Lago di Como",
			pl: "Jezioro Como",
		},
		distanceKm: 95,
		image: "/images/poi/como.jpg",
		// Map-aligned with Lago di Como on the hero SVG (Natural Earth lake geometry).
		lat: 45.954,
		lng: 8.708,
	},
	{
		id: "verona",
		category: "attractions",
		name: {
			en: "Verona",
			it: "Verona",
			pl: "Werona",
		},
		distanceKm: 70,
		image: "/images/poi/verona.jpg",
		lat: 45.4384,
		lng: 10.9916,
	},
	{
		id: "milano",
		category: "attractions",
		name: {
			en: "Milano",
			it: "Milano",
			pl: "Mediolan",
		},
		distanceKm: 90,
		image: "/images/poi/milano.jpg",
		lat: 45.4642,
		lng: 9.19,
	},
	{
		id: "venice",
		category: "attractions",
		name: {
			en: "Venezia",
			it: "Venezia",
			pl: "Wenecja",
		},
		distanceKm: 150,
		image: "/images/poi/venice.jpg",
		lat: 45.4408,
		lng: 12.3155,
	},
	{
		id: "franciacorta-karting",
		category: "racing",
		name: {
			en: "Franciacorta",
			it: "Franciacorta",
			pl: "Franciacorta",
		},
		distanceKm: 12,
		image: "/images/poi/franciacorta-karting.jpg",
		lat: 45.52,
		lng: 10.0,
	},
	{
		id: "south-garda",
		category: "racing",
		name: {
			en: "South Garda Karting",
			it: "South Garda Karting",
			pl: "South Garda Karting",
		},
		distanceKm: 35,
		image: "/images/poi/south-garda.jpg",
		lat: 45.46,
		lng: 10.48,
	},
	{
		id: "cremona",
		category: "racing",
		name: {
			en: "Cremona",
			it: "Cremona",
			pl: "Cremona",
		},
		distanceKm: 75,
		image: "/images/poi/cremona.jpg",
		lat: 45.12,
		lng: 10.02,
	},
];

function withProjection(poi: PoiInput): NearbyPoi {
	const { mapX, mapY } = projectToMap(poi.lat, poi.lng);
	return { ...poi, mapX, mapY };
}

export const nearbyPois: NearbyPoi[] = poiData.map(withProjection);

export const apartmentPin = projectToMap(
	apartment.coordinates.lat,
	apartment.coordinates.lng,
);

export function poisByCategory(category: PoiCategory) {
	return nearbyPois
		.filter((p) => p.category === category)
		.sort((a, b) => a.distanceKm - b.distanceKm);
}
