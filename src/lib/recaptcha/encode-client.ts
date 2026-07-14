/** Base64(JSON.stringify(assessment)) for `recaptchaValidation` on submit APIs (browser). */
export function encodeRecaptchaAssessmentBase64(assessment: unknown): string {
	return btoa(JSON.stringify(assessment));
}
