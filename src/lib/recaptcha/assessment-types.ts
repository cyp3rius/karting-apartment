/**
 * Subset of Google reCAPTCHA Enterprise `projects.assessments` response.
 * @see https://cloud.google.com/recaptcha-enterprise/docs/reference/rest/v1/projects.assessments
 */
export type RecaptchaEnterpriseAssessment = {
	name?: string;
	event?: Record<string, unknown>;
	riskAnalysis?: {
		score?: number;
		reasons?: string[];
		extendedVerdictReasons?: string[];
	};
	tokenProperties?: {
		valid?: boolean;
		invalidReason?: string;
		hostname?: string;
		action?: string;
		createTime?: string;
	};
};
