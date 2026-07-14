import type { Locale } from "@/i18n/config";
import type { NearbyPoi } from "@/data/nearby";
import { nearbyPois } from "./nearby";

export const regionAttractionTypes = [
	{ id: "motorsport", poiIds: ["cremona", "franciacorta-karting", "south-garda"] },
	{ id: "airports", poiIds: ["bergamo", "verona-airport", "linate", "malpensa"] },
	{ id: "cities", poiIds: ["brescia", "bergamo-city", "verona", "milano", "venice", "torino", "genova"] },
	{ id: "lakes", poiIds: ["iseo", "garda", "como"] },
	{ id: "wine", poiIds: ["franciacorta", "lugana", "valpolicella", "soave"] },
] as const;

export type RegionAttractionType = (typeof regionAttractionTypes)[number]["id"];

export const defaultRegionAttractionType: RegionAttractionType = "motorsport";

export function poisForAttractionType(type: RegionAttractionType): NearbyPoi[] {
	const entry = regionAttractionTypes.find((t) => t.id === type);
	if (!entry) return [];
	return entry.poiIds
		.map((id) => nearbyPois.find((p) => p.id === id))
		.filter((p): p is NearbyPoi => Boolean(p));
}

export interface MapPoiPin {
	id: string;
	mapX: number;
	mapY: number;
	label: string;
	image: string;
	iataCode?: string;
}

export function toMapPoiPins(pois: NearbyPoi[], locale: Locale): MapPoiPin[] {
	return pois.map((p) => ({
		id: p.id,
		mapX: p.mapX,
		mapY: p.mapY,
		label: p.name[locale],
		image: p.image,
		iataCode: p.iataCode,
	}));
}

export const CARD_W = 72;
export const CARD_H = 58;
const CARD_GAP = 10;
const MAP_W = 1400;
const MAP_H = 1000;

export interface PoiCardPlacement {
	x: number;
	y: number;
	/** Corner of the popover nearest the map dot. */
	anchorX: number;
	anchorY: number;
}

/** Place popover outward from the apartment, away from its location. */
export function poiCardPlacement(
	mapX: number,
	mapY: number,
	aptX: number,
	aptY: number,
	index: number,
): PoiCardPlacement {
	let dx = mapX - aptX;
	let dy = mapY - aptY;

	if (Math.abs(dx) < 2) dx = dx >= 0 ? 2 : -2;
	if (Math.abs(dy) < 2) dy = dy >= 0 ? 2 : -2;

	const stagger = (index % 3) * 10;
	let cardX =
		dx >= 0
			? CARD_GAP + stagger
			: -CARD_W - CARD_GAP - stagger;
	let cardY =
		dy >= 0
			? CARD_GAP + stagger
			: -CARD_H - CARD_GAP - stagger;

	// Flip toward map interior when the outward badge would clip the hero crop.
	const overflowsBottom = mapY + cardY + CARD_H > MAP_H * 0.7;
	const overflowsLeft = mapX + cardX < 40;
	if (overflowsBottom || overflowsLeft) {
		cardX = dx >= 0 ? -CARD_W - CARD_GAP - stagger : CARD_GAP + stagger;
		cardY = dy >= 0 ? -CARD_H - CARD_GAP - stagger : CARD_GAP + stagger;
	}

	const anchorX = dx >= 0 ? cardX : cardX + CARD_W;
	const anchorY = dy >= 0 ? cardY : cardY + CARD_H;

	return { x: cardX, y: cardY, anchorX, anchorY };
}
