"use client";

import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/Counter";
import { SectionLabel } from "@/components/ui/Tech";
import { STATS } from "@/lib/data";
import { AnimatedCard } from "@/components/ui/AnimatedCard";

export function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden border-t border-white/5 bg-ink py-20 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 grid-bg grid-bg-fade opacity-40" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex items-center justify-between">
          <Reveal>
            <SectionLabel index="01">Детейлинг-центр в Кемерово</SectionLabel>
          </Reveal>
        </div>

        {/* Manifesto */}
        <Reveal delay={0.05}>
          <h2 className="display section-title mt-8 max-w-4xl text-white-pure">
            Детейлинг в Кемерово: полировка, химчистка и защита кузова под реальные дороги.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <Reveal delay={0.1}>
            <div className="relative border-l border-white/10 pl-6">
              <p className="max-w-md text-base leading-relaxed text-muted">
                Автореконструкция — детейлинг-центр в Кемерово для тех, кому нужен не просто блеск
                после мойки, а понятный результат: химчистка салона, полировка кузова и фар,
                бронепленка PPF, керамика и восстановление деталей. Перед работой проводим
                диагностику ЛКП и называем понятную цену.
              </p>
            </div>
          </Reveal>

          {/* Stats grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {STATS.map((s, i) => (
              <AnimatedCard
                key={s.label}
                delay={0.08 * i}
                className="neon-hover group relative overflow-hidden rounded-2xl border border-white/8 bg-graphite p-5 panel-glow sm:p-6"
              >
                <div className="display mt-3 text-4xl text-white-pure md:text-5xl">
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <p className="mt-2.5 text-sm text-muted">{s.label}</p>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
