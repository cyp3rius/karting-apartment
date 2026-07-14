const address = {
	street: "Via Onzato 16",
	city: "Castel Mella",
	province: "BS",
	postalCode: "25030",
	country: "IT",
} as const;

function apartmentMapSearchUrl(addr: typeof address) {
	const query = `${addr.street}, ${addr.postalCode} ${addr.city} (${addr.province}), Italy`;
	return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export const apartment = {
	name: "Karting Apartment",
	address,
	coordinates: {
		lat: 45.5084261,
		lng: 10.1488191,
	},
	links: {
		booking:
			"https://www.booking.com/hotel/it/karting-apartment.pl.html",
		airbnb: "https://www.airbnb.co.in/rooms/1574660498202989419",
		email: "hello@webninja.ei",
		map: apartmentMapSearchUrl(address),
		manager: "https://www.miiseolakehouse.com/",
		managerLogo: "/images/miiseolakehouse/logo.png",
		privacyPolicy: "https://www.iubenda.com/privacy-policy/58335975",
	},
	managerContact: {
		email: "segreteria@miiseolakehouse.com",
		phone: "+39 334 181 1381",
		phoneHref: "tel:+393341811381",
	},
	platformBrands: {
		booking: {
			color: "#003580",
			icon: "https://cdn.simpleicons.org/bookingdotcom/003580",
		},
		airbnb: {
			color: "#FF5A5F",
			icon: "https://cdn.simpleicons.org/airbnb/FF5A5F",
		},
	},
} as const;

export const galleryImages = [
	"794165989",
	"793706167",
	"793706263",
	"794165251",
	"793706201",
	"793706272",
	"793706277",
	"793706283",
	"793706293",
	"793706299",
	"794165485",
	"794165677",
	"793706268",
	"793706208",
	"793706211",
	"793706225",
	"793706231",
	"793706219",
	"793706250",
	"793706234",
	"793706240",
	"793706244",
	"794165807",
] as const;

export function gallerySrc(id: string) {
	return `/images/apartment/${id}.jpg`;
}
