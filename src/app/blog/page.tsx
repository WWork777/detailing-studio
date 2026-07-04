import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/Tech";
import { BLOG_ARTICLES, blogUrl } from "@/lib/blog";
import { SITE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Блог о детейлинге авто в Кемерово",
  description:
    "Полезные статьи студии «Автореконструкция»: детейлинг, полировка кузова и фар, химчистка салона, бронепленка PPF, керамика и защита кузова в Кемерово.",
  alternates: { canonical: blogUrl() },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: blogUrl(),
    siteName: SITE.name,
    title: "Блог о детейлинге авто в Кемерово",
    description:
      "Практичный гид по уходу за автомобилем: полировка, химчистка, керамика, PPF и защита кузова в Кемерово.",
    images: [{ url: "/images/hero-ceramic.jpg", width: 1200, height: 630, alt: "Блог Автореконструкция" }],
  },
};

function blogJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Блог студии «Автореконструкция»",
    description: metadata.description,
    url: blogUrl(),
    publisher: { "@type": "AutoDetailing", name: SITE.name, "@id": `${SITE.url}/#business` },
    blogPost: BLOG_ARTICLES.map((article) => ({
      "@type": "BlogPosting",
      headline: article.title,
      description: article.description,
      url: blogUrl(article.slug),
      datePublished: article.date,
      image: `${SITE.url}${article.cover}`,
    })),
  };
}

export default function BlogPage() {
  return (
    <main className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd()) }}
      />
      <Header />

      <section className="relative overflow-hidden bg-ink pb-16 pt-28 md:pb-20 md:pt-36">
        <div className="pointer-events-none absolute inset-0 grid-bg grid-bg-fade opacity-45" />
        <div className="pointer-events-none absolute -right-24 top-12 h-72 w-72 rounded-full bg-brand-blue/20 blur-[120px]" />
        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          <Reveal>
            <SectionLabel index="BLOG">Детейлинг-гид</SectionLabel>
            <h1 className="display section-title mt-5 max-w-5xl text-white-pure">
              Блог о детейлинге авто в Кемерово
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
              9 практичных статей о полировке кузова и фар, химчистке салона, бронепленке,
              керамике, оклейке пленкой, реставрации и подготовке авто к продаже.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-white/5 bg-graphite py-16 md:py-24">
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-30" />
        <div className="relative mx-auto grid max-w-7xl gap-5 px-5 md:grid-cols-2 md:px-8 lg:grid-cols-3">
          {BLOG_ARTICLES.map((article, index) => (
            <Reveal key={article.slug} delay={0.04 * index} className="h-full">
              <a
                href={`/blog/${article.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/8 bg-ink/70 transition-all duration-500 hover:-translate-y-1 hover:border-acid/35 hover:shadow-[0_22px_70px_-38px_rgba(236,20,44,0.55)]"
              >
                <span
                  className="block aspect-[16/10] bg-cover bg-center"
                  style={{ backgroundImage: `url(${article.cover})` }}
                />
                <span className="flex flex-1 flex-col p-5 sm:p-6">
                  <span className="mono text-[0.65rem] uppercase tracking-[0.2em] text-acid">
                    {article.category} / {article.readTime}
                  </span>
                  <span className="display card-title mt-4 text-xl text-white-pure">
                    {article.title}
                  </span>
                  <span className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                    {article.excerpt}
                  </span>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white-pure transition-colors group-hover:text-acid">
                    Читать статью <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
