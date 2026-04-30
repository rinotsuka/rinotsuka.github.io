import type { Metadata } from "next";
import { Hachi_Maru_Pop } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Contact } from "@/components/contact/Contact";

const GA_MEASUREMENT_ID = "G-C87M8T3MVY";

const hachiMaruPop = Hachi_Maru_Pop({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-hachi-maru-pop",
  display: "swap",
});

export const metadata: Metadata = {
  title: "えんじにあ no ぽーとふぉりお",
  description: "フリーランス SES エンジニアのプロフィール / 職務経歴 / ブログ",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={hachiMaruPop.variable}>
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
      </head>
      <body className="min-h-screen bg-paper text-ink">
        <Header />
        <main>{children}</main>
        <Contact />
        <Footer />
      </body>
    </html>
  );
}
