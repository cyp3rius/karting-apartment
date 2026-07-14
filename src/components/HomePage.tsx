import { useState } from "react";
import type { Locale } from "@/i18n/config";
import type { NearbyPoi } from "@/data/nearby";
import {
	defaultRegionAttractionType,
	poisForAttractionType,
	type RegionAttractionType,
} from "@/data/region-attractions";
import { HeroSection } from "./HeroSection";

interface HomePageProps {
	locale: Locale;
	hero: {
		eyebrow: string;
		titles: readonly string[];
		subtitle: string;
		ctaPrimary: string;
		ctaSecondary: string;
	};
}

export function HomePage({ locale, hero }: HomePageProps) {
	const [activeAttractionType, setActiveAttractionType] =
		useState<RegionAttractionType>(defaultRegionAttractionType);
	const [activePois, setActivePois] = useState<NearbyPoi[]>(
		poisForAttractionType(defaultRegionAttractionType),
	);

	function handleAttractionTypeChange(type: RegionAttractionType) {
		setActiveAttractionType(type);
		setActivePois(poisForAttractionType(type));
	}

	return (
		<>
			<HeroSection
				locale={locale}
				activePois={activePois}
				activeAttractionType={activeAttractionType}
				onAttractionTypeChange={handleAttractionTypeChange}
				{...hero}
			/>
		</>
	);
}
