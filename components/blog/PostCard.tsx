import Link from "next/link";
import type { BlogPost } from "@/lib/blog/schema";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const STICKY_PALETTES = [
  { surface: "bg-paper", tag: "bg-peach-soft", tagText: "text-peach-deep" },
  { surface: "bg-sun-soft", tag: "bg-sage-soft", tagText: "text-sage-deep" },
  { surface: "bg-sage-soft", tag: "bg-sun-soft", tagText: "text-sun-deep" },
  { surface: "bg-peach-soft", tag: "bg-paper", tagText: "text-peach-deep" },
];

const POSTCARD_BLOBS = [
  "62% 38% 53% 47% / 41% 59% 41% 59%",
  "58% 42% 47% 53% / 45% 55% 45% 55%",
  "65% 35% 60% 40% / 38% 62% 38% 62%",
  "50% 50% 38% 62% / 60% 40% 60% 40%",
];

export function PostCard({
  post,
  index = 0,
}: {
  post: BlogPost;
  index?: number;
}) {
  const palette = STICKY_PALETTES[index % STICKY_PALETTES.length];
  const blob = POSTCARD_BLOBS[index % POSTCARD_BLOBS.length];

  return (
    <article className="group relative">
      {/* テープ風の背面影 */}
      <div
        aria-hidden="true"
        className="absolute -inset-1 bg-paper-edge/30 shadow-tape"
        style={{ borderRadius: blob }}
      />
      <Link
        href={`${basePath}/blog/${post.slug}`}
        className={`paper-surface relative block ${palette.surface} p-6 sm:p-7 transition-transform duration-200 hover:-translate-y-0.5 hover:rotate-[-0.4deg]`}
        style={{ borderRadius: blob }}
      >
        <p className="font-script text-sm text-peach-deep">
          <time dateTime={post.date}>{post.date}</time>
        </p>
        <h3 className="mt-2 font-display text-xl text-ink">
          <span className="bg-[length:100%_36%] bg-bottom bg-no-repeat group-hover:bg-[image:linear-gradient(theme(colors.peach.soft),theme(colors.peach.soft))]">
            {post.title}
          </span>
        </h3>
        <p className="mt-3 text-sm leading-6 text-ink">{post.summary}</p>
        {post.tags && post.tags.length > 0 ? (
          <ul className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((t, tIdx) => (
              <li
                key={t}
                className={`${palette.tag} ${palette.tagText} px-2.5 py-0.5 text-xs shadow-crayon`}
                style={{
                  borderRadius:
                    POSTCARD_BLOBS[(index + tIdx + 1) % POSTCARD_BLOBS.length],
                }}
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
