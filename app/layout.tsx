import type { Metadata } from "next";
import { Caveat, Klee_One, Noto_Sans_JP } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SvgDefs } from "@/components/decor/SvgDefs";
import "./globals.css";

const notoJp = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-jp",
  display: "swap",
});

const klee = Klee_One({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-klee",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-caveat",
  display: "swap",
});

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  title: {
    default: "RINOTSUKA — development engineer",
    template: "%s | RINOTSUKA",
  },
  description:
    "rinotsuka の経歴・案件・学びを、ふわっと読み物としてまとめた個人プロフィールサイト。",
  metadataBase: new URL("https://rinotsuka.github.io"),
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "RINOTSUKA",
    title: "RINOTSUKA — development engineer",
    description:
      "rinotsuka の経歴・案件・学びを、ふわっと読み物としてまとめた個人プロフィールサイト。",
    images: [
      {
        url: `${basePath}/og/index.png`,
        width: 1200,
        height: 630,
        alt: "RINOTSUKA — development engineer",
      },
    ],
  },
  icons: {
    icon: `${basePath}/favicon.svg`,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ja"
      className={`${notoJp.variable} ${klee.variable} ${caveat.variable}`}
    >
      <body className="min-h-screen bg-paper text-ink">
        <SvgDefs />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
