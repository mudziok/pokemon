"use client";

import { CreateTrainerForm } from "@/app/CreateTrainerForm";
import { pokemonListQuery, pokemonQuery } from "@/data/pokemon/query";

export const CreateTrainerFormWithQueries = () => {
  return (
    <CreateTrainerForm
      pokemonListQuery={pokemonListQuery}
      pokemonQuery={pokemonQuery}
    />
  );
};
