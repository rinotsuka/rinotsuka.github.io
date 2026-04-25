import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "rinotsuka",
  description: "フリーランス SES エンジニアのプロフィール / 職務経歴 / ブログ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
