import type { Metadata } from "next";
import { Noto_Sans_JP, Plus_Jakarta_Sans } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const notoJp = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-jp",
  display: "swap",
});

const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-display",
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
    <html lang="ja" className={`${notoJp.variable} ${display.variable}`}>
      <body className="min-h-screen bg-base text-base-ink">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
