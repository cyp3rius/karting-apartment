import type { Locale } from "@/i18n/config";

export function contactRecaptchaRequiredMessage(locale: Locale): string {
	if (locale === "pl") {
		return "Weryfikacja bezpieczeństwa nie powiodła się. Spróbuj ponownie.";
	}
	if (locale === "it") {
		return "Verifica di sicurezza non riuscita. Riprova.";
	}
	return "Security verification failed. Please try again.";
}
