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
        paper: "#ffffff",
        panel: "#f7f7f7",
        line: "#e9e7e2",
        ink: {
          DEFAULT: "#2a2a2a",
          soft: "#4f4f4f",
          mute: "#8a8a8a",
        },
        primary: {
          DEFAULT: "#ff8a3d",
          strong: "#ff6b1a",
          soft: "#fff1e3",
        },
        accent: {
          DEFAULT: "#ffcd3c",
          soft: "#fff5cf",
        },
      },
      fontFamily: {
        sans: [
          "ui-sans-serif",
          "system-ui",
          "Hiragino Maru Gothic ProN",
          "Hiragino Kaku Gothic ProN",
          "Hiragino Sans",
          "BIZ UDPGothic",
          "Meiryo",
          "sans-serif",
        ],
      },
      borderRadius: {
        blob: "62% 38% 50% 50% / 52% 60% 40% 48%",
        "blob-2": "44% 56% 60% 40% / 56% 42% 58% 44%",
        "blob-3": "58% 42% 38% 62% / 46% 60% 40% 54%",
      },
      boxShadow: {
        soft: "0 12px 32px -18px rgba(255, 138, 61, 0.35)",
        card: "0 8px 24px -16px rgba(0, 0, 0, 0.18)",
      },
    },
  },
  plugins: [],
};

export default config;
