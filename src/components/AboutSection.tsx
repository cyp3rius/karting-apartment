import {
	Bed,
	Maximize2,
	Sofa,
	Star,
	Users,
	type LucideIcon,
} from "lucide-react";
import { gallerySrc } from "@/data/apartment";

type AboutStatKey = "size" | "bedroom" | "livingRoom" | "guests" | "rating";

interface AboutStat {
	value: string;
	label: string;
}

export interface AboutStrings {
	eyebrow: string;
	title: string;
	p1: string;
	p2: string;
	photoBedroom: string;
	photoLiving: string;
	stats: Record<AboutStatKey, AboutStat>;
}

interface AboutSectionProps {
	strings: AboutStrings;
}

const STAT_ORDER: AboutStatKey[] = [
	"size",
	"bedroom",
	"livingRoom",
	"guests",
	"rating",
];

const STAT_ICONS: Record<AboutStatKey, LucideIcon> = {
	size: Maximize2,
	bedroom: Bed,
	livingRoom: Sofa,
	guests: Users,
	rating: Star,
};

const BEDROOM_IMAGE = gallerySrc("793706211");
const LIVING_IMAGE = gallerySrc("793706167");

export function AboutSection({ strings }: AboutSectionProps) {
	return (
		<section
			id="about"
			className="page-section page-section--white page-section--hero-divider about-section"
		>
			<div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
					<div className="lg:col-span-5 about-section-copy">
						<p className="text-sm font-semibold text-primary uppercase tracking-[0.2em] mb-5">
							{strings.eyebrow}
						</p>
						<h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight leading-[1.08] mb-6">
							{strings.title}
						</h2>
						<p className="text-muted-foreground text-lg mb-4 leading-relaxed">
							{strings.p1}
						</p>
						<p className="text-muted-foreground text-lg leading-relaxed">
							{strings.p2}
						</p>
					</div>

					<div className="lg:col-span-7 about-section-visual">
						<div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
							<figure className="about-photo-card group relative overflow-hidden rounded-2xl border border-border/80 shadow-md aspect-[4/5]">
								<img
									src={BEDROOM_IMAGE}
									alt={strings.photoBedroom}
									className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
									loading="lazy"
									decoding="async"
								/>
								<figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/35 to-transparent px-4 pb-4 pt-12">
									<span className="inline-flex items-center gap-2 text-sm font-semibold text-white">
										<Bed className="size-4 opacity-90" aria-hidden />
										{strings.photoBedroom}
									</span>
								</figcaption>
							</figure>

							<figure className="about-photo-card group relative overflow-hidden rounded-2xl border border-border/80 shadow-md aspect-[4/5] sm:mt-8">
								<img
									src={LIVING_IMAGE}
									alt={strings.photoLiving}
									className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
									loading="lazy"
									decoding="async"
								/>
								<figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/35 to-transparent px-4 pb-4 pt-12">
									<span className="inline-flex items-center gap-2 text-sm font-semibold text-white">
										<Sofa className="size-4 opacity-90" aria-hidden />
										{strings.photoLiving}
									</span>
								</figcaption>
							</figure>
						</div>
					</div>
				</div>

				<div className="about-section-stats mt-10 lg:mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
					{STAT_ORDER.map((key) => {
						const stat = strings.stats[key];
						const Icon = STAT_ICONS[key];
						const isRating = key === "rating";

						return (
							<div
								key={key}
								className={`about-stat-card group rounded-2xl border bg-card p-4 sm:p-5 shadow-sm transition-shadow hover:shadow-sm ${
									isRating
										? "border-accent/25 about-stat-card-rating"
										: "border-border/80"
								}`}
							>
								<div className="flex items-start justify-between gap-3 mb-3">
									<span
										className={`flex size-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
											isRating
												? "bg-accent/10 text-accent group-hover:bg-accent/15"
												: "bg-primary/10 text-primary group-hover:bg-primary/15"
										}`}
									>
										<Icon className="size-[1.125rem]" strokeWidth={2} aria-hidden />
									</span>
									<p
										className={`text-2xl font-bold leading-none tabular-nums ${
											isRating ? "text-accent" : "text-foreground"
										}`}
									>
										{stat.value}
									</p>
								</div>
								<p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground leading-snug">
									{stat.label}
								</p>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
