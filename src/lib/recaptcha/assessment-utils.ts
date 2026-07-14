import type { RecaptchaEnterpriseAssessment } from "./assessment-types";

/** Structural check for decoded Enterprise assessment JSON (not cryptographic proof). */
export function isRecaptchaEnterpriseAssessmentShape(
	value: unknown,
): value is RecaptchaEnterpriseAssessment {
	if (!value || typeof value !== "object") return false;
	const o = value as Record<string, unknown>;
	if (o.error !== undefined) {
		return false;
	}
	if (o.tokenProperties !== null && typeof o.tokenProperties === "object") {
		return true;
	}
	if (o.riskAnalysis !== null && typeof o.riskAnalysis === "object") {
		return true;
	}
	return typeof o.name === "string" && o.name.includes("/assessments/");
}

/**
 * Business rules: `tokenProperties.valid` must be true.
 * When Google returns a non-empty `tokenProperties.action`, it must equal `expectedAction`.
 */
export function isEnterpriseAssessmentAccepted(
	assessment: RecaptchaEnterpriseAssessment,
	expectedAction: string,
): boolean {
	if (assessment.tokenProperties?.valid !== true) {
		return false;
	}
	const action = assessment.tokenProperties?.action;
	if (typeof action === "string" && action.length > 0 && action !== expectedAction) {
		return false;
	}
	return true;
}
