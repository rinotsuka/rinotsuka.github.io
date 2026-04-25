import Link from "next/link";
import type { BlogPost } from "@/lib/blog/schema";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function PostCard({ post }: { post: BlogPost }) {
  return (
    <article className="rounded-plump border-hair border-line bg-white/70 p-6 shadow-card transition-shadow hover:shadow-fluffy">
      <Link href={`${basePath}/blog/${post.slug}`} className="block">
        <h3 className="font-display text-lg text-base-ink">{post.title}</h3>
        <p className="mt-1 text-xs text-base-muted">
          <time dateTime={post.date}>{post.date}</time>
        </p>
        <p className="mt-3 text-sm text-base-ink/90">{post.summary}</p>
        {post.tags && post.tags.length > 0 ? (
          <ul className="mt-3 flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <li
                key={t}
                className="rounded-pill bg-accent-soft px-2.5 py-0.5 text-xs text-accent-deep"
              >
                #{t}
              </li>
            ))}
          </ul>
        ) : null}
      </Link>
    </article>
  );
}
