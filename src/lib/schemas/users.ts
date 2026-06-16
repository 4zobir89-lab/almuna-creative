import { z } from "zod";

export const changeRoleSchema = z.object({
  userId: z.string(),
  role: z.enum(["ADMIN", "EDITOR", "AUTHOR"]),
});

export const toggleStatusSchema = z.object({
  userId: z.string(),
});

export type ChangeRoleInput = z.infer<typeof changeRoleSchema>;
export type ToggleStatusInput = z.infer<typeof toggleStatusSchema>;
