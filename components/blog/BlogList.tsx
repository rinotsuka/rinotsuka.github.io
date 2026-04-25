"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import type { BlogPost } from "@/lib/blog/schema";
import { PostCard } from "./PostCard";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function BlogList({
  posts,
  allTags,
}: {
  posts: BlogPost[];
  allTags: string[];
}) {
  const params = useSearchParams();
  const activeTag = params.get("tag");

  const visible = useMemo(() => {
    if (!activeTag) return posts;
    return posts.filter((p) => (p.tags ?? []).includes(activeTag));
  }, [posts, activeTag]);

  return (
    <>
      {allTags.length > 0 ? (
        <nav aria-label="タグフィルタ" className="mt-6">
          <ul className="flex flex-wrap items-center gap-2 text-xs">
            <li>
              <Link
                href={`${basePath}/blog`}
                className={`rounded-pill border-soft px-3 py-1 transition-colors ${
                  !activeTag
                    ? "border-peach-deep bg-peach-soft text-peach-deep"
                    : "border-paper-edge bg-paper text-ink hover:border-peach-deep"
                }`}
              >
                すべて
              </Link>
            </li>
            {allTags.map((t) => (
              <li key={t}>
                <Link
                  href={`${basePath}/blog?tag=${encodeURIComponent(t)}`}
                  className={`rounded-pill border-soft px-3 py-1 transition-colors ${
                    activeTag === t
                      ? "border-peach-deep bg-peach-soft text-peach-deep"
                      : "border-paper-edge bg-paper text-ink hover:border-peach-deep"
                  }`}
                >
                  #{t}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}

      {visible.length === 0 ? (
        <p className="mt-10 text-sm text-ink-mocha">
          該当する記事がありません。
        </p>
      ) : (
        <ul className="mt-8 grid gap-7 sm:grid-cols-2">
          {visible.map((post, idx) => (
            <li key={post.slug}>
              <PostCard post={post} index={idx} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
