import Link from "next/link";
import type { PostSummary } from "@/lib/blog/types";
import { formatDate } from "@/lib/blog/load";

type Props = {
  post: PostSummary;
  variant?: 1 | 2 | 3;
};

const RADIUS_BY_VARIANT: Record<1 | 2 | 3, string> = {
  1: "rounded-blob",
  2: "rounded-blob-2",
  3: "rounded-blob-3",
};

export function PostCard({ post, variant = 1 }: Props) {
  return (
    <Link
      href={`/blog/${post.slug}/`}
      className={`group block ${RADIUS_BY_VARIANT[variant]} border border-line bg-paper p-6 shadow-card transition hover:-translate-y-0.5 hover:shadow-soft`}
    >
      <div className="flex items-center gap-2 text-xs text-ink-mute">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        {post.tags && post.tags.length > 0 && (
          <span aria-hidden>·</span>
        )}
        {post.tags?.slice(0, 3).map((tag) => (
          <span key={tag} className="rounded-full bg-panel/60 px-2 py-0.5">
            #{tag}
          </span>
        ))}
      </div>
      <h3 className="mt-3 text-lg font-bold leading-snug text-ink group-hover:text-primary-strong transition">
        {post.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">
        {post.summary}
      </p>
    </Link>
  );
}
