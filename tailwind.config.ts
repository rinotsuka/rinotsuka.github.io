import type { Config } from "tailwindcss";

/**
 * Crayon × paper のデザイントークン。
 *
 * - 背景は温かいクリーム紙、テキストは濃い墨ブラウン。
 * - アクセントは焼きピーチ・セージ・サン（黄）の 3 系統。
 * - blob 用に不揃い border-radius を `rounded-blob*` で提供。
 * - 旧トークン名（base / accent / cream / line / sky）は互換のため新色にエイリアス。
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: "#FAF3E5",
          deep: "#F0E5CB",
          edge: "#D8C9A6",
        },
        ink: {
          DEFAULT: "#2A2418",
          mocha: "#5A4530",
          fade: "#7E6647",
        },
        peach: {
          DEFAULT: "#E68B6F",
          deep: "#7E2D14",
          soft: "#F4D0BC",
        },
        sage: {
          DEFAULT: "#8B9F60",
          deep: "#4D6125",
          soft: "#D9DEC0",
        },
        sun: {
          DEFAULT: "#E8B85E",
          deep: "#8B5E1B",
          soft: "#F4E5BB",
        },
        // 旧トークン互換（既存コンポーネントを破壊しないため）
        base: {
          DEFAULT: "#FAF3E5",
          ink: "#2A2418",
          muted: "#5A4530",
        },
        accent: {
          DEFAULT: "#E68B6F",
          deep: "#7E2D14",
          soft: "#F4D0BC",
        },
        cream: "#F4E5BB",
        sky: "#D2DEC9",
        line: "#D8C9A6",
      },
      fontFamily: {
        sans: ["var(--font-noto-jp)", "system-ui", "sans-serif"],
        display: ["var(--font-klee)", "var(--font-noto-jp)", "serif"],
        script: ["var(--font-caveat)", "cursive"],
      },
      borderRadius: {
        soft: "0.875rem",
        plump: "1.5rem",
        pill: "999px",
        blob: "62% 38% 53% 47% / 41% 59% 41% 59%",
        "blob-1": "58% 42% 47% 53% / 45% 55% 45% 55%",
        "blob-2": "65% 35% 60% 40% / 38% 62% 38% 62%",
        "blob-3": "50% 50% 38% 62% / 60% 40% 60% 40%",
      },
      boxShadow: {
        fluffy: "0 18px 48px -24px rgba(161, 70, 41, 0.35)",
        card: "0 6px 0 -3px rgba(42, 36, 24, 0.08), 0 16px 32px -22px rgba(42, 36, 24, 0.22)",
        crayon: "2px 3px 0 rgba(42, 36, 24, 0.14)",
        tape: "0 14px 30px -22px rgba(42, 36, 24, 0.4)",
      },
      borderWidth: {
        hair: "1px",
        soft: "1.5px",
        crayon: "2.5px",
      },
      keyframes: {
        wobble: {
          "0%, 100%": { transform: "rotate(-0.6deg)" },
          "50%": { transform: "rotate(0.6deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
        sway: {
          "0%, 100%": { transform: "translateX(-2px) rotate(-1deg)" },
          "50%": { transform: "translateX(2px) rotate(1deg)" },
        },
      },
      animation: {
        wobble: "wobble 6s ease-in-out infinite",
        float: "float 5s ease-in-out infinite",
        sway: "sway 7s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
