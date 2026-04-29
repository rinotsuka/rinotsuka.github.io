import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { formatDate, getAllSlugs, getPost } from "@/lib/blog/load";
import { Hero } from "@/components/hero/Hero";
import { SectionHeading } from "@/components/heading/SectionHeading";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
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
    <>
      <Hero title={post.title} />
      <section className="py-12 md:py-16">
        <article className="mx-auto max-w-content px-4">
          <div className="mb-7 pb-6 text-center text-sm text-ink-mute">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </div>

          <div className="prose-blog">
            <MDXRemote
              source={post.content}
              components={{
                h2: ({ children, id }) => (
                  <div className="!mb-8 !mt-24">
                    <SectionHeading id={id}>{children}</SectionHeading>
                  </div>
                ),
                hr: () => (
                  <div className="!my-10 flex w-full justify-center overflow-hidden">
                    <div className="w-full min-w-[640px] border-t-2 border-dashed border-primary md:min-w-[704px]" />
                  </div>
                ),
              }}
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
      </section>
    </>
  );
}
