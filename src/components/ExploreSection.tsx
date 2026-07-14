import type { Locale } from "@/i18n/config";
import type { PoiCategory } from "@/data/nearby";
import { NearbyCarousel } from "./NearbyCarousel";

export interface ExploreStrings {
	eyebrow: string;
	title: string;
	subtitle: string;
	km: string;
	categories: Record<PoiCategory, string>;
}

interface ExploreSectionProps {
	locale: Locale;
	strings: ExploreStrings;
}

export function ExploreSection({ locale, strings }: ExploreSectionProps) {
	return (
		<div className="explore-section">
			<div className="explore-section-header text-center max-w-2xl mx-auto mb-10 sm:mb-12">
				<p className="text-sm font-semibold text-primary uppercase tracking-[0.2em] mb-5">
					{strings.eyebrow}
				</p>
				<h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
					{strings.title}
				</h2>
				<p className="text-muted-foreground text-lg leading-relaxed">
					{strings.subtitle}
				</p>
			</div>

			<NearbyCarousel locale={locale} strings={strings} />
		</div>
	);
}
