"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
};

/**
 * Lightweight scroll-reveal wrapper. Fades and lifts content into view once.
 */
export function Reveal({ children, delay = 0, y = 28, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ willChange: reduceMotion ? "auto" : "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}
