import { useEffect, useCallback, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { NearbyPoi } from "@/data/nearby";
import {
	regionAttractionTypes,
	type RegionAttractionType,
} from "@/data/region-attractions";
import { useHeroCarouselSwipe } from "@/lib/useHeroCarouselSwipe";
import { HeroTitleSlider } from "./HeroTitleSlider";
import { HeroAttractionCarousel } from "./HeroAttractionCarousel";
import { HeroMap } from "./HeroMap";

import { cn } from "@/lib/utils";

interface HeroSectionProps {
	locale: Locale;
	eyebrow: string;
	titles: readonly string[];
	subtitle: string;
	ctaPrimary: string;
	ctaPrimaryShort: string;
	ctaSecondary: string;
	activePois: NearbyPoi[];
	activeAttractionType: RegionAttractionType;
	onAttractionTypeChange: (type: RegionAttractionType) => void;
	subtitleHidden?: boolean;
	carouselAutoPlay?: boolean;
	onCarouselManualSelect?: () => void;
}

export function HeroSection({
	locale,
	eyebrow,
	titles,
	subtitle,
	ctaPrimary,
	ctaPrimaryShort,
	ctaSecondary,
	activePois,
	activeAttractionType,
	onAttractionTypeChange,
	subtitleHidden = false,
	carouselAutoPlay = true,
	onCarouselManualSelect,
}: HeroSectionProps) {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const mq = window.matchMedia("(max-width: 639px)");
		const apply = () => setIsMobile(mq.matches);
		apply();
		mq.addEventListener("change", apply);
		return () => mq.removeEventListener("change", apply);
	}, []);

	const hideSubtitle = subtitleHidden && isMobile;

	const navigateCarousel = useCallback(
		(direction: 1 | -1) => {
			const count = regionAttractionTypes.length;
			const idx = regionAttractionTypes.findIndex(
				(type) => type.id === activeAttractionType,
			);
			const next = regionAttractionTypes[(idx + direction + count) % count]!;
			if (next.id !== activeAttractionType) onAttractionTypeChange(next.id);
			onCarouselManualSelect?.();
		},
		[
			activeAttractionType,
			onAttractionTypeChange,
			onCarouselManualSelect,
		],
	);

	const swipeHandlers = useHeroCarouselSwipe(
		() => navigateCarousel(1),
		() => navigateCarousel(-1),
	);

	return (
		<section
			className="relative w-full hero-map-height overflow-hidden bg-[#EEEBE6] touch-pan-y"
			{...swipeHandlers}
		>
			<HeroMap locale={locale} activePois={activePois} />

			<div
				className={cn(
					"hero-content-readability absolute inset-y-0 inset-x-0 z-[6] pointer-events-none",
					hideSubtitle && "hero-content-readability--subtitle-hidden",
				)}
				aria-hidden
			/>

			<div className="absolute bottom-0 left-0 right-0 z-20 flex justify-center pb-3 sm:pb-7 pointer-events-none">
				<div className="pointer-events-auto px-4">
					<HeroAttractionCarousel
						locale={locale}
						active={activeAttractionType}
						onChange={onAttractionTypeChange}
						onManualSelect={onCarouselManualSelect}
						autoPlay={carouselAutoPlay}
					/>
				</div>
			</div>

			<div className="relative z-10 flex hero-map-height pointer-events-none items-stretch sm:items-center">
				<div className="hero-copy-shell w-full max-w-screen-xl mx-auto flex flex-1 flex-col px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12 lg:pt-16 pb-[4.5rem] sm:pb-24 pointer-events-auto sm:block sm:flex-initial sm:justify-center">
					<div className="hero-copy-inner flex max-w-xl flex-1 flex-col justify-between sm:block lg:max-w-2xl">
						<div className="hero-copy-top">
							<p className="text-sm font-semibold text-primary uppercase tracking-[0.2em] mb-4 sm:mb-5">
								{eyebrow}
							</p>
							<h1
								className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.15] sm:mb-6"
								aria-live="polite"
							>
								<HeroTitleSlider titles={titles} />
							</h1>
						</div>

						<div className="hero-copy-bottom mt-6 sm:mt-0">
							<p
								className={cn(
									"hero-subtitle text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-10 max-w-lg leading-relaxed",
									hideSubtitle && "hero-subtitle--hidden",
								)}
								aria-hidden={hideSubtitle}
							>
								{subtitle}
							</p>
							<div className="hero-cta-row grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:gap-4 sm:w-auto">
								<a
									href="#contact"
									className="inline-flex min-w-0 items-center justify-center rounded-full bg-primary px-3 py-3.5 text-center text-xs font-semibold text-primary-foreground shadow-sm transition-opacity hover:opacity-90 sm:px-7 sm:text-sm"
								>
									<span className="sm:hidden">{ctaPrimaryShort}</span>
									<span className="hidden sm:inline">{ctaPrimary}</span>
								</a>
								<a
									href="#nearby"
									className="inline-flex min-w-0 items-center justify-center rounded-full border border-border/80 bg-white/70 px-3 py-3.5 text-center text-xs font-semibold text-foreground shadow-sm backdrop-blur transition-colors hover:bg-white sm:px-7 sm:text-sm"
								>
									{ctaSecondary}
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
