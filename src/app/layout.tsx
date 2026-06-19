import type { Metadata } from "next";
import "./globals.css";
import { SITE, KEYWORDS, localBusinessJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Детейлинг в Кемерово — студия OBSIDIAN | керамика, полировка, оклейка",
    template: "%s | OBSIDIAN Кемерово",
  },
  description:
    "Детейлинг-центр OBSIDIAN в Кемерово: керамическое покрытие 9H, полировка кузова и фар, оклейка антигравийной плёнкой, химчистка салона и предпродажная подготовка. Бесплатная диагностика ЛКП. Запись по телефону.",
  keywords: KEYWORDS,
  applicationName: SITE.shortName,
  authors: [{ name: SITE.shortName }],
  alternates: { canonical: SITE.url },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: SITE.url,
    siteName: SITE.name,
    title: "Детейлинг в Кемерово — студия OBSIDIAN",
    description:
      "Керамика, полировка, оклейка плёнкой и химчистка авто в Кемерово. Премиальный детейлинг-центр OBSIDIAN.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Детейлинг OBSIDIAN Кемерово" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Детейлинг в Кемерово — студия OBSIDIAN",
    description: "Керамика, полировка, оклейка плёнкой и химчистка авто в Кемерово.",
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  other: {
    "geo.region": "RU-KEM",
    "geo.placename": SITE.city,
    "geo.position": `${SITE.geo.lat};${SITE.geo.lon}`,
    ICBM: `${SITE.geo.lat}, ${SITE.geo.lon}`,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Unbounded:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }}
        />
      </head>
      <body className="grain antialiased">{children}</body>
    </html>
  );
}
