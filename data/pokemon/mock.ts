import { Pokemon } from "@/data/pokemon/schema";

export const createPokemon = (pokemon: Partial<Pokemon> = {}): Pokemon => {
  return {
    name: "pikachu",
    id: 25,
    base_experience: 112,
    types: [{ type: { name: "electric" } }],
    ...pokemon,
  };
};
