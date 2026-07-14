import type { APIRoute } from "astro";

const PROJECT_ID =
	import.meta.env.RECAPTCHA_ENTERPRISE_PROJECT_ID?.trim() || "karting-apartment";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
	const apiKey = import.meta.env.RECAPTCHA_API_KEY;
	const siteKey = import.meta.env.PUBLIC_RECAPTCHA_SITE_KEY;

	if (typeof apiKey !== "string" || !apiKey.trim()) {
		return new Response(JSON.stringify({ error: "RECAPTCHA_API_KEY not configured" }), {
			status: 503,
			headers: { "Content-Type": "application/json" },
		});
	}
	if (typeof siteKey !== "string" || !siteKey.trim()) {
		return new Response(
			JSON.stringify({ error: "PUBLIC_RECAPTCHA_SITE_KEY not configured" }),
			{
				status: 503,
				headers: { "Content-Type": "application/json" },
			},
		);
	}

	let body: { token?: unknown; expectedAction?: unknown };
	try {
		body = await request.json();
	} catch {
		return new Response(JSON.stringify({ error: "Invalid JSON" }), {
			status: 400,
			headers: { "Content-Type": "application/json" },
		});
	}

	const token = body.token;
	if (typeof token !== "string" || !token.trim()) {
		return new Response(JSON.stringify({ error: "Missing token" }), {
			status: 400,
			headers: { "Content-Type": "application/json" },
		});
	}

	const expectedActionRaw = body.expectedAction;
	const expectedAction =
		typeof expectedActionRaw === "string" && expectedActionRaw.trim()
			? expectedActionRaw.trim()
			: undefined;

	const event: Record<string, string> = {
		token: token.trim(),
		siteKey: siteKey.trim(),
	};
	if (expectedAction) {
		event.expectedAction = expectedAction;
	}

	const url = `https://recaptchaenterprise.googleapis.com/v1/projects/${encodeURIComponent(PROJECT_ID)}/assessments?key=${encodeURIComponent(apiKey.trim())}`;

	const googleRes = await fetch(url, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ event }),
	});

	const text = await googleRes.text();
	let json: unknown;
	try {
		json = text ? JSON.parse(text) : null;
	} catch {
		return new Response(
			JSON.stringify({ error: "Invalid response from reCAPTCHA Enterprise" }),
			{
				status: 502,
				headers: { "Content-Type": "application/json" },
			},
		);
	}

	return new Response(JSON.stringify(json), {
		status: googleRes.ok ? 200 : googleRes.status,
		headers: { "Content-Type": "application/json" },
	});
};
