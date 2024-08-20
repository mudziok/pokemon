import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import { pokemonSchema } from "@/api/pokemon/schema";
import { z } from "zod";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function readJSON(path: string) {
  const file = await fs.readFile(path, "utf8");
  return JSON.parse(file);
}

export async function GET() {
  await sleep(500);
  const data = await readJSON("./pokemon.json");
  const { data: pokemons } = z
    .object({ data: z.array(pokemonSchema) })
    .parse(data);

  return NextResponse.json(pokemons, { status: 200 });
}
