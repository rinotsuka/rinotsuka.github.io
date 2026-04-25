type Variant = "calm" | "rough" | "tide" | "scallop";

const PATHS: Record<Variant, string> = {
  // 穏やかなさざ波（左右に小さくうねる）
  calm:
    "M0 36 Q 60 18 120 32 T 240 28 T 360 36 T 480 22 T 600 32 T 720 28 T 840 34 T 960 24 T 1080 32 T 1200 28 L 1200 80 L 0 80 Z",
  // ばらばらの粗い波（高低差大、リズム不揃い）
  rough:
    "M0 40 Q 48 18 92 36 Q 132 52 178 26 Q 222 6 274 34 Q 320 56 378 30 Q 436 14 488 38 Q 538 56 596 30 Q 648 10 716 36 Q 768 54 826 32 Q 884 12 942 38 Q 1004 56 1066 32 Q 1130 14 1200 36 L 1200 80 L 0 80 Z",
  // 大きく寄せて引く潮の動き
  tide:
    "M0 24 C 96 44 192 8 288 26 S 480 50 576 18 S 768 44 864 22 S 1056 46 1152 24 L 1200 28 L 1200 80 L 0 80 Z",
  // ホタテ風の連続スカラップ（小さな半円が並ぶ）
  scallop:
    "M0 38 Q 30 14 60 38 Q 90 62 120 38 Q 150 14 180 38 Q 210 62 240 38 Q 270 14 300 38 Q 330 62 360 38 Q 390 14 420 38 Q 450 62 480 38 Q 510 14 540 38 Q 570 62 600 38 Q 630 14 660 38 Q 690 62 720 38 Q 750 14 780 38 Q 810 62 840 38 Q 870 14 900 38 Q 930 62 960 38 Q 990 14 1020 38 Q 1050 62 1080 38 Q 1110 14 1140 38 Q 1170 62 1200 38 L 1200 80 L 0 80 Z",
};

/**
 * 手描き風の波線セクションディバイダ。
 *
 * - `variant`: 波の質感を選ぶ
 * - `tone`: 次セクションの背景色（fill 色）— `text-*` クラスで指定
 * - `flip`: 上下反転（次セクションが上にあるパターン用）
 * - SVG `jitter` フィルタを通して微小な揺らぎを与える
 */
export function WaveDivider({
  variant = "rough",
  tone = "text-paper-deep",
  flip = false,
  className = "",
}: {
  variant?: Variant;
  tone?: string;
  flip?: boolean;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`relative ${tone} ${className}`}
    >
      <svg
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
        className={`block h-12 w-full sm:h-16 ${flip ? "rotate-180" : ""}`}
      >
        <path d={PATHS[variant]} fill="currentColor" filter="url(#jitter)" />
      </svg>
    </div>
  );
}
