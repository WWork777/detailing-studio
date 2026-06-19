// Centralised SEO config for the Kemerovo detailing studio.
// Frequencies are estimates — verify exact numbers in Yandex Wordstat.

export const SITE = {
  name: "OBSIDIAN — детейлинг-центр в Кемерово",
  shortName: "OBSIDIAN",
  url: "https://obsidian-kemerovo.ru",
  city: "Кемерово",
  region: "Кемеровская область",
  phone: "+7 (3842) 00-00-00",
  phoneHref: "tel:+73842000000",
  email: "studio@obsidian-kemerovo.ru",
  street: "пр. Кузнецкий, 100",
  postalCode: "650000",
  geo: { lat: 55.3547, lon: 86.0873 },
  priceRange: "₽₽₽",
  openingHours: "Ежедневно 09:00–21:00",
};

// Semantic core — target search queries (Kemerovo).
export const KEYWORDS: string[] = [
  "детейлинг кемерово",
  "детейлинг центр кемерово",
  "детейлинг авто кемерово",
  "автодетейлинг кемерово",
  "керамическое покрытие кемерово",
  "керамика на авто кемерово",
  "нанокерамика кемерово",
  "полировка кузова кемерово",
  "полировка авто кемерово",
  "полировка фар кемерово",
  "оклейка авто плёнкой кемерово",
  "антигравийная плёнка кемерово",
  "бронепленка кемерово",
  "оклейка ппф кемерово",
  "химчистка салона кемерово",
  "химчистка авто кемерово",
  "реставрация кожи салона кемерово",
  "защита кузова кемерово",
  "предпродажная подготовка авто кемерово",
];

export const FAQ: { q: string; a: string }[] = [
  {
    q: "Сколько стоит детейлинг в Кемерово?",
    a: "Стоимость детейлинга в Кемерово зависит от состояния автомобиля и выбранного протокола. Базовая полировка кузова — от 8 000 ₽, керамическое покрытие — от 18 000 ₽. Точную цену называем после бесплатной диагностики ЛКП в нашем боксе.",
  },
  {
    q: "Чем керамическое покрытие лучше обычной полировки?",
    a: "Полировка убирает дефекты лака, а керамика на авто закрепляет результат: создаёт гидрофобный защитный слой твёрдостью 9H, который держится несколько лет и защищает кузов от реагентов, песка и выгорания.",
  },
  {
    q: "Делаете ли вы оклейку авто плёнкой в Кемерово?",
    a: "Да. Выполняем оклейку антигравийной полиуретановой плёнкой (PPF) и виниловую оклейку по лекалам — как отдельных элементов, так и кузова целиком. Плёнка самовосстанавливается и сохраняет заводской ЛКП.",
  },
  {
    q: "Сколько времени занимает детейлинг автомобиля?",
    a: "Экспресс-полировка — 4–6 часов, комплексный детейлинг с керамикой — от 1 до 3 суток. Автомобиль всё это время находится на закрытой охраняемой территории под видеонаблюдением.",
  },
  {
    q: "Где находится детейлинг-центр OBSIDIAN в Кемерово?",
    a: `Мы работаем по адресу ${SITE.city}, ${SITE.street}. ${SITE.openingHours}. Запишитесь по телефону ${SITE.phone} — проведём бесплатную консультацию и диагностику.`,
  },
];

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "AutoDetailing",
    "@id": `${SITE.url}/#business`,
    name: SITE.name,
    image: `${SITE.url}/og.jpg`,
    url: SITE.url,
    telephone: SITE.phone,
    email: SITE.email,
    priceRange: SITE.priceRange,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.street,
      addressLocality: SITE.city,
      addressRegion: SITE.region,
      postalCode: SITE.postalCode,
      addressCountry: "RU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.lat,
      longitude: SITE.geo.lon,
    },
    areaServed: { "@type": "City", name: SITE.city },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "09:00",
      closes: "21:00",
    },
    makesOffer: [
      "Детейлинг кузова",
      "Керамическое покрытие 9H",
      "Оклейка антигравийной плёнкой (PPF)",
      "Полировка фар",
      "Химчистка салона",
      "Предпродажная подготовка",
    ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
  };
}

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
