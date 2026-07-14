import { encodeRecaptchaAssessmentBase64 } from "./encode-client";
import { RECAPTCHA_ACTION_CONTACT } from "./actions";

export { RECAPTCHA_ACTION_CONTACT };

export type RecaptchaEnterpriseKeyType = "SCORE" | "CHECKBOX";

export function normalizeRecaptchaKeyType(
	raw: string | RecaptchaEnterpriseKeyType | undefined,
): RecaptchaEnterpriseKeyType {
	if (raw === "SCORE" || raw === "CHECKBOX") {
		return raw;
	}
	const u = typeof raw === "string" ? raw.trim().toUpperCase() : "";
	if (u === "CHECKBOX") {
		return "CHECKBOX";
	}
	return "SCORE";
}

declare global {
	interface Window {
		grecaptcha?: {
			enterprise: {
				ready: (cb: () => void) => void;
				render: (
					container: HTMLElement,
					parameters: {
						sitekey: string;
						size?: "compact" | "normal" | "invisible";
						theme?: "light" | "dark";
						callback?: (token: string) => void;
						"error-callback"?: () => void;
						"expired-callback"?: () => void;
					},
				) => number;
				execute: (siteKey: string, options: { action: string }) => Promise<string>;
				getResponse: (widgetId?: number) => string;
				reset: (widgetId?: number) => void;
			};
		};
	}
}

const ASSESSMENT_URL = "/api/recaptcha-enterprise-assessment";
const scoreScriptPromises = new Map<string, Promise<void>>();
let explicitScriptPromise: Promise<void> | null = null;

export function loadRecaptchaEnterpriseScoreScript(siteKey: string): Promise<void> {
	const key = siteKey.trim();
	if (!key) {
		return Promise.reject(new Error("reCAPTCHA site key is empty"));
	}
	const cached = scoreScriptPromises.get(key);
	if (cached) {
		return cached;
	}
	const renderParam = encodeURIComponent(key);
	const scriptSrc = `https://www.google.com/recaptcha/enterprise.js?render=${renderParam}`;

	const promise = new Promise<void>((resolve, reject) => {
		const start = () => {
			if (typeof window === "undefined") {
				reject(new Error("no window"));
				return;
			}
			if (window.grecaptcha?.enterprise?.execute) {
				resolve();
				return;
			}
			const existing = Array.from(
				document.querySelectorAll<HTMLScriptElement>(
					'script[src*="recaptcha/enterprise.js"]',
				),
			).find((el) => {
				const src = el.getAttribute("src") ?? "";
				return src.includes(`render=${renderParam}`) || src.includes(`render=${key}`);
			});
			if (existing) {
				existing.addEventListener("load", () => resolve(), { once: true });
				existing.addEventListener("error", () => reject(new Error("recaptcha script")), {
					once: true,
				});
				return;
			}
			const s = document.createElement("script");
			s.src = scriptSrc;
			s.async = true;
			s.defer = true;
			s.onload = () => resolve();
			s.onerror = () => reject(new Error("recaptcha enterprise load"));
			document.head.appendChild(s);
		};
		if (document.readyState === "complete") {
			start();
		} else {
			window.addEventListener("load", start, { once: true, passive: true });
		}
	});
	scoreScriptPromises.set(key, promise);
	return promise;
}

export function loadRecaptchaEnterpriseExplicitScript(): Promise<void> {
	if (explicitScriptPromise) {
		return explicitScriptPromise;
	}
	explicitScriptPromise = new Promise((resolve, reject) => {
		const start = () => {
			if (typeof window === "undefined") {
				reject(new Error("no window"));
				return;
			}
			if (window.grecaptcha?.enterprise?.render) {
				resolve();
				return;
			}
			const existing = document.querySelector(
				'script[src*="recaptcha/enterprise.js?render=explicit"]',
			);
			if (existing) {
				existing.addEventListener("load", () => resolve(), { once: true });
				existing.addEventListener("error", () => reject(new Error("recaptcha script")), {
					once: true,
				});
				return;
			}
			const s = document.createElement("script");
			s.src = "https://www.google.com/recaptcha/enterprise.js?render=explicit";
			s.async = true;
			s.defer = true;
			s.onload = () => resolve();
			s.onerror = () => reject(new Error("recaptcha enterprise load"));
			document.head.appendChild(s);
		};
		if (document.readyState === "complete") {
			start();
		} else {
			window.addEventListener("load", start, { once: true, passive: true });
		}
	});
	return explicitScriptPromise;
}

export async function executeRecaptchaEnterpriseScore(
	siteKey: string,
	action: string,
): Promise<string> {
	await loadRecaptchaEnterpriseScoreScript(siteKey);
	await new Promise<void>((resolve) => {
		window.grecaptcha!.enterprise!.ready(() => resolve());
	});
	const token = await window.grecaptcha!.enterprise!.execute(siteKey.trim(), {
		action: action.trim(),
	});
	if (typeof token !== "string" || !token.length) {
		throw new Error("recaptcha execute returned empty token");
	}
	return token;
}

export async function fetchEnterpriseAssessmentFromOurApi(
	token: string,
	expectedAction: string,
): Promise<unknown> {
	const res = await fetch(ASSESSMENT_URL, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ token, expectedAction }),
	});
	const data = await res.json().catch(() => ({}));
	if (!res.ok) {
		const msg =
			typeof (data as { error?: string }).error === "string"
				? (data as { error: string }).error
				: `assessment:${res.status}`;
		throw new Error(msg);
	}
	return data;
}

export async function encodeRecaptchaValidationFromEnterpriseToken(
	token: string,
	expectedAction: string,
): Promise<string> {
	const assessment = await fetchEnterpriseAssessmentFromOurApi(token, expectedAction);
	return encodeRecaptchaAssessmentBase64(assessment);
}
