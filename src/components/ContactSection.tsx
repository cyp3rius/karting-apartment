import { BadgePercent, Clock, ExternalLink, MapPin, Mail, Phone } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { apartment } from "../data/apartment";
import { BookingContactForm } from "./BookingContactForm";

function formatPrice(template: string, price: number) {
	return template.replace("{price}", String(price));
}

export interface ContactStrings {
	eyebrow: string;
	title: string;
	subtitle: string;
	directBenefit: string;
	directBadge: string;
	priceFromPerNight: string;
	pricePerNight: string;
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
		estimateBadge: string;
		estimateTotal: string;
		estimateBreakdown: string;
		estimateNote: string;
		consent: string;
		privacyPolicy: string;
		successTitle: string;
		successText: string;
		errorText: string;
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
		emailLabel: string;
		phoneLabel: string;
	};
}

interface ContactSectionProps {
	locale: Locale;
	strings: ContactStrings;
	bookingUrl: string;
	airbnbUrl: string;
	mapUrl: string;
	managerUrl: string;
	managerLogoUrl: string;
	privacyPolicyUrl: string;
	recaptchaSiteKey?: string;
	recaptchaKeyType?: string;
	recaptchaRequiredMessage?: string;
}

export function ContactSection({
	locale,
	strings,
	bookingUrl,
	airbnbUrl,
	mapUrl,
	managerUrl,
	managerLogoUrl,
	privacyPolicyUrl,
	recaptchaSiteKey,
	recaptchaKeyType,
	recaptchaRequiredMessage,
}: ContactSectionProps) {
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
						<p className="mt-2 text-xl sm:text-2xl font-bold text-primary">
							{formatPrice(
								strings.priceFromPerNight,
								apartment.pricing.direct,
							)}
						</p>
					</div>
				</div>
			</div>

			<div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-start">
				<div className="contact-form-card order-1 rounded-2xl border border-primary/20 bg-card p-6 sm:p-8 shadow-sm">
					<div className="mb-6 flex items-center justify-between gap-4">
						<div className="flex items-center gap-3">
							<span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
								<Mail className="size-4" strokeWidth={2} aria-hidden />
							</span>
							<h3 className="text-lg font-semibold text-foreground">
								{strings.formTitle}
							</h3>
						</div>
						<p className="shrink-0 text-sm font-semibold text-primary">
							{formatPrice(
								strings.priceFromPerNight,
								apartment.pricing.direct,
							)}
						</p>
					</div>

					<BookingContactForm
						strings={strings.form}
						locale={locale}
						privacyPolicyUrl={privacyPolicyUrl}
						recaptchaSiteKey={recaptchaSiteKey}
						recaptchaKeyType={recaptchaKeyType}
						recaptchaRequiredMessage={recaptchaRequiredMessage}
					/>
				</div>

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
								className="contact-platform-btn contact-platform-btn--booking group inline-flex flex-col items-center justify-center gap-1 rounded-xl border px-4 py-3.5 text-sm font-semibold transition-colors"
							>
								<span className="inline-flex items-center gap-2.5">
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
								</span>
								<span className="text-xs font-medium text-muted-foreground">
									{formatPrice(
										strings.pricePerNight,
										apartment.pricing.booking,
									)}
								</span>
							</a>
							<a
								href={airbnbUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="contact-platform-btn contact-platform-btn--airbnb group inline-flex flex-col items-center justify-center gap-1 rounded-xl border px-4 py-3.5 text-sm font-semibold transition-colors"
							>
								<span className="inline-flex items-center gap-2.5">
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
								</span>
								<span className="text-xs font-medium text-muted-foreground">
									{formatPrice(
										strings.pricePerNight,
										apartment.pricing.airbnb,
									)}
								</span>
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
								<Mail className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
								<a
									href={`mailto:${apartment.managerContact.email}`}
									className="underline-offset-2 transition-colors hover:text-foreground hover:underline"
								>
									<span className="sr-only">{strings.management.emailLabel}: </span>
									{apartment.managerContact.email}
								</a>
							</p>
							<p className="flex items-start gap-2.5 text-sm text-muted-foreground">
								<Phone className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
								<a
									href={apartment.managerContact.phoneHref}
									className="underline-offset-2 transition-colors hover:text-foreground hover:underline"
								>
									<span className="sr-only">{strings.management.phoneLabel}: </span>
									{apartment.managerContact.phone}
								</a>
							</p>
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
