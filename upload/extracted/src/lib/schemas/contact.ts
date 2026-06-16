import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "الاسم يجب أن يكون حرفين على الأقل"),
  email: z.string().email("البريد الإلكتروني غير صحيح"),
  subject: z.string().optional(),
  message: z.string().min(10, "الرسالة يجب أن تكون 10 أحرف على الأقل"),
});

export type ContactInput = z.infer<typeof contactSchema>;
