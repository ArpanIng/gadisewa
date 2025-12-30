import * as z from "zod";

export const DRFPaginatedSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    count: z.number().int().nonnegative(),
    next: z.url().nullable(),
    previous: z.url().nullable(),
    results: z.array(itemSchema),
  });
