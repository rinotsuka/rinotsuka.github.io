import { z } from "zod";

const yearMonth = z
  .string()
  .regex(/^\d{4}-(0[1-9]|1[0-2])$/, "YYYY-MM 形式である必要があります");

export const RoleSchema = z.object({
  title: z.string().min(1),
  start: yearMonth,
  end: yearMonth.nullable(),
  summary: z.string().optional(),
  highlights: z.array(z.string()).optional(),
});

export const CareerEntrySchema = z
  .object({
    company: z.string().min(1),
    project: z.string().optional(),
    start: yearMonth,
    end: yearMonth.nullable(),
    roles: z.array(RoleSchema).min(1, "roles は 1 件以上必要です"),
    stack: z.array(z.string()).optional(),
    links: z
      .array(
        z.object({
          label: z.string().min(1),
          href: z.string().url(),
        }),
      )
      .optional(),
    summary: z.string().optional(),
    highlights: z.array(z.string()).optional(),
  })
  .superRefine((entry, ctx) => {
    if (entry.end !== null && entry.start > entry.end) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `案件の start (${entry.start}) が end (${entry.end}) より後になっています`,
        path: ["end"],
      });
    }
    entry.roles.forEach((role, idx) => {
      if (role.end !== null && role.start > role.end) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `roles[${idx}] の start (${role.start}) が end (${role.end}) より後です`,
          path: ["roles", idx, "end"],
        });
      }
      if (entry.end !== null && role.start > entry.end) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `roles[${idx}].start (${role.start}) が案件 end (${entry.end}) より後です`,
          path: ["roles", idx, "start"],
        });
      }
    });
  });

export const CareerSchema = z.array(CareerEntrySchema);

export type Role = z.infer<typeof RoleSchema>;
export type CareerEntry = z.infer<typeof CareerEntrySchema>;
export type Career = z.infer<typeof CareerSchema>;
