import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceLanding } from "@/components/ServiceLanding";
import { LANDINGS, getLanding, landingUrl } from "@/lib/landings";
import { SITE } from "@/lib/seo";

export function generateStaticParams() {
  return LANDINGS.map((l) => ({ slug: l.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = getLanding(slug);
  if (!data) return {};

  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords,
    alternates: { canonical: landingUrl(slug) },
    openGraph: {
      type: "website",
      locale: "ru_RU",
      url: landingUrl(slug),
      siteName: SITE.name,
      title: data.title,
      description: data.description,
      images: [{ url: data.hero, width: 1200, height: 630, alt: data.h1 }],
    },
  };
}

function jsonLd(slug: string) {
  const data = getLanding(slug)!;
  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: data.h1,
    serviceType: data.service,
    description: data.description,
    areaServed: { "@type": "City", name: SITE.city },
    provider: { "@type": "AutoDetailing", name: SITE.name, "@id": `${SITE.url}/#business` },
    url: landingUrl(slug),
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: SITE.url },
      { "@type": "ListItem", position: 2, name: data.service, item: landingUrl(slug) },
    ],
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return [service, breadcrumb, faq];
}

export default async function LandingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = getLanding(slug);
  if (!data) notFound();

  return (
    <>
      {jsonLd(slug).map((obj, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }}
        />
      ))}
      <ServiceLanding data={data} />
    </>
  );
}
