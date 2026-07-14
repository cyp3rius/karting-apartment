import { useEffect, useRef, useState } from "react";

const INTERVAL_MS = 4500;

function TitleText({ text }: { text: string }) {
	const lines = text.split("\n");
	if (lines.length === 1) return <>{text}</>;

	return (
		<>
			{lines.map((line, i) => (
				<span key={i} className="block">
					{line}
				</span>
			))}
		</>
	);
}

interface HeroTitleSliderProps {
	titles: readonly string[];
}

export function HeroTitleSlider({ titles }: HeroTitleSliderProps) {
	const [index, setIndex] = useState(0);
	const prevIndexRef = useRef(0);
	const [reduceMotion, setReduceMotion] = useState(false);

	useEffect(() => {
		setReduceMotion(
			window.matchMedia("(prefers-reduced-motion: reduce)").matches,
		);
	}, []);

	useEffect(() => {
		if (reduceMotion || titles.length <= 1) return;

		const id = window.setInterval(() => {
			setIndex((current) => {
				prevIndexRef.current = current;
				return (current + 1) % titles.length;
			});
		}, INTERVAL_MS);

		return () => window.clearInterval(id);
	}, [reduceMotion, titles.length]);

	if (reduceMotion || titles.length <= 1) {
		return (
			<span className="block">
				<TitleText text={titles[0]} />
			</span>
		);
	}

	const prevIndex = prevIndexRef.current;

	return (
		<span className="hero-title-slider block overflow-hidden">
			{titles.map((title, i) => {
				let state: "active" | "exit" | "waiting" = "waiting";
				if (i === index) state = "active";
				else if (i === prevIndex) state = "exit";

				return (
					<span
						key={title}
						className={`hero-title-slide hero-title-slide-${state}`}
						aria-hidden={i !== index}
					>
						<TitleText text={title} />
					</span>
				);
			})}
		</span>
	);
}
