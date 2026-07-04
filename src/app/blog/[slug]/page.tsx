import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/Tech";
import { BLOG_ARTICLES, blogUrl, getBlogArticle } from "@/lib/blog";
import { SITE } from "@/lib/seo";

export function generateStaticParams() {
  return BLOG_ARTICLES.map((article) => ({ slug: article.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getBlogArticle(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.description,
    keywords: article.keywords,
    alternates: { canonical: blogUrl(article.slug) },
    openGraph: {
      type: "article",
      locale: "ru_RU",
      url: blogUrl(article.slug),
      siteName: SITE.name,
      title: article.title,
      description: article.description,
      publishedTime: article.date,
      images: [{ url: article.cover, width: 1200, height: 630, alt: article.title }],
    },
  };
}

function articleJsonLd(slug: string) {
  const article = getBlogArticle(slug)!;
  const articleUrl = blogUrl(article.slug);

  const blogPosting = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    image: `${SITE.url}${article.cover}`,
    datePublished: article.date,
    dateModified: article.date,
    author: { "@type": "Organization", name: SITE.shortName },
    publisher: { "@type": "AutoDetailing", name: SITE.name, "@id": `${SITE.url}/#business` },
    mainEntityOfPage: articleUrl,
    keywords: article.keywords.join(", "),
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Блог", item: blogUrl() },
      { "@type": "ListItem", position: 3, name: article.title, item: articleUrl },
    ],
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: article.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return [blogPosting, breadcrumb, faq];
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getBlogArticle(slug);
  if (!article) notFound();

  const related = BLOG_ARTICLES.filter((item) => item.slug !== article.slug).slice(0, 3);

  return (
    <main className="relative">
      {articleJsonLd(slug).map((obj, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }}
        />
      ))}
      <Header />

      <article>
        <section className="relative flex min-h-[78svh] items-end overflow-hidden bg-ink">
          <div
            className="absolute inset-0 scale-105 bg-cover bg-center"
            style={{ backgroundImage: `url(${article.cover})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/90 to-ink/20" />
          <div className="pointer-events-none absolute inset-0 grid-bg opacity-35" />

          <div className="relative mx-auto w-full max-w-7xl px-5 pb-14 pt-28 md:px-8 md:pb-20 md:pt-36">
            <nav className="mono mb-6 flex flex-wrap items-center gap-2 text-[0.65rem] uppercase text-muted-soft sm:text-[0.7rem]">
              <a href="/" className="hover:text-acid">Главная</a>
              <span>/</span>
              <a href="/blog" className="hover:text-acid">Блог</a>
              <span>/</span>
              <span className="text-muted">{article.category}</span>
            </nav>

            <Reveal>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-10 bg-acid" />
                <span className="eyebrow">{article.category} / {article.readTime}</span>
              </div>
              <h1 className="display landing-title max-w-5xl text-white-pure">
                {article.title}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
                {article.lead}
              </p>
            </Reveal>
          </div>
        </section>

        <section className="relative overflow-hidden border-t border-white/5 bg-graphite py-16 md:py-24">
          <div className="pointer-events-none absolute inset-0 grid-bg grid-bg-fade opacity-35" />
          <div className="relative mx-auto grid max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-[0.78fr_1.22fr]">
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <Reveal>
                <div className="rounded-2xl border border-white/8 bg-ink/70 p-5 sm:p-6">
                  <SectionLabel index="01">Коротко</SectionLabel>
                  <ul className="mt-5 space-y-3">
                    {article.takeaways.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-acid" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </aside>

            <div className="space-y-12">
              {article.sections.map((section, index) => (
                <Reveal key={section.heading} delay={0.05 * index}>
                  <section className="rounded-2xl border border-white/8 bg-ink/60 p-5 sm:p-7 md:p-9">
                    <span className="mono text-[0.7rem] uppercase tracking-[0.2em] text-acid">
                      0{index + 1}
                    </span>
                    <h2 className="display card-title mt-4 text-2xl text-white-pure md:text-3xl">
                      {section.heading}
                    </h2>
                    <div className="mt-5 space-y-4 text-base leading-relaxed text-muted">
                      {section.body.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </section>
                </Reveal>
              ))}

              <Reveal>
                <section className="rounded-2xl border border-acid/20 bg-acid/[0.04] p-5 sm:p-7 md:p-9">
                  <h2 className="display card-title text-2xl text-white-pure md:text-3xl">
                    Частые вопросы
                  </h2>
                  <div className="mt-6 divide-y divide-white/8">
                    {article.faq.map((item) => (
                      <div key={item.q} className="py-5 first:pt-0 last:pb-0">
                        <h3 className="font-semibold text-white-pure">{item.q}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted">{item.a}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </Reveal>
            </div>
          </div>
        </section>
      </article>

      <section className="relative overflow-hidden border-t border-white/5 bg-ink py-16 md:py-20">
        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          <SectionLabel index="MORE">Еще по теме</SectionLabel>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {related.map((item) => (
              <a
                key={item.slug}
                href={`/blog/${item.slug}`}
                className="group rounded-2xl border border-white/8 bg-white/[0.03] p-5 transition-all duration-500 hover:-translate-y-1 hover:border-acid/35"
              >
                <span className="mono text-[0.65rem] uppercase tracking-[0.2em] text-acid">
                  {item.category}
                </span>
                <span className="display card-title mt-4 block text-lg text-white-pure">
                  {item.title}
                </span>
                <span className="mt-4 inline-flex text-sm text-muted transition-colors group-hover:text-acid">
                  Читать →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
