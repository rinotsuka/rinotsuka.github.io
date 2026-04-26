import Link from "next/link";
import { getLatestPosts } from "@/lib/blog/load";
import { PostCard } from "./PostCard";

export function LatestPosts() {
  const posts = getLatestPosts(3);
  if (posts.length === 0) return null;

  return (
    <section className="py-20 md:py-24">
      <div className="mx-auto max-w-content px-4">
        <header className="mb-10 flex items-end justify-between">
          <div>
            <span className="pill pill-mute">Blog</span>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">最新の記事</h2>
          </div>
          <Link
            href="/blog/"
            className="text-sm font-semibold text-primary-strong hover:underline"
          >
            一覧を見る →
          </Link>
        </header>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {posts.map((post, i) => (
            <PostCard
              key={post.slug}
              post={post}
              variant={((i % 3) + 1) as 1 | 2 | 3}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
