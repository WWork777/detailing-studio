"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/Tech";
import { FAQ } from "@/lib/seo";

type FaqProps = {
  items?: { q: string; a: string }[];
  title?: string;
};

export function Faq({ items = FAQ, title = "Детейлинг Кемерово — цены, сроки и услуги" }: FaqProps) {
  const [open, setOpen] = useState<number | null>(0);
  const list = items;

  return (
    <section
      id="faq"
      className="relative overflow-hidden border-t border-white/5 bg-ink py-20 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 grid-bg grid-bg-fade opacity-40" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionLabel index="07">Вопросы и ответы</SectionLabel>
          <h2 className="display section-title mt-5 text-white-pure">
            {title}
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          {/* Accordion */}
          <div className="divide-y divide-white/8 overflow-hidden rounded-2xl border border-white/8 bg-graphite">
            {list.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={item.q}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                  >
                    <span className="display card-title text-base text-white-pure md:text-lg">{item.q}</span>
                    <span
                      className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border border-white/15 text-acid transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-6 text-sm leading-relaxed text-muted sm:px-6">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* SEO text block */}
          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-white/8 bg-neutral-900/40 p-6 text-sm leading-relaxed text-muted backdrop-blur-md md:p-8">
              <h3 className="display text-lg text-white-pure">
                Детейлинг-центр «Автореконструкция» в&nbsp;Кемерово
              </h3>
              <p className="mt-4">
                Студия «Автореконструкция» — это профессиональный <strong className="text-white-pure">детейлинг
                в Кемерово</strong> полного цикла. Самые востребованные задачи:{" "}
                <strong className="text-white-pure">химчистка салона</strong>, многоэтапная{" "}
                <strong className="text-white-pure">полировка кузова и фар</strong>,{" "}
                <strong className="text-white-pure">бронепленка и оклейка авто пленкой</strong> PPF,
                защита кузова керамикой и восстановление деталей.
              </p>
              <p className="mt-4">
                Если вы ищете <strong className="text-white-pure">детейлинг центр в Кемерово</strong>{" "}
                с понятной ценой и гарантией результата — приезжайте на бесплатную диагностику.
                Осмотрим кузов, фары и салон, после чего предложим только те работы, которые
                реально нужны автомобилю.
              </p>
              <a
                href="#footer"
                className="mono mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-acid"
              >
                Записаться на детейлинг →
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
