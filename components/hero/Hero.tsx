import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Blob } from "@/components/decor/Blob";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <Blob
        variant={1}
        fill="#fff1e3"
        className="pointer-events-none absolute -right-20 -top-24 h-[420px] w-[420px]"
      />
      <Blob
        variant={2}
        fill="#fff5cf"
        className="pointer-events-none absolute -left-24 top-32 h-[340px] w-[340px] opacity-80"
      />

      <div className="relative mx-auto grid max-w-5xl grid-cols-1 gap-10 px-6 py-20 md:grid-cols-[1.2fr_1fr] md:py-28">
        <div className="flex flex-col justify-center">
          <span className="pill w-fit">Freelance Engineer</span>
          <h1 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">
            まるく、ぐにゃっと。
            <br />
            エンジニアとしての歩みを
            <br />
            紹介します。
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-ink-soft">
            フリーランスの SES エンジニア rinotsuka のプロフィール、職務経歴、ブログをまとめたサイトです。
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/#career"
              className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-soft hover:bg-primary-strong transition"
            >
              職務経歴を見る
            </Link>
            <Link
              href="/blog"
              className="rounded-full border border-line bg-paper px-6 py-2.5 text-sm font-semibold text-ink hover:border-primary hover:text-primary-strong transition"
            >
              ブログを読む
            </Link>
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="relative h-64 w-64 md:h-80 md:w-80">
            <div className="absolute inset-0 rounded-blob bg-primary-soft" />
            <div className="absolute inset-4 rounded-blob-2 bg-accent-soft" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Logo size={160} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
