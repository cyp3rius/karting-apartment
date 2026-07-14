import { Quote, Star } from "lucide-react";

interface ReviewItem {
	text: string;
	author: string;
}

export interface ReviewsStrings {
	eyebrow: string;
	title: string;
	score: string;
	label: string;
	count: string;
	items: readonly ReviewItem[];
}

interface ReviewsSectionProps {
	strings: ReviewsStrings;
}

const SCORE_VALUE = 9.7;
const MAX_SCORE = 10;

function StarRating({ score }: { score: number }) {
	const stars = Array.from({ length: 5 }, (_, index) => {
		const threshold = ((index + 1) / 5) * MAX_SCORE;
		const filled = score >= threshold - 0.5;

		return (
			<Star
				key={index}
				className={`size-4 ${filled ? "fill-accent text-accent" : "text-border"}`}
				strokeWidth={1.75}
				aria-hidden
			/>
		);
	});

	return <div className="flex items-center gap-1">{stars}</div>;
}

export function ReviewsSection({ strings }: ReviewsSectionProps) {
	const scorePercent = (SCORE_VALUE / MAX_SCORE) * 100;

	return (
		<div className="reviews-section">
			<div className="reviews-section-header text-center max-w-2xl mx-auto mb-10 sm:mb-12">
				<p className="text-sm font-semibold text-primary uppercase tracking-[0.2em] mb-5">
					{strings.eyebrow}
				</p>
				<h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
					{strings.title}
				</h2>
			</div>

			<div className="reviews-score-panel mx-auto mb-8 sm:mb-10 max-w-3xl rounded-2xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
				<div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8">
					<div className="flex items-end gap-2 shrink-0">
						<span className="text-5xl sm:text-6xl font-bold leading-none text-accent tabular-nums">
							{strings.score}
						</span>
						<span className="pb-1.5 text-lg font-medium text-muted-foreground">
							/ {MAX_SCORE}
						</span>
					</div>

					<div className="hidden sm:block w-px self-stretch bg-border/80" aria-hidden />

					<div className="flex-1 min-w-0">
						<p className="text-xl font-semibold text-foreground mb-2">
							{strings.label}
						</p>
						<StarRating score={SCORE_VALUE} />
						<p className="mt-3 text-sm text-muted-foreground">{strings.count}</p>
						<div
							className="reviews-score-bar mt-4 h-1.5 w-full overflow-hidden rounded-full bg-secondary"
							role="presentation"
						>
							<div
								className="h-full rounded-full bg-accent transition-all duration-700"
								style={{ width: `${scorePercent}%` }}
							/>
						</div>
					</div>
				</div>
			</div>

			<div className="grid md:grid-cols-3 gap-4 sm:gap-5">
				{strings.items.map((review, index) => (
					<blockquote
						key={review.author}
						className="reviews-card relative rounded-2xl border border-border/80 bg-card p-6 shadow-sm"
						style={{ animationDelay: `${index * 0.08}s` }}
					>
						<span
							className="mb-4 flex size-9 items-center justify-center rounded-xl bg-accent/10 text-accent"
							aria-hidden
						>
							<Quote className="size-4" strokeWidth={2} />
						</span>
						<p className="text-foreground mb-5 leading-relaxed">
							&ldquo;{review.text}&rdquo;
						</p>
						<footer className="text-sm font-medium text-muted-foreground">
							— {review.author}
						</footer>
					</blockquote>
				))}
			</div>
		</div>
	);
}
