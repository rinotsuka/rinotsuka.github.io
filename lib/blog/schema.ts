import { z } from "zod";

export const FrontmatterSchema = z.object({
  title: z.string().min(1),
  date: z
    .string()
    .regex(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/, "YYYY-MM-DD 形式である必要があります"),
  tags: z.array(z.string()).optional().default([]),
  summary: z.string().min(1),
});

export type BlogFrontmatter = z.infer<typeof FrontmatterSchema>;

export type BlogPost = BlogFrontmatter & {
  slug: string;
  content: string;
};
