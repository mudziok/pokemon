import { PokemonQuery } from "@/api/pokemon/query";
import { PokemonSummary } from "@/api/pokemon/schema";
import { PokedexEntry } from "@/components/PokedexEntry/PokedexEntry";
import { Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

export const PokemonPreview = ({
  pokemonId,
  pokemonQuery,
}: {
  pokemonId?: PokemonSummary["id"];
  pokemonQuery: PokemonQuery;
}) => {
  const { data: pokemon, isLoading } = useQuery(
    pokemonQuery({ id: pokemonId })
  );

  if (isLoading) {
    return (
      <Typography color={(theme) => theme.palette.grey[200]}>
        Loading...
      </Typography>
    );
  }

  if (!pokemon) {
    return (
      <Typography color={(theme) => theme.palette.grey[200]}>
        Your pokemon
      </Typography>
    );
  }

  return <PokedexEntry pokemon={pokemon} />;
};
