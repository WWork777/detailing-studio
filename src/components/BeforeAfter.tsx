"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Case } from "@/lib/data";

/** Draggable before/after comparison slider. */
export function BeforeAfter({ data }: { data: Case }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50); // percent
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, pct)));
  }, []);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (!dragging.current) return;
      setFromClientX(e.clientX);
    };
    const up = () => (dragging.current = false);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [setFromClientX]);

  return (
    <div
      ref={containerRef}
      onPointerDown={(e) => {
        dragging.current = true;
        setFromClientX(e.clientX);
      }}
      className="group relative mx-auto aspect-[3/4] max-h-[720px] w-full max-w-[540px] cursor-ew-resize select-none overflow-hidden rounded-2xl border border-line bg-graphite"
    >
      {/* AFTER (base layer) */}
      <img
        src={data.after}
        alt="После"
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <span className="absolute right-4 top-4 rounded-full bg-acid px-3 py-1 text-xs font-medium text-ink">
        После
      </span>

      {/* BEFORE (clipped overlay) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <img
          src={data.before}
          alt="До"
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <span className="absolute left-4 top-4 rounded-full border border-line bg-ink/70 px-3 py-1 text-xs text-white-pure backdrop-blur">
          До
        </span>
      </div>

      {/* Handle */}
      <div
        className="absolute inset-y-0 z-10 w-px bg-acid"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-acid bg-ink/80 backdrop-blur transition-transform duration-200 group-hover:scale-110">
          <span className="text-acid">⇄</span>
        </div>
      </div>
    </div>
  );
}
