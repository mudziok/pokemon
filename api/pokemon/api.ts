import { pokemonSchema } from "@/api/pokemon/schema";

export const getPokemonList = async ({ name }: { name?: string }) => {
  const response = await fetch(`/api/pokemon?name=${name}`, {});
  const pokemonList = pokemonSchema.array().parse(await response.json());
  return pokemonList;
};
