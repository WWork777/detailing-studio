"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { SLIDES } from "@/lib/data";
import { MagneticLink } from "@/components/ui/Magnetic";

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
      className="relative min-h-[100svh] w-full overflow-hidden bg-ink"
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

      {/* Content */}
      <div className="relative z-20 mx-auto flex min-h-[100svh] max-w-[1440px] flex-col justify-end px-5 pb-20 pt-24 sm:px-6 md:px-10 md:pb-24">
        <div className="max-w-4xl">
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
                Детейлинг авто в Кемерово — химчистка салона, полировка кузова и фар,
                бронепленка PPF, оклейка авто пленкой и защита кузова
              </h1>

              <motion.div
                variants={lineVariant}
                role="text"
                className="display hero-title text-white-pure"
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
                <MagneticLink
                  href="#footer"
                  className="display adaptive-cta group inline-flex w-full items-center gap-3 rounded-full px-5 py-3.5 text-sm text-white-pure sm:w-auto sm:px-7 sm:text-base"
                >
                  <span className="relative z-10">Рассчитать детейлинг в Кемерово</span>
                  <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </MagneticLink>
                <a
                  href="#portfolio"
                  className="display adaptive-cta inline-flex w-full items-center gap-2 rounded-full border border-line px-5 py-3.5 text-sm text-white-pure transition-colors hover:border-acid hover:text-acid sm:w-auto sm:px-6"
                >
                  Смотреть полировку до / после
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
