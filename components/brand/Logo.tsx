/**
 * RINOTSUKA のオカメインコ・ロゴ。
 *
 * 手描きの小片を組み合わせる構成。各 <g> に `jitter` フィルタを掛けて
 * 手描き感を出す。色値はトークン直書きを避け、CSS 変数 `--c-*`
 * （globals.css の `.crayon-palette` で定義）経由で参照する。
 *
 * パーツ:
 *  - body: ぷっくりした体
 *  - head: 丸い頭
 *  - crest: 黄色いとさかの羽
 *  - cheek: ピンクのほっぺ
 *  - eye: 黒目
 *  - beak: ピーチのくちばし
 *  - belly-fluff: お腹の波線
 */
type Props = {
  className?: string;
  /** 装飾用のみ表示（aria-hidden）、true で支援技術に通じる名前を持たせない */
  decorative?: boolean;
};

export function Logo({ className = "", decorative = false }: Props) {
  return (
    <svg
      viewBox="0 0 120 120"
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : "RINOTSUKA のオカメインコロゴ"}
      aria-hidden={decorative ? "true" : undefined}
      className={`crayon-palette ${className}`}
    >
      {/* お腹のふわふわ羽（背面に薄く） */}
      <g
        fill="none"
        stroke="var(--c-mocha)"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.45"
        filter="url(#jitter)"
      >
        <path d="M40 84 q 4 4 8 0" />
        <path d="M54 90 q 4 4 8 0" />
        <path d="M70 84 q 4 4 8 0" />
      </g>

      {/* 体（淡いクリーム） */}
      <g filter="url(#jitter)">
        <path
          d="M22 70 q -2 -22 18 -32 q 22 -10 40 -2 q 22 10 24 32 q 2 22 -18 30 q -22 8 -42 4 q -22 -4 -22 -32 z"
          fill="var(--c-paper)"
          stroke="var(--c-ink)"
          strokeWidth="2.6"
          strokeLinejoin="round"
        />
      </g>

      {/* 頭（淡い黄色） */}
      <g filter="url(#jitter)">
        <path
          d="M40 36 q -2 -16 14 -22 q 18 -6 28 4 q 12 10 8 22 q -4 14 -22 18 q -22 4 -28 -6 q -4 -8 0 -16 z"
          fill="var(--c-sun-soft)"
          stroke="var(--c-ink)"
          strokeWidth="2.6"
          strokeLinejoin="round"
        />
      </g>

      {/* とさか（黄のクレヨン） */}
      <g
        fill="none"
        stroke="var(--c-sun)"
        strokeWidth="3.6"
        strokeLinecap="round"
        filter="url(#jitter-strong)"
      >
        <path d="M52 14 q 4 -8 10 -8" />
        <path d="M62 8 q 2 -6 6 -4" />
        <path d="M70 12 q 6 -2 8 4" />
      </g>
      {/* とさかの輪郭（インク） */}
      <g
        fill="none"
        stroke="var(--c-ink)"
        strokeWidth="2"
        strokeLinecap="round"
        filter="url(#jitter)"
      >
        <path d="M52 14 q 4 -8 10 -8" />
        <path d="M62 8 q 2 -6 6 -4" />
        <path d="M70 12 q 6 -2 8 4" />
      </g>

      {/* ほっぺ */}
      <g filter="url(#jitter-strong)">
        <ellipse
          cx="40"
          cy="44"
          rx="6"
          ry="4.5"
          fill="var(--c-peach)"
          opacity="0.85"
        />
        <ellipse
          cx="78"
          cy="44"
          rx="6"
          ry="4.5"
          fill="var(--c-peach)"
          opacity="0.85"
        />
      </g>

      {/* 黒目 */}
      <g filter="url(#jitter)">
        <circle cx="50" cy="34" r="3" fill="var(--c-ink)" />
        <circle cx="50.6" cy="33.4" r="0.9" fill="var(--c-paper)" />
      </g>

      {/* くちばし */}
      <g filter="url(#jitter)">
        <path
          d="M55 44 l 7 -1 l -3 7 z"
          fill="var(--c-peach-deep)"
          stroke="var(--c-ink)"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </g>

      {/* 横の小さなきらめき */}
      <g
        fill="none"
        stroke="var(--c-sun-deep)"
        strokeWidth="1.8"
        strokeLinecap="round"
        filter="url(#jitter)"
      >
        <path d="M100 40 l 0 6" />
        <path d="M97 43 l 6 0" />
        <path d="M16 60 l 0 5" />
        <path d="M13 62.5 l 6 0" />
      </g>
    </svg>
  );
}

/**
 * ヘッダ等で使うロゴ + ワードマークのロックアップ。
 */
export function LogoLockup({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <Logo className="h-12 w-12 shrink-0" decorative />
      <span className="flex flex-col leading-none">
        <span className="font-display text-xl tracking-[0.08em] text-ink">
          rinotsuka
        </span>
        <span className="mt-1 font-script text-sm text-peach-deep">
          development engineer
        </span>
      </span>
    </span>
  );
}
