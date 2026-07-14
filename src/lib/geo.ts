import { MAP_BOUNDS, MAP_VIEW } from "../data/northern-italy-map";

export function projectToMap(lat: number, lng: number) {
	const mapX =
		((lng - MAP_BOUNDS.minLng) / (MAP_BOUNDS.maxLng - MAP_BOUNDS.minLng)) *
		MAP_VIEW.width;
	const mapY =
		((MAP_BOUNDS.maxLat - lat) / (MAP_BOUNDS.maxLat - MAP_BOUNDS.minLat)) *
		MAP_VIEW.height;
	return {
		mapX: Math.round(mapX * 10) / 10,
		mapY: Math.round(mapY * 10) / 10,
	};
}
