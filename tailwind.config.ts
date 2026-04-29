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
        cockatiel: "#faf9f5",
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
        handwritten: [
          "var(--font-hachi-maru-pop)",
          "Hiragino Maru Gothic ProN",
          "sans-serif",
        ],
      },
      borderRadius: {
        blob: "62% 38% 50% 50% / 52% 60% 40% 48%",
        "blob-2": "44% 56% 60% 40% / 56% 42% 58% 44%",
        "blob-3": "58% 42% 38% 62% / 46% 60% 40% 54%",
      },
      maxWidth: {
        content: "736px",
      },
      boxShadow: {
        soft: "0 12px 32px -18px rgba(255, 138, 61, 0.35)",
        card: "0 8px 24px -16px rgba(0, 0, 0, 0.18)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(var(--rot, 0deg))" },
          "50%": { transform: "translateY(-12px) rotate(var(--rot, 0deg))" },
        },
        sway: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        bob: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        blink: {
          "0%, 92%, 100%": { transform: "scaleY(1)" },
          "95%": { transform: "scaleY(0.1)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        sway: "sway 4s ease-in-out infinite",
        bob: "bob 3.5s ease-in-out infinite",
        blink: "blink 5s ease-in-out infinite",
        marquee: "marquee 140s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
