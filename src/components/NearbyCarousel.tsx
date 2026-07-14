import { useState } from "react";
import type { Locale } from "@/i18n/config";
import { t } from "@/i18n/translations";
import {
	type PoiCategory,
	poisByCategory,
	type NearbyPoi,
} from "@/data/nearby";
import { cn } from "@/lib/utils";

interface NearbyCarouselProps {
	locale: Locale;
	onCategoryChange?: (pois: NearbyPoi[]) => void;
}

const categories: PoiCategory[] = ["airports", "attractions", "racing"];

export function NearbyCarousel({ locale, onCategoryChange }: NearbyCarouselProps) {
	const strings = t(locale);
	const [active, setActive] = useState<PoiCategory>("attractions");
	const [animKey, setAnimKey] = useState(0);
	const pois = poisByCategory(active);

	function switchCategory(cat: PoiCategory) {
		if (cat === active) return;
		setActive(cat);
		setAnimKey((k) => k + 1);
		onCategoryChange?.(poisByCategory(cat));
	}

	return (
		<div>
			{/* Category tabs */}
			<div className="flex flex-wrap gap-2 mb-8 relative">
				{categories.map((cat) => (
					<button
						key={cat}
						type="button"
						onClick={() => switchCategory(cat)}
						className={cn(
							"relative px-5 py-2.5 rounded-full text-sm font-medium transition-colors",
							active === cat
								? "bg-primary text-primary-foreground shadow-sm"
								: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
						)}
					>
						{strings.nearby.categories[cat]}
					</button>
				))}
			</div>

			{/* Cards grid */}
			<div
				key={animKey}
				className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 poi-grid-enter"
			>
				{pois.map((poi, i) => (
					<article
						key={poi.id}
						className="group relative rounded-2xl overflow-hidden bg-card border border-border shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
						style={{ animationDelay: `${i * 60}ms` }}
					>
						<div className="aspect-[4/3] overflow-hidden">
							<img
								src={poi.image}
								alt={poi.name[locale]}
								className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
								loading="lazy"
							/>
						</div>
						<div className="p-4">
							<div className="flex items-start justify-between gap-2">
								<h3 className="font-semibold text-sm leading-snug min-w-0">
									{poi.name[locale]}
								</h3>
								<span className="shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent/10 text-accent text-xs font-bold">
									<svg
										className="size-3"
										viewBox="0 0 24 24"
										fill="currentColor"
										aria-hidden
									>
										<path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
									</svg>
									{poi.distanceKm} {strings.nearby.km}
								</span>
							</div>
						</div>
						{/* Pin badge */}
						{poi.iataCode ? (
							<div className="absolute top-3 left-3 poi-iata-badge poi-iata-badge-overlay">
								{poi.iataCode}
							</div>
						) : (
							<div className="absolute top-3 left-3 size-8 rounded-full bg-white/90 shadow flex items-center justify-center">
								<span className="size-3 rounded-full bg-accent block" />
							</div>
						)}
					</article>
				))}
			</div>
		</div>
	);
}
