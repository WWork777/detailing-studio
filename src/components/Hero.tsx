"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { SLIDES } from "@/lib/data";

const DURATION = 6000; // ms per slide

export function Hero() {
  const [active, setActive] = useState(0);
  // Re-mounts the progress bar so its animation restarts each slide.
  const [progressKey, setProgressKey] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const go = useCallback((next: number) => {
    setActive((prev) => (next + SLIDES.length) % SLIDES.length);
    setProgressKey((k) => k + 1);
  }, []);

  // Autoplay — always running so the progress bar never stalls.
  useEffect(() => {
    timer.current = setTimeout(() => go(active + 1), DURATION);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [active, go]);

  const slide = SLIDES[active];

  return (
    <section
      id="top"
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-ink"
    >
      {/* Slides — split-curtain clip reveal */}
      <AnimatePresence initial={false}>
        <motion.div
          key={slide.id}
          className="absolute inset-0"
          initial={{ clipPath: "inset(0 50% 0 50%)" }}
          animate={{ clipPath: "inset(0 0% 0 0%)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Ken-Burns image */}
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.18 }}
            animate={{ scale: 1 }}
            transition={{ duration: DURATION / 1000 + 1.2, ease: "linear" }}
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          {/* Cinematic gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Tech grid + HUD overlay */}
      <div className="pointer-events-none absolute inset-0 z-10 grid-bg opacity-[0.5]" />
      <div className="pointer-events-none absolute inset-0 z-10 mx-auto hidden max-w-[1440px] px-10 md:block">
        {/* corner frame */}
        <span className="absolute left-10 top-24 h-8 w-8 border-l border-t border-acid/40" />
        <span className="absolute right-10 top-24 h-8 w-8 border-r border-t border-acid/40" />
        {/* top markers */}
        <div className="absolute left-10 top-28 mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-soft">
          LAT 55.7558 · LON 37.6173
        </div>
        <div className="absolute right-10 top-28 mono text-right text-[0.65rem] uppercase tracking-[0.2em] text-muted-soft">
          UNIT / OBSIDIAN-MSK-01
        </div>
        {/* vertical side label */}
        <div className="absolute right-10 top-1/2 mono -translate-y-1/2 rotate-90 text-[0.6rem] uppercase tracking-[0.4em] text-muted-soft">
          Detailing Protocol
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20 mx-auto flex h-full max-w-[1440px] flex-col justify-end px-6 pb-28 md:px-10 md:pb-24">
        <div className="max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial="hidden"
              animate="show"
              exit="exit"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.08, delayChildren: 0.25 } },
                exit: { transition: { staggerChildren: 0.04 } },
              }}
            >
              <motion.div variants={lineVariant} className="mb-5 flex items-center gap-3">
                <span className="h-px w-10 bg-acid" />
                <span className="eyebrow">Детейлинг-центр в Кемерово</span>
              </motion.div>

              <h1 className="sr-only">
                Детейлинг в Кемерово — студия OBSIDIAN: керамическое покрытие,
                полировка кузова, оклейка плёнкой и химчистка авто
              </h1>

              <motion.div
                variants={lineVariant}
                role="text"
                className="display text-[clamp(2.6rem,8vw,6.4rem)] text-white-pure"
              >
                {slide.title}
              </motion.div>

              <motion.p
                variants={lineVariant}
                className="mt-5 max-w-md text-base text-muted md:text-lg"
              >
                {slide.subtitle}
              </motion.p>

              <motion.div variants={lineVariant} className="mt-9 flex flex-wrap items-center gap-4">
                <a
                  href="#footer"
                  className="display group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-acid px-7 py-3.5 tracking-tight text-ink"
                >
                  <span className="relative z-10">Записаться на детейлинг</span>
                  <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>
                <a
                  href="#portfolio"
                  className="display inline-flex items-center gap-2 rounded-full border border-line px-6 py-3.5 text-sm tracking-tight text-white-pure transition-colors hover:border-acid hover:text-acid"
                >
                  Смотреть кейсы
                </a>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Slide navigation — index list, bottom right */}
      <div className="absolute bottom-28 right-6 z-30 hidden flex-col items-end gap-4 md:flex md:right-10">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => go(i)}
            className="group flex items-center gap-3"
            aria-label={`Слайд ${s.index}`}
          >
            <span
              className={`text-sm tabular-nums transition-colors ${
                i === active ? "text-acid" : "text-muted-soft group-hover:text-muted"
              }`}
            >
              {s.index}
            </span>
            <span
              className={`h-px transition-all duration-500 ${
                i === active ? "w-12 bg-acid" : "w-6 bg-line group-hover:w-9"
              }`}
            />
          </button>
        ))}
      </div>

      {/* Autoplay progress bar */}
      <div className="absolute inset-x-0 bottom-0 z-30 h-[3px] bg-line-soft">
        <motion.div
          key={progressKey}
          className="h-full bg-acid"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: DURATION / 1000, ease: "linear" }}
        />
      </div>

      {/* Scroll hint */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 z-30 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted md:flex"
      >
        <span className="text-[0.65rem] uppercase tracking-[0.3em]">Scroll</span>
        <span className="h-8 w-px bg-gradient-to-b from-acid to-transparent" />
      </motion.div>
    </section>
  );
}

const lineVariant = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -16, transition: { duration: 0.4 } },
};
