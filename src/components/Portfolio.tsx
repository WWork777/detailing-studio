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
      className="relative overflow-hidden border-t border-white/5 bg-ink py-20 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 grid-bg grid-bg-fade opacity-40" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <div>
              <SectionLabel index="03">Оклейка авто до / после</SectionLabel>
              <h2 className="display section-title mt-5 text-white-pure">
                Бронепленка PPF: процесс и готовый результат
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-muted">
              Показываем этап нанесения защитной пленки и финальный вид автомобиля после
              оклейки в боксе студии «Автореконструкция».
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-center">
          <Reveal>
            <BeforeAfter data={featured} />
          </Reveal>

          <Reveal delay={0.12}>
            <div>
              <h3 className="display card-title text-2xl text-white-pure md:text-4xl">
                {featured.title}
              </h3>
              <p className="mt-3 text-muted">{featured.meta}</p>

              <ul className="mt-8 space-y-4">
                {[
                  "Подготовка поверхности перед оклейкой",
                  "Нанесение PPF-пленки на зоны риска",
                  "Финальный контроль кромок и блеска",
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
                className="display adaptive-cta mt-10 inline-flex w-full items-center gap-3 rounded-full border border-line px-5 py-3.5 text-sm text-white-pure transition-colors hover:border-acid hover:text-acid sm:w-auto sm:px-6"
              >
                Рассчитать оклейку пленкой →
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
