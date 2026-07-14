export const locales = ["en", "it", "pl"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
	return locales.includes(value as Locale);
}

export function localePath(locale: Locale, hash = ""): string {
	return `/${locale}/${hash}`;
}

export function detectLocale(acceptLanguage?: string): Locale {
	if (!acceptLanguage) return defaultLocale;
	const langs = acceptLanguage
		.split(",")
		.map((part) => part.split(";")[0]?.trim().toLowerCase() ?? "");
	for (const lang of langs) {
		if (lang.startsWith("it")) return "it";
		if (lang.startsWith("pl")) return "pl";
	}
	return defaultLocale;
}
