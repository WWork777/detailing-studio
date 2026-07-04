"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

type CounterProps = { to: number; suffix?: string; duration?: number };

/** Counts from 0 to `to` once it scrolls into view. */
export function Counter({ to, suffix = "", duration = 2200 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * to));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {value.toLocaleString("ru-RU")}
      {suffix}
    </span>
  );
}
