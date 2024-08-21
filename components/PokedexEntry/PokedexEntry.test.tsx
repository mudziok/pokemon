import { cleanup, render, screen } from "@testing-library/react";
import { createPokemon } from "@/data/pokemon/mock";
import { PokedexEntry } from "@/components/PokedexEntry/PokedexEntry";

const pikachu = createPokemon();
const mudkip = createPokemon({
  name: "mudkip",
  id: 258,
  types: [{ type: { name: "water" } }],
});

describe("PokedexEntry", () => {
  beforeEach(cleanup);

  test("displays pokemon sprite", () => {
    render(<PokedexEntry pokemon={pikachu} />);

    const image = screen.getByRole("img");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("alt", "pikachu's sprite");
  });

  test("displays capitalised pokemon name", () => {
    render(<PokedexEntry pokemon={pikachu} />);
    expect(screen.getByText("Name: Pikachu")).toBeInTheDocument();
  });

  test("displays pokemon id", () => {
    render(<PokedexEntry pokemon={pikachu} />);
    expect(screen.getByText("Id: 25")).toBeInTheDocument();
  });

  test("displays pokemon types", () => {
    render(<PokedexEntry pokemon={pikachu} />);
    expect(screen.getByText("Electric")).toBeInTheDocument();
  });

  test("updates after changing the pokemon", () => {
    const { rerender } = render(<PokedexEntry pokemon={pikachu} />);
    expect(screen.getByText("Name: Pikachu")).toBeInTheDocument();
    rerender(<PokedexEntry pokemon={mudkip} />);
    expect(screen.getByText("Name: Mudkip")).toBeInTheDocument();
  });
});
