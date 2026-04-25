import { Logo } from "@/components/brand/Logo";
import { Blossom, Sparkle, Swirl, WavyLine } from "@/components/decor/Doodle";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28"
    >
      {/* 背景の浮遊する装飾 */}
      <Swirl
        className="pointer-events-none absolute -top-6 right-[10%] h-16 w-16 text-peach/60 sm:h-24 sm:w-24"
        filter="jitter-strong"
      />
      <Blossom
        className="pointer-events-none absolute top-32 left-[6%] h-12 w-12 animate-sway text-sun-deep/70 sm:h-16 sm:w-16"
        filter="jitter-strong"
      />
      <Sparkle
        className="pointer-events-none absolute right-[18%] bottom-12 h-10 w-10 animate-float text-sage-deep/70"
      />
      <Sparkle
        className="pointer-events-none absolute left-[18%] top-44 h-6 w-6 text-peach-deep/70"
      />

      <div className="relative mx-auto grid max-w-5xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-[1.1fr_1fr]">
        <div>
          {/* チャプター印 */}
          <p className="chapter-stamp" aria-hidden="true">
            chapter 00 — はじめまして
          </p>

          {/* 見出し */}
          <h1
            id="hero-heading"
            className="mt-4 font-display text-[clamp(3rem,8vw,5.5rem)] leading-[0.95] text-ink"
          >
            <span className="block">
              <span className="crayon-underline">rino</span>tsuka
            </span>
            <span
              aria-hidden="true"
              className="mt-3 block font-script text-[0.36em] text-peach-deep"
            >
              development engineer
            </span>
          </h1>

          {/* リード文 */}
          <div className="mt-8 max-w-md text-base leading-7 text-ink">
            <p>
              Web アプリケーションの設計と実装、ドキュメント整備のあいだを
              のんびり行き来している
              <span className="text-peach-deep">日々の記録</span>
              と、
              <span className="text-sage-deep">案件単位の経歴</span>
              を、ふわっと読める形でまとめています。
            </p>
          </div>

          {/* CTA */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#career"
              className="group inline-flex items-center gap-2 rounded-pill border-crayon border-ink bg-paper px-5 py-2.5 text-sm font-display text-ink shadow-crayon transition-transform hover:-translate-y-0.5"
            >
              <span>これまでを読む</span>
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href={`${basePath}/blog`}
              className="inline-flex items-center gap-2 rounded-pill bg-peach-deep px-5 py-2.5 text-sm font-display text-paper shadow-crayon transition-transform hover:-translate-y-0.5"
            >
              ブログへ寄り道
            </a>
          </div>

          {/* 手書き波下線 */}
          <WavyLine className="mt-10 h-3 w-40 text-peach-deep/70" />
        </div>

        {/* ロゴアート（巨大表示）。blob 形のテープを背景に、ロゴを浮かせる */}
        <div className="relative mx-auto aspect-square w-full max-w-[420px]">
          {/* 背景 blob 1 */}
          <div
            aria-hidden="true"
            className="paper-surface absolute inset-0 -translate-x-2 -translate-y-2 rounded-[var(--blob)] bg-peach-soft/70 shadow-tape [--blob:62%_38%_53%_47%/41%_59%_41%_59%]"
          />
          {/* 背景 blob 2 */}
          <div
            aria-hidden="true"
            className="absolute inset-2 translate-x-3 translate-y-3 rounded-[var(--blob)] bg-sage-soft/60 [--blob:58%_42%_47%_53%/45%_55%_45%_55%]"
          />
          {/* ロゴ本体 */}
          <div className="paper-surface relative grid h-full w-full place-items-center rounded-[var(--blob-2)] bg-paper p-8 shadow-card animate-wobble [--blob-2:65%_35%_60%_40%/38%_62%_38%_62%]">
            <Logo className="h-full w-full max-w-[280px]" decorative />
          </div>
          {/* 横の小さな星 */}
          <Sparkle
            className="absolute -right-3 top-6 h-8 w-8 text-sun-deep"
            filter="jitter-strong"
          />
          <Sparkle
            className="absolute -left-2 bottom-8 h-6 w-6 text-peach-deep"
          />
        </div>
      </div>
    </section>
  );
}
