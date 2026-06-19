"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { Corners, Marker, SectionLabel } from "@/components/ui/Tech";
import { Icon } from "@/components/ui/Icons";
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

        <div className="relative mx-auto w-full max-w-7xl px-5 pb-20 pt-32 md:px-8">
          {/* breadcrumbs */}
          <nav className="mono mb-6 flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.18em] text-muted-soft">
            <a href="/" className="hover:text-acid">Главная</a>
            <span>/</span>
            <span className="text-muted">{data.service}</span>
          </nav>

          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-acid" />
            <span className="eyebrow">Детейлинг-центр в Кемерово</span>
          </div>

          <h1 className="display max-w-3xl text-[clamp(2.2rem,6vw,4.6rem)] text-white-pure">
            {data.h1}
          </h1>
          <p className="mt-5 max-w-xl text-base text-muted md:text-lg">{data.lead}</p>

          {/* quick facts */}
          <div className="mt-9 flex flex-wrap gap-3">
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

          <a
            href="#footer"
            className="display mt-9 inline-flex items-center gap-2 rounded-full bg-acid px-7 py-3.5 tracking-tight text-ink shadow-[0_0_24px_rgba(194,255,46,0.3)] transition-transform duration-300 hover:scale-[1.02]"
          >
            Записаться на {data.service.toLowerCase()} →
          </a>
        </div>
      </section>

      {/* Benefits */}
      <section className="relative overflow-hidden border-t border-white/5 bg-graphite py-24 md:py-32">
        <div className="pointer-events-none absolute inset-0 grid-bg grid-bg-fade opacity-50" />
        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          <Reveal>
            <SectionLabel index="01">Преимущества</SectionLabel>
            <h2 className="display mt-5 text-[clamp(1.8rem,4.5vw,3.2rem)] text-white-pure">
              Почему стоит выбрать {data.service.toLowerCase()} в OBSIDIAN
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {data.benefits.map((b, i) => (
              <Reveal key={b.title} delay={0.07 * i}>
                <div className="neon-hover group relative h-full overflow-hidden rounded-2xl border border-white/8 bg-ink/60 p-7 panel-glow">
                  <Corners className="inset-2.5 opacity-20 transition-opacity duration-300 group-hover:opacity-90" />
                  <span className="grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-acid">
                    <Icon name={data.icon} />
                  </span>
                  <h3 className="display mt-6 text-lg leading-tight text-white-pure">{b.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">{b.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* What's included + SEO text */}
      <section className="relative overflow-hidden border-t border-white/5 bg-ink py-24 md:py-32">
        <div className="pointer-events-none absolute inset-0 grid-bg grid-bg-fade opacity-40" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-[1fr_1.1fr]">
          {/* includes */}
          <Reveal>
            <SectionLabel index="02">Что входит</SectionLabel>
            <ul className="mt-7 space-y-3">
              {data.includes.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-4 rounded-xl border border-white/8 bg-white/[0.02] px-5 py-4 text-white-pure transition-colors hover:border-acid/30"
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
            <div className="rounded-2xl border border-white/8 bg-neutral-900/40 p-7 backdrop-blur-md md:p-9">
              <Marker className="block text-acid/70">// {data.service.toUpperCase()} · KEMEROVO</Marker>
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
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {others.map((o) => (
              <a
                key={o.slug}
                href={`/${o.slug}`}
                className="neon-hover group flex items-center justify-between rounded-2xl border border-white/8 bg-ink/60 p-6"
              >
                <span className="flex items-center gap-4">
                  <span className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 text-acid">
                    <Icon name={o.icon} width={20} height={20} />
                  </span>
                  <span className="display text-base text-white-pure">{o.service}</span>
                </span>
                <span className="text-muted-soft transition-all group-hover:translate-x-1 group-hover:text-acid">→</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
