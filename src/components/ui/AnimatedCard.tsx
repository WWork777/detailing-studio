"use client";

import gsap from "gsap";
import {
  type AnchorHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
  useEffect,
  useRef,
} from "react";

type AnimatedCardProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  href?: string;
} & HTMLAttributes<HTMLDivElement> &
  AnchorHTMLAttributes<HTMLAnchorElement>;

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function AnimatedCard({
  children,
  className = "",
  delay = 0,
  href,
  ...props
}: AnimatedCardProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    gsap.set(el, { autoAlpha: 0, y: 34, scale: 0.985, filter: "blur(8px)" });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        gsap.to(el, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.95,
          delay,
          ease: "power3.out",
        });
        observer.disconnect();
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  const sharedProps = {
    ...props,
    ref,
    className: `animated-card ${className}`,
  };

  if (href) {
    return (
      <a {...(sharedProps as AnchorHTMLAttributes<HTMLAnchorElement>)} href={href}>
        {children}
      </a>
    );
  }

  return <div {...(sharedProps as HTMLAttributes<HTMLDivElement>)}>{children}</div>;
}
