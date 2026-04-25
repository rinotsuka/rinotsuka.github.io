import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, basename, extname } from "node:path";
import matter from "gray-matter";
import { FrontmatterSchema, type BlogPost } from "./schema";

const BLOG_DIR = join(process.cwd(), "content", "blog");

let cached: BlogPost[] | null = null;

export function loadAllPosts(): BlogPost[] {
  if (cached) return cached;
  if (!existsSync(BLOG_DIR)) {
    cached = [];
    return cached;
  }

  const files = readdirSync(BLOG_DIR).filter((f) => extname(f) === ".mdx");

  const posts: BlogPost[] = files.map((file) => {
    const slug = basename(file, ".mdx");
    const raw = readFileSync(join(BLOG_DIR, file), "utf8");
    const { data, content } = matter(raw);
    const frontmatter = FrontmatterSchema.parse(data);
    return { ...frontmatter, slug, content };
  });

  posts.sort((a, b) => b.date.localeCompare(a.date));
  cached = posts;
  return posts;
}

export function loadPost(slug: string): BlogPost | null {
  return loadAllPosts().find((p) => p.slug === slug) ?? null;
}

export function loadAllSlugs(): string[] {
  return loadAllPosts().map((p) => p.slug);
}

export function loadAllTags(): string[] {
  const tags = new Set<string>();
  for (const p of loadAllPosts()) {
    for (const t of p.tags ?? []) tags.add(t);
  }
  return [...tags].sort();
}
