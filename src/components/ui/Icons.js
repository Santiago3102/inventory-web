/** Inline SVG icons (no icon library needed). */

const base = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

export function SearchIcon({ size = 18 }) {
  return (
    <svg {...base} width={size} height={size}>
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
  );
}

export function PlusIcon({ size = 16 }) {
  return (
    <svg {...base} width={size} height={size}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function CloseIcon({ size = 16 }) {
  return (
    <svg {...base} width={size} height={size}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function WarningIcon({ size = 22 }) {
  return (
    <svg {...base} width={size} height={size}>
      <path d="M12 3l10 18H2z" />
      <path d="M12 10v5M12 18v.01" />
    </svg>
  );
}

export function DownloadIcon({ size = 16 }) {
  return (
    <svg {...base} width={size} height={size}>
      <path d="M12 4v11M7 11l5 5 5-5M5 20h14" />
    </svg>
  );
}