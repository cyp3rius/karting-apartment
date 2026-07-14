import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import type { Locale } from "@/i18n/config";
import { t } from "@/i18n/translations";
import { galleryImages, gallerySrc } from "@/data/apartment";
import { cn } from "@/lib/utils";

interface GalleryProps {
	locale: Locale;
	title: string;
}

const PREVIEW_COUNT = 5;

function format(template: string, vars: Record<string, string | number>) {
	return template.replace(/\{(\w+)\}/g, (_, key) => String(vars[key] ?? ""));
}

function GalleryTile({
	id,
	alt,
	className,
	onClick,
	overlay,
	priority = false,
}: {
	id: string;
	alt: string;
	className?: string;
	onClick: () => void;
	overlay?: ReactNode;
	priority?: boolean;
}) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={cn(
				"gallery-tile group relative overflow-hidden bg-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
				className,
			)}
		>
			<img
				src={gallerySrc(id)}
				alt={alt}
				className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
				loading={priority ? "eager" : "lazy"}
				decoding="async"
			/>
			<div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
			<div className="absolute inset-0 ring-1 ring-inset ring-black/5 pointer-events-none" />
			{overlay}
		</button>
	);
}

function Lightbox({
	locale,
	title,
	index,
	onClose,
	onChange,
}: {
	locale: Locale;
	title: string;
	index: number;
	onClose: () => void;
	onChange: (next: number) => void;
}) {
	const strings = t(locale).gallery;
	const thumbsRef = useRef<HTMLDivElement>(null);
	const total = galleryImages.length;

	const go = useCallback(
		(delta: number) => {
			onChange((index + delta + total) % total);
		},
		[index, onChange, total],
	);

	useEffect(() => {
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = prev;
		};
	}, []);

	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
			if (e.key === "ArrowLeft") go(-1);
			if (e.key === "ArrowRight") go(1);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [go, onClose]);

	useEffect(() => {
		const el = thumbsRef.current?.querySelector(`[data-index="${index}"]`);
		el?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
	}, [index]);

	return (
		<div
			className="gallery-lightbox fixed inset-0 z-50 flex flex-col bg-black/92 backdrop-blur-md"
			role="dialog"
			aria-modal
			aria-label={title}
		>
			<div className="flex items-center justify-between px-4 sm:px-6 py-4 shrink-0">
				<p className="text-white/80 text-sm font-medium tabular-nums">
					{format(strings.photoOf, { current: index + 1, total })}
				</p>
				<button
					type="button"
					onClick={onClose}
					className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
					aria-label={strings.close}
				>
					<svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
						<path d="M18 6 6 18M6 6l12 12" />
					</svg>
					<span className="hidden sm:inline">{strings.close}</span>
				</button>
			</div>

			<div className="relative flex-1 flex items-center justify-center min-h-0 px-14 sm:px-20">
				<button
					type="button"
					onClick={() => go(-1)}
					className="gallery-nav absolute left-3 sm:left-6 top-1/2 -translate-y-1/2"
					aria-label={strings.previous}
				>
					<svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
						<path d="M15 18l-6-6 6-6" />
					</svg>
				</button>

				<div className="relative w-full h-full flex items-center justify-center">
					<img
						key={galleryImages[index]}
						src={gallerySrc(galleryImages[index])}
						alt={`${title} ${index + 1}`}
						className="gallery-lightbox-image max-h-full max-w-full object-contain rounded-lg shadow-2xl"
						draggable={false}
					/>
				</div>

				<button
					type="button"
					onClick={() => go(1)}
					className="gallery-nav absolute right-3 sm:right-6 top-1/2 -translate-y-1/2"
					aria-label={strings.next}
				>
					<svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
						<path d="M9 18l6-6-6-6" />
					</svg>
				</button>
			</div>

			<div
				ref={thumbsRef}
				className="shrink-0 px-4 sm:px-6 pb-5 pt-2 overflow-x-auto gallery-thumbs-scroll"
			>
				<div className="flex gap-2 justify-start sm:justify-center min-w-min mx-auto">
					{galleryImages.map((id, i) => (
						<button
							key={id}
							type="button"
							data-index={i}
							onClick={() => onChange(i)}
							className={cn(
								"gallery-thumb shrink-0 overflow-hidden rounded-lg transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
								i === index
									? "ring-2 ring-primary opacity-100 scale-105"
									: "opacity-50 hover:opacity-80",
							)}
							aria-label={`${title} ${i + 1}`}
							aria-current={i === index ? "true" : undefined}
						>
							<img
								src={gallerySrc(id)}
								alt=""
								className="size-14 sm:size-16 object-cover"
								loading="lazy"
							/>
						</button>
					))}
				</div>
			</div>
		</div>
	);
}

export function Gallery({ locale, title }: GalleryProps) {
	const strings = t(locale).gallery;
	const [lightbox, setLightbox] = useState<number | null>(null);
	const [expanded, setExpanded] = useState(false);

	const preview = galleryImages.slice(0, PREVIEW_COUNT);
	const remaining = galleryImages.length - PREVIEW_COUNT;

	const open = (index: number) => setLightbox(index);

	return (
		<>
			{/* Airbnb-style hero mosaic */}
			<div className="gallery-mosaic rounded-2xl overflow-hidden shadow-lg border border-border/60">
				<div className="grid grid-cols-2 md:grid-cols-4 md:grid-rows-2 gap-1.5 md:gap-2 h-[220px] sm:h-[280px] md:h-[440px]">
					<GalleryTile
						id={preview[0]}
						alt={`${title} 1`}
						priority
						onClick={() => open(0)}
						className="col-span-2 row-span-2 md:col-span-2 md:row-span-2 rounded-none md:rounded-l-2xl"
					/>
					{preview.slice(1, 4).map((id, i) => (
						<GalleryTile
							key={id}
							id={id}
							alt={`${title} ${i + 2}`}
							onClick={() => open(i + 1)}
							className={cn(
								"hidden md:block rounded-none",
								i === 1 && "md:rounded-tr-2xl",
							)}
						/>
					))}
					<GalleryTile
						id={preview[4]}
						alt={`${title} 5`}
						onClick={() => open(4)}
						className="hidden md:block rounded-none md:rounded-br-2xl"
						overlay={
							remaining > 0 ? (
								<div className="absolute inset-0 flex items-center justify-center bg-black/45 backdrop-blur-[2px] transition-colors group-hover:bg-black/55">
									<span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-foreground shadow-lg">
										<svg className="size-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
											<rect x="3" y="3" width="7" height="7" rx="1" />
											<rect x="14" y="3" width="7" height="7" rx="1" />
											<rect x="3" y="14" width="7" height="7" rx="1" />
											<rect x="14" y="14" width="7" height="7" rx="1" />
										</svg>
										{format(strings.showMore, { count: remaining })}
									</span>
								</div>
							) : undefined
						}
					/>
					{/* Mobile: show 2nd image + overlay tile */}
					<GalleryTile
						id={preview[1]}
						alt={`${title} 2`}
						onClick={() => open(1)}
						className="md:hidden rounded-none"
					/>
					<GalleryTile
						id={preview[2]}
						alt={`${title} 3`}
						onClick={() => open(2)}
						className="md:hidden rounded-none rounded-br-2xl"
						overlay={
							<div className="absolute inset-0 flex items-center justify-center bg-black/45 backdrop-blur-[2px]">
								<span className="rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-foreground shadow-lg">
									{format(strings.viewAll, { count: galleryImages.length })}
								</span>
							</div>
						}
					/>
				</div>
			</div>

			{/* View all + expand */}
			<div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
				<button
					type="button"
					onClick={() => open(0)}
					className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold shadow-sm transition-all hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
				>
					<svg className="size-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
						<rect x="3" y="3" width="18" height="18" rx="2" />
						<circle cx="8.5" cy="8.5" r="1.5" />
						<path d="m21 15-5-5L5 21" />
					</svg>
					{format(strings.viewAll, { count: galleryImages.length })}
				</button>
				{!expanded && (
					<button
						type="button"
						onClick={() => setExpanded(true)}
						className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline"
					>
						{format(strings.showMore, { count: remaining })}
					</button>
				)}
			</div>

			{/* Expanded masonry grid */}
			{expanded && (
				<div className="gallery-expanded mt-8 columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
					{galleryImages.slice(PREVIEW_COUNT).map((id, i) => (
						<button
							key={id}
							type="button"
							onClick={() => open(PREVIEW_COUNT + i)}
							className="gallery-expanded-item group relative w-full break-inside-avoid overflow-hidden rounded-xl bg-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
							style={{ animationDelay: `${i * 40}ms` }}
						>
							<img
								src={gallerySrc(id)}
								alt={`${title} ${PREVIEW_COUNT + i + 1}`}
								className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
								loading="lazy"
							/>
							<div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors" />
						</button>
					))}
				</div>
			)}

			{lightbox !== null && (
				<Lightbox
					locale={locale}
					title={title}
					index={lightbox}
					onClose={() => setLightbox(null)}
					onChange={setLightbox}
				/>
			)}
		</>
	);
}
