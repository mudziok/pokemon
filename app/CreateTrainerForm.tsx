"use client";

import { TextField } from "@/components/TextField/TextField";
import Autocomplete from "@/components/Autocomplete/Autocomplete";
import { Grid, Paper } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getPokemonList } from "@/api/pokemon/api";
import { useState } from "react";

const PokemonAutocomplete = () => {
  const [inputValue, setInputValue] = useState("");
  const { data: pokemonList = [], isLoading } = useQuery({
    queryKey: ["pokemon", inputValue],
    queryFn: () => getPokemonList({ name: inputValue }),
  });

  const autocompleteOptions = pokemonList.map((pokemon) => ({
    value: pokemon.id.toString(),
    label: pokemon.name,
  }));

  return (
    <Autocomplete
      fullWidth
      label="Pokemon name"
      placeholder="Choose"
      inputValue={inputValue}
      onInputChange={setInputValue}
      loading={isLoading}
      options={autocompleteOptions}
    />
  );
};

export function CreateTrainerForm() {
  return (
    <Paper variant="outlined" sx={{ padding: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            placeholder="Trainer's name"
            label="Trainer's name"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            placeholder="Trainer's age"
            label="Trainer's age"
          />
        </Grid>
        <Grid item xs={12}>
          <PokemonAutocomplete />
        </Grid>
      </Grid>
    </Paper>
  );
}
