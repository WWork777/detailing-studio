"use client";

import { useRef, type MouseEvent } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { Corners, Marker, SectionLabel } from "@/components/ui/Tech";
import { Icon } from "@/components/ui/Icons";
import { SERVICES, type Service } from "@/lib/data";

export function Services() {
  return (
    <section
      id="services"
      className="relative overflow-hidden border-t border-white/5 bg-graphite py-24 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0 grid-bg grid-bg-fade opacity-60" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <div>
              <SectionLabel index="02">Спектр услуг</SectionLabel>
              <h2 className="display mt-5 text-[clamp(2rem,5vw,3.6rem)] text-white-pure">
                Полный цикл ухода
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-sm text-muted">
              Шесть инженерных протоколов. Наведите на карточку — раскроются технические
              характеристики каждого направления.
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
  const ref = useRef<HTMLAnchorElement>(null);
  const href = SERVICE_LINKS[service.id] ?? "#footer";

  function onMove(e: MouseEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      className="neon-hover group relative flex h-full min-h-[260px] flex-col overflow-hidden rounded-2xl border border-white/8 bg-graphite p-7"
    >
      {/* cursor spotlight */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(220px circle at var(--mx) var(--my), rgba(198,241,53,0.1), transparent 70%)",
        }}
      />
      {/* hover corner brackets */}
      <Corners className="inset-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative flex h-full flex-col">
        {/* head: icon + code */}
        <div className="flex items-start justify-between">
          <span className="grid h-12 w-12 place-items-center rounded-lg border border-white/10 bg-white/[0.03] text-acid transition-colors duration-300 group-hover:border-acid/40">
            <Icon name={service.icon} />
          </span>
          <Marker className="group-hover:text-acid">{service.code}</Marker>
        </div>

        {/* title + desc */}
        <h3 className="display mt-6 text-xl text-white-pure">{service.title}</h3>
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
          <span className="text-muted-soft transition-all duration-300 group-hover:translate-x-1 group-hover:text-acid">
            →
          </span>
        </div>
      </div>
    </a>
  );
}
