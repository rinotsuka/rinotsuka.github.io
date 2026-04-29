import Link from "next/link";
import { getLatestPosts } from "@/lib/blog/load";
import { SectionHeading } from "@/components/heading/SectionHeading";

export function LatestPosts() {
  const posts = getLatestPosts(3);
  if (posts.length === 0) return null;

  return (
    <section className="bg-panel/60 py-20 md:py-24">
      <div className="mx-auto max-w-content px-4">
        <header className="mb-12 text-center">
          <SectionHeading>最新の記事</SectionHeading>
        </header>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}/`}
              className="group block rounded-2xl bg-paper p-6 transition hover:-translate-y-0.5"
            >
              <h3 className="text-lg font-bold leading-snug text-ink transition group-hover:text-primary-strong">
                {post.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {post.summary}
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/blog/"
            className="group inline-flex w-48 items-center justify-between rounded-full bg-paper py-3 pl-8 pr-4 text-sm text-ink"
          >
            <span>一覧を見る</span>
            <span aria-hidden className="flex items-center">
              <span className="block h-px w-8 bg-ink" />
              <span className="-ml-2.5 block h-5 w-5 rounded-full bg-primary/30 transition duration-300 group-hover:scale-150 group-hover:bg-primary/45 motion-reduce:transform-none" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
