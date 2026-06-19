"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";

const NAV = [
  { label: "Философия", href: "/#about" },
  { label: "Услуги", href: "/#services" },
  { label: "Процесс", href: "/#process" },
  { label: "Кейсы", href: "/#portfolio" },
  { label: "Контакты", href: "/#footer" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500 ${
        scrolled ? "border-white/10 bg-ink/80 backdrop-blur-xl" : "border-transparent"
      }`}
    >
      {/* Top-state background: blur + gradient with a masked bottom edge so the
          blur cutoff fades out instead of drawing a hard line. */}
      {!scrolled && (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/70 to-transparent backdrop-blur-sm [mask-image:linear-gradient(to_bottom,black_55%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,black_55%,transparent)]" />
      )}
      <div className="relative z-50 mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:grid md:grid-cols-[1fr_auto_1fr] md:px-8">
        {/* Logo (left) */}
        <a href="/" className="flex items-center gap-2.5 justify-self-start">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-acid text-ink">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 2 2 7v10l10 5 10-5V7L12 2Z" stroke="currentColor" strokeWidth="2" />
            </svg>
          </span>
          <span className="display text-lg tracking-tight">
            OBSIDIAN<span className="text-acid">.</span>
          </span>
        </a>

        {/* Nav (center) */}
        <nav className="hidden items-center gap-8 justify-self-center md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative display text-[0.8rem] tracking-tight text-muted transition-colors hover:text-white-pure"
            >
              {item.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-acid transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* CTA (right) */}
        <div className="flex items-center gap-3 justify-self-end">
          <a
            href="tel:+73842000000"
            className="mono hidden items-center gap-2 text-xs tracking-[0.12em] text-white-pure/90 transition-colors hover:text-acid lg:flex"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-acid" />
            +7 (3842) 00-00-00
          </a>
          <a
            href="/#footer"
            className="display hidden items-center gap-2 rounded-full bg-acid px-5 py-2 text-sm tracking-tight text-ink transition-transform duration-300 hover:scale-[1.04] md:inline-flex"
          >
            Записаться
          </a>
          <button
            aria-label="Меню"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-md border border-white/10 bg-graphite/60 backdrop-blur md:hidden"
          >
            <span className="relative block h-3 w-4">
              <span
                className={`absolute left-0 h-px w-full bg-white-pure transition-all ${open ? "top-1.5 rotate-45" : "top-0"}`}
              />
              <span
                className={`absolute left-0 top-1.5 h-px w-full bg-white-pure transition-all ${open ? "opacity-0" : "opacity-100"}`}
              />
              <span
                className={`absolute left-0 h-px w-full bg-white-pure transition-all ${open ? "top-1.5 -rotate-45" : "top-3"}`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Fullscreen mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at calc(100% - 36px) 32px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 36px) 32px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 36px) 32px)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-ink/95 backdrop-blur-xl md:hidden"
          >
            {/* tech grid backdrop */}
            <div className="pointer-events-none absolute inset-0 grid-bg grid-bg-fade opacity-50" />

            <motion.div
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.07, delayChildren: 0.25 } },
              }}
              className="relative flex h-full flex-col px-6 pb-10 pt-28"
            >
              <nav className="flex flex-1 flex-col justify-center gap-2">
                {NAV.map((item, i) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    variants={overlayItem}
                    className="group flex items-baseline gap-4 border-b border-white/5 py-3 text-white-pure"
                  >
                    <span className="mono text-xs text-acid">{`0${i + 1}`}</span>
                    <span className="display text-4xl tracking-tight transition-colors group-hover:text-acid">
                      {item.label}
                    </span>
                  </motion.a>
                ))}
              </nav>

              <motion.div variants={overlayItem} className="space-y-5">
                <a
                  href="/#footer"
                  onClick={() => setOpen(false)}
                  className="display flex items-center justify-center gap-2 rounded-full bg-acid py-4 tracking-tight text-ink shadow-[0_0_24px_rgba(194,255,46,0.35)]"
                >
                  Записаться →
                </a>
                <a
                  href="tel:+73842000000"
                  className="mono block text-center text-sm tracking-[0.12em] text-muted transition-colors hover:text-acid"
                >
                  +7 (3842) 00-00-00
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

const overlayItem = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};
