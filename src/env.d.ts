/// <reference types="astro/client" />

interface ImportMetaEnv {
	readonly PUBLIC_RECAPTCHA_SITE_KEY?: string;
	readonly PUBLIC_RECAPTCHA_KEY_TYPE?: string;
	readonly RECAPTCHA_API_KEY?: string;
	readonly RECAPTCHA_ENTERPRISE_PROJECT_ID?: string;
	readonly STRAPI_URL?: string;
	readonly STRAPI_CONTACT_TOKEN?: string;
	readonly PUBLIC_GOOGLE_TAG_MANAGER_ID?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
