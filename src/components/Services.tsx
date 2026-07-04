"use client";

import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/Tech";
import { Icon } from "@/components/ui/Icons";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { SERVICES, type Service } from "@/lib/data";

export function Services() {
  return (
    <section
      id="services"
      className="relative overflow-hidden border-t border-white/5 bg-graphite py-20 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 grid-bg grid-bg-fade opacity-60" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <div>
              <SectionLabel index="02">Услуги детейлинга авто</SectionLabel>
              <h2 className="display section-title mt-5 text-white-pure">
                Химчистка салона, полировка и бронепленка в Кемерово
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-sm text-muted">
              Подберем услугу под задачу: отмыть салон, восстановить фары, отполировать кузов,
              закрыть зоны риска пленкой или подготовить автомобиль к продаже.
            </p>
          </Reveal>
        </div>

        {/* Dense 3-column grid */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <Reveal key={service.id} delay={0.05 * i}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// service.id -> landing slug (services without a dedicated page link to the form)
const SERVICE_LINKS: Record<string, string> = {
  detailing: "/polirovka",
  ceramic: "/keramika",
  ppf: "/okleyka-plenkoy",
  interior: "/himchistka",
  restoration: "/restavratsiya",
  presale: "/predprodazhnaya-podgotovka",
};

function ServiceCard({ service }: { service: Service }) {
  const href = SERVICE_LINKS[service.id] ?? "#footer";

  return (
    <AnimatedCard
      href={href}
      className="neon-hover group relative flex h-full min-h-[240px] flex-col overflow-hidden rounded-2xl border border-white/8 bg-graphite p-5 sm:p-6 lg:p-7"
    >
      <div className="relative flex h-full flex-col">
        {/* head */}
        <div className="flex items-start justify-between">
          <span className="grid h-12 w-12 place-items-center rounded-lg border border-white/10 bg-white/[0.03] text-acid transition-colors duration-500 group-hover:border-acid/40">
            <Icon name={service.icon} />
          </span>
        </div>

        {/* title + desc */}
        <h3 className="display card-title mt-6 text-xl text-white-pure">{service.title}</h3>
        <p className="mt-2.5 text-sm leading-relaxed text-muted">{service.desc}</p>

        {/* specs */}
        <ul className="mt-auto flex flex-wrap gap-2 pt-6">
          {service.specs.map((s) => (
            <li
              key={s}
              className="mono rounded border border-white/8 bg-white/[0.02] px-2 py-1 text-[0.65rem] uppercase tracking-wide text-muted transition-colors group-hover:border-white/15 group-hover:text-white-pure"
            >
              {s}
            </li>
          ))}
        </ul>

        {/* bottom row: tag + arrow */}
        <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4">
          <span className="text-[0.7rem] uppercase tracking-[0.2em] text-muted-soft">
            {service.tag}
          </span>
          <span className="text-muted-soft transition-all duration-500 group-hover:translate-x-1 group-hover:text-acid">
            →
          </span>
        </div>
      </div>
    </AnimatedCard>
  );
}
