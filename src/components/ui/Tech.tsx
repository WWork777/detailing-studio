import type { ReactNode } from "react";

/** Visor-style corner brackets drawn at all four corners of a box. */
export function Corners({ className = "" }: { className?: string }) {
  const base = "absolute h-3 w-3 border-acid/50";
  return (
    <span aria-hidden className={`pointer-events-none ${className}`}>
      <span className={`${base} left-0 top-0 border-l border-t`} />
      <span className={`${base} right-0 top-0 border-r border-t`} />
      <span className={`${base} bottom-0 left-0 border-b border-l`} />
      <span className={`${base} bottom-0 right-0 border-b border-r`} />
    </span>
  );
}

/** Small monospace technical marker, e.g. coordinates or serial numbers. */
export function Marker({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={`mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-soft ${className}`}>
      {children}
    </span>
  );
}

/** Section eyebrow with index + label + animated leading line. */
export function SectionLabel({ index, children }: { index: string; children: ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="mono text-xs text-acid">{index}</span>
      <span className="h-px w-8 bg-acid/60" />
      <span className="eyebrow">{children}</span>
    </div>
  );
}

/** Thin acid corner accent for full sections (top-left + bottom-right L-shapes). */
export function FrameAccent() {
  return (
    <>
      <span className="pointer-events-none absolute left-0 top-0 h-16 w-16 border-l border-t border-acid/20" />
      <span className="pointer-events-none absolute bottom-0 right-0 h-16 w-16 border-b border-r border-acid/20" />
    </>
  );
}
