import { getAllPosts } from "@/lib/blog/load";
import { PostCard } from "@/components/blog/PostCard";
import { Hero } from "@/components/hero/Hero";

export const metadata = {
  title: "Blog | rinotsuka",
  description: "rinotsuka のブログ記事一覧",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <>
      <Hero title="記事一覧" />
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-content px-4">
          {posts.length === 0 ? (
            <p className="text-ink-soft">まだ記事がありません。</p>
          ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
