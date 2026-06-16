import { z } from "zod";

export const postSchema = z.object({
  title: z.string().min(3, "العنوان يجب أن يكون 3 أحرف على الأقل"),
  body: z.string().min(50, "المحتوى يجب أن يكون 50 حرفاً على الأقل"),
  excerpt: z.string().optional(),
  categoryId: z.string().optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("DRAFT"),
  country: z.string().optional(),
  scheduledAt: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export type PostInput = z.input<typeof postSchema>;
