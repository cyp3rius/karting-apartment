import { useCallback, useEffect, useRef, useState } from "react";

const SWIPE_THRESHOLD_PX = 48;

function isInteractiveTarget(target: EventTarget | null) {
	if (!(target instanceof Element)) return false;
	return Boolean(target.closest("a, button, input, textarea, select, label"));
}

export function useHeroCarouselSwipe(
	onSwipeLeft: () => void,
	onSwipeRight: () => void,
) {
	const [enabled, setEnabled] = useState(false);
	const touchStart = useRef<{ x: number; y: number } | null>(null);

	useEffect(() => {
		const mq = window.matchMedia("(max-width: 639px)");
		const apply = () => setEnabled(mq.matches);
		apply();
		mq.addEventListener("change", apply);
		return () => mq.removeEventListener("change", apply);
	}, []);

	const onTouchStart = useCallback(
		(e: React.TouchEvent) => {
			if (!enabled || e.touches.length !== 1) return;
			const touch = e.touches[0];
			if (!touch) return;
			touchStart.current = { x: touch.clientX, y: touch.clientY };
		},
		[enabled],
	);

	const onTouchEnd = useCallback(
		(e: React.TouchEvent) => {
			if (!enabled || !touchStart.current) return;

			const start = touchStart.current;
			touchStart.current = null;

			if (isInteractiveTarget(e.target)) return;

			const touch = e.changedTouches[0];
			if (!touch) return;

			const dx = touch.clientX - start.x;
			const dy = touch.clientY - start.y;

			if (Math.abs(dx) < SWIPE_THRESHOLD_PX) return;
			if (Math.abs(dy) > Math.abs(dx)) return;

			if (dx < 0) onSwipeLeft();
			else onSwipeRight();
		},
		[enabled, onSwipeLeft, onSwipeRight],
	);

	const onTouchCancel = useCallback(() => {
		touchStart.current = null;
	}, []);

	if (!enabled) return {};

	return { onTouchStart, onTouchEnd, onTouchCancel };
}
