export const MIN_STAY_NIGHTS = 4;

export function parseLocalDate(iso: string) {
	const [year, month, day] = iso.split("-").map(Number);
	return new Date(year, month - 1, day);
}

export function formatLocalDate(date: Date) {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
}

export function addDays(iso: string, days: number) {
	const date = parseLocalDate(iso);
	date.setDate(date.getDate() + days);
	return formatLocalDate(date);
}

export function todayIso() {
	return formatLocalDate(new Date());
}

export function stayNights(checkIn: string, checkOut: string) {
	const start = parseLocalDate(checkIn);
	const end = parseLocalDate(checkOut);
	return Math.round((end.getTime() - start.getTime()) / 86_400_000);
}

export function minCheckOutDate(checkIn: string) {
	return addDays(checkIn, MIN_STAY_NIGHTS);
}

export function isStayLongEnough(checkIn: string, checkOut: string) {
	return stayNights(checkIn, checkOut) >= MIN_STAY_NIGHTS;
}

export function estimateStayTotal(
	checkIn: string,
	checkOut: string,
	nightlyRate: number,
) {
	return stayNights(checkIn, checkOut) * nightlyRate;
}

const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export function isIsoDate(value: unknown): value is string {
	return typeof value === "string" && ISO_DATE_RE.test(value);
}
