import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // 暫定パレット（design.md Open Question: 配色トークン具体値）
        // 「可愛い × おしゃれ × ふわふわ」基調
        base: {
          DEFAULT: "#FBF7F2", // 背景
          ink: "#3F3A45", // 本文テキスト
          muted: "#7A7388", // 弱いテキスト
        },
        accent: {
          DEFAULT: "#F4B6C2", // ピーチピンク
          deep: "#D98AA0",
          soft: "#FBE3E8",
        },
        cream: "#FFF6E5",
        sky: "#CFE7F2",
        line: "#EDE6DC",
      },
      fontFamily: {
        // 暫定（design.md Open Question: フォント選定）
        sans: ["var(--font-noto-jp)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-noto-jp)", "sans-serif"],
      },
      borderRadius: {
        soft: "0.875rem",
        plump: "1.5rem",
        pill: "999px",
      },
      boxShadow: {
        fluffy: "0 18px 48px -24px rgba(217, 138, 160, 0.45)",
        card: "0 8px 24px -16px rgba(63, 58, 69, 0.18)",
      },
      borderWidth: {
        hair: "1px",
        soft: "1.5px",
      },
    },
  },
  plugins: [],
};

export default config;
