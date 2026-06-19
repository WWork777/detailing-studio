"use client";

import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/Counter";
import { Corners, Marker, SectionLabel } from "@/components/ui/Tech";
import { STATS } from "@/lib/data";

export function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden border-t border-white/5 bg-ink py-24 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0 grid-bg grid-bg-fade opacity-40" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex items-center justify-between">
          <Reveal>
            <SectionLabel index="01">Философия студии</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <Marker className="hidden md:block">SINCE 2013 · MOSCOW</Marker>
          </Reveal>
        </div>

        {/* Manifesto */}
        <Reveal delay={0.05}>
          <h2 className="display mt-8 max-w-5xl text-[clamp(1.6rem,3.6vw,3.1rem)] text-white-pure">
            Возвращаем <span className="text-acid">безупречность</span> и защищаем её на годы.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <Reveal delay={0.1}>
            <div className="relative border-l border-white/10 pl-6">
              <p className="max-w-md text-base leading-relaxed text-muted">
                OBSIDIAN — детейлинг-центр в Кемерово, где инженерная точность встречается
                с эстетикой. Каждый автомобиль проходит индивидуальный протокол: от
                диагностики ЛКП толщиномером до керамического покрытия и оклейки плёнкой в
                условиях чистого бокса. Без шаблонов и компромиссов.
              </p>
              <Marker className="mt-6 block text-acid/70">// MANIFEST_01</Marker>
            </div>
          </Reveal>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={0.07 * i}>
                <div className="neon-hover group relative overflow-hidden rounded-2xl border border-white/8 bg-graphite p-6 panel-glow">
                  <Corners className="inset-2.5 opacity-20 transition-opacity duration-300 group-hover:opacity-90" />
                  <Marker className="block">{`0${i + 1} / METRIC`}</Marker>
                  <div className="display mt-3 text-4xl text-white-pure md:text-5xl">
                    <Counter to={s.value} suffix={s.suffix} />
                  </div>
                  <p className="mt-2.5 text-sm text-muted">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
