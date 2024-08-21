"use client";
import { Container, Paper } from "@mui/material";
import { CreateTrainerForm } from "@/app/CreateTrainerForm";
import { pokemonListQuery, pokemonQuery } from "@/api/pokemon/query";

export default function Home() {
  return (
    <main>
      <Container maxWidth="sm">
        <Paper variant="outlined" sx={{ padding: 4 }}>
          <CreateTrainerForm
            pokemonListQuery={pokemonListQuery}
            pokemonQuery={pokemonQuery}
          />
        </Paper>
      </Container>
    </main>
  );
}
