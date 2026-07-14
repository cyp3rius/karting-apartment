import type { Locale } from "@/i18n/config";
import type { NearbyPoi } from "@/data/nearby";
import type { RegionAttractionType } from "@/data/region-attractions";
import { HeroTitleSlider } from "./HeroTitleSlider";
import { HeroAttractionCarousel } from "./HeroAttractionCarousel";
import { HeroMap } from "./HeroMap";

interface HeroSectionProps {
	locale: Locale;
	eyebrow: string;
	titles: readonly string[];
	subtitle: string;
	ctaPrimary: string;
	ctaSecondary: string;
	activePois: NearbyPoi[];
	activeAttractionType: RegionAttractionType;
	onAttractionTypeChange: (type: RegionAttractionType) => void;
}

export function HeroSection({
	locale,
	eyebrow,
	titles,
	subtitle,
	ctaPrimary,
	ctaSecondary,
	activePois,
	activeAttractionType,
	onAttractionTypeChange,
}: HeroSectionProps) {
	return (
		<section className="relative w-full hero-map-height overflow-hidden bg-[#EEEBE6]">
			<HeroMap locale={locale} activePois={activePois} />

			<div
				className="hero-content-readability absolute inset-y-0 inset-x-0 z-[6] pointer-events-none"
				aria-hidden
			/>

			<div className="absolute bottom-0 left-0 right-0 z-20 flex justify-center pb-5 sm:pb-7 pointer-events-none">
				<div className="pointer-events-auto px-4">
					<HeroAttractionCarousel
						locale={locale}
						active={activeAttractionType}
						onChange={onAttractionTypeChange}
					/>
				</div>
			</div>

			<div className="relative z-10 flex hero-map-height items-center pointer-events-none">
				<div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 pb-20 sm:pb-24 pointer-events-auto">
					<div className="max-w-xl lg:max-w-2xl">
						<p className="text-sm font-semibold text-primary uppercase tracking-[0.2em] mb-5">
							{eyebrow}
						</p>
						<h1
							className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 leading-[1.15]"
							aria-live="polite"
						>
							<HeroTitleSlider titles={titles} />
						</h1>
						<p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-lg leading-relaxed">
							{subtitle}
						</p>
						<div className="flex flex-wrap gap-4">
							<a
								href="#contact"
								className="inline-flex items-center px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity shadow-sm"
							>
								{ctaPrimary}
							</a>
							<a
								href="#nearby"
								className="inline-flex items-center px-7 py-3.5 rounded-full border border-border/80 bg-white/70 backdrop-blur text-foreground font-semibold text-sm hover:bg-white transition-colors shadow-sm"
							>
								{ctaSecondary}
							</a>
						</div>
					</div>
				</div>
			</div>

		</section>
	);
}
