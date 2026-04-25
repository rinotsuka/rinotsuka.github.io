import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import rehypePrettyCode from "rehype-pretty-code";
import { loadAllSlugs, loadPost } from "@/lib/blog/load";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function generateStaticParams() {
  return loadAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = loadPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
      images: [
        {
          url: `${basePath}/og/${post.slug}.png`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
}

const rehypePlugins = [
  [
    rehypePrettyCode,
    {
      theme: "github-dark-default",
      keepBackground: true,
    },
  ],
] as const;

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = loadPost(slug);
  if (!post) notFound();

  const { default: Content } = await evaluate(post.content, {
    ...(runtime as unknown as Record<string, unknown>),
    baseUrl: import.meta.url,
    rehypePlugins: rehypePlugins as never,
  } as never);

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-xs text-base-muted">
        <Link href={`${basePath}/blog`} className="hover:text-accent-deep">
          ← Blog 一覧へ
        </Link>
      </p>
      <article className="mt-6">
        <header>
          <h1 className="font-display text-3xl leading-tight text-base-ink">
            {post.title}
          </h1>
          <p className="mt-2 text-sm text-base-muted">
            <time dateTime={post.date}>{post.date}</time>
          </p>
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
        </header>
        <div className="prose-rino mt-10">
          <Content />
        </div>
      </article>
    </main>
  );
}
