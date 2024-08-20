import { z } from "zod";

export const pokemonSchema = z.object({
  name: z.string(),
  id: z.number(),
});

export type Pokemon = z.infer<typeof pokemonSchema>;
