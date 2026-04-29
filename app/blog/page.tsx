import { getAllPosts } from "@/lib/blog/load";
import { PostCard } from "@/components/blog/PostCard";

export const metadata = {
  title: "Blog | rinotsuka",
  description: "rinotsuka のブログ記事一覧",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-content px-4">
        <header className="mb-10">
          <span className="pill">Blog</span>
          <h1 className="mt-3 text-3xl font-bold md:text-4xl">記事一覧</h1>
          <p className="mt-3 text-sm text-ink-mute">
            技術や日々の作業ログを書きます。
          </p>
        </header>

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
  );
}
