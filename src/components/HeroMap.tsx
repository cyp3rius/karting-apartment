import { useEffect, useMemo, useState, type ReactNode } from "react";
import type { Locale } from "@/i18n/config";
import { t } from "@/i18n/translations";
import type { NearbyPoi } from "@/data/nearby";
import { apartmentPin } from "@/data/nearby";
import { CARD_H, CARD_W, poiCardPlacement, toMapPoiPins } from "@/data/region-attractions";
import {
	italyCoastBorderPaths,
	italyLandBorderPaths,
	italyLandPaths,
	mapLakes,
	mapRegions,
	MAP_VIEW,
	MAP_VIEW_OFFSET,
	neighborLandPaths,
} from "@/data/northern-italy-map";

interface HeroMapProps {
	locale: Locale;
	activePois?: NearbyPoi[];
}

const XHTML = "http://www.w3.org/1999/xhtml" as const;

function XhtmlDiv({
	className,
	children,
}: {
	className?: string;
	children: ReactNode;
}) {
	return (
		<div {...({ xmlns: XHTML } as React.HTMLAttributes<HTMLDivElement>)} className={className}>
			{children}
		</div>
	);
}
const PRIMARY_PIN_TIP_Y = 17;

/** Photo circle geometry inside the orbit badge (card-local coords). */
const PHOTO_CX = CARD_W / 2;
const PHOTO_CY = 19;
const PHOTO_R = 17;

/** Anchor on the photo ring, facing the map dot. */
function photoAnchor(cardX: number, cardY: number) {
	const cx = cardX + PHOTO_CX;
	const cy = cardY + PHOTO_CY;
	const dist = Math.hypot(cx, cy) || 1;
	return {
		anchorX: cx - (cx / dist) * PHOTO_R,
		anchorY: cy - (cy / dist) * PHOTO_R,
	};
}

/** Light cubic bezier from dot (0,0) to the photo anchor. */
function connectorPath(endX: number, endY: number, index: number) {
	const dist = Math.hypot(endX, endY) || 1;
	const bulge = Math.min(16, dist * 0.22) * (index % 2 === 0 ? 1 : -1);
	const perpX = (-endY / dist) * bulge;
	const perpY = (endX / dist) * bulge;
	const c1x = endX * 0.3 + perpX * 0.55;
	const c1y = endY * 0.3 + perpY * 0.55;
	const c2x = endX * 0.72 + perpX * 0.35;
	const c2y = endY * 0.72 + perpY * 0.35;
	return `M 0 0 C ${c1x} ${c1y}, ${c2x} ${c2y}, ${endX} ${endY}`;
}

interface PoiPinData {
	id: string;
	mapX: number;
	mapY: number;
	label: string;
	image: string;
	iataCode?: string;
}

function poiPlacement(
	pin: PoiPinData,
	index: number,
	aptX: number,
	aptY: number,
) {
	const { x, y } = poiCardPlacement(pin.mapX, pin.mapY, aptX, aptY, index);
	const { anchorX, anchorY } = photoAnchor(x, y);
	return { cardX: x, cardY: y, anchorX, anchorY };
}

function PoiConnector({
	pin,
	index,
	anchorX,
	anchorY,
	drawn,
}: {
	pin: PoiPinData;
	index: number;
	anchorX: number;
	anchorY: number;
	drawn: boolean;
}) {
	return (
		<g transform={`translate(${pin.mapX}, ${pin.mapY})`}>
			<path
				d={connectorPath(anchorX, anchorY, index)}
				fill="none"
				stroke="#A19282"
				strokeOpacity="0.5"
				strokeWidth="1"
				strokeLinecap="round"
				strokeDasharray="4 3"
				className={drawn ? "map-poi-connector-visible" : ""}
				style={{ animationDelay: `${1.12 + index * 0.06}s` }}
			/>
		</g>
	);
}

function PoiCard({
	pin,
	index,
	cardX,
	cardY,
	drawn,
}: {
	pin: PoiPinData;
	index: number;
	cardX: number;
	cardY: number;
	drawn: boolean;
}) {
	return (
		<g transform={`translate(${pin.mapX}, ${pin.mapY})`}>
			<foreignObject
				x={cardX}
				y={cardY}
				width={CARD_W}
				height={CARD_H}
				className={`map-poi-card-fo ${drawn ? "map-poi-card-visible" : ""}`}
				style={{ animationDelay: `${1.1 + index * 0.06}s` }}
			>
				<XhtmlDiv className="map-poi-card">
					<div
						className={pin.iataCode ? "map-poi-card-photo map-poi-card-photo-iata" : "map-poi-card-photo"}
					>
						{pin.iataCode ? (
							<span className="map-poi-card-iata">{pin.iataCode}</span>
						) : (
							<img src={pin.image} alt="" className="map-poi-card-thumb" loading="lazy" />
						)}
					</div>
					<div className={pin.iataCode ? "map-poi-card-tag map-poi-card-tag-iata" : "map-poi-card-tag"}>
						<span className="map-poi-card-label">{pin.label}</span>
					</div>
				</XhtmlDiv>
			</foreignObject>
		</g>
	);
}

function PoiDot({
	pin,
	index,
	drawn,
}: {
	pin: PoiPinData;
	index: number;
	drawn: boolean;
}) {
	return (
		<g transform={`translate(${pin.mapX}, ${pin.mapY})`}>
			<g
				className={`map-pin ${drawn ? "map-pin-visible" : ""}`}
				style={{ animationDelay: `${1.2 + index * 0.06}s` }}
			>
				<circle r="5.5" fill="#009246" filter="url(#pin-shadow)" />
				<circle r="8.5" fill="none" stroke="white" strokeWidth="1.5" />
			</g>
		</g>
	);
}

function ApartmentMarker({
	mapX,
	mapY,
	label,
	drawn,
}: {
	mapX: number;
	mapY: number;
	label: string;
	drawn: boolean;
}) {
	return (
		<g
			transform={`translate(${mapX}, ${mapY - PRIMARY_PIN_TIP_Y})`}
			aria-label={label}
		>
			<g
				className={`map-pin ${drawn ? "map-pin-visible" : ""}`}
				style={{ animationDelay: "1.6s" }}
			>
				<circle r="12" fill="#CE2B37" opacity="0.12" className="map-pin-pulse" />
				<path
					d="M0,-10.5 C-5.25,-10.5 -9.4,-6 -9.4,0 C-9.4,7.05 0,17 0,17 C0,17 9.4,7.05 9.4,0 C9.4,-6 5.25,-10.5 0,-10.5 Z"
					fill="#CE2B37"
					filter="url(#pin-shadow)"
				/>
				<circle r="3.5" cy="-1" fill="white" />
			</g>
		</g>
	);
}

export function HeroMap({ locale, activePois = [] }: HeroMapProps) {
	const [drawn, setDrawn] = useState(false);
	const strings = t(locale);
	const poiPins = useMemo(
		() => toMapPoiPins(activePois, locale),
		[activePois, locale],
	);
	const poiLayouts = useMemo(
		() =>
			poiPins.map((pin, i) => ({
				pin,
				index: i,
				...poiPlacement(pin, i, apartmentPin.mapX, apartmentPin.mapY),
			})),
		[poiPins],
	);

	useEffect(() => {
		const timer = setTimeout(() => setDrawn(true), 80);
		return () => clearTimeout(timer);
	}, []);

	const fadeClass = (delay = "") =>
		`map-fade ${delay} ${drawn ? "map-faded" : ""}`;

	return (
		<div className="absolute inset-0 w-full isolate" aria-hidden>
			<div
				className="absolute inset-0 z-0 bg-gradient-to-br from-[#EEEBE6] via-[#E8E4DE] to-[#C5DFF0]"
				aria-hidden
			/>

			<svg
				viewBox={`${MAP_VIEW_OFFSET} 0 ${MAP_VIEW.width} ${MAP_VIEW.height}`}
				preserveAspectRatio="xMidYMid slice"
				className="absolute inset-0 z-[1] w-full h-full"
			>
				<defs>
					<linearGradient id="sea-grad" x1="0" y1="0" x2="0" y2="1">
						<stop offset="0%" stopColor="#C5DFF0" />
						<stop offset="100%" stopColor="#9EC5DE" />
					</linearGradient>
					<linearGradient id="land-grad" x1="0" y1="0" x2="0" y2="1">
						<stop offset="0%" stopColor="#F3EFE8" />
						<stop offset="100%" stopColor="#E8E2D8" />
					</linearGradient>
					<linearGradient id="neighbor-grad" x1="0" y1="0" x2="0" y2="1">
						<stop offset="0%" stopColor="#EEEBE6" />
						<stop offset="100%" stopColor="#E4E0D9" />
					</linearGradient>
					<linearGradient id="lake-fill" x1="0" y1="0" x2="0.2" y2="1">
						<stop offset="0%" stopColor="#A8CFE8" />
						<stop offset="60%" stopColor="#7EB3D4" />
						<stop offset="100%" stopColor="#6BA3C4" />
					</linearGradient>
					<linearGradient id="lombardia-fill" x1="0" y1="0" x2="1" y2="1">
						<stop offset="0%" stopColor="rgba(0,146,70,0.10)" />
						<stop offset="100%" stopColor="rgba(0,146,70,0.05)" />
					</linearGradient>
					<filter id="pin-shadow">
						<feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3" />
					</filter>
				</defs>

				<rect
					x={MAP_VIEW_OFFSET}
					y={0}
					width={MAP_VIEW.width}
					height={MAP_VIEW.height}
					fill="url(#sea-grad)"
				/>

				<g className={fadeClass()} opacity="0.62">
					{neighborLandPaths.map((d, i) => (
						<path
							key={`neighbor-${i}`}
							d={d}
							fill="url(#neighbor-grad)"
							stroke="none"
						/>
					))}
				</g>

				{italyLandPaths.map((d, i) => (
					<path
						key={`land-${i}`}
						d={d}
						fill="url(#land-grad)"
						stroke="none"
						className={fadeClass("map-fade-delay")}
					/>
				))}

				{italyLandBorderPaths.map((d, i) => (
					<path
						key={`land-border-${i}`}
						d={d}
						fill="none"
						stroke="#A19282"
						strokeWidth="1.8"
						strokeLinecap="round"
						strokeLinejoin="round"
						className={fadeClass("map-fade-delay")}
					/>
				))}

				{italyCoastBorderPaths.map((d, i) => (
					<path
						key={`coast-border-${i}`}
						d={d}
						fill="none"
						stroke="#7A9DB5"
						strokeWidth="1.15"
						strokeLinecap="round"
						strokeLinejoin="round"
						opacity="0.85"
						className={fadeClass("map-fade-delay")}
					/>
				))}

				{mapRegions.map((region) => {
					const isLombardia = region.id === "lombardia";
					return region.paths.map((d, i) => (
						<path
							key={`${region.id}-${i}`}
							d={d}
							fill={isLombardia ? "url(#lombardia-fill)" : "none"}
							stroke={isLombardia ? "rgba(0,146,70,0.35)" : "rgba(155,148,138,0.3)"}
							strokeWidth={isLombardia ? 1.2 : 0.55}
							strokeDasharray={isLombardia ? undefined : "3 6"}
							strokeLinejoin="round"
							className={fadeClass("map-fade-delay")}
							opacity={isLombardia ? 1 : 0.5}
						/>
					));
				})}

				{mapLakes.map((lake) =>
					lake.paths.map((d, i) => (
						<g key={`${lake.id}-${i}`}>
							<path
								d={d}
								fill="url(#lake-fill)"
								stroke="#5A9AB8"
								strokeWidth="1.2"
								className={fadeClass("map-fade-delay-2")}
								opacity="0.92"
							/>
							<path
								d={d}
								fill="none"
								stroke="rgba(255,255,255,0.35)"
								strokeWidth="0.6"
								className={fadeClass("map-fade-delay-2")}
							/>
						</g>
					)),
				)}

				{/* POI markers — connectors, dots, then cards on top */}
				<g className="map-poi-layer">
					<g className="map-poi-connectors">
						{poiLayouts.map(({ pin, index, anchorX, anchorY }) => (
							<PoiConnector
								key={`${pin.id}-connector`}
								pin={pin}
								index={index}
								anchorX={anchorX}
								anchorY={anchorY}
								drawn={drawn}
							/>
						))}
					</g>
					<g className="map-poi-dots">
						{poiLayouts.map(({ pin, index }) => (
							<PoiDot
								key={`${pin.id}-dot`}
								pin={pin}
								index={index}
								drawn={drawn}
							/>
						))}
					</g>
					<g className="map-poi-cards">
						{poiLayouts.map(({ pin, index, cardX, cardY }) => (
							<PoiCard
								key={`${pin.id}-card`}
								pin={pin}
								index={index}
								cardX={cardX}
								cardY={cardY}
								drawn={drawn}
							/>
						))}
					</g>
				</g>

				{/* Apartment — top layer */}
				<g className="map-apartment-layer">
					<ApartmentMarker
						mapX={apartmentPin.mapX}
						mapY={apartmentPin.mapY}
						label={strings.hero.pinLabel}
						drawn={drawn}
					/>
				</g>
			</svg>

			<div className="absolute inset-0 z-[2] bg-gradient-to-t from-[#E4E0D9]/40 via-transparent to-transparent pointer-events-none" />
		</div>
	);
}
