"use client";

import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/Tech";
import { Icon } from "@/components/ui/Icons";
import { ADVANTAGES } from "@/lib/data";
import { AnimatedCard } from "@/components/ui/AnimatedCard";

export function Advantages() {
  return (
    <section
      id="advantages"
      className="relative overflow-hidden border-t border-white/5 bg-graphite py-20 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 grid-bg grid-bg-fade opacity-50" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <div>
              <SectionLabel index="05">Почему Автореконструкция</SectionLabel>
              <h2 className="display section-title mt-5 text-white-pure">
                Преимущества в&nbsp;деталях
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-sm text-muted">
              Премиум — это не слово в рекламе, а измеримые условия, в которых работает
              студия каждый день.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ADVANTAGES.map((adv, i) => (
            <AnimatedCard
              key={adv.title}
              delay={0.08 * i}
              className="neon-hover group relative h-full overflow-hidden rounded-2xl border border-white/8 bg-ink/60 p-5 panel-glow sm:p-6 lg:p-7"
            >
              <div className="relative flex h-full flex-col">
                <div className="flex items-start justify-between">
                  <span className="grid h-14 w-14 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-acid transition-all duration-500 group-hover:border-acid/40 group-hover:bg-acid/5">
                    <Icon name={adv.icon} width={26} height={26} />
                  </span>
                </div>

                <h3 className="display card-title mt-6 text-lg text-white-pure">
                  {adv.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">{adv.desc}</p>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
}
