"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

type Theme = "dark" | "light";
type ViewTransition = {
  ready: Promise<void>;
  finished: Promise<void>;
};
type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => ViewTransition;
};

const STORAGE_KEY = "autoreconstruction-theme";

function getCurrentTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

export function ThemeToggle() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const haloRef = useRef<HTMLSpanElement>(null);
  const [theme, setTheme] = useState<Theme>("dark");
  const animating = useRef(false);

  useEffect(() => {
    setTheme(getCurrentTheme());
  }, []);

  function toggleTheme() {
    const button = buttonRef.current;
    if (!button || animating.current) return;

    const nextTheme: Theme = getCurrentTheme() === "dark" ? "light" : "dark";
    const rect = button.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const root = document.documentElement;
    const transitionDocument = document as ViewTransitionDocument;
    const applyTheme = () => {
      root.dataset.theme = nextTheme;
      localStorage.setItem(STORAGE_KEY, nextTheme);
      setTheme(nextTheme);
    };

    animating.current = true;
    root.style.setProperty("--theme-x", `${x}px`);
    root.style.setProperty("--theme-y", `${y}px`);
    root.style.setProperty("--theme-radius", `${radius + 72}px`);

    gsap.fromTo(
      button,
      { rotate: 0, scale: 1 },
      {
        rotate: nextTheme === "light" ? 180 : -180,
        scale: 0.92,
        duration: 0.28,
        ease: "back.in(1.6)",
      },
    );
    gsap.to(haloRef.current, { scale: 1.5, opacity: 0.95, duration: 0.32, ease: "power2.out" });

    if (!transitionDocument.startViewTransition) {
      applyTheme();
      gsap.to(button, { rotate: 0, scale: 1, duration: 0.5, ease: "elastic.out(1, 0.48)" });
      gsap.to(haloRef.current, { scale: 1, opacity: 0.6, duration: 0.34, ease: "power2.out" });
      animating.current = false;
      return;
    }

    root.classList.add("theme-reveal", "theme-switching");
    const transition = transitionDocument.startViewTransition(applyTheme);

    transition.ready.finally(() => {
      root.classList.remove("theme-switching");
    });
    transition.finished.finally(() => {
      root.classList.remove("theme-reveal");
      gsap.to(button, { rotate: 0, scale: 1, duration: 0.52, ease: "elastic.out(1, 0.48)" });
      gsap.to(haloRef.current, { scale: 1, opacity: 0.6, duration: 0.38, ease: "power2.out" });
      animating.current = false;
    });
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      className="theme-toggle"
      aria-label={theme === "dark" ? "Переключить светлую тему" : "Переключить темную тему"}
      aria-pressed={theme === "light"}
      onClick={toggleTheme}
    >
      <span ref={haloRef} className="theme-toggle__halo" />
      <span className="theme-toggle__icon">
        <svg
          className="theme-toggle__sun"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.7" />
          <path
            d="M12 2.8v2.1M12 19.1v2.1M4.9 4.9l1.5 1.5M17.6 17.6l1.5 1.5M2.8 12h2.1M19.1 12h2.1M4.9 19.1l1.5-1.5M17.6 6.4l1.5-1.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.7"
          />
        </svg>
        <svg
          className="theme-toggle__moon"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M18.7 14.3A7.2 7.2 0 0 1 9.7 5.3a7.7 7.7 0 1 0 9 9Z"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="1.8"
          />
        </svg>
      </span>
    </button>
  );
}
