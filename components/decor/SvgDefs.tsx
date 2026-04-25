/**
 * 全ページ共通で参照する SVG フィルタ defs。
 *
 * - jitter: 軽い揺らぎ（手描き感） - 波線・カードの輪郭などに
 * - jitter-strong: 強めの揺らぎ - ロゴや装飾の有機的な歪みに
 * - paper-grain: ノイズ（チョークざらつき）を重ねる
 *
 * `aria-hidden` で支援技術には不可視。`fixed inset-0 -z-50 h-0 w-0` で
 * レイアウトに影響しないオフスクリーン配置。
 */
export function SvgDefs() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className="pointer-events-none fixed left-0 top-0 -z-50 h-0 w-0"
    >
      <defs>
        <filter id="jitter" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.018"
            numOctaves="2"
            seed="3"
            result="t"
          />
          <feDisplacementMap in="SourceGraphic" in2="t" scale="2.6" />
        </filter>
        <filter id="jitter-strong" x="-8%" y="-8%" width="116%" height="116%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.04"
            numOctaves="2"
            seed="11"
            result="t"
          />
          <feDisplacementMap in="SourceGraphic" in2="t" scale="4.5" />
        </filter>
        <filter
          id="paper-grain-svg"
          x="0"
          y="0"
          width="100%"
          height="100%"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="1.4"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.28 0" />
        </filter>
      </defs>
    </svg>
  );
}
