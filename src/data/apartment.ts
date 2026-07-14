export const apartment = {
	name: "Karting Apartment",
	address: {
		street: "Via Onzato, 16/2",
		city: "Castel Mella",
		province: "BS",
		postalCode: "25030",
		country: "IT",
	},
	coordinates: {
		lat: 45.5084261,
		lng: 10.1488191,
	},
	links: {
		booking:
			"https://www.booking.com/hotel/it/karting-apartment.pl.html",
		airbnb: "https://www.airbnb.co.in/rooms/1574660498202989419",
		email: "hello@webninja.ei",
	},
} as const;

export const galleryImages = [
	"793706167",
	"793706201",
	"793706208",
	"793706211",
	"793706214",
	"793706219",
	"793706221",
	"793706224",
	"793706225",
	"793706229",
	"793706231",
	"793706234",
	"793706240",
	"793706244",
	"793706247",
	"793706250",
	"793706254",
	"793706259",
	"793706263",
	"793706264",
	"793706268",
	"793706272",
	"793706277",
	"793706283",
	"793706293",
	"793706299",
	"794165251",
	"794165371",
	"794165485",
	"794165677",
	"794165807",
	"794165989",
] as const;

export function gallerySrc(id: string) {
	return `/images/apartment/${id}.jpg`;
}
