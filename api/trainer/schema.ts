import { pokemonSummarySchema } from "@/api/pokemon/schema";
import { z } from "zod";

export const trainerSchema = z.object({
  name: z.string().min(2).max(20),
  age: z.coerce.number().int().min(16).max(99),
  pokemon: pokemonSummarySchema,
});

export type Trainer = z.infer<typeof trainerSchema>;
