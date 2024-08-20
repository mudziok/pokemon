import { z } from "zod";

export const pokemonSchema = z.object({
  name: z.string(),
  id: z.number(),
});
