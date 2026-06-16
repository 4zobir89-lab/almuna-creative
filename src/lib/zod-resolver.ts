import { z } from "zod";

export function zodResolver<T extends z.ZodType<any>>(schema: T) {
  return (values: Record<string, unknown>, _context?: unknown, _options?: unknown) => {
    const result = schema.safeParse(values);
    if (result.success) {
      return { values: result.data, errors: {} };
    }
    const errors: Record<string, { message: string; type: string }> = {};
    for (const issue of result.error.issues) {
      const path = issue.path.join(".");
      if (!errors[path]) errors[path] = { message: issue.message, type: "validation" };
    }
    return { values: {} as Record<string, never>, errors };
  };
}
