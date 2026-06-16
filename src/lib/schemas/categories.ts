import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(2, "اسم القسم يجب أن يكون حرفين على الأقل"),
  description: z.string().optional(),
  parentId: z.string().optional(),
  sortOrder: z.number().int().optional(),
});

export type CategoryInput = z.input<typeof categorySchema>;
