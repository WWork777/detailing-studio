"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/Tech";
import { Icon } from "@/components/ui/Icons";
import { MagneticLink } from "@/components/ui/Magnetic";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { Faq } from "@/components/Faq";
import { LANDINGS, type Landing } from "@/lib/landings";

export function ServiceLanding({ data }: { data: Landing }) {
  const others = LANDINGS.filter((l) => l.slug !== data.slug);

  return (
    <main className="relative">
      <Header />

      {/* Hero */}
      <section className="relative flex min-h-[88svh] items-end overflow-hidden bg-ink">
        <div
          className="absolute inset-0 scale-105"
          style={{ backgroundImage: `url(${data.hero})`, backgroundSize: "cover", backgroundPosition: "center" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/85 to-transparent" />
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />

        <div className="relative mx-auto w-full max-w-7xl px-5 pb-16 pt-28 md:px-8 md:pb-20 md:pt-32">
          {/* breadcrumbs */}
          <nav className="mono mb-6 flex flex-wrap items-center gap-2 text-[0.65rem] uppercase text-muted-soft sm:text-[0.7rem]">
            <a href="/" className="hover:text-acid">Главная</a>
            <span>/</span>
            <span className="text-muted">{data.service}</span>
          </nav>

          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-acid" />
            <span className="eyebrow">Детейлинг-центр в Кемерово</span>
          </div>

          <h1 className="display landing-title text-white-pure">
            {data.h1}
          </h1>
          <p className="mt-5 max-w-xl text-base text-muted md:text-lg">{data.lead}</p>

          {/* quick facts */}
          <div className="mt-9 grid gap-3 sm:flex sm:flex-wrap">
            {[
              { k: "Цена", v: `от ${data.priceFrom}` },
              { k: "Срок", v: data.duration },
              { k: "Гарантия", v: data.warranty },
            ].map((f) => (
              <div key={f.k} className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 backdrop-blur">
                <div className="mono text-[0.65rem] uppercase tracking-[0.16em] text-muted-soft">{f.k}</div>
                <div className="display mt-1 text-lg text-white-pure">{f.v}</div>
              </div>
            ))}
          </div>

          <MagneticLink
            href="#footer"
            className="display adaptive-cta mt-9 inline-flex w-full items-center gap-2 rounded-full px-5 py-3.5 text-sm text-white-pure sm:w-auto sm:px-7 sm:text-base"
          >
            Записаться на {data.service.toLowerCase()} →
          </MagneticLink>
        </div>
      </section>

      {/* Benefits */}
      <section className="relative overflow-hidden border-t border-white/5 bg-graphite py-20 md:py-28">
        <div className="pointer-events-none absolute inset-0 grid-bg grid-bg-fade opacity-50" />
        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          <Reveal>
            <SectionLabel index="01">Преимущества</SectionLabel>
            <h2 className="display section-title mt-5 text-white-pure">
              Почему стоит выбрать {data.service.toLowerCase()} в студии «Автореконструкция»
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {data.benefits.map((b, i) => (
              <AnimatedCard
                key={b.title}
                delay={0.08 * i}
                className="neon-hover group relative h-full overflow-hidden rounded-2xl border border-white/8 bg-ink/60 p-5 panel-glow sm:p-6 lg:p-7"
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-acid transition-all duration-500 group-hover:border-acid/40 group-hover:bg-acid/5">
                  <Icon name={data.icon} />
                </span>
                <h3 className="display card-title mt-6 text-lg text-white-pure">{b.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">{b.desc}</p>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* What's included + SEO text */}
      <section className="relative overflow-hidden border-t border-white/5 bg-ink py-20 md:py-28">
        <div className="pointer-events-none absolute inset-0 grid-bg grid-bg-fade opacity-40" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-[1fr_1.1fr]">
          {/* includes */}
          <Reveal>
            <SectionLabel index="02">Что входит</SectionLabel>
            <ul className="mt-7 space-y-3">
              {data.includes.map((item) => (
                <li
                  key={item}
                className="flex items-start gap-4 rounded-xl border border-white/8 bg-white/[0.02] px-5 py-4 text-white-pure transition-colors hover:border-acid/30"
                >
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-acid/40 text-xs text-acid">
                    <Icon name="check" width={14} height={14} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* seo text */}
          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-white/8 bg-neutral-900/40 p-5 backdrop-blur-md sm:p-7 md:p-9">
              <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted">
                {data.seoText.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ (uses landing-specific questions via prop) */}
      <Faq items={data.faq} title={`${data.service} в Кемерово — частые вопросы`} />

      {/* Other services */}
      <section className="relative overflow-hidden border-t border-white/5 bg-graphite py-20">
        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          <SectionLabel index="08">Другие услуги</SectionLabel>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {others.map((o, i) => (
              <AnimatedCard
                key={o.slug}
                href={`/${o.slug}`}
                delay={0.05 * i}
                className="neon-hover group flex min-w-0 items-center justify-between gap-4 rounded-2xl border border-white/8 bg-ink/60 p-5 sm:p-6"
              >
                <span className="flex min-w-0 items-center gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-white/10 text-acid transition-all duration-500 group-hover:border-acid/40 group-hover:bg-acid/5">
                    <Icon name={o.icon} width={20} height={20} />
                  </span>
                  <span className="display card-title text-base text-white-pure">{o.service}</span>
                </span>
                <span className="text-muted-soft transition-all duration-500 group-hover:translate-x-1 group-hover:text-acid">→</span>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
