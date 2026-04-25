import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { Feed } from "feed";
import { loadAllPosts } from "../lib/blog/load";

const SITE_URL = "https://rinotsuka.github.io";
const basePath = process.env.NEXT_BASE_PATH ?? "";

async function main() {
  const posts = loadAllPosts();
  const updated = posts[0]
    ? new Date(`${posts[0].date}T00:00:00Z`)
    : new Date();

  const feed = new Feed({
    title: "RINOTSUKA",
    description: "rinotsuka の個人サイト / ブログ",
    id: SITE_URL + "/",
    link: SITE_URL + basePath + "/",
    language: "ja",
    image: `${SITE_URL}${basePath}/og/index.png`,
    favicon: `${SITE_URL}${basePath}/favicon.svg`,
    copyright: `© ${new Date().getFullYear()} rinotsuka`,
    updated,
    feedLinks: {
      atom: `${SITE_URL}${basePath}/feed.xml`,
    },
    author: {
      name: "rinotsuka",
      link: SITE_URL,
    },
  });

  for (const post of posts) {
    const url = `${SITE_URL}${basePath}/blog/${post.slug}/`;
    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      description: post.summary,
      date: new Date(`${post.date}T00:00:00Z`),
      category: (post.tags ?? []).map((t) => ({ name: t })),
    });
  }

  const outDir = join(process.cwd(), "out");
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "feed.xml"), feed.atom1(), "utf8");
  console.log(`feed.xml: ${posts.length} items`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
