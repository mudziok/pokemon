"use client";

import { TextField } from "@/components/TextField/TextField";
import Autocomplete, {
  AutocompleteProps,
} from "@/components/Autocomplete/Autocomplete";
import { Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getPokemon, getPokemonList } from "@/api/pokemon/api";
import { useState } from "react";
import { PokedexEntry } from "@/components/PokedexEntry/PokedexEntry";
import { Controller, SubmitHandler, useForm, useWatch } from "react-hook-form";
import { Trainer, trainerSchema } from "@/api/trainer/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { PokemonSummary } from "@/api/pokemon/schema";

const PokemonAutocomplete = (
  props: Omit<AutocompleteProps<PokemonSummary>, "options">
) => {
  const [inputValue, setInputValue] = useState("");
  const { data: pokemonList = [], isLoading } = useQuery({
    queryKey: ["pokemon-list", inputValue],
    queryFn: () => getPokemonList({ name: inputValue }),
  });

  return (
    <Autocomplete
      inputValue={inputValue}
      onInputChange={(_, value) => setInputValue(value)}
      getOptionLabel={(option) => option.name}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      loading={isLoading}
      options={pokemonList}
      {...props}
    />
  );
};

export function CreateTrainerForm() {
  const { handleSubmit, control } = useForm<Trainer>({
    resolver: zodResolver(trainerSchema),
    mode: "onChange",
  });
  const onSubmit: SubmitHandler<Trainer> = (data) => console.log(data);

  const { pokemon: selectedPokemon } = useWatch({ control });
  const selectedPokemonId = selectedPokemon?.id;

  const { data: pokemon } = useQuery({
    queryKey: ["pokemon", selectedPokemonId],
    queryFn: () => getPokemon({ id: selectedPokemonId }),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Controller
            control={control}
            name="name"
            render={({ field, fieldState: { error } }) => (
              <TextField
                fullWidth
                placeholder="Trainer's name"
                label="Trainer's name"
                errorText={error?.message}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            control={control}
            name="age"
            render={({ field, fieldState: { error } }) => (
              <TextField
                fullWidth
                placeholder="Trainer's age"
                label="Trainer's age"
                errorText={error?.message}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            control={control}
            name="pokemon"
            render={({ field, fieldState: { error } }) => (
              <PokemonAutocomplete
                fullWidth
                label="Pokemon"
                placeholder="Choose"
                errorText={error?.message}
                value={field.value}
                onChange={(_, value) => field.onChange(value ?? undefined)}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <PokedexEntry pokemon={pokemon ?? undefined} />
        </Grid>
      </Grid>
    </form>
  );
}
