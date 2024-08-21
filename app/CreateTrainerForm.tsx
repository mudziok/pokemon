"use client";

import { TextField } from "@/components/TextField/TextField";
import { Grid, Paper, Stack } from "@mui/material";
import { Controller, SubmitHandler, useForm, useWatch } from "react-hook-form";
import { Trainer, trainerSchema } from "@/api/trainer/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/Button/Button";
import { PokemonListQueryOptions, PokemonQuery } from "@/api/pokemon/query";
import { PokemonPreview } from "@/app/PokemonPreview";
import { PokemonAutocomplete } from "@/app/PokemonAutocomplete";
import { CreateTrainerSuccessAlert } from "@/app/CreateTrainerSuccessAlert";
import { useState } from "react";

interface CreateTrainerFormProps {
  pokemonListQuery: PokemonListQueryOptions;
  pokemonQuery: PokemonQuery;
}

export function CreateTrainerForm({
  pokemonListQuery,
  pokemonQuery,
}: CreateTrainerFormProps) {
  const [isSuccessAlertOpen, setIsSuccessAlertOpen] = useState(false);

  const { handleSubmit, control, reset } = useForm<Trainer>({
    resolver: zodResolver(trainerSchema),
  });
  const onSubmit: SubmitHandler<Trainer> = () => setIsSuccessAlertOpen(true);

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
      <CreateTrainerSuccessAlert
        isOpen={isSuccessAlertOpen}
        onReset={() => {
          setIsSuccessAlertOpen(false);
          reset({});
        }}
      />
    </form>
  );
}
