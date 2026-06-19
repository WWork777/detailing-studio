"use client";

import { Reveal } from "@/components/ui/Reveal";
import { BeforeAfter } from "@/components/BeforeAfter";
import { SectionLabel } from "@/components/ui/Tech";
import { CASES } from "@/lib/data";

export function Portfolio() {
  const featured = CASES[0];

  return (
    <section
      id="portfolio"
      className="relative overflow-hidden border-t border-white/5 bg-ink py-24 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0 grid-bg grid-bg-fade opacity-40" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <div>
              <SectionLabel index="03">Реальные кейсы</SectionLabel>
              <h2 className="display mt-5 text-[clamp(2rem,5vw,3.6rem)] text-white-pure">
                До&nbsp;/&nbsp;После
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-muted">
              Потяните ползунок, чтобы оценить результат работы наших мастеров вживую.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-center">
          <Reveal>
            <BeforeAfter data={featured} />
          </Reveal>

          <Reveal delay={0.12}>
            <div>
              <h3 className="display text-3xl text-white-pure md:text-4xl">
                {featured.title}
              </h3>
              <p className="mt-3 text-muted">{featured.meta}</p>

              <ul className="mt-8 space-y-4">
                {[
                  "Замер толщины ЛКП по 40 точкам",
                  "Трёхэтапная коррекция лака",
                  "Керамика 9H с гарантией 9 лет",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-white-pure">
                    <span className="grid h-6 w-6 place-items-center rounded-full border border-acid/50 text-xs text-acid">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <a
                href="#footer"
                className="display mt-10 inline-flex items-center gap-3 rounded-full border border-line px-6 py-3.5 text-sm tracking-tight text-white-pure transition-colors hover:border-acid hover:text-acid"
              >
                Обсудить мой автомобиль →
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
