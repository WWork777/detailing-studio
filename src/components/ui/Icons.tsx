import type { SVGProps } from "react";

const base = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export type IconKey =
  | "detailing"
  | "ceramic"
  | "ppf"
  | "restoration"
  | "interior"
  | "presale"
  | "light"
  | "shield"
  | "cert"
  | "lock"
  | "scan"
  | "spray"
  | "check";

export function Icon({ name, ...props }: { name: IconKey } & SVGProps<SVGSVGElement>) {
  const p = { ...base, ...props };
  switch (name) {
    case "detailing":
      return (
        <svg {...p}>
          <path d="M3 13l2-5a3 3 0 0 1 2.8-2h8.4A3 3 0 0 1 19 8l2 5" />
          <path d="M3 13h18v4a1 1 0 0 1-1 1h-1a2 2 0 0 1-4 0H9a2 2 0 0 1-4 0H4a1 1 0 0 1-1-1z" />
          <circle cx="7" cy="13" r="1" /><circle cx="17" cy="13" r="1" />
        </svg>
      );
    case "ceramic":
      return (
        <svg {...p}>
          <path d="M12 2l3 4-3 3-3-3 3-4z" /><path d="M12 9v13" />
          <path d="M6 13l6 3 6-3" /><path d="M6 18l6 3 6-3" />
        </svg>
      );
    case "ppf":
      return (
        <svg {...p}>
          <rect x="4" y="4" width="16" height="16" rx="1" />
          <path d="M4 9h16M9 4v16" /><path d="M14 14l3 3" />
        </svg>
      );
    case "restoration":
      return (
        <svg {...p}>
          <path d="M14 6l4 4-8 8H6v-4l8-8z" /><path d="M13 7l4 4" />
          <path d="M3 21h6" />
        </svg>
      );
    case "interior":
      return (
        <svg {...p}>
          <path d="M5 18v-6a3 3 0 0 1 3-3h2l2-4h2l-1 4h2a3 3 0 0 1 3 3v6" />
          <path d="M5 18h14" /><path d="M9 9v9" />
        </svg>
      );
    case "presale":
      return (
        <svg {...p}>
          <path d="M9 11l2 2 4-4" /><rect x="3" y="4" width="18" height="16" rx="1" />
          <path d="M3 9h18" />
        </svg>
      );
    case "light":
      return (
        <svg {...p}>
          <path d="M9 18h6" /><path d="M10 21h4" />
          <path d="M12 3a6 6 0 0 1 4 10.5c-.6.6-1 1.3-1 2.1H9c0-.8-.4-1.5-1-2.1A6 6 0 0 1 12 3z" />
        </svg>
      );
    case "shield":
      return (
        <svg {...p}>
          <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case "cert":
      return (
        <svg {...p}>
          <circle cx="12" cy="9" r="5" /><path d="M9 13l-2 7 5-3 5 3-2-7" />
          <path d="M10 9l1.5 1.5L14 8" />
        </svg>
      );
    case "lock":
      return (
        <svg {...p}>
          <rect x="5" y="10" width="14" height="10" rx="1" />
          <path d="M8 10V7a4 4 0 0 1 8 0v3" /><path d="M12 14v2" />
        </svg>
      );
    case "scan":
      return (
        <svg {...p}>
          <path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3" />
          <path d="M4 12h16" />
        </svg>
      );
    case "spray":
      return (
        <svg {...p}>
          <rect x="8" y="9" width="7" height="12" rx="1" />
          <path d="M8 9V6h7v3" /><path d="M18 5h2M18 8h3M19 11h2" />
        </svg>
      );
    case "check":
      return (
        <svg {...p}>
          <path d="M5 12l4 4 10-10" />
        </svg>
      );
    default:
      return <svg {...p} />;
  }
}
