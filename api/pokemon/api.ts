import { pokemonSchema, pokemonSummarySchema } from "@/api/pokemon/schema";

export const getPokemonList = async ({ name }: { name?: string }) => {
  const response = await fetch(`/api/pokemon?name=${name}`, {});
  const pokemonList = pokemonSummarySchema.array().parse(await response.json());
  return pokemonList;
};

export const getPokemon = async ({ id }: { id: number }) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
  const pokemon = pokemonSchema.parse(await response.json());
  return pokemon;
};

export const getPokemonSprite = ({ id }: { id: number }) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
};
