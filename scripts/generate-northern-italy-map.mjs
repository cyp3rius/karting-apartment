/**
 * Regenerates src/data/northern-italy-map.ts from Natural Earth 10m sources.
 * Lakes: ne_10m_lakes + ne_10m_lakes_europe (Iseo).
 * Lago d'Idro is not present in any Natural Earth dataset — geometry from OSM/Nominatim.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "../src/data/northern-italy-map.ts");

const NORTH = new Set([
	"Lombardia",
	"Piemonte",
	"Veneto",
	"Liguria",
	"Emilia-Romagna",
	"Friuli-Venezia Giulia",
	"Trentino-Alto Adige",
	"Valle d'Aosta",
]);
const NEIGHBORS = new Set([
	"FRA",
	"CHE",
	"AUT",
	"SVN",
	"SMR",
	"MCO",
	"DEU",
	"HRV",
	"LIE",
]);

/** Extra padding so neighboring countries fill the hero viewport edges. */
const BOUNDS_PADDING = {
	west: 3.0,
	east: 1.2,
	north: 1.1,
	south: 1.0,
};

const LAKE_ALLOWLIST = new Set([
	"Lake Geneva",
	"Lago di Como",
	"Lago di Garda",
	"Lago d' Iseo",
	"Lago d'Idro",
	"Lago di Lugano - Ceresio",
]);

function collectRings(geom) {
	if (!geom) return [];
	if (geom.type === "Polygon") return [geom.coordinates[0]];
	if (geom.type === "MultiPolygon") return geom.coordinates.map((p) => p[0]);
	return [];
}

function ringBBox(ring) {
	let minLng = Infinity,
		maxLng = -Infinity,
		minLat = Infinity,
		maxLat = -Infinity;
	for (const [lng, lat] of ring) {
		minLng = Math.min(minLng, lng);
		maxLng = Math.max(maxLng, lng);
		minLat = Math.min(minLat, lat);
		maxLat = Math.max(maxLat, lat);
	}
	return { minLng, maxLng, minLat, maxLat };
}

function subsample(ring, step = 2) {
	if (ring.length <= 6) return ring;
	const out = [];
	for (let i = 0; i < ring.length; i += step) out.push(ring[i]);
	const last = ring[ring.length - 1];
	const tail = out[out.length - 1];
	if (!tail || tail[0] !== last[0] || tail[1] !== last[1]) out.push(last);
	return out;
}

function intersectsBounds(ring, bounds) {
	const b = ringBBox(ring);
	return (
		b.minLng <= bounds.maxLng &&
		b.maxLng >= bounds.minLng &&
		b.minLat <= bounds.maxLat &&
		b.maxLat >= bounds.minLat
	);
}

const [adminRes, lakesRes, lakesEuropeRes, countriesRes, coastRes] =
	await Promise.all([
		fetch(
			"https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_admin_1_states_provinces.geojson",
		),
		fetch(
			"https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_lakes.geojson",
		),
		fetch(
			"https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_lakes_europe.geojson",
		),
		fetch(
			"https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_admin_0_countries.geojson",
		),
		fetch(
			"https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_coastline.geojson",
		),
	]);

const admin = await adminRes.json();
const lakesGj = await lakesRes.json();
const lakesEuropeGj = await lakesEuropeRes.json();
const countries = await countriesRes.json();
const coastGj = await coastRes.json();

const northFeatures = admin.features.filter(
	(f) => f.properties.adm0_a3 === "ITA" && NORTH.has(f.properties.region),
);
const allRings = northFeatures.flatMap((f) => collectRings(f.geometry));

let minLng = Infinity,
	maxLng = -Infinity,
	minLat = Infinity,
	maxLat = -Infinity;
for (const ring of allRings) {
	const b = ringBBox(ring);
	minLng = Math.min(minLng, b.minLng);
	maxLng = Math.max(maxLng, b.maxLng);
	minLat = Math.min(minLat, b.minLat);
	maxLat = Math.max(maxLat, b.maxLat);
}

const BOUNDS = {
	minLng: minLng - BOUNDS_PADDING.west,
	maxLng: maxLng + BOUNDS_PADDING.east,
	minLat: minLat - BOUNDS_PADDING.south,
	maxLat: maxLat + BOUNDS_PADDING.north,
};

const W = 1400;
const H = 1000;
const project = ([lng, lat]) => [
	+(((lng - BOUNDS.minLng) / (BOUNDS.maxLng - BOUNDS.minLng)) * W).toFixed(1),
	+(((BOUNDS.maxLat - lat) / (BOUNDS.maxLat - BOUNDS.minLat)) * H).toFixed(1),
];

function ringToPath(ring, step = 2) {
	const pts = subsample(ring, step).map(project);
	if (pts.length < 3) return "";
	return (
		"M" + pts.map((p, i) => `${i ? "L" : ""}${p[0]},${p[1]}`).join("") + "Z"
	);
}

function clipEdge(points, inside, interpolate) {
	const output = [];
	if (!points.length) return output;
	for (let i = 0; i < points.length; i++) {
		const curr = points[i];
		const prev = points[i === 0 ? points.length - 1 : i - 1];
		const currIn = inside(curr);
		const prevIn = inside(prev);
		if (currIn) {
			if (!prevIn) output.push(interpolate(prev, curr));
			output.push(curr);
		} else if (prevIn) {
			output.push(interpolate(prev, curr));
		}
	}
	return output;
}

function intersectLng(a, b, lng) {
	const t = (lng - a[0]) / (b[0] - a[0]);
	return [lng, a[1] + t * (b[1] - a[1])];
}

function intersectLat(a, b, lat) {
	const t = (lat - a[1]) / (b[1] - a[1]);
	return [a[0] + t * (b[0] - a[0]), lat];
}

function clipRingToBounds(ring, bounds) {
	let pts = ring;
	pts = clipEdge(pts, (p) => p[0] >= bounds.minLng, (a, b) =>
		intersectLng(a, b, bounds.minLng),
	);
	pts = clipEdge(pts, (p) => p[0] <= bounds.maxLng, (a, b) =>
		intersectLng(a, b, bounds.maxLng),
	);
	pts = clipEdge(pts, (p) => p[1] >= bounds.minLat, (a, b) =>
		intersectLat(a, b, bounds.minLat),
	);
	pts = clipEdge(pts, (p) => p[1] <= bounds.maxLat, (a, b) =>
		intersectLat(a, b, bounds.maxLat),
	);
	return pts.length >= 3 ? pts : [];
}

function clipRing(ring, bounds) {
	return clipRingToBounds(ring, bounds);
}

/** Italy land fill — clip west/east/north only so the southern coast stays natural. */
function clipRingForItalyFill(ring, bounds) {
	let pts = ring;
	pts = clipEdge(pts, (p) => p[0] >= bounds.minLng, (a, b) =>
		intersectLng(a, b, bounds.minLng),
	);
	pts = clipEdge(pts, (p) => p[0] <= bounds.maxLng, (a, b) =>
		intersectLng(a, b, bounds.maxLng),
	);
	pts = clipEdge(pts, (p) => p[1] <= bounds.maxLat, (a, b) =>
		intersectLat(a, b, bounds.maxLat),
	);
	return pts.length >= 3 ? pts : [];
}

function ringToOpenPath(ring, step = 2) {
	const pts = subsample(ring, step).map(project);
	if (pts.length < 2) return "";
	return (
		"M" + pts.map((p, i) => `${i ? "L" : ""}${p[0]},${p[1]}`).join("")
	);
}

/** Land borders with France, Switzerland, Austria, Slovenia. */
function classifyBorderSegment([lng1, lat1], [lng2, lat2]) {
	const midLng = (lng1 + lng2) / 2;
	const midLat = (lat1 + lat2) / 2;

	if (midLng < 7.35 && midLat > 43.5) return "land";
	if (midLat > 45.65 && midLng >= 6.5 && midLng <= 11.2) return "land";
	if (midLng > 12.2 && midLat > 45.35) return "land";

	return "sea";
}

function splitRingByBorderType(ring) {
	const land = [];
	const sea = [];
	const closed = [...ring, ring[0]];
	let currentType = null;
	let current = [];

	for (let i = 0; i < closed.length - 1; i++) {
		const p1 = closed[i];
		const p2 = closed[i + 1];
		const type = classifyBorderSegment(p1, p2);

		if (currentType === null) {
			currentType = type;
			current = [p1];
		}

		if (type === currentType) {
			current.push(p2);
		} else {
			if (current.length >= 2) {
				(type === "land" ? land : sea).push([...current]);
			}
			currentType = type;
			current = [p1, p2];
		}
	}

	if (current.length >= 2) {
		(currentType === "land" ? land : sea).push(current);
	}

	return { land, sea };
}

function collectLines(geom) {
	if (!geom) return [];
	if (geom.type === "LineString") return [geom.coordinates];
	if (geom.type === "MultiLineString") return geom.coordinates;
	return [];
}

function pointInRing(lng, lat, ring) {
	let inside = false;
	for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
		const [xi, yi] = ring[i];
		const [xj, yj] = ring[j];
		const intersect =
			yi > lat !== yj > lat &&
			lng < ((xj - xi) * (lat - yi)) / (yj - yi) + xi;
		if (intersect) inside = !inside;
	}
	return inside;
}

function pathsFromGeom(geom, step = 2, clip = false) {
	return collectRings(geom)
		.filter((ring) => intersectsBounds(ring, BOUNDS))
		.map((ring) => {
			const r = clip ? clipRing(ring, BOUNDS) : ring;
			return ringToPath(r, step);
		})
		.filter((p) => p.length > 30);
}


const byRegion = new Map();
for (const f of northFeatures) {
	const key = f.properties.region;
	const rings = collectRings(f.geometry);
	const longest = rings.reduce((a, b) => (a.length >= b.length ? a : b));
	const path = ringToPath(longest, 4);
	if (!byRegion.has(key) || path.length > byRegion.get(key).paths[0].length) {
		byRegion.set(key, {
			id: key.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
			name: key,
			paths: [path],
		});
	}
}
const mapRegions = [...byRegion.values()];

const italy = countries.features.find(
	(f) => (f.properties.ADM0_A3 || f.properties.ISO_A3) === "ITA",
);

// Single country polygon — no gaps between admin regions.
const mainItalyRing = collectRings(italy.geometry)
	.filter((ring) => {
		const b = ringBBox(ring);
		return (
			intersectsBounds(ring, BOUNDS) &&
			ring.length > 500 &&
			b.maxLat > 44 &&
			b.minLat < 47.5
		);
	})
	.reduce((a, b) => (a.length >= b.length ? a : b), []);

const clippedItalyRing = clipRingForItalyFill(mainItalyRing, BOUNDS);
const italyLandPaths = [ringToPath(clippedItalyRing, 2)].filter(
	(p) => p.length > 30,
);

const { land: landSegments, sea: seaSegments } =
	splitRingByBorderType(clippedItalyRing);

const italyLandBorderPaths = landSegments
	.map((seg) => ringToOpenPath(seg, 1))
	.filter((p) => p.length > 20);

const italyCoastBorderPaths = [
	...seaSegments.map((seg) => ringToOpenPath(seg, 1)).filter((p) => p.length > 20),
	...coastGj.features.flatMap((f) =>
		collectLines(f.geometry)
			.filter((line) => {
				const inView = line.filter(
					([lng, lat]) =>
						lng >= BOUNDS.minLng &&
						lng <= BOUNDS.maxLng &&
						lat >= BOUNDS.minLat &&
						lat <= BOUNDS.maxLat,
				);
				if (inView.length < 2) return false;
				const coastal = inView.filter(
					([lng, lat]) =>
						!pointInRing(lng, lat, clippedItalyRing) && lat < 45.2,
				);
				return coastal.length / inView.length > 0.4;
			})
			.map((line) =>
				ringToOpenPath(
					line.filter(
						([lng, lat]) =>
							lng >= BOUNDS.minLng &&
							lng <= BOUNDS.maxLng &&
							lat >= BOUNDS.minLat &&
							lat <= BOUNDS.maxLat,
					),
					1,
				),
			)
			.filter((p) => p.length > 20),
	),
];

const neighborLandPaths = countries.features
	.filter((f) => NEIGHBORS.has(f.properties.ADM0_A3 || f.properties.ISO_A3))
	.flatMap((f) => pathsFromGeom(f.geometry, 2, true));

function lakeId(name) {
	return name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function lakeFromFeature(f, step = 1) {
	const name = f.properties.name?.trim();
	if (!name) return null;
	const paths = collectRings(f.geometry)
		.filter((ring) => intersectsBounds(ring, BOUNDS))
		.map((ring) => ringToPath(ring, step))
		.filter((p) => p.length > 20);
	if (!paths.length) return null;
	return { id: lakeId(name), name, paths };
}

const lakeById = new Map();

for (const f of [...lakesGj.features, ...lakesEuropeGj.features]) {
	const lake = lakeFromFeature(f);
	if (!lake || !LAKE_ALLOWLIST.has(lake.name)) continue;
	const existing = lakeById.get(lake.id);
	if (!existing || lake.paths[0].length > existing.paths[0].length) {
		lakeById.set(lake.id, lake);
	}
}

// Lago d'Idro — absent from Natural Earth; OSM via Nominatim
const idroRes = await fetch(
	"https://nominatim.openstreetmap.org/search?q=Lago+d%27Idro&format=json&polygon_geojson=1&limit=1",
	{ headers: { "User-Agent": "karting-apartment-map-gen/1.0" } },
);
const idroHits = await idroRes.json();
const idroGeom = idroHits[0]?.geojson;
if (idroGeom?.type === "Polygon") {
	const path = ringToPath(idroGeom.coordinates[0], 8);
	if (path.length > 20) {
		lakeById.set("lago-d-idro", {
			id: "lago-d-idro",
			name: "Lago d'Idro",
			paths: [path],
		});
	}
}

const mapLakes = [...lakeById.values()].sort((a, b) =>
	a.name.localeCompare(b.name),
);

const lombardia = mapRegions.find((r) => r.id === "lombardia");
const lombPts = lombardia.paths[0].match(/[\d.]+,[\d.]+/g).map((s) => s.split(",").map(Number));
const lombCenterX = lombPts.reduce((s, [x]) => s + x, 0) / lombPts.length;
const MAP_VIEW_OFFSET = Math.round(lombCenterX - W * 0.72);

fs.writeFileSync(
	OUT,
	`// Natural Earth 10m — northern Italy hero map
// Regenerate: node scripts/generate-northern-italy-map.mjs
export const MAP_VIEW = { width: ${W}, height: ${H} } as const;
export const MAP_VIEW_OFFSET = ${MAP_VIEW_OFFSET};
export const MAP_BOUNDS = ${JSON.stringify(BOUNDS)} as const;
export interface MapLayer { id: string; name: string; paths: string[]; }
export const neighborLandPaths: string[] = ${JSON.stringify(neighborLandPaths, null, "\t")};
export const italyLandPaths: string[] = ${JSON.stringify(italyLandPaths, null, "\t")};
export const italyLandBorderPaths: string[] = ${JSON.stringify(italyLandBorderPaths, null, "\t")};
export const italyCoastBorderPaths: string[] = ${JSON.stringify(italyCoastBorderPaths, null, "\t")};
export const mapRegions: MapLayer[] = ${JSON.stringify(mapRegions, null, "\t")};
export const mapLakes: MapLayer[] = ${JSON.stringify(mapLakes, null, "\t")};
`,
);

console.log(
	"Lakes:",
	mapLakes.map((l) => l.name),
	"| offset:",
	MAP_VIEW_OFFSET,
);
