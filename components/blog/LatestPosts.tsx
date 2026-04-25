import Link from "next/link";
import { loadAllPosts } from "@/lib/blog/load";
import { PostCard } from "./PostCard";
import { Sparkle, WavyLine } from "@/components/decor/Doodle";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function LatestPosts({ limit = 3 }: { limit?: number }) {
  const posts = loadAllPosts().slice(0, limit);

  return (
    <section
      id="latest-blog"
      aria-labelledby="latest-blog-heading"
      className="paper-surface-deep relative"
    >
      <Sparkle
        className="pointer-events-none absolute right-[8%] top-12 h-10 w-10 animate-float text-sun-deep"
        filter="jitter-strong"
      />

      <div className="mx-auto max-w-3xl px-6 py-20 sm:py-24">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="chapter-stamp" aria-hidden="true">
              chapter 03 — 最近のかきもの
            </p>
            <h2
              id="latest-blog-heading"
              className="mt-3 font-display text-4xl text-ink sm:text-5xl"
            >
              Latest blog
            </h2>
            <WavyLine className="mt-3 h-3 w-32 text-sun-deep/70" />
          </div>
          <Link
            href={`${basePath}/blog`}
            className="inline-flex shrink-0 items-center gap-2 rounded-pill border-soft border-paper-edge bg-paper px-4 py-1.5 text-sm font-display text-ink shadow-crayon transition-transform hover:-translate-y-0.5 hover:border-peach-deep hover:text-peach-deep"
          >
            すべて見る
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        {posts.length === 0 ? (
          <p
            className="paper-surface bg-paper p-7 text-sm text-ink-mocha"
            style={{
              borderRadius: "62% 38% 53% 47% / 41% 59% 41% 59%",
            }}
          >
            まだ記事がありません。
            <code className="rounded-soft bg-sun-soft px-1.5 py-0.5">
              content/blog/*.mdx
            </code>
            を追加すると、自動でこの場所に並びます。
          </p>
        ) : (
          <ul className="grid gap-7 sm:grid-cols-2">
            {posts.map((post, idx) => (
              <li key={post.slug}>
                <PostCard post={post} index={idx} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
