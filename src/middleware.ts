import { defineMiddleware } from "astro:middleware";
import {
	isLocale,
	resolveHostKind,
	unprefixedLocaleForHost,
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
		path.includes(".")
	) {
		return next();
	}

	const hostKind = resolveHostKind(context.url.hostname);
	const unprefixed = unprefixedLocaleForHost(hostKind);

	// Prefixed default locale → unprefixed `/`
	// (.pl: /pl → /, .eu: /en → /). Uses real Host at runtime (SSR routes).
	if (path === `/${unprefixed}`) {
		return context.redirect(`/${search}`, 301);
	}

	const response = await next();

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
