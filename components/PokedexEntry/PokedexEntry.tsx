import { getPokemonSprite } from "@/api/pokemon/api";
import { Pokemon } from "@/api/pokemon/schema";
import { Chip, Grid, Paper, Stack, styled, Typography } from "@mui/material";
import Image from "next/image";

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export const PokemonTypeBadge = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
}));

export const PokedexEntry = ({ pokemon }: { pokemon?: Pokemon }) => {
  if (!pokemon) {
    return (
      <Paper variant="outlined" sx={{ padding: 2 }}>
        <Typography>Your pokemon</Typography>
      </Paper>
    );
  }

  return (
    <Paper variant="outlined" sx={{ padding: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Image
            alt={`${pokemon.name}'s sprite`}
            src={getPokemonSprite({ id: pokemon.id })}
            width={196}
            height={196}
          />
        </Grid>
        <Grid item xs={6}>
          <Stack gap={1} sx={{ height: "100%" }} justifyContent="center">
            <Typography>Name: {pokemon.name}</Typography>
            <Stack direction="row" gap={1} alignItems="center">
              <Typography>Type:</Typography>
              {pokemon.types.map((type) => (
                <PokemonTypeBadge
                  key={type.type.name}
                  label={capitalize(type.type.name)}
                />
              ))}
            </Stack>
            <Typography>Base experience: {pokemon.base_experience}</Typography>
            <Typography>Id: {pokemon.id}</Typography>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
};
