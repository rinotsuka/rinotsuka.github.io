import { Suspense } from "react";
import type { Metadata } from "next";
import { loadAllPosts, loadAllTags } from "@/lib/blog/load";
import { BlogList } from "@/components/blog/BlogList";
import { WavyLine } from "@/components/decor/Doodle";

export const metadata: Metadata = {
  title: "ブログ",
  description: "rinotsuka が書いた記事一覧。タグでの絞り込みもできます。",
};

export default function BlogIndexPage() {
  const posts = loadAllPosts();
  const tags = loadAllTags();

  return (
    <main className="mx-auto max-w-3xl px-6 py-20">
      <p className="chapter-stamp" aria-hidden="true">
        archive — 過去のかきもの
      </p>
      <h1 className="mt-3 font-display text-4xl text-ink sm:text-5xl">Blog</h1>
      <WavyLine className="mt-3 h-3 w-32 text-peach-deep/70" />
      <p className="mt-4 max-w-xl text-base leading-7 text-ink">
        日々の学びと、案件で考えたことを淡くまとめる場所。気が向いたら寄ってください。
      </p>
      <Suspense
        fallback={
          <p className="mt-8 font-script text-base text-ink-mocha">読み込み中…</p>
        }
      >
        <BlogList posts={posts} allTags={tags} />
      </Suspense>
    </main>
  );
}
