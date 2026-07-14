import {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from "react";
import { cn } from "@/lib/utils";
import {
	executeRecaptchaEnterpriseScore,
	loadRecaptchaEnterpriseExplicitScript,
	loadRecaptchaEnterpriseScoreScript,
	type RecaptchaEnterpriseKeyType,
	normalizeRecaptchaKeyType,
} from "@/lib/recaptcha/enterprise-client";

export type RecaptchaEnterpriseCompactHandle = {
	getToken: () => Promise<string | null>;
	reset: () => void;
};

export type RecaptchaEnterpriseCompactProps = {
	siteKey: string;
	keyType?: RecaptchaEnterpriseKeyType | string;
	action?: string;
	className?: string;
	deferUntilVisible?: boolean;
};

export const RecaptchaEnterpriseCompact = forwardRef<
	RecaptchaEnterpriseCompactHandle,
	RecaptchaEnterpriseCompactProps
>(function RecaptchaEnterpriseCompact(
	{ siteKey, keyType: keyTypeProp, action = "", className, deferUntilVisible = true },
	ref,
) {
	const keyType = normalizeRecaptchaKeyType(keyTypeProp);
	const containerRef = useRef<HTMLDivElement>(null);
	const widgetIdRef = useRef<number | null>(null);
	const [pageLoaded, setPageLoaded] = useState(
		() => typeof document !== "undefined" && document.readyState === "complete",
	);
	const [inView, setInView] = useState(() => !deferUntilVisible);

	useEffect(() => {
		if (document.readyState === "complete") {
			setPageLoaded(true);
			return;
		}
		const onLoad = () => setPageLoaded(true);
		window.addEventListener("load", onLoad, { passive: true });
		return () => window.removeEventListener("load", onLoad);
	}, []);

	useEffect(() => {
		if (!deferUntilVisible || !pageLoaded) {
			return;
		}
		const el = containerRef.current;
		if (!el) {
			return;
		}
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry?.isIntersecting) {
					setInView(true);
				}
			},
			{ root: null, rootMargin: "80px 0px 80px 0px", threshold: 0.01 },
		);
		observer.observe(el);
		return () => observer.disconnect();
	}, [deferUntilVisible, pageLoaded]);

	useImperativeHandle(
		ref,
		() => ({
			getToken: async () => {
				if (keyType === "SCORE") {
					try {
						return await executeRecaptchaEnterpriseScore(siteKey, action);
					} catch {
						return null;
					}
				}
				const id = widgetIdRef.current;
				if (id === null || !window.grecaptcha?.enterprise?.getResponse) {
					return null;
				}
				const t = window.grecaptcha.enterprise.getResponse(id);
				return typeof t === "string" && t.length > 0 ? t : null;
			},
			reset: () => {
				if (keyType === "SCORE") {
					return;
				}
				const id = widgetIdRef.current;
				if (id === null || !window.grecaptcha?.enterprise?.reset) {
					return;
				}
				window.grecaptcha.enterprise.reset(id);
			},
		}),
		[keyType, siteKey, action],
	);

	const shouldMountWidget = pageLoaded && (!deferUntilVisible || inView);

	useEffect(() => {
		if (!shouldMountWidget || !siteKey || keyType === "SCORE") {
			return;
		}
		const el = containerRef.current;
		if (!el) {
			return;
		}
		let cancelled = false;

		(async () => {
			try {
				await loadRecaptchaEnterpriseExplicitScript();
				if (cancelled || !el.isConnected) {
					return;
				}
				await new Promise<void>((resolve) => {
					window.grecaptcha!.enterprise!.ready(() => resolve());
				});
				if (cancelled || !el.isConnected) {
					return;
				}
				const id = window.grecaptcha!.enterprise!.render(el, {
					sitekey: siteKey,
					size: "compact",
					theme: "light",
				});
				widgetIdRef.current = id;
			} catch {
				widgetIdRef.current = null;
			}
		})();

		return () => {
			cancelled = true;
			widgetIdRef.current = null;
			el.replaceChildren();
		};
	}, [shouldMountWidget, siteKey, keyType]);

	useEffect(() => {
		if (!shouldMountWidget || !siteKey || keyType !== "SCORE") {
			return;
		}
		let cancelled = false;
		(async () => {
			try {
				await loadRecaptchaEnterpriseScoreScript(siteKey);
				if (cancelled) {
					return;
				}
				await new Promise<void>((resolve) => {
					window.grecaptcha!.enterprise!.ready(() => resolve());
				});
			} catch {
				/* preload failure — execute() will retry */
			}
		})();
		return () => {
			cancelled = true;
		};
	}, [shouldMountWidget, siteKey, keyType]);

	const showShell = !shouldMountWidget && keyType === "CHECKBOX";

	return (
		<div className={cn("inline-flex flex-col", className)}>
			<div className="relative inline-flex">
				<div
					ref={containerRef}
					className={cn(
						"flex justify-center sm:justify-start",
						keyType === "CHECKBOX" &&
							"min-h-[65px] w-full min-w-[164px] max-w-[164px]",
					)}
					data-recaptcha-compact=""
					data-recaptcha-mode={keyType.toLowerCase()}
				/>
				{showShell ? (
					<div
						className="pointer-events-none absolute inset-0 rounded-md bg-muted/30"
						aria-hidden
					/>
				) : null}
			</div>
		</div>
	);
});
