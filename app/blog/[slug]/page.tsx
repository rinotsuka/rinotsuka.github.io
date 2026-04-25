import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { formatDate, getAllSlugs, getPost } from "@/lib/blog/load";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: Params }) {
  const post = getPost(params.slug);
  if (!post) return {};
  return {
    title: `${post.title} | rinotsuka`,
    description: post.summary,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-[760px] px-6 py-12 md:py-16">
      <nav className="mb-6 text-sm text-ink-mute">
        <Link href="/blog/" className="hover:text-primary-strong">
          ← Blog
        </Link>
      </nav>

      <header className="mb-10 border-b border-line pb-6">
        <h1 className="text-[28px] font-bold leading-snug md:text-[32px]">
          {post.title}
        </h1>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-ink-mute">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          {post.tags && post.tags.length > 0 && <span aria-hidden>·</span>}
          {post.tags?.map((tag) => (
            <span key={tag} className="rounded-full bg-panel px-2 py-0.5 text-xs">
              #{tag}
            </span>
          ))}
        </div>
      </header>

      <div className="prose-blog">
        <MDXRemote
          source={post.content}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [
                rehypeSlug,
                [rehypeAutolinkHeadings, { behavior: "wrap" }],
              ],
            },
          }}
        />
      </div>
    </article>
  );
}
