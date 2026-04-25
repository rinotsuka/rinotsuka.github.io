import { writeFileSync, mkdirSync, existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { loadAllPosts } from "../lib/blog/load";

const OUT_DIR = join(process.cwd(), "out", "og");
const FONT_REGULAR = join(process.cwd(), "assets", "fonts", "NotoSansJP-Regular.otf");
const FONT_BOLD = join(process.cwd(), "assets", "fonts", "NotoSansJP-Bold.otf");

type Card = {
  outFile: string;
  title: string;
  subtitle: string;
};

function template({ title, subtitle }: { title: string; subtitle: string }) {
  return {
    type: "div",
    props: {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "80px",
        backgroundImage: "linear-gradient(135deg, #FBF7F2 0%, #FBE3E8 100%)",
        fontFamily: "Noto Sans JP",
        color: "#3F3A45",
      },
      children: [
        {
          type: "div",
          props: {
            style: {
              fontSize: 28,
              letterSpacing: 6,
              color: "#D98AA0",
              textTransform: "uppercase",
            },
            children: subtitle,
          },
        },
        {
          type: "div",
          props: {
            style: {
              marginTop: 24,
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.25,
              color: "#3F3A45",
              maxWidth: "1040px",
            },
            children: title,
          },
        },
        {
          type: "div",
          props: {
            style: {
              marginTop: 48,
              fontSize: 24,
              color: "#7A7388",
            },
            children: "rinotsuka.github.io",
          },
        },
      ],
    },
  };
}

async function renderCard(
  card: Card,
  fonts: Awaited<ReturnType<typeof loadFonts>>,
) {
  const svg = await satori(
    template({ title: card.title, subtitle: card.subtitle }) as never,
    { width: 1200, height: 630, fonts },
  );
  const png = new Resvg(svg).render().asPng();
  writeFileSync(join(OUT_DIR, card.outFile), png);
  console.log(`og: ${card.outFile}`);
}

async function loadFonts() {
  for (const p of [FONT_REGULAR, FONT_BOLD]) {
    if (!existsSync(p)) {
      throw new Error(
        `OGP フォントが見つかりません: ${p}\n` +
          "node scripts/setup-fonts.mjs を実行するか、SIL OFL の Noto Sans JP OTF を assets/fonts/ に配置してください。",
      );
    }
  }
  return [
    {
      name: "Noto Sans JP",
      data: readFileSync(FONT_REGULAR),
      weight: 400 as const,
      style: "normal" as const,
    },
    {
      name: "Noto Sans JP",
      data: readFileSync(FONT_BOLD),
      weight: 700 as const,
      style: "normal" as const,
    },
  ];
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });

  const fonts = await loadFonts();

  const cards: Card[] = [
    {
      outFile: "index.png",
      title: "RINOTSUKA — development engineer",
      subtitle: "profile / blog",
    },
    ...loadAllPosts().map((post) => ({
      outFile: `${post.slug}.png`,
      title: post.title,
      subtitle: "blog",
    })),
  ];

  for (const card of cards) {
    await renderCard(card, fonts);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
