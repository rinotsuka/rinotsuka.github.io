import Link from "next/link";
import type { PostSummary } from "@/lib/blog/types";
import { formatDate } from "@/lib/blog/load";

type Props = {
  post: PostSummary;
};

export function PostCard({ post }: Props) {
  return (
    <Link
      href={`/blog/${post.slug}/`}
      className="group block rounded-2xl bg-paper transition hover:-translate-y-0.5"
    >
      <div className="flex items-center gap-2 text-xs text-ink-mute">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
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
