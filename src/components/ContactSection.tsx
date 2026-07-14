import { useState, type FormEvent } from "react";
import { BadgePercent, Clock, ExternalLink, MapPin, Mail } from "lucide-react";
import { apartment } from "../data/apartment";

const MIN_STAY_NIGHTS = 4;

function parseLocalDate(iso: string) {
	const [year, month, day] = iso.split("-").map(Number);
	return new Date(year, month - 1, day);
}

function formatLocalDate(date: Date) {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
}

function addDays(iso: string, days: number) {
	const date = parseLocalDate(iso);
	date.setDate(date.getDate() + days);
	return formatLocalDate(date);
}

function todayIso() {
	return formatLocalDate(new Date());
}

function stayNights(checkIn: string, checkOut: string) {
	const start = parseLocalDate(checkIn);
	const end = parseLocalDate(checkOut);
	return Math.round((end.getTime() - start.getTime()) / 86_400_000);
}

function minCheckOutDate(checkIn: string) {
	return addDays(checkIn, MIN_STAY_NIGHTS);
}

function isStayLongEnough(checkIn: string, checkOut: string) {
	return stayNights(checkIn, checkOut) >= MIN_STAY_NIGHTS;
}

function buildMailtoUrl(form: HTMLFormElement, email: string) {
	const data = new FormData(form);
	const body = [
		`Name: ${data.get("name") ?? ""}`,
		`Email: ${data.get("email") ?? ""}`,
		`Check-in: ${data.get("dateFrom") ?? ""}`,
		`Check-out: ${data.get("dateTo") ?? ""}`,
		data.get("message") ? `Message: ${data.get("message")}` : "",
	]
		.filter(Boolean)
		.join("\n");

	const params = new URLSearchParams({
		subject: "Karting Apartment — booking inquiry",
		body,
	});

	return `mailto:${email}?${params.toString()}`;
}

export interface ContactStrings {
	eyebrow: string;
	title: string;
	subtitle: string;
	directBenefit: string;
	directBadge: string;
	formTitle: string;
	platformsTitle: string;
	platformsNote: string;
	form: {
		name: string;
		email: string;
		dateFrom: string;
		dateTo: string;
		message: string;
		submit: string;
		note: string;
		minStayError: string;
	};
	platforms: {
		booking: string;
		airbnb: string;
	};
	address: string;
	openMap: string;
	checkIn: string;
	management: {
		title: string;
		description: string;
		licenseLabel: string;
		license: string;
		managerLogoAlt: string;
	};
}

interface ContactSectionProps {
	strings: ContactStrings;
	email: string;
	bookingUrl: string;
	airbnbUrl: string;
	mapUrl: string;
	managerUrl: string;
	managerLogoUrl: string;
}

export function ContactSection({
	strings,
	email,
	bookingUrl,
	airbnbUrl,
	mapUrl,
	managerUrl,
	managerLogoUrl,
}: ContactSectionProps) {
	const [dateFrom, setDateFrom] = useState("");
	const [dateTo, setDateTo] = useState("");
	const [stayError, setStayError] = useState(false);

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

	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const form = event.currentTarget;

		if (!form.checkValidity()) {
			form.reportValidity();
			return;
		}

		if (!dateFrom || !dateTo) {
			setStayError(true);
			return;
		}

		if (!isStayLongEnough(dateFrom, dateTo)) {
			setStayError(true);
			document.getElementById("dateTo")?.focus();
			return;
		}

		window.location.href = buildMailtoUrl(form, email);
	}

	return (
		<div className="contact-section">
			<div className="contact-section-header text-center max-w-2xl mx-auto mb-8 sm:mb-10">
				<p className="text-sm font-semibold text-primary uppercase tracking-[0.2em] mb-5">
					{strings.eyebrow}
				</p>
				<h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
					{strings.title}
				</h2>
				<p className="text-muted-foreground text-lg leading-relaxed">
					{strings.subtitle}
				</p>
			</div>

			<div className="contact-direct-banner mx-auto mb-8 sm:mb-10 max-w-3xl rounded-2xl border border-primary/20 bg-primary/5 px-5 py-4 sm:px-6 sm:py-5">
				<div className="flex items-start gap-4">
					<span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
						<BadgePercent className="size-5" strokeWidth={2} aria-hidden />
					</span>
					<div>
						<p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary mb-1">
							{strings.directBadge}
						</p>
						<p className="text-base sm:text-lg font-medium text-foreground leading-snug">
							{strings.directBenefit}
						</p>
					</div>
				</div>
			</div>

			<div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-start">
				<form
					className="contact-form-card order-1 rounded-2xl border border-primary/20 bg-card p-6 sm:p-8 shadow-sm"
					onSubmit={handleSubmit}
					noValidate
				>
					<div className="mb-6 flex items-center gap-3">
						<span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
							<Mail className="size-4" strokeWidth={2} aria-hidden />
						</span>
						<h3 className="text-lg font-semibold text-foreground">
							{strings.formTitle}
						</h3>
					</div>

					<div className="space-y-4">
						<div>
							<label className="block text-sm font-medium mb-1.5" htmlFor="name">
								{strings.form.name}
							</label>
							<input
								type="text"
								id="name"
								name="name"
								required
								className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium mb-1.5" htmlFor="email">
								{strings.form.email}
							</label>
							<input
								type="email"
								id="email"
								name="email"
								required
								className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
							/>
						</div>
						<div className="grid sm:grid-cols-2 gap-4">
							<div>
								<label
									className="block text-sm font-medium mb-1.5"
									htmlFor="dateFrom"
								>
									{strings.form.dateFrom}
								</label>
								<input
									type="date"
									id="dateFrom"
									name="dateFrom"
									required
									min={todayIso()}
									value={dateFrom}
									onChange={(e) => handleDateFromChange(e.target.value)}
									className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
								/>
							</div>
							<div>
								<label
									className="block text-sm font-medium mb-1.5"
									htmlFor="dateTo"
								>
									{strings.form.dateTo}
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
									className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
								/>
								{stayError ? (
									<p
										id="dateTo-error"
										className="mt-1.5 text-xs text-destructive"
										role="alert"
									>
										{strings.form.minStayError}
									</p>
								) : null}
							</div>
						</div>
						<div>
							<label
								className="block text-sm font-medium mb-1.5"
								htmlFor="message"
							>
								{strings.form.message}
							</label>
							<textarea
								id="message"
								name="message"
								rows={3}
								className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
							/>
						</div>
						<button
							type="submit"
							className="w-full px-6 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity shadow-sm"
						>
							{strings.form.submit}
						</button>
						<p className="text-xs text-muted-foreground text-center">
							{strings.form.note}
						</p>
					</div>
				</form>

				<div className="order-2 space-y-6">
					<div className="contact-platforms-card rounded-2xl border border-border/80 bg-card p-6 sm:p-7 shadow-sm">
						<p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground mb-2">
							{strings.platformsTitle}
						</p>
						<p className="text-sm text-muted-foreground mb-5 leading-relaxed">
							{strings.platformsNote}
						</p>

						<div className="grid sm:grid-cols-2 gap-3">
							<a
								href={bookingUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="contact-platform-btn contact-platform-btn--booking group inline-flex items-center justify-center gap-2.5 rounded-xl border px-4 py-3.5 text-sm font-semibold transition-colors"
							>
								<img
									src={apartment.platformBrands.booking.icon}
									alt=""
									width={20}
									height={20}
									className="size-5 shrink-0"
									loading="lazy"
									decoding="async"
								/>
								<span>{strings.platforms.booking}</span>
								<ExternalLink
									className="size-3.5 shrink-0 opacity-70 transition-opacity group-hover:opacity-100"
									aria-hidden
								/>
							</a>
							<a
								href={airbnbUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="contact-platform-btn contact-platform-btn--airbnb group inline-flex items-center justify-center gap-2.5 rounded-xl border px-4 py-3.5 text-sm font-semibold transition-colors"
							>
								<img
									src={apartment.platformBrands.airbnb.icon}
									alt=""
									width={20}
									height={20}
									className="size-5 shrink-0"
									loading="lazy"
									decoding="async"
								/>
								<span>{strings.platforms.airbnb}</span>
								<ExternalLink
									className="size-3.5 shrink-0 opacity-70 transition-opacity group-hover:opacity-100"
									aria-hidden
								/>
							</a>
						</div>
					</div>

					<div className="contact-management-card rounded-2xl border border-border/80 bg-card p-6 sm:p-7 shadow-sm">
						<a
							href={managerUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="contact-management-logo group mb-4 inline-flex max-w-full rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
						>
							<span className="contact-management-logo-box inline-flex items-center justify-center rounded-xl px-4 py-3 sm:px-5 sm:py-3.5">
								<img
									src={managerLogoUrl}
									alt={strings.management.managerLogoAlt}
									width={377}
									height={181}
									className="contact-management-logo-img h-9 w-auto max-w-full object-contain sm:h-10"
									loading="lazy"
									decoding="async"
								/>
							</span>
						</a>
						<h3 className="text-base font-semibold text-foreground mb-2">
							{strings.management.title}
						</h3>
						<p className="text-sm text-muted-foreground leading-relaxed mb-4">
							{strings.management.description}
						</p>
						<p className="text-sm text-muted-foreground mb-5">
							<span className="font-medium text-foreground">
								{strings.management.licenseLabel}:
							</span>{" "}
							{strings.management.license}
						</p>

						<div className="space-y-3 border-t border-border/70 pt-5">
							<p className="flex items-start gap-2.5 text-sm text-muted-foreground">
								<MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
								<a
									href={mapUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="group inline-flex flex-wrap items-center gap-1.5 underline-offset-2 transition-colors hover:text-foreground hover:underline"
								>
									<span>{strings.address}</span>
									<ExternalLink
										className="size-3.5 shrink-0 opacity-50 transition-opacity group-hover:opacity-100"
										aria-hidden
									/>
									<span className="sr-only">{strings.openMap}</span>
								</a>
							</p>
							<p className="flex items-start gap-2.5 text-sm text-muted-foreground">
								<Clock className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
								<span>{strings.checkIn}</span>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
