import { Suspense } from "react";
import type { Metadata } from "next";
import { loadAllPosts, loadAllTags } from "@/lib/blog/load";
import { BlogList } from "@/components/blog/BlogList";

export const metadata: Metadata = {
  title: "ブログ",
  description: "rinotsuka が書いた記事一覧。タグでの絞り込みもできます。",
};

export default function BlogIndexPage() {
  const posts = loadAllPosts();
  const tags = loadAllTags();

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-display text-3xl text-base-ink">Blog</h1>
      <p className="mt-2 text-sm text-base-muted">
        日々の学びと、案件で考えたことを残していく場所。
      </p>
      <Suspense
        fallback={
          <p className="mt-8 text-sm text-base-muted">読み込み中…</p>
        }
      >
        <BlogList posts={posts} allTags={tags} />
      </Suspense>
    </main>
  );
}
