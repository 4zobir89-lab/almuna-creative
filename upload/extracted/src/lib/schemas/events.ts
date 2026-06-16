import { z } from "zod";

export const eventSchema = z.object({
  title: z.string().min(3, "عنوان الفعالية يجب أن يكون 3 أحرف على الأقل"),
  description: z.string().optional(),
  eventType: z.enum(["COMPETITION", "WORKSHOP", "READING", "MEETING", "OTHER"]),
  eventDate: z.string().min(1, "تاريخ الفعالية مطلوب"),
  location: z.string().optional(),
  coverImageUrl: z.string().optional(),
  status: z.enum(["UPCOMING", "PAST", "CANCELLED"]).default("UPCOMING"),
});

export type EventInput = z.input<typeof eventSchema>;
