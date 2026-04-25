import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Post, PostFrontmatter, PostSummary } from "./types";

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

function readPostFile(slug: string): Post | null {
  const file = path.join(POSTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  const fm = data as PostFrontmatter;
  if (fm.draft) return null;
  return { ...fm, slug, content };
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getAllPosts(): PostSummary[] {
  return getAllSlugs()
    .map((slug) => {
      const post = readPostFile(slug);
      if (!post) return null;
      const { content: _content, ...summary } = post;
      return summary;
    })
    .filter((p): p is PostSummary => p !== null)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): Post | null {
  return readPostFile(slug);
}

export function getLatestPosts(limit = 3): PostSummary[] {
  return getAllPosts().slice(0, limit);
}

export function formatDate(d: string): string {
  return d.replace(/-/g, ".");
}
