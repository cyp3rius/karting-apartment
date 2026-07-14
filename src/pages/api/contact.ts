import type { APIRoute } from "astro";
import { isIsoDate, isStayLongEnough } from "@/lib/booking-dates";
import { RECAPTCHA_ACTION_CONTACT } from "@/lib/recaptcha/actions";
import { requireValidEnterpriseRecaptchaOrErrorResponse } from "@/lib/recaptcha/verify-server";

const STRAPI_URL = import.meta.env.STRAPI_URL || "http://localhost:1337";
const TOKEN = import.meta.env.STRAPI_CONTACT_TOKEN || "";

export const prerender = false;

function jsonError(message: string, status: number) {
	return new Response(JSON.stringify({ error: message }), {
		status,
		headers: { "Content-Type": "application/json" },
	});
}

export const POST: APIRoute = async ({ request }) => {
	try {
		const body = await request.json();

		const recaptchaFail = requireValidEnterpriseRecaptchaOrErrorResponse(
			body.recaptchaValidation,
			RECAPTCHA_ACTION_CONTACT,
		);
		if (recaptchaFail) {
			return recaptchaFail;
		}

		const { recaptchaValidation: _rv, ...rest } = body;

		const name = typeof rest.name === "string" ? rest.name.trim() : "";
		const email = typeof rest.email === "string" ? rest.email.trim() : "";
		const dateFrom = rest.dateFrom;
		const dateTo = rest.dateTo;
		const message = typeof rest.message === "string" ? rest.message.trim() : "";
		const locale = typeof rest.locale === "string" ? rest.locale.trim() : "en";

		if (!name || !email) {
			return jsonError("Missing required fields", 400);
		}

		if (!isIsoDate(dateFrom) || !isIsoDate(dateTo)) {
			return jsonError("Invalid stay dates", 400);
		}

		if (!isStayLongEnough(dateFrom, dateTo)) {
			return jsonError("Minimum stay is 4 nights", 400);
		}

		const data: Record<string, string | boolean> = {
			name,
			email,
			checkIn: dateFrom,
			checkOut: dateTo,
			message,
			locale,
			consent: true,
		};

		const headers: Record<string, string> = { "Content-Type": "application/json" };
		if (TOKEN) headers.Authorization = `Bearer ${TOKEN}`;

		const res = await fetch(`${STRAPI_URL}/api/booking-enquiries`, {
			method: "POST",
			headers,
			body: JSON.stringify({ data }),
		});

		const responseData = await res.json();

		if (!res.ok) {
			console.error("Strapi booking-enquiry error:", responseData);
			return new Response(JSON.stringify({ error: responseData }), {
				status: res.status,
				headers: { "Content-Type": "application/json" },
			});
		}

		return new Response(JSON.stringify(responseData), {
			status: 201,
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		console.error(error);
		return jsonError("Internal proxy error", 500);
	}
};
