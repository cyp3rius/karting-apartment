import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { locales, localePath, type Locale } from "@/i18n/config";

const navItems = [
	{ key: "about", href: "#about", id: "about" },
	{ key: "amenities", href: "#amenities", id: "amenities" },
	{ key: "gallery", href: "#gallery", id: "gallery" },
	{ key: "reviews", href: "#reviews", id: "reviews" },
	{ key: "nearby", href: "#nearby", id: "nearby" },
	{ key: "contact", href: "#contact", id: "contact" },
] as const;

type NavKey = (typeof navItems)[number]["key"];

export interface NavStrings {
	about: string;
	amenities: string;
	gallery: string;
	reviews: string;
	nearby: string;
	contact: string;
	book: string;
	menuOpen: string;
	menuClose: string;
}

interface SiteHeaderProps {
	locale: Locale;
	unprefixedLocale: Locale;
	strings: NavStrings;
}

function persistLocale(nextLocale: Locale) {
	localStorage.setItem("locale", nextLocale);
	document.cookie = `locale=${nextLocale};path=/;max-age=31536000;samesite=lax`;
}

export function SiteHeader({
	locale,
	unprefixedLocale,
	strings,
}: SiteHeaderProps) {
	const [scrolled, setScrolled] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);
	const [activeSection, setActiveSection] = useState<string>("");

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 8);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	useEffect(() => {
		const sectionIds = navItems.map((item) => item.id);
		const sections = sectionIds
			.map((id) => document.getElementById(id))
			.filter((el): el is HTMLElement => el !== null);

		if (sections.length === 0) return;

		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries
					.filter((entry) => entry.isIntersecting)
					.sort((a, b) => b.intersectionRatio - a.intersectionRatio);

				if (visible[0]?.target.id) {
					setActiveSection(visible[0].target.id);
				}
			},
			{
				rootMargin: "-35% 0px -55% 0px",
				threshold: [0, 0.15, 0.35, 0.55],
			},
		);

		for (const section of sections) observer.observe(section);
		return () => observer.disconnect();
	}, []);

	useEffect(() => {
		document.body.style.overflow = menuOpen ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [menuOpen]);

	function handleNavClick() {
		setMenuOpen(false);
	}

	return (
		<header
			className={[
				"site-header sticky top-0 z-50 border-b transition-[background-color,box-shadow,border-color] duration-300",
				scrolled
					? "site-header--scrolled border-border/90 bg-background/95 shadow-sm"
					: "border-transparent bg-background/80",
			].join(" ")}
		>
			<div className="site-header-bar mx-auto flex h-16 max-w-screen-xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
				<a
					href={localePath(locale, "", unprefixedLocale)}
					className="site-header-logo group inline-flex min-w-0 items-center gap-2.5"
				>
					<span
						className="site-header-flag flex h-[0.4375rem] w-8 shrink-0 overflow-hidden rounded-full border border-border/70"
						aria-hidden
					>
						<span className="flex-1 bg-primary" />
						<span className="flex-1 bg-white" />
						<span className="flex-1 bg-accent" />
					</span>
					<span className="truncate text-base font-bold tracking-tight sm:text-lg">
						<span className="text-primary">Karting</span> Apartment
					</span>
				</a>

				<nav
					className="hidden items-center gap-1 lg:flex"
					aria-label="Main navigation"
				>
					{navItems.map((item) => (
						<a
							key={item.key}
							href={item.href}
							className={[
								"site-header-link rounded-full px-3 py-2 text-sm font-medium transition-colors",
								activeSection === item.id
									? "bg-primary/10 text-primary"
									: "text-muted-foreground hover:bg-secondary/80 hover:text-foreground",
							].join(" ")}
						>
							{strings[item.key as NavKey]}
						</a>
					))}
				</nav>

				<div className="flex items-center gap-2 sm:gap-3">
					<div
						className="site-header-locale flex items-center rounded-full border border-border/80 bg-card/80 p-0.5 text-xs font-semibold"
						role="group"
						aria-label="Language"
					>
						{locales.map((l) => (
							<a
								key={l}
								href={localePath(l, "", unprefixedLocale)}
								onClick={() => persistLocale(l)}
								className={[
									"rounded-full px-2.5 py-1 uppercase transition-colors",
									l === locale
										? "bg-primary text-primary-foreground shadow-sm"
										: "text-muted-foreground hover:text-foreground",
								].join(" ")}
							>
								{l}
							</a>
						))}
					</div>

					<a
						href="#contact"
						className="site-header-cta hidden rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-opacity hover:opacity-90 sm:inline-flex"
					>
						{strings.book}
					</a>

					<button
						type="button"
						className="site-header-menu-btn inline-flex size-10 items-center justify-center rounded-full border border-border/80 bg-card text-foreground transition-colors hover:bg-secondary lg:hidden"
						onClick={() => setMenuOpen((open) => !open)}
						aria-expanded={menuOpen}
						aria-controls="site-header-mobile-nav"
						aria-label={menuOpen ? strings.menuClose : strings.menuOpen}
					>
						{menuOpen ? (
							<X className="size-5" aria-hidden />
						) : (
							<Menu className="size-5" aria-hidden />
						)}
					</button>
				</div>
			</div>

			{menuOpen ? (
				<div
					id="site-header-mobile-nav"
					className="site-header-mobile border-t border-border/80 bg-background/98 backdrop-blur lg:hidden"
				>
					<nav
						className="mx-auto flex max-w-screen-xl flex-col gap-1 px-4 py-4 sm:px-6"
						aria-label="Mobile navigation"
					>
						{navItems.map((item) => (
							<a
								key={item.key}
								href={item.href}
								onClick={handleNavClick}
								className={[
									"rounded-xl px-4 py-3 text-base font-medium transition-colors",
									activeSection === item.id
										? "bg-primary/10 text-primary"
										: "text-foreground hover:bg-secondary",
								].join(" ")}
							>
								{strings[item.key as NavKey]}
							</a>
						))}
						<a
							href="#contact"
							onClick={handleNavClick}
							className="mt-2 inline-flex items-center justify-center rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-opacity hover:opacity-90"
						>
							{strings.book}
						</a>
					</nav>
				</div>
			) : null}
		</header>
	);
}
