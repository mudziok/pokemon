import { promises as fs } from "fs";
import { Pokemon, pokemonSchema } from "@/api/pokemon/schema";
import { z } from "zod";
import Fuse from "fuse.js";
import { NextRequest, NextResponse } from "next/server";

async function readJSON(path: string) {
  const file = await fs.readFile(path, "utf8");
  return JSON.parse(file);
}

export async function GET(request: NextRequest) {
  const data = await readJSON("./pokemon.json");
  const { data: pokemons } = z
    .object({ data: z.array(pokemonSchema) })
    .parse(data);

  const searchedName = request.nextUrl.searchParams.get("name");

  if (!searchedName) {
    return NextResponse.json(pokemons, { status: 200 });
  }

  const fuse = new Fuse(pokemons, { keys: ["name"] });
  const results: Pokemon[] = fuse.search(searchedName).map(({ item }) => item);

  return NextResponse.json(results, { status: 200 });
}
