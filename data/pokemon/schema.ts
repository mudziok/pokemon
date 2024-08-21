import { z } from "zod";

export const pokemonSchema = z.object({
  name: z.string(),
  id: z.number(),
  base_experience: z.number(),
  types: z.array(
    z.object({
      type: z.object({
        name: z.string(),
      }),
    }),
  ),
});

export type Pokemon = z.infer<typeof pokemonSchema>;

export const pokemonSummarySchema = pokemonSchema.pick({
  name: true,
  id: true,
});

export type PokemonSummary = z.infer<typeof pokemonSummarySchema>;
