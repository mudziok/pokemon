import { z } from "zod";

export const timeSchema = z.object({
  dateTime: z.string(),
});
