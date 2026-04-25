export type PostFrontmatter = {
  title: string;
  date: string;
  summary: string;
  tags?: string[];
  draft?: boolean;
};

export type PostSummary = PostFrontmatter & {
  slug: string;
};

export type Post = PostSummary & {
  content: string;
};
