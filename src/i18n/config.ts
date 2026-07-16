export const locales = ["en", "it", "pl"] as const;
export type Locale = (typeof locales)[number];

/** Canonical primary domain default (kartingapartment.pl). */
export const defaultLocale: Locale = "pl";

/** English fallback when auto-detect / Accept-Language does not match. */
export const fallbackLocale: Locale = "en";

export type SiteHostKind = "pl" | "eu";

export function isLocale(value: string): value is Locale {
	return locales.includes(value as Locale);
}

/**
 * `.pl` → Polish unprefixed; `.eu` / preview / localhost → English unprefixed.
 */
export function resolveHostKind(hostname: string): SiteHostKind {
	const host = hostname.toLowerCase().replace(/:\d+$/, "");
	if (host === "kartingapartment.pl" || host.endsWith(".kartingapartment.pl")) {
		return "pl";
	}
	return "eu";
}

export function unprefixedLocaleForHost(kind: SiteHostKind): Locale {
	return kind === "pl" ? "pl" : "en";
}

/**
 * Path for a locale. The unprefixed locale is served at `/` (no `/{locale}`).
 * `hash` may be `""` or a fragment like `#contact`.
 */
export function localePath(
	locale: Locale,
	hash = "",
	unprefixedLocale: Locale = defaultLocale,
): string {
	if (locale === unprefixedLocale) {
		return hash ? `/${hash}` : "/";
	}
	return hash ? `/${locale}/${hash}` : `/${locale}/`;
}

/** Canonical public paths always use `.pl` rules (PL unprefixed). */
export function canonicalLocalePath(locale: Locale, hash = ""): string {
	return localePath(locale, hash, "pl");
}

export function detectLocale(
	acceptLanguage?: string | null,
	fallback: Locale = fallbackLocale,
): Locale {
	if (!acceptLanguage) return fallback;
	const langs = acceptLanguage
		.split(",")
		.map((part) => part.split(";")[0]?.trim().toLowerCase() ?? "");
	for (const lang of langs) {
		if (lang.startsWith("pl")) return "pl";
		if (lang.startsWith("it")) return "it";
		if (lang.startsWith("en")) return "en";
	}
	return fallback;
}
