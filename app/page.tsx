"use client";
import { Container, Stack } from "@mui/material";
import { CreateTrainerForm } from "@/app/CreateTrainerForm";
import { pokemonListQuery, pokemonQuery } from "@/api/pokemon/query";
import { Paper } from "@/components/Paper/Paper";

export default function Home() {
  return (
    <Container maxWidth="sm" sx={{ height: "100vh" }}>
      <Stack
        sx={{ minHeight: { xs: "auto", sm: "100%" } }}
        justifyContent="center"
        paddingY={2}
      >
        <Paper sx={{ padding: 4 }}>
          <CreateTrainerForm
            pokemonListQuery={pokemonListQuery}
            pokemonQuery={pokemonQuery}
          />
        </Paper>
      </Stack>
    </Container>
  );
}
