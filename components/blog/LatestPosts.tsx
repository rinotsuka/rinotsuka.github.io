import Link from "next/link";
import { loadAllPosts } from "@/lib/blog/load";
import { PostCard } from "./PostCard";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function LatestPosts({ limit = 3 }: { limit?: number }) {
  const posts = loadAllPosts().slice(0, limit);

  return (
    <section
      id="latest-blog"
      aria-labelledby="latest-blog-heading"
      className="mx-auto max-w-3xl px-6 py-16"
    >
      <div className="flex items-baseline justify-between">
        <h2
          id="latest-blog-heading"
          className="font-display text-3xl text-base-ink"
        >
          Latest blog
        </h2>
        <Link
          href={`${basePath}/blog`}
          className="text-sm text-accent-deep hover:underline"
        >
          すべて見る →
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="mt-6 text-sm text-base-muted">
          まだ記事がありません。`content/blog/*.mdx` を追加すると自動で公開されます。
        </p>
      ) : (
        <ul className="mt-8 grid gap-5">
          {posts.map((post) => (
            <li key={post.slug}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
