import { getPokemonSprite } from "@/data/pokemon/api";
import { Pokemon } from "@/data/pokemon/schema";
import { capitalize } from "@/utils/capitalize";
import { Chip, Grid, Stack, styled, Typography } from "@mui/material";
import Image from "next/image";

export const PokemonTypeBadge = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
}));

export const PokedexEntry = ({ pokemon }: { pokemon: Pokemon }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <Image
          alt={`${pokemon.name}'s sprite`}
          src={getPokemonSprite({ id: pokemon.id })}
          width={196}
          height={196}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Stack gap={1} sx={{ height: "100%" }} justifyContent="center">
          <Typography>Name: {capitalize(pokemon.name)}</Typography>
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
  );
};
