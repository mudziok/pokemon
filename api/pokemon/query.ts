import { getPokemon, getPokemonList } from "@/api/pokemon/api";
import { Pokemon, PokemonSummary } from "@/api/pokemon/schema";
import { UseQueryOptions } from "@tanstack/react-query";

export type PokemonListQueryOptions = ({
  name,
}: {
  name: string;
}) => UseQueryOptions<PokemonSummary[]>;

export const pokemonListQuery: PokemonListQueryOptions = ({ name }) => ({
  queryKey: ["pokemon-list", name],
  queryFn: () => getPokemonList({ name }),
});

export type PokemonQuery = ({
  id,
}: {
  id?: Pokemon["id"];
}) => UseQueryOptions<Pokemon | null>;

export const pokemonQuery: PokemonQuery = ({ id }) => ({
  queryKey: ["pokemon", id],
  queryFn: () => getPokemon({ id }),
});
