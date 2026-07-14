import { useEffect, useState, type CSSProperties } from "react";
import {
	Building2,
	Flag,
	Plane,
	Waves,
	Wine,
	type LucideIcon,
} from "lucide-react";
import type { Locale } from "@/i18n/config";
import { t } from "@/i18n/translations";
import {
	type RegionAttractionType,
	regionAttractionTypes,
} from "@/data/region-attractions";
import { cn } from "@/lib/utils";

const AUTO_MS = 10000;
const iconClass = "size-3.5 shrink-0";

const icons: Record<RegionAttractionType, LucideIcon> = {
	motorsport: Flag,
	airports: Plane,
	cities: Building2,
	lakes: Waves,
	wine: Wine,
};

interface HeroAttractionCarouselProps {
	locale: Locale;
	active: RegionAttractionType;
	onChange: (type: RegionAttractionType) => void;
}

export function HeroAttractionCarousel({
	locale,
	active,
	onChange,
}: HeroAttractionCarouselProps) {
	const strings = t(locale).hero.attractionTypes;
	const [autoPlay, setAutoPlay] = useState(true);

	const activeIndex = regionAttractionTypes.findIndex((t) => t.id === active);
	const count = regionAttractionTypes.length;

	useEffect(() => {
		if (!autoPlay) return;
		const id = window.setInterval(() => {
			const idx = regionAttractionTypes.findIndex((t) => t.id === active);
			const next = regionAttractionTypes[(idx + 1) % count];
			onChange(next.id);
		}, AUTO_MS);
		return () => window.clearInterval(id);
	}, [autoPlay, active, onChange, count]);

	function select(id: RegionAttractionType) {
		if (id !== active) onChange(id);
		setAutoPlay(false);
	}

	return (
		<div
			className="hero-attraction-carousel"
			role="region"
			aria-roledescription="carousel"
		>
			<div
				className="hero-carousel-dock"
				style={{ "--active-idx": activeIndex, "--count": count } as CSSProperties}
			>
				<div className="hero-carousel-glide" aria-hidden />

				<div className="hero-carousel-segments" role="group">
					{regionAttractionTypes.map((type) => {
						const isActive = active === type.id;
						const Icon = icons[type.id];
						return (
							<button
								key={type.id}
								type="button"
								onClick={() => select(type.id)}
								aria-pressed={isActive}
								className={cn(
									"hero-carousel-segment",
									isActive && "hero-carousel-segment-active",
								)}
							>
								<span className="hero-carousel-icon">
									<Icon className={iconClass} strokeWidth={1.5} aria-hidden />
								</span>
								<span className="hero-carousel-label">{strings[type.id]}</span>
							</button>
						);
					})}
				</div>
			</div>
		</div>
	);
}
