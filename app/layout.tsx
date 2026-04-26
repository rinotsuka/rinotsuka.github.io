import type { Metadata } from "next";
import { Hachi_Maru_Pop } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const hachiMaruPop = Hachi_Maru_Pop({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-hachi-maru-pop",
  display: "swap",
});

export const metadata: Metadata = {
  title: "rinotsuka",
  description: "フリーランス SES エンジニアのプロフィール / 職務経歴 / ブログ",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={hachiMaruPop.variable}>
      <body className="min-h-screen bg-paper text-ink">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
