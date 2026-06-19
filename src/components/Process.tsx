"use client";

import { Reveal } from "@/components/ui/Reveal";
import { Corners, Marker, SectionLabel } from "@/components/ui/Tech";
import { PROCESS } from "@/lib/data";

export function Process() {
  return (
    <section
      id="process"
      className="relative overflow-hidden border-t border-white/5 bg-ink py-24 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0 grid-bg grid-bg-fade opacity-40" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <div>
              <SectionLabel index="04">Технологический процесс</SectionLabel>
              <h2 className="display mt-5 text-[clamp(2rem,5vw,3.6rem)] text-white-pure">
                Этапы работы
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Marker className="md:text-right">
              PROTOCOL OBSIDIAN / REV.04
              <br />
              EST. CYCLE — 18–72 H
            </Marker>
          </Reveal>
        </div>

        {/* Step chain */}
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((step, i) => (
            <Reveal key={step.num} delay={0.08 * i}>
              <div className="neon-hover group relative h-full overflow-hidden rounded-2xl border border-white/8 bg-graphite p-6 panel-glow">
                <Corners className="inset-2.5 opacity-20 transition-opacity duration-300 group-hover:opacity-90" />

                {/* connector arrow (desktop) */}
                {i < PROCESS.length - 1 && (
                  <span className="absolute -right-2 top-1/2 z-10 hidden h-4 w-4 -translate-y-1/2 rotate-45 border-r border-t border-acid/40 bg-ink lg:block" />
                )}

                <div className="relative">
                  <div className="flex items-baseline justify-between">
                    <span className="display text-5xl text-white/10 transition-colors duration-300 group-hover:text-acid/80">
                      {step.num}
                    </span>
                    <span className="h-2 w-2 rounded-full bg-acid/30 transition-colors group-hover:bg-acid" />
                  </div>

                  <Marker className="mt-5 block group-hover:text-acid">{step.marker}</Marker>
                  <h3 className="display mt-2 text-lg text-white-pure">{step.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">{step.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
