import { PokemonListQueryOptions } from "@/api/pokemon/query";
import { PokemonSummary } from "@/api/pokemon/schema";
import Autocomplete, {
  AutocompleteProps,
} from "@/components/Autocomplete/Autocomplete";
import { useDebounce } from "@/utils/useDebounce";
import { capitalize } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const PokemonAutocomplete = (
  props: Omit<AutocompleteProps<PokemonSummary>, "options"> & {
    pokemonListQuery: PokemonListQueryOptions;
  }
) => {
  const { pokemonListQuery, ...inputProps } = props;
  const [searchName, setSearchName] = useState("");
  const debouncedInputValue = useDebounce(searchName, 500);
  const isDebouncing = searchName !== debouncedInputValue;

  const { data: pokemonList = [], isLoading: isQueryLoading } = useQuery(
    pokemonListQuery({ name: debouncedInputValue })
  );

  const isLoading = isQueryLoading || isDebouncing;

  return (
    <Autocomplete
      inputValue={searchName}
      onInputChange={(_, value) => setSearchName(value)}
      getOptionLabel={(option) => capitalize(option.name)}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      loading={isLoading}
      options={isLoading ? [] : pokemonList}
      {...inputProps}
    />
  );
};
