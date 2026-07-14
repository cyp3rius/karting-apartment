import type { Locale } from "./config";

export type LocalizedString = Record<Locale, string>;

export type TranslationKeys = typeof translations.en;

export const translations = {
	en: {
		meta: {
			title: "Karting Apartment | Castel Mella, Lombardy",
			description:
				"Cozy apartment minutes from world-class karting tracks and international racing events in Lombardy. Lakes, cities and airports close by. Book direct — free parking and WiFi.",
		},
		nav: {
			nearby: "Nearby",
			gallery: "Gallery",
			about: "About",
			amenities: "Amenities",
			reviews: "Reviews",
			contact: "Contact",
			book: "Book direct",
			menuOpen: "Open menu",
			menuClose: "Close menu",
		},
		hero: {
			eyebrow: "Castel Mella · Brescia · Lombardy · Italy",
			titles: [
				"Peaceful Northern Italy, on your doorstep",
				"Rest easy.\nRace close.",
				"Northern Italy, without the rush",
			],
			subtitle:
				"A cozy apartment in peaceful Castel Mella — world-class karting tracks and international racing events minutes away, plus lakes, cities, wine country and airports within easy reach.",
			ctaPrimary: "Book direct — best price",
			ctaSecondary: "Explore the area",
			pinLabel: "Karting Apartment",
			attractionTypes: {
				motorsport: "Karting Tracks",
				airports: "Airports",
				cities: "Cities",
				lakes: "Lakes",
				wine: "Wine Regions",
			},
		},
		nearby: {
			eyebrow: "Karting Apartment",
			title: "Explore the region",
			subtitle:
				"World-class karting tracks, international racing events, airports, lakes and cities — all within easy reach.",
			km: "km",
			categories: {
				airports: "Airports",
				attractions: "Attractions",
				racing: "Karting Tracks",
			},
		},
		gallery: {
			title: "Inside the apartment",
			subtitle: "60 m² of comfort — fully equipped kitchen and a quiet layout.",
			viewAll: "View all {count} photos",
			showMore: "+{count} more",
			photoOf: "{current} / {total}",
			close: "Close gallery",
			previous: "Previous photo",
			next: "Next photo",
		},
		about: {
			eyebrow: "Karting Apartment",
			title: "A calm apartment between the circuits",
			p1: "A cozy apartment in quiet Castel Mella — one bedroom, a living room with kitchenette, and space for up to four guests.",
			p2: "World-class karting tracks and international racing events are minutes away. Lakes, wine country and Lombardy's cities are close by when you step off the circuit.",
			photoBedroom: "Bedroom",
			photoLiving: "Living room",
			stats: {
				size: { value: "60 m²", label: "Total space" },
				bedroom: { value: "1", label: "Bedroom" },
				livingRoom: { value: "1", label: "Living room + kitchenette" },
				guests: { value: "Up to 4", label: "Guests" },
				rating: { value: "9.7", label: "Guest rating" },
			},
		},
		amenities: {
			eyebrow: "Karting Apartment",
			title: "Comfort & convenience",
			subtitle:
				"A fully equipped apartment in quiet Castel Mella — the practical comforts you need for a relaxing stay in Lombardy.",
			groups: {
				essentials: "Essentials",
				comfort: "Comfort",
				services: "Services",
				activities: "Out & about",
			},
			items: {
				wifi: "High-speed WiFi",
				parking: "Free private parking",
				ac: "Air conditioning",
				kitchen: "Fully equipped kitchenette",
				washer: "Washing machine",
				balcony: "Balcony",
				nonSmoking: "Non-smoking throughout",
				allergyFree: "Allergy-friendly",
				shuttle: "Airport shuttle on request",
				bikes: "Bicycle rental",
				restaurant: "Restaurant on site",
				cycling: "Cycling & hiking trails nearby",
			},
		},
		reviews: {
			eyebrow: "Karting Apartment",
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
					text: "Peaceful and welcoming. Host was helpful with local tips for Lake Garda.",
					author: "Guest from Poland",
				},
				{
					text: "Great value compared to hotels in Brescia. Kitchen had everything we needed.",
					author: "Guest from Italy",
				},
			],
		},
		contact: {
			eyebrow: "Karting Apartment",
			title: "Book direct & save",
			subtitle:
				"Send a direct inquiry below — we're also listed on Booking and Airbnb.",
			directBadge: "Best price",
			directBenefit:
				"Direct booking is cheaper than Booking.com or Airbnb — no commission, no middleman.",
			formTitle: "Send a direct inquiry",
			platformsTitle: "Also available on",
			platformsNote:
				"We're also listed on the booking platforms below.",
			form: {
				name: "Your name",
				email: "Email address",
				dateFrom: "Check-in",
				dateTo: "Check-out",
				message: "Message (optional)",
				submit: "Send inquiry",
				note: "We typically reply within 24 hours.",
			},
			platforms: {
				booking: "Booking.com",
				airbnb: "Airbnb",
			},
			address: "Via Onzato, 16/2 · 25030 Castel Mella (BS) · Italy",
			openMap: "Open address in Google Maps",
			checkIn: "Check-in 14:00–20:00 · Check-out until 10:00",
			management: {
				title: "Licensed & professionally managed",
				description:
					"Licensed short-term rental with reliable check-in, cleaning and on-site support throughout your stay.",
				licenseLabel: "Tourist rental license",
				license: "017042-LNI-00002",
				managerLogoAlt: "MI ISEO LAKE HOUSE logo",
			},
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
				"Appartamento accogliente a pochi minuti da piste kart di livello mondiale e eventi internazionali del motorsport in Lombardia. Laghi, città e aeroporti vicini. Prenota diretto — parcheggio gratuito e WiFi.",
		},
		nav: {
			nearby: "Dintorni",
			gallery: "Galleria",
			about: "Chi siamo",
			amenities: "Servizi",
			reviews: "Recensioni",
			contact: "Contatti",
			book: "Prenota diretto",
			menuOpen: "Apri menu",
			menuClose: "Chiudi menu",
		},
		hero: {
			eyebrow: "Castel Mella · Brescia · Lombardia · Italia",
			titles: [
				"Il Nord Italia tranquillo, a portata di mano",
				"Riposa in pace.\nGareggia vicino.",
				"Il Nord Italia, senza fretta",
			],
			subtitle:
				"Un appartamento accogliente nella pace di Castel Mella — piste kart di livello mondiale ed eventi internazionali del motorsport a pochi minuti, con laghi, città, vigneti e aeroporti facilmente raggiungibili.",
			ctaPrimary: "Prenota diretto — miglior prezzo",
			ctaSecondary: "Scopri la zona",
			pinLabel: "Karting Apartment",
			attractionTypes: {
				motorsport: "Piste karting",
				airports: "Aeroporti",
				cities: "Città",
				lakes: "Laghi",
				wine: "Regione vinicola",
			},
		},
		nearby: {
			eyebrow: "Karting Apartment",
			title: "Esplora la regione",
			subtitle:
				"Piste kart di livello mondiale, eventi internazionali del motorsport, aeroporti, laghi e città — tutti facilmente raggiungibili.",
			km: "km",
			categories: {
				airports: "Aeroporti",
				attractions: "Attrazioni",
				racing: "Piste karting",
			},
		},
		gallery: {
			title: "L'appartamento",
			subtitle: "60 m² di comfort — cucina attrezzata e ambienti tranquilli.",
			viewAll: "Vedi tutte le {count} foto",
			showMore: "+{count} altre",
			photoOf: "{current} / {total}",
			close: "Chiudi galleria",
			previous: "Foto precedente",
			next: "Foto successiva",
		},
		about: {
			eyebrow: "Karting Apartment",
			title: "Un appartamento tranquillo tra i circuiti",
			p1: "Un appartamento accogliente nella tranquilla Castel Mella — una camera da letto, un soggiorno con angolo cottura e spazio per fino a quattro ospiti.",
			p2: "Piste kart di livello mondiale ed eventi internazionali del motorsport sono a pochi minuti. Laghi, vigneti e le città della Lombardia sono vicini quando si esce dalla pista.",
			photoBedroom: "Camera da letto",
			photoLiving: "Soggiorno",
			stats: {
				size: { value: "60 m²", label: "Superficie" },
				bedroom: { value: "1", label: "Camera" },
				livingRoom: { value: "1", label: "Soggiorno con angolo cottura" },
				guests: { value: "Fino a 4", label: "Ospiti" },
				rating: { value: "9.7", label: "Valutazione ospiti" },
			},
		},
		amenities: {
			eyebrow: "Karting Apartment",
			title: "Comfort e praticità",
			subtitle:
				"Un appartamento attrezzato nella tranquilla Castel Mella — tutto il necessario per un soggiorno rilassante in Lombardia.",
			groups: {
				essentials: "Essenziali",
				comfort: "Comfort",
				services: "Servizi",
				activities: "Dintorni",
			},
			items: {
				wifi: "WiFi ad alta velocità",
				parking: "Parcheggio privato gratuito",
				ac: "Aria condizionata",
				kitchen: "Angolo cottura attrezzato",
				washer: "Lavatrice",
				balcony: "Balcone",
				nonSmoking: "Interamente non fumatori",
				allergyFree: "Camere anallergiche",
				shuttle: "Navetta aeroporto su richiesta",
				bikes: "Noleggio biciclette",
				restaurant: "Ristorante in loco",
				cycling: "Ciclismo ed escursioni nei dintorni",
			},
		},
		reviews: {
			eyebrow: "Karting Apartment",
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
					text: "Accogliente e tranquillo. Host disponibile con consigli per il Lago di Garda.",
					author: "Ospite dalla Polonia",
				},
				{
					text: "Ottimo rapporto qualità-prezzo rispetto agli hotel a Brescia. Cucina completa di tutto.",
					author: "Ospite dall'Italia",
				},
			],
		},
		contact: {
			eyebrow: "Karting Apartment",
			title: "Prenota diretto e risparmia",
			subtitle:
				"Invia una richiesta diretta — siamo presenti anche su Booking e Airbnb.",
			directBadge: "Miglior prezzo",
			directBenefit:
				"La prenotazione diretta costa meno di Booking.com o Airbnb — nessuna commissione.",
			formTitle: "Invia una richiesta diretta",
			platformsTitle: "Disponibile anche su",
			platformsNote:
				"Siamo presenti anche sulle piattaforme di prenotazione qui sotto.",
			form: {
				name: "Il tuo nome",
				email: "Indirizzo email",
				dateFrom: "Check-in",
				dateTo: "Check-out",
				message: "Messaggio (opzionale)",
				submit: "Invia richiesta",
				note: "Di solito rispondiamo entro 24 ore.",
			},
			platforms: {
				booking: "Booking.com",
				airbnb: "Airbnb",
			},
			address: "Via Onzato, 16/2 · 25030 Castel Mella (BS) · Italia",
			openMap: "Apri l'indirizzo in Google Maps",
			checkIn: "Check-in 14:00–20:00 · Check-out entro le 10:00",
			management: {
				title: "Gestione professionale e licenza",
				description:
					"Affitto turistico con licenza — check-in affidabile, pulizie e assistenza in loco per tutto il soggiorno.",
				licenseLabel: "Licenza affitti turistici",
				license: "017042-LNI-00002",
				managerLogoAlt: "Logo MI ISEO LAKE HOUSE",
			},
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
				"Przytulny apartament kilka minut od torów kartingowych światowej klasy i międzynarodowych wydarzeń wyścigowych na Lombardii. Jeziora, miasta i lotniska w pobliżu. Rezerwuj bezpośrednio — darmowy parking i WiFi.",
		},
		nav: {
			nearby: "Okolica",
			gallery: "Galeria",
			about: "O nas",
			amenities: "Udogodnienia",
			reviews: "Opinie",
			contact: "Kontakt",
			book: "Rezerwuj bezpośrednio",
			menuOpen: "Otwórz menu",
			menuClose: "Zamknij menu",
		},
		hero: {
			eyebrow: "Castel Mella · Brescia · Lombardia · Włochy",
			titles: [
				"Spokojna północ Włoch — na wyciągnięcie ręki",
				"Odpocznij w ciszy.\nŚcigaj się blisko.",
				"Północ Włoch bez pośpiechu",
			],
			subtitle:
				"Przytulny apartament w cichej Castel Mella — tory kartingowe światowej klasy i międzynarodowe wydarzenia wyścigowe w kilka minut, a jeziora, miasta, winnice i lotniska w zasięgu ręki.",
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
			eyebrow: "Karting Apartment",
			title: "Odkryj region",
			subtitle:
				"Tory kartingowe światowej klasy, międzynarodowe wydarzenia wyścigowe, lotniska, jeziora i miasta — wszystko w zasięgu ręki.",
			km: "km",
			categories: {
				airports: "Lotniska",
				attractions: "Atrakcje",
				racing: "Tory kartingowe",
			},
		},
		gallery: {
			title: "Wnętrze apartamentu",
			subtitle: "60 m² komfortu — w pełni wyposażona kuchnia i spokojny układ.",
			viewAll: "Zobacz wszystkie {count} zdjęć",
			showMore: "+{count} więcej",
			photoOf: "{current} / {total}",
			close: "Zamknij galerię",
			previous: "Poprzednie zdjęcie",
			next: "Następne zdjęcie",
		},
		about: {
			eyebrow: "Karting Apartment",
			title: "Spokojny apartament między torami",
			p1: "Przytulny apartament w cichej Castel Mella — sypialnia, salon z aneksem kuchennym i przestrzeń dla maksymalnie czterech osób.",
			p2: "Tory kartingowe światowej klasy i międzynarodowe wydarzenia wyścigowe są w kilka minut. Jeziora, winnice i miasta Lombardii są blisko, gdy schodzisz z toru.",
			photoBedroom: "Sypialnia",
			photoLiving: "Salon",
			stats: {
				size: { value: "60 m²", label: "Powierzchnia" },
				bedroom: { value: "1", label: "Sypialnia" },
				livingRoom: { value: "1", label: "Salon z aneksem kuchennym" },
				guests: { value: "Do 4", label: "Gości" },
				rating: { value: "9.7", label: "Ocena gości" },
			},
		},
		amenities: {
			eyebrow: "Karting Apartment",
			title: "Komfort i wygoda",
			subtitle:
				"Wyposażony apartament w cichej Castel Mella — wszystko, czego potrzebujesz na spokojny pobyt na Lombardii.",
			groups: {
				essentials: "Podstawowe",
				comfort: "Komfort",
				services: "Usługi",
				activities: "Okolica",
			},
			items: {
				wifi: "Szybkie WiFi",
				parking: "Darmowy parking prywatny",
				ac: "Klimatyzacja",
				kitchen: "W pełni wyposażony aneks kuchenny",
				washer: "Pralka",
				balcony: "Balkon",
				nonSmoking: "Całkowicie dla niepalących",
				allergyFree: "Przyjazne alergikom",
				shuttle: "Transfer lotniskowy na życzenie",
				bikes: "Wypożyczalnia rowerów",
				restaurant: "Restauracja na miejscu",
				cycling: "Trasy rowerowe i trekking w okolicy",
			},
		},
		reviews: {
			eyebrow: "Karting Apartment",
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
					text: "Przytulnie i spokojnie. Gospodarz pomocny z tipami na Jezioro Garda.",
					author: "Gość z Polski",
				},
				{
					text: "Świetny stosunek jakości do ceny w porównaniu z hotelami w Brescii. Kuchnia kompletna.",
					author: "Gość z Włoch",
				},
			],
		},
		contact: {
			eyebrow: "Karting Apartment",
			title: "Rezerwuj bezpośrednio i oszczędzaj",
			subtitle:
				"Wyślij zapytanie bezpośrednie — jesteśmy też na Booking i Airbnb.",
			directBadge: "Najlepsza cena",
			directBenefit:
				"Rezerwacja bezpośrednia jest tańsza niż Booking.com czy Airbnb — bez prowizji i pośredników.",
			formTitle: "Wyślij zapytanie bezpośrednie",
			platformsTitle: "Dostępne także na",
			platformsNote:
				"Jesteśmy dostępni także na platformach rezerwacyjnych poniżej.",
			form: {
				name: "Imię i nazwisko",
				email: "Adres e-mail",
				dateFrom: "Check-in",
				dateTo: "Check-out",
				message: "Wiadomość (opcjonalnie)",
				submit: "Wyślij zapytanie",
				note: "Odpowiadamy zazwyczaj w ciągu 24 godzin.",
			},
			platforms: {
				booking: "Booking.com",
				airbnb: "Airbnb",
			},
			address: "Via Onzato, 16/2 · 25030 Castel Mella (BS) · Włochy",
			openMap: "Otwórz adres w Google Maps",
			checkIn: "Zameldowanie 14:00–20:00 · Wymeldowanie do 10:00",
			management: {
				title: "Licencjonowany apartament z profesjonalną obsługą",
				description:
					"Licencjonowany wynajem krótkoterminowy — sprawdzone zameldowanie, sprzątanie i wsparcie na miejscu przez cały pobyt.",
				licenseLabel: "Licencja na wynajem turystyczny",
				license: "017042-LNI-00002",
				managerLogoAlt: "Logo MI ISEO LAKE HOUSE",
			},
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
