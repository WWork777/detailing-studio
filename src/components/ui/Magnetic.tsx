"use client";

import gsap from "gsap";
import {
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type MouseEvent,
  type RefObject,
  type ReactNode,
  useRef,
} from "react";

type MagneticBaseProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
};

function useMagnetic(strength = 0.28) {
  const ref = useRef<HTMLElement>(null);
  const shineRef = useRef<HTMLSpanElement>(null);

  function move(e: MouseEvent<HTMLElement>) {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const dx = (x - rect.width / 2) * strength;
    const dy = (y - rect.height / 2) * strength;

    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
    gsap.to(el, { x: dx, y: dy, scale: 1.035, duration: 0.45, ease: "power3.out" });
    gsap.to(shineRef.current, { opacity: 1, duration: 0.28, ease: "power2.out" });
  }

  function leave() {
    gsap.to(ref.current, { x: 0, y: 0, scale: 1, duration: 0.58, ease: "elastic.out(1, 0.42)" });
    gsap.to(shineRef.current, { opacity: 0, duration: 0.35, ease: "power2.out" });
  }

  function press() {
    gsap.fromTo(
      ref.current,
      { scale: 0.97 },
      { scale: 1.035, duration: 0.38, ease: "back.out(2)" },
    );
  }

  return { ref, shineRef, move, leave, press };
}

export function MagneticLink({
  children,
  className = "",
  strength,
  ...props
}: MagneticBaseProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  const magnetic = useMagnetic(strength);

  return (
    <a
      {...props}
      ref={magnetic.ref as RefObject<HTMLAnchorElement>}
      className={`magnetic-cta ${className}`}
      onMouseMove={magnetic.move}
      onMouseLeave={magnetic.leave}
      onMouseDown={magnetic.press}
    >
      <span className="magnetic-cta__shine" ref={magnetic.shineRef} />
      {children}
    </a>
  );
}

export function MagneticButton({
  children,
  className = "",
  strength,
  ...props
}: MagneticBaseProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  const magnetic = useMagnetic(strength);

  return (
    <button
      {...props}
      ref={magnetic.ref as RefObject<HTMLButtonElement>}
      className={`magnetic-cta ${className}`}
      onMouseMove={magnetic.move}
      onMouseLeave={magnetic.leave}
      onMouseDown={magnetic.press}
    >
      <span className="magnetic-cta__shine" ref={magnetic.shineRef} />
      {children}
    </button>
  );
}
