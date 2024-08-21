"use client";

import { TextField } from "@/components/TextField/TextField";
import Autocomplete, {
  AutocompleteProps,
} from "@/components/Autocomplete/Autocomplete";
import { Grid, Paper, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getPokemon } from "@/api/pokemon/api";
import { useState } from "react";
import { PokedexEntry } from "@/components/PokedexEntry/PokedexEntry";
import { Controller, SubmitHandler, useForm, useWatch } from "react-hook-form";
import { Trainer, trainerSchema } from "@/api/trainer/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { PokemonSummary } from "@/api/pokemon/schema";
import { capitalize } from "@/utils/capitalize";
import { Button } from "@/components/Button/Button";
import { PokemonListQueryOptions, PokemonQuery } from "@/api/pokemon/query";

const PokemonAutocomplete = (
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

const PokemonPreview = ({
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

interface CreateTrainerFormProps {
  pokemonListQuery: PokemonListQueryOptions;
  pokemonQuery: PokemonQuery;
}

export function CreateTrainerForm({
  pokemonListQuery,
  pokemonQuery,
}: CreateTrainerFormProps) {
  const { handleSubmit, control, reset } = useForm<Trainer>({
    resolver: zodResolver(trainerSchema),
  });
  const onSubmit: SubmitHandler<Trainer> = (data) => {};

  const { pokemon: selectedPokemon } = useWatch({ control });
  const selectedPokemonId = selectedPokemon?.id;

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
                id="name"
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
                id="age"
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
                pokemonListQuery={pokemonListQuery}
                fullWidth
                label="Pokemon"
                placeholder="Choose"
                errorText={error?.message}
                id="pokemon"
                value={field.value}
                onChange={(_, value) => field.onChange(value ?? undefined)}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Paper variant="outlined">
            <Stack
              alignItems="center"
              justifyContent="center"
              minHeight={254}
              padding={2}
            >
              <PokemonPreview
                pokemonId={selectedPokemonId}
                pokemonQuery={pokemonQuery}
              />
            </Stack>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Stack
            direction="row"
            justifyContent="flex-end"
            gap={2}
            sx={{ width: "100%" }}
          >
            <Button variant="soft" onClick={() => reset({})}>
              Reset
            </Button>
            <Button type="submit">Submit</Button>
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
}
