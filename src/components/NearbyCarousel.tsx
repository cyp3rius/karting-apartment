import { useState, type CSSProperties } from "react";
import { Flag, Landmark, MapPin, Plane, type LucideIcon } from "lucide-react";
import type { Locale } from "@/i18n/config";
import {
	type PoiCategory,
	poisByCategory,
	type NearbyPoi,
} from "@/data/nearby";
import { cn } from "@/lib/utils";
import type { ExploreStrings } from "./ExploreSection";

interface NearbyCarouselProps {
	locale: Locale;
	strings: ExploreStrings;
	onCategoryChange?: (pois: NearbyPoi[]) => void;
}

const categories: PoiCategory[] = ["airports", "attractions", "racing"];

const categoryIcons: Record<PoiCategory, LucideIcon> = {
	airports: Plane,
	attractions: Landmark,
	racing: Flag,
};

export function NearbyCarousel({
	locale,
	strings,
	onCategoryChange,
}: NearbyCarouselProps) {
	const [active, setActive] = useState<PoiCategory>("attractions");
	const [animKey, setAnimKey] = useState(0);
	const pois = poisByCategory(active);
	const activeIndex = categories.indexOf(active);

	function switchCategory(cat: PoiCategory) {
		if (cat === active) return;
		setActive(cat);
		setAnimKey((k) => k + 1);
		onCategoryChange?.(poisByCategory(cat));
	}

	return (
		<div className="explore-carousel">
			<div className="flex justify-center mb-8 sm:mb-10">
				<div
					className="hero-carousel-dock explore-carousel-dock"
					style={
						{
							"--active-idx": activeIndex,
							"--count": categories.length,
						} as CSSProperties
					}
				>
					<div className="hero-carousel-glide" aria-hidden />
					<div className="hero-carousel-segments" role="group">
						{categories.map((cat) => {
							const isActive = active === cat;
							const Icon = categoryIcons[cat];

							return (
								<button
									key={cat}
									type="button"
									onClick={() => switchCategory(cat)}
									aria-pressed={isActive}
									className={cn(
										"hero-carousel-segment explore-carousel-segment",
										isActive && "hero-carousel-segment-active",
									)}
								>
									<span className="hero-carousel-icon">
										<Icon className="size-4" strokeWidth={1.75} aria-hidden />
									</span>
									<span className="hero-carousel-label explore-carousel-label">
										{strings.categories[cat]}
									</span>
								</button>
							);
						})}
					</div>
				</div>
			</div>

			<div
				key={animKey}
				className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 explore-poi-grid"
			>
				{pois.map((poi, i) => (
					<article
						key={poi.id}
						className="explore-poi-card group relative overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm"
						style={{ animationDelay: `${i * 0.05}s` }}
					>
						<div className="relative aspect-[4/3] overflow-hidden">
							<img
								src={poi.image}
								alt={poi.name[locale]}
								className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
								loading="lazy"
								decoding="async"
							/>
							<div
								className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/5"
								aria-hidden
							/>

							{poi.iataCode ? (
								<div className="absolute top-3 left-3 poi-iata-badge poi-iata-badge-overlay">
									{poi.iataCode}
								</div>
							) : null}

							<div className="absolute inset-x-0 bottom-0 p-4">
								<h3 className="font-semibold text-base leading-snug text-white">
									{poi.name[locale]}
								</h3>
								<p className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-medium text-white/90">
									<MapPin className="size-3.5 shrink-0" strokeWidth={2} aria-hidden />
									<span>
										{poi.distanceKm} {strings.km}
									</span>
								</p>
							</div>
						</div>
					</article>
				))}
			</div>
		</div>
	);
}
