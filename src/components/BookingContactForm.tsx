import { useRef, useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";
import type { Locale } from "@/i18n/config";
import {
	isStayLongEnough,
	minCheckOutDate,
	todayIso,
} from "@/lib/booking-dates";
import {
	RECAPTCHA_ACTION_CONTACT,
	encodeRecaptchaValidationFromEnterpriseToken,
} from "@/lib/recaptcha/enterprise-client";
import {
	RecaptchaEnterpriseCompact,
	type RecaptchaEnterpriseCompactHandle,
} from "@/components/recaptcha/RecaptchaEnterpriseCompact";

const SUBMIT_URL = "/api/contact";

export interface BookingFormStrings {
	name: string;
	email: string;
	dateFrom: string;
	dateTo: string;
	message: string;
	submit: string;
	note: string;
	minStayError: string;
	consent: string;
	privacyPolicy: string;
	successTitle: string;
	successText: string;
	errorText: string;
}

interface BookingContactFormProps {
	strings: BookingFormStrings;
	locale: Locale;
	privacyPolicyUrl: string;
	recaptchaSiteKey?: string;
	recaptchaKeyType?: string;
	recaptchaRequiredMessage?: string;
}

export function BookingContactForm({
	strings,
	locale,
	privacyPolicyUrl,
	recaptchaSiteKey,
	recaptchaKeyType,
	recaptchaRequiredMessage = "",
}: BookingContactFormProps) {
	const recaptchaRef = useRef<RecaptchaEnterpriseCompactHandle>(null);
	const [dateFrom, setDateFrom] = useState("");
	const [dateTo, setDateTo] = useState("");
	const [stayError, setStayError] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const minCheckOut = dateFrom ? minCheckOutDate(dateFrom) : undefined;

	function handleDateFromChange(value: string) {
		setDateFrom(value);

		if (!value) {
			setDateTo("");
			setStayError(false);
			return;
		}

		if (dateTo && !isStayLongEnough(value, dateTo)) {
			setDateTo("");
			setStayError(true);
			return;
		}

		setStayError(false);
	}

	function handleDateToChange(value: string) {
		if (!value) {
			setDateTo("");
			setStayError(false);
			return;
		}

		if (!dateFrom) return;

		if (!isStayLongEnough(dateFrom, value)) {
			setStayError(true);
			return;
		}

		setDateTo(value);
		setStayError(false);
	}

	async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
		e.preventDefault();
		setSubmitting(true);
		setError(null);

		const form = e.currentTarget;

		if (!form.checkValidity()) {
			form.reportValidity();
			setSubmitting(false);
			return;
		}

		if (!dateFrom || !dateTo) {
			setStayError(true);
			setSubmitting(false);
			return;
		}

		if (!isStayLongEnough(dateFrom, dateTo)) {
			setStayError(true);
			document.getElementById("dateTo")?.focus();
			setSubmitting(false);
			return;
		}

		const payload: Record<string, string> = {
			name: (form.elements.namedItem("name") as HTMLInputElement).value.trim(),
			email: (form.elements.namedItem("email") as HTMLInputElement).value.trim(),
			dateFrom,
			dateTo,
			message: (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim(),
			locale,
		};

		if (recaptchaSiteKey) {
			const token = await recaptchaRef.current?.getToken();
			if (!token) {
				setError(recaptchaRequiredMessage || strings.errorText);
				setSubmitting(false);
				return;
			}
			try {
				payload.recaptchaValidation =
					await encodeRecaptchaValidationFromEnterpriseToken(
						token,
						RECAPTCHA_ACTION_CONTACT,
					);
			} catch {
				setError(recaptchaRequiredMessage || strings.errorText);
				setSubmitting(false);
				return;
			}
		}

		try {
			const res = await fetch(SUBMIT_URL, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});

			if (!res.ok) throw new Error(`${res.status}`);
			setSubmitted(true);
		} catch {
			setError(strings.errorText);
			recaptchaRef.current?.reset();
		} finally {
			setSubmitting(false);
		}
	}

	if (submitted) {
		return (
			<div className="flex flex-col items-center justify-center py-10 text-center">
				<div className="mb-5 flex size-14 items-center justify-center rounded-full bg-primary/10">
					<CheckCircle className="size-7 text-primary" aria-hidden />
				</div>
				<h4 className="mb-2 text-xl font-semibold text-foreground">
					{strings.successTitle}
				</h4>
				<p className="max-w-sm text-sm text-muted-foreground">{strings.successText}</p>
			</div>
		);
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-4" noValidate>
			<div>
				<label className="mb-1.5 block text-sm font-medium" htmlFor="name">
					{strings.name}
				</label>
				<input
					type="text"
					id="name"
					name="name"
					required
					className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
				/>
			</div>
			<div>
				<label className="mb-1.5 block text-sm font-medium" htmlFor="email">
					{strings.email}
				</label>
				<input
					type="email"
					id="email"
					name="email"
					required
					className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
				/>
			</div>
			<div className="grid gap-4 sm:grid-cols-2">
				<div>
					<label className="mb-1.5 block text-sm font-medium" htmlFor="dateFrom">
						{strings.dateFrom}
					</label>
					<input
						type="date"
						id="dateFrom"
						name="dateFrom"
						required
						min={todayIso()}
						value={dateFrom}
						onChange={(e) => handleDateFromChange(e.target.value)}
						className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
					/>
				</div>
				<div>
					<label className="mb-1.5 block text-sm font-medium" htmlFor="dateTo">
						{strings.dateTo}
					</label>
					<input
						type="date"
						id="dateTo"
						name="dateTo"
						required
						min={minCheckOut}
						value={dateTo}
						disabled={!dateFrom}
						onChange={(e) => handleDateToChange(e.target.value)}
						aria-invalid={stayError}
						aria-describedby={stayError ? "dateTo-error" : undefined}
						className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
					/>
					{stayError ? (
						<p
							id="dateTo-error"
							className="mt-1.5 text-xs text-destructive"
							role="alert"
						>
							{strings.minStayError}
						</p>
					) : null}
				</div>
			</div>
			<div>
				<label className="mb-1.5 block text-sm font-medium" htmlFor="message">
					{strings.message}
				</label>
				<textarea
					id="message"
					name="message"
					rows={3}
					className="w-full resize-none rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
				/>
			</div>

			<div className="flex items-start gap-3">
				<input
					type="checkbox"
					id="consent"
					name="consent"
					required
					className="mt-1 size-4 rounded border-border text-primary focus:ring-primary"
				/>
				<label
					htmlFor="consent"
					className="text-xs font-normal leading-relaxed text-muted-foreground"
				>
					{strings.consent}{" "}
					<a
						href={privacyPolicyUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="font-medium text-foreground underline-offset-2 hover:underline"
					>
						{strings.privacyPolicy}
					</a>
					.
				</label>
			</div>

			{recaptchaSiteKey ? (
				<div className="flex justify-center pt-1 sm:justify-start">
					<RecaptchaEnterpriseCompact
						ref={recaptchaRef}
						siteKey={recaptchaSiteKey}
						keyType={recaptchaKeyType}
						action={RECAPTCHA_ACTION_CONTACT}
					/>
				</div>
			) : null}

			{error ? <p className="text-sm text-destructive">{error}</p> : null}

			<button
				type="submit"
				disabled={submitting}
				className="inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-sm transition-opacity hover:opacity-90 disabled:opacity-60"
			>
				{submitting ? (
					<Loader2 className="mr-2 size-4 animate-spin" aria-hidden />
				) : null}
				{strings.submit}
			</button>
			<p className="text-center text-xs text-muted-foreground">{strings.note}</p>
		</form>
	);
}
