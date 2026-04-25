/**
 * 手描き落書きアイコン群。すべて `currentColor` で塗るので、親で `text-*` を指定する。
 *
 * - sparkle: 6 角の煌めき
 * - swirl: ぐるぐる渦巻き
 * - blossom: 5 弁の花
 * - cloud: もこもこ雲
 * - underline-wavy: 手書き波下線
 */

type DoodleProps = {
  className?: string;
  filter?: "jitter" | "jitter-strong";
};

function withFilter(filter?: DoodleProps["filter"]) {
  return filter ? `url(#${filter})` : undefined;
}

export function Sparkle({ className = "", filter = "jitter" }: DoodleProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 40 40"
      className={`inline-block ${className}`}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter={withFilter(filter)}
      >
        <path d="M20 4 L20 14" />
        <path d="M20 26 L20 36" />
        <path d="M4 20 L14 20" />
        <path d="M26 20 L36 20" />
        <path d="M9 9 L15 15" />
        <path d="M25 25 L31 31" />
        <path d="M31 9 L25 15" />
        <path d="M15 25 L9 31" />
      </g>
    </svg>
  );
}

export function Swirl({ className = "", filter = "jitter" }: DoodleProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 60 60"
      className={`inline-block ${className}`}
    >
      <path
        d="M30 12 C 18 14 12 28 22 36 C 32 42 44 32 38 22 C 33 14 22 18 23 28 C 24 34 32 34 32 28"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter={withFilter(filter)}
      />
    </svg>
  );
}

export function Blossom({ className = "", filter = "jitter" }: DoodleProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 60 60"
      className={`inline-block ${className}`}
    >
      <g
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        filter={withFilter(filter)}
      >
        <path d="M30 8 q -8 8 0 18 q 8 -10 0 -18 z" />
        <path d="M52 22 q -10 -2 -16 8 q 12 4 16 -8 z" />
        <path d="M44 50 q -4 -10 -14 -8 q 4 12 14 8 z" />
        <path d="M16 50 q 10 -4 14 -8 q -10 -2 -14 8 z" />
        <path d="M8 22 q 4 12 16 8 q -6 -10 -16 -8 z" />
        <circle cx="30" cy="30" r="4" fill="currentColor" />
      </g>
    </svg>
  );
}

export function Cloud({ className = "", filter = "jitter" }: DoodleProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 120 60"
      className={`inline-block ${className}`}
    >
      <path
        d="M18 42 c -10 0 -14 -14 -2 -16 c 0 -10 14 -14 20 -6 c 4 -10 22 -10 24 2 c 14 -4 22 12 12 18 c 6 8 -4 18 -14 14 c -4 8 -22 8 -24 -2 c -8 6 -20 0 -16 -10 z"
        fill="currentColor"
        opacity="0.35"
        filter={withFilter(filter)}
      />
    </svg>
  );
}

/** 手書き波線（下線・区切り用） */
export function WavyLine({
  className = "",
  filter = "jitter",
}: DoodleProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 16"
      preserveAspectRatio="none"
      className={`block ${className}`}
    >
      <path
        d="M2 8 q 12 -8 24 0 t 24 0 t 24 0 t 24 0 t 24 0 t 24 0 t 24 0 t 24 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        filter={withFilter(filter)}
      />
    </svg>
  );
}
