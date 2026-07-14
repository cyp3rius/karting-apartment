import type { Locale } from "./config";

export type LocalizedString = Record<Locale, string>;

export type TranslationKeys = typeof translations.en;

export const translations = {
	en: {
		meta: {
			title: "Karting Apartment | Castel Mella, Lombardy",
			description:
				"Modern apartment near Franciacorta, Lake Garda and karting circuits. Book direct — save on platform fees. Free parking, WiFi, balcony with garden views.",
		},
		nav: {
			nearby: "Nearby",
			gallery: "Gallery",
			about: "About",
			amenities: "Amenities",
			reviews: "Reviews",
			contact: "Contact",
			book: "Book direct",
		},
		hero: {
			eyebrow: "Castel Mella · Lombardy · Italy",
			title: "Your base camp for Northern Italy",
			subtitle:
				"A bright apartment between Franciacorta wine hills, Lake Garda and world-class karting tracks — with free parking and a garden-view balcony.",
			ctaPrimary: "Book direct — best price",
			ctaSecondary: "Explore the area",
			pinLabel: "Karting Apartment",
			attractionTypes: {
				motorsport: "Karting Circuits",
				airports: "Airports",
				cities: "Cities",
				lakes: "Lakes",
				wine: "Wine Regions",
			},
		},
		nearby: {
			title: "Explore the region",
			subtitle:
				"Airports, lakes, cities and racing circuits — all within easy reach.",
			km: "km",
			categories: {
				airports: "Airports",
				attractions: "Attractions",
				racing: "Racing circuits",
			},
		},
		gallery: {
			title: "Inside the apartment",
			subtitle: "60 m² of comfort — balcony, kitchen, and garden views.",
			viewAll: "View all {count} photos",
			showMore: "+{count} more",
			photoOf: "{current} / {total}",
			close: "Close gallery",
			previous: "Previous photo",
			next: "Next photo",
		},
		about: {
			title: "About Karting Apartment",
			p1: "Karting Apartment is a one-bedroom home in Castel Mella, a quiet town in the Province of Brescia. Perfect for couples and motorsport fans visiting Lombardy.",
			p2: "Enjoy a fully equipped kitchen, air conditioning, free private parking, and a balcony overlooking the garden. The Franciacorta Karting Track is just minutes away.",
			stats: {
				size: "60 m²",
				bedrooms: "1 bedroom",
				guests: "Up to 3 guests",
				rating: "9.7 guest rating",
			},
		},
		amenities: {
			title: "Amenities",
			groups: {
				essentials: "Essentials",
				comfort: "Comfort",
				services: "Services",
				activities: "Activities",
			},
			items: {
				wifi: "Free WiFi",
				parking: "Free private parking",
				ac: "Air conditioning",
				kitchen: "Fully equipped kitchen",
				washer: "Washing machine",
				balcony: "Balcony with garden view",
				nonSmoking: "Non-smoking",
				allergyFree: "Allergy-free",
				shuttle: "Airport shuttle (paid)",
				bikes: "Bicycle rental",
				restaurant: "Restaurant on site",
				cycling: "Cycling & hiking nearby",
			},
		},
		reviews: {
			title: "Guest reviews",
			score: "9.7",
			label: "Exceptional",
			count: "Based on Booking.com reviews",
			items: [
				{
					text: "Perfect location for karting — Franciacorta track is very close. Clean, modern, great parking.",
					author: "Guest from Germany",
				},
				{
					text: "Lovely balcony and garden views. Host was helpful with local tips for Lake Garda.",
					author: "Guest from Poland",
				},
				{
					text: "Great value compared to hotels in Brescia. Kitchen had everything we needed.",
					author: "Guest from Italy",
				},
			],
		},
		contact: {
			title: "Book direct & save",
			subtitle:
				"No platform fees — contact us directly for the best rate. We also list on major booking platforms.",
			form: {
				name: "Your name",
				email: "Email address",
				dates: "Preferred dates",
				message: "Message (optional)",
				submit: "Send inquiry",
				note: "We typically reply within 24 hours.",
			},
			platforms: {
				booking: "Booking.com",
				airbnb: "Airbnb",
			},
			directBenefit: "Direct booking is cheaper than Booking or Airbnb.",
			address: "Via Onzato, 16/2 · 25030 Castel Mella (BS) · Italy",
			checkIn: "Check-in 14:00–20:00 · Check-out until 10:00",
		},
		footer: {
			rights: "All rights reserved.",
			license: "License 017042-LNI-00002",
		},
	},
	it: {
		meta: {
			title: "Karting Apartment | Castel Mella, Lombardia",
			description:
				"Appartamento moderno vicino a Franciacorta, Lago di Garda e piste kart. Prenota diretto — risparmia sulle commissioni. Parcheggio gratuito, WiFi, balcone con vista giardino.",
		},
		nav: {
			nearby: "Dintorni",
			gallery: "Galleria",
			about: "Chi siamo",
			amenities: "Servizi",
			reviews: "Recensioni",
			contact: "Contatti",
			book: "Prenota diretto",
		},
		hero: {
			eyebrow: "Castel Mella · Lombardia · Italia",
			title: "La tua base per il Nord Italia",
			subtitle:
				"Un appartamento luminoso tra le colline del Franciacorta, il Lago di Garda e piste kart di livello mondiale — con parcheggio gratuito e balcone con vista giardino.",
			ctaPrimary: "Prenota diretto — miglior prezzo",
			ctaSecondary: "Scopri la zona",
			pinLabel: "Karting Apartment",
			attractionTypes: {
				motorsport: "Circuiti kart",
				airports: "Aeroporti",
				cities: "Città",
				lakes: "Laghi",
				wine: "Regione vinicola",
			},
		},
		nearby: {
			title: "Esplora la regione",
			subtitle:
				"Aeroporti, laghi, città e circuiti — tutti facilmente raggiungibili.",
			km: "km",
			categories: {
				airports: "Aeroporti",
				attractions: "Attrazioni",
				racing: "Circuiti e kart",
			},
		},
		gallery: {
			title: "L'appartamento",
			subtitle: "60 m² di comfort — balcone, cucina e vista giardino.",
			viewAll: "Vedi tutte le {count} foto",
			showMore: "+{count} altre",
			photoOf: "{current} / {total}",
			close: "Chiudi galleria",
			previous: "Foto precedente",
			next: "Foto successiva",
		},
		about: {
			title: "Karting Apartment",
			p1: "Karting Apartment è un monolocale con soggiorno a Castel Mella, tranquilla cittadina in provincia di Brescia. Ideale per coppie e appassionati di motorsport in Lombardia.",
			p2: "Cucina attrezzata, aria condizionata, parcheggio privato gratuito e balcone con vista giardino. La Franciacorta Karting Track è a pochi minuti.",
			stats: {
				size: "60 m²",
				bedrooms: "1 camera",
				guests: "Fino a 3 ospiti",
				rating: "Valutazione 9.7",
			},
		},
		amenities: {
			title: "Servizi",
			groups: {
				essentials: "Essenziali",
				comfort: "Comfort",
				services: "Servizi",
				activities: "Attività",
			},
			items: {
				wifi: "WiFi gratuito",
				parking: "Parcheggio privato gratuito",
				ac: "Aria condizionata",
				kitchen: "Cucina attrezzata",
				washer: "Lavatrice",
				balcony: "Balcone con vista giardino",
				nonSmoking: "Non fumatori",
				allergyFree: "Camere anallergiche",
				shuttle: "Navetta aeroporto (a pagamento)",
				bikes: "Noleggio biciclette",
				restaurant: "Ristorante in loco",
				cycling: "Ciclismo ed escursioni",
			},
		},
		reviews: {
			title: "Recensioni degli ospiti",
			score: "9.7",
			label: "Eccezionale",
			count: "Basato su recensioni Booking.com",
			items: [
				{
					text: "Posizione perfetta per il kart — la pista di Franciacorta è vicinissima. Pulito, moderno, ottimo parcheggio.",
					author: "Ospite dalla Germania",
				},
				{
					text: "Balcone incantevole con vista giardino. Host disponibile con consigli per il Lago di Garda.",
					author: "Ospite dalla Polonia",
				},
				{
					text: "Ottimo rapporto qualità-prezzo rispetto agli hotel a Brescia. Cucina completa di tutto.",
					author: "Ospite dall'Italia",
				},
			],
		},
		contact: {
			title: "Prenota diretto e risparmia",
			subtitle:
				"Nessuna commissione — contattaci per la migliore tariffa. Siamo anche su Booking e Airbnb.",
			form: {
				name: "Il tuo nome",
				email: "Indirizzo email",
				dates: "Date preferite",
				message: "Messaggio (opzionale)",
				submit: "Invia richiesta",
				note: "Di solito rispondiamo entro 24 ore.",
			},
			platforms: {
				booking: "Booking.com",
				airbnb: "Airbnb",
			},
			directBenefit:
				"La prenotazione diretta costa meno di Booking o Airbnb.",
			address: "Via Onzato, 16/2 · 25030 Castel Mella (BS) · Italia",
			checkIn: "Check-in 14:00–20:00 · Check-out entro le 10:00",
		},
		footer: {
			rights: "Tutti i diritti riservati.",
			license: "Licenza 017042-LNI-00002",
		},
	},
	pl: {
		meta: {
			title: "Karting Apartment | Castel Mella, Lombardia",
			description:
				"Nowoczesny apartament blisko Franciacorty, Jeziora Garda i torów kartingowych. Rezerwuj bezpośrednio — oszczędzaj na prowizjach. Darmowy parking, WiFi, balkon z widokiem na ogród.",
		},
		nav: {
			nearby: "Okolica",
			gallery: "Galeria",
			about: "O nas",
			amenities: "Udogodnienia",
			reviews: "Opinie",
			contact: "Kontakt",
			book: "Rezerwuj bezpośrednio",
		},
		hero: {
			eyebrow: "Castel Mella · Lombardia · Włochy",
			title: "Twoja baza na północy Włoch",
			subtitle:
				"Jasny apartament między wzgórzami Franciacorty, Jeziorem Garda a światowej klasy torami kartingowymi — z darmowym parkingiem i balkonem z widokiem na ogród.",
			ctaPrimary: "Rezerwuj bezpośrednio — najlepsza cena",
			ctaSecondary: "Poznaj okolicę",
			pinLabel: "Karting Apartment",
			attractionTypes: {
				motorsport: "Tory kartingowe",
				airports: "Lotniska",
				cities: "Miasta",
				lakes: "Jeziora",
				wine: "Region winiarski",
			},
		},
		nearby: {
			title: "Odkryj region",
			subtitle:
				"Lotniska, jeziora, miasta i tory wyścigowe — wszystko w zasięgu ręki.",
			km: "km",
			categories: {
				airports: "Lotniska",
				attractions: "Atrakcje",
				racing: "Tory wyścigowe",
			},
		},
		gallery: {
			title: "Wnętrze apartamentu",
			subtitle: "60 m² komfortu — balkon, kuchnia i widok na ogród.",
			viewAll: "Zobacz wszystkie {count} zdjęć",
			showMore: "+{count} więcej",
			photoOf: "{current} / {total}",
			close: "Zamknij galerię",
			previous: "Poprzednie zdjęcie",
			next: "Następne zdjęcie",
		},
		about: {
			title: "O Karting Apartment",
			p1: "Karting Apartment to apartament z jedną sypialnią w Castel Mella, spokojnej miejscowości w prowincji Brescia. Idealny dla par i fanów motorsportu odwiedzających Lombardię.",
			p2: "W pełni wyposażona kuchnia, klimatyzacja, darmowy parking prywatny i balkon z widokiem na ogród. Tor Franciacorta Karting Track jest kilka minut drogi.",
			stats: {
				size: "60 m²",
				bedrooms: "1 sypialnia",
				guests: "Do 3 gości",
				rating: "Ocena 9.7",
			},
		},
		amenities: {
			title: "Udogodnienia",
			groups: {
				essentials: "Podstawowe",
				comfort: "Komfort",
				services: "Usługi",
				activities: "Aktywności",
			},
			items: {
				wifi: "Darmowe WiFi",
				parking: "Darmowy parking prywatny",
				ac: "Klimatyzacja",
				kitchen: "W pełni wyposażona kuchnia",
				washer: "Pralka",
				balcony: "Balkon z widokiem na ogród",
				nonSmoking: "Dla niepalących",
				allergyFree: "Pokój antyalergiczny",
				shuttle: "Transfer lotniskowy (płatny)",
				bikes: "Wypożyczalnia rowerów",
				restaurant: "Restauracja na miejscu",
				cycling: "Rower i trekking w okolicy",
			},
		},
		reviews: {
			title: "Opinie gości",
			score: "9.7",
			label: "Wyjątkowy",
			count: "Na podstawie opinii Booking.com",
			items: [
				{
					text: "Idealna lokalizacja na karting — tor Franciacorta bardzo blisko. Czysto, nowocześnie, świetny parking.",
					author: "Gość z Niemiec",
				},
				{
					text: "Piękny balkon z widokiem na ogród. Gospodarz pomocny z tipami na Jezioro Garda.",
					author: "Gość z Polski",
				},
				{
					text: "Świetny stosunek jakości do ceny w porównaniu z hotelami w Brescii. Kuchnia kompletna.",
					author: "Gość z Włoch",
				},
			],
		},
		contact: {
			title: "Rezerwuj bezpośrednio i oszczędzaj",
			subtitle:
				"Bez prowizji platform — skontaktuj się po najlepszej cenie. Jesteśmy też na Booking i Airbnb.",
			form: {
				name: "Imię i nazwisko",
				email: "Adres e-mail",
				dates: "Preferowane daty",
				message: "Wiadomość (opcjonalnie)",
				submit: "Wyślij zapytanie",
				note: "Odpowiadamy zazwyczaj w ciągu 24 godzin.",
			},
			platforms: {
				booking: "Booking.com",
				airbnb: "Airbnb",
			},
			directBenefit:
				"Rezerwacja bezpośrednia jest tańsza niż Booking czy Airbnb.",
			address: "Via Onzato, 16/2 · 25030 Castel Mella (BS) · Włochy",
			checkIn: "Zameldowanie 14:00–20:00 · Wymeldowanie do 10:00",
		},
		footer: {
			rights: "Wszelkie prawa zastrzeżone.",
			license: "Licencja 017042-LNI-00002",
		},
	},
} as const;

export function t(locale: Locale) {
	return translations[locale];
}
