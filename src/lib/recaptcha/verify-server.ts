import {
	isEnterpriseAssessmentAccepted,
	isRecaptchaEnterpriseAssessmentShape,
} from "./assessment-utils";

function jsonError(message: string, status: number): Response {
	return new Response(JSON.stringify({ error: message }), {
		status,
		headers: { "Content-Type": "application/json" },
	});
}

function isRecaptchaEnforced(): boolean {
	return Boolean(
		import.meta.env.RECAPTCHA_API_KEY?.trim() &&
			import.meta.env.PUBLIC_RECAPTCHA_SITE_KEY?.trim(),
	);
}

function decodeBase64Json(b64: string): unknown | null {
	try {
		return JSON.parse(Buffer.from(b64.trim(), "base64").toString("utf8"));
	} catch {
		return null;
	}
}

/**
 * Decode base64 assessment from UI, validate shape + action.
 * When `RECAPTCHA_API_KEY` is unset (local dev), skips checks.
 */
export function requireValidEnterpriseRecaptchaOrErrorResponse(
	recaptchaValidation: unknown,
	expectedAction: string,
): Response | null {
	if (!isRecaptchaEnforced()) {
		return null;
	}
	if (typeof recaptchaValidation !== "string" || !recaptchaValidation.trim()) {
		return jsonError("Missing recaptchaValidation", 400);
	}
	const decoded = decodeBase64Json(recaptchaValidation);
	if (decoded === null || !isRecaptchaEnterpriseAssessmentShape(decoded)) {
		return jsonError("Invalid recaptchaValidation", 400);
	}
	if (!isEnterpriseAssessmentAccepted(decoded, expectedAction)) {
		return jsonError("Recaptcha verification failed", 400);
	}
	return null;
}
