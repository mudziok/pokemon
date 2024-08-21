import { PokemonListQueryOptions } from "@/api/pokemon/query";
import { PokemonSummary } from "@/api/pokemon/schema";
import Autocomplete, {
  AutocompleteProps,
} from "@/components/Autocomplete/Autocomplete";
import { capitalize } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const PokemonAutocomplete = (
  props: Omit<AutocompleteProps<PokemonSummary>, "options"> & {
    pokemonListQuery: PokemonListQueryOptions;
  }
) => {
  const { pokemonListQuery, ...inputProps } = props;
  const [inputValue, setInputValue] = useState("");
  const { data: pokemonList = [], isLoading } = useQuery(
    pokemonListQuery({ name: inputValue })
  );

  return (
    <Autocomplete
      inputValue={inputValue}
      onInputChange={(_, value) => setInputValue(value)}
      getOptionLabel={(option) => capitalize(option.name)}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      loading={isLoading}
      options={pokemonList}
      {...inputProps}
    />
  );
};
