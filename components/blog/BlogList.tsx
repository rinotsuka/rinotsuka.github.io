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
                className={`rounded-pill border-hair px-3 py-1 transition-colors ${
                  !activeTag
                    ? "border-accent bg-accent-soft text-accent-deep"
                    : "border-line bg-white/70 text-base-ink hover:border-accent"
                }`}
              >
                すべて
              </Link>
            </li>
            {allTags.map((t) => (
              <li key={t}>
                <Link
                  href={`${basePath}/blog?tag=${encodeURIComponent(t)}`}
                  className={`rounded-pill border-hair px-3 py-1 transition-colors ${
                    activeTag === t
                      ? "border-accent bg-accent-soft text-accent-deep"
                      : "border-line bg-white/70 text-base-ink hover:border-accent"
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
        <p className="mt-10 text-sm text-base-muted">
          該当する記事がありません。
        </p>
      ) : (
        <ul className="mt-8 grid gap-5">
          {visible.map((post) => (
            <li key={post.slug}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
