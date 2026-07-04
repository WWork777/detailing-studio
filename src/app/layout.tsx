import type { Metadata } from "next";
import "./globals.css";
import { SITE, KEYWORDS, localBusinessJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Детейлинг Кемерово — химчистка салона, полировка, бронепленка | Автореконструкция",
    template: "%s | Автореконструкция Кемерово",
  },
  description:
    "Детейлинг авто в Кемерово: химчистка салона, полировка кузова и фар, бронепленка PPF, оклейка авто пленкой, керамическое покрытие и защита кузова. Бесплатная диагностика ЛКП и расчет цены.",
  keywords: KEYWORDS,
  applicationName: SITE.shortName,
  authors: [{ name: SITE.shortName }],
  alternates: { canonical: SITE.url },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: SITE.url,
    siteName: SITE.name,
    title: "Детейлинг Кемерово — химчистка, полировка, бронепленка",
    description:
      "Детейлинг-центр «Автореконструкция»: химчистка салона, полировка авто, полировка фар, бронепленка, оклейка пленкой и защита кузова в Кемерово.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Детейлинг Автореконструкция Кемерово" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Детейлинг Кемерово — химчистка, полировка, пленка",
    description: "Химчистка салона, полировка кузова и фар, бронепленка и оклейка авто пленкой в Кемерово.",
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
    <html lang="ru" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var t=localStorage.getItem('autoreconstruction-theme');if(!t){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='dark'}",
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Unbounded:wght@300;400;500;600;700;800&display=swap"
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
