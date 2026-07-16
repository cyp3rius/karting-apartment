import { defineMiddleware } from "astro:middleware";
import {
	detectLocale,
	isLocale,
	resolveHostKind,
	unprefixedLocaleForHost,
	type Locale,
} from "./i18n/config";

const LOCALE_COOKIE = "locale";

function normalizePath(pathname: string): string {
	if (pathname.length > 1 && pathname.endsWith("/")) {
		return pathname.slice(0, -1);
	}
	return pathname || "/";
}

export const onRequest = defineMiddleware(async (context, next) => {
	const { pathname, search } = context.url;
	const path = normalizePath(pathname);

	// Skip assets & APIs
	if (
		path.startsWith("/api") ||
		path.startsWith("/_") ||
		path.includes(".") // static files e.g. /og-image-pl.png, /favicon.svg
	) {
		return next();
	}

	const hostKind = resolveHostKind(context.url.hostname);
	const unprefixed = unprefixedLocaleForHost(hostKind);

	// Prefixed default locale → unprefixed `/`
	if (path === `/${unprefixed}`) {
		return context.redirect(`/${search}`, 301);
	}

	// `/` behavior
	if (path === "/") {
		if (hostKind === "eu") {
			const cookieVal = context.cookies.get(LOCALE_COOKIE)?.value;
			const preferred: Locale =
				cookieVal && isLocale(cookieVal)
					? cookieVal
					: detectLocale(context.request.headers.get("accept-language"));

			if (preferred !== unprefixed) {
				return context.redirect(`/${preferred}/${search}`, 302);
			}
		}

		context.cookies.set(LOCALE_COOKIE, unprefixed, {
			path: "/",
			maxAge: 60 * 60 * 24 * 365,
			sameSite: "lax",
		});
		return context.rewrite(`/${unprefixed}/`);
	}

	const response = await next();

	// Persist locale cookie when visiting a language page
	const seg = path.slice(1).split("/")[0];
	if (seg && isLocale(seg)) {
		context.cookies.set(LOCALE_COOKIE, seg, {
			path: "/",
			maxAge: 60 * 60 * 24 * 365,
			sameSite: "lax",
		});
	}

	return response;
});
