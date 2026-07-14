import {
	AirVent,
	Ban,
	Bike,
	Bus,
	Car,
	ChefHat,
	HandHelping,
	Leaf,
	ShieldCheck,
	Sparkles,
	Sofa,
	Sun,
	UtensilsCrossed,
	WashingMachine,
	Wifi,
	type LucideIcon,
} from "lucide-react";

type AmenityGroupKey = "essentials" | "comfort" | "services" | "activities";

type AmenityItemKey =
	| "wifi"
	| "parking"
	| "ac"
	| "kitchen"
	| "washer"
	| "balcony"
	| "nonSmoking"
	| "allergyFree"
	| "shuttle"
	| "bikes"
	| "restaurant"
	| "cycling";

export interface AmenitiesStrings {
	eyebrow: string;
	title: string;
	subtitle: string;
	groups: Record<AmenityGroupKey, string>;
	items: Record<AmenityItemKey, string>;
}

interface AmenitiesSectionProps {
	strings: AmenitiesStrings;
}

const GROUP_ORDER: {
	key: AmenityGroupKey;
	items: AmenityItemKey[];
	icon: LucideIcon;
}[] = [
	{
		key: "essentials",
		items: ["wifi", "parking", "ac", "kitchen", "washer"],
		icon: Sparkles,
	},
	{
		key: "comfort",
		items: ["balcony", "nonSmoking", "allergyFree"],
		icon: Sofa,
	},
	{
		key: "services",
		items: ["shuttle", "bikes", "restaurant"],
		icon: HandHelping,
	},
	{
		key: "activities",
		items: ["cycling"],
		icon: Leaf,
	},
];

const ITEM_ICONS: Record<AmenityItemKey, LucideIcon> = {
	wifi: Wifi,
	parking: Car,
	ac: AirVent,
	kitchen: ChefHat,
	washer: WashingMachine,
	balcony: Sun,
	nonSmoking: Ban,
	allergyFree: ShieldCheck,
	shuttle: Bus,
	bikes: Bike,
	restaurant: UtensilsCrossed,
	cycling: Leaf,
};

export function AmenitiesSection({ strings }: AmenitiesSectionProps) {
	return (
		<div className="amenities-section">
			<div className="amenities-section-header text-center max-w-2xl mx-auto mb-12 sm:mb-14">
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

			<div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
				{GROUP_ORDER.map((group, groupIndex) => {
					const GroupIcon = group.icon;

					return (
						<div
							key={group.key}
							className="amenities-group-card rounded-2xl border border-border/80 bg-card p-5 sm:p-6 shadow-sm"
							style={{ animationDelay: `${groupIndex * 0.08}s` }}
						>
							<div className="flex items-center gap-3 mb-5 pb-4 border-b border-border/70">
								<span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
									<GroupIcon className="size-5" strokeWidth={2} aria-hidden />
								</span>
								<h3 className="font-semibold text-foreground leading-tight">
									{strings.groups[group.key]}
								</h3>
							</div>

							<ul className="space-y-3">
								{group.items.map((itemKey) => {
									const ItemIcon = ITEM_ICONS[itemKey];

									return (
										<li
											key={itemKey}
											className="flex items-center gap-3 text-sm text-muted-foreground"
										>
											<span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-secondary text-foreground/70">
												<ItemIcon
													className="size-3.5"
													strokeWidth={2}
													aria-hidden
												/>
											</span>
											<span className="leading-snug">
												{strings.items[itemKey]}
											</span>
										</li>
									);
								})}
							</ul>
						</div>
					);
				})}
			</div>
		</div>
	);
}
