import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { CreateTrainerForm } from "@/app/_components/CreateTrainerForm";
import { QueryProvider } from "@/app/_providers/QueryProvider";
import { createPokemon } from "@/data/pokemon/mock";

const mockPokemonListQuery = ({ name }: { name: string }) => ({
  queryKey: ["pokemon-list", name],
  queryFn: () => [createPokemon()],
});

const mockPokemonQuery = ({ id }: { id?: number }) => ({
  queryKey: ["pokemon", id],
  queryFn: () => createPokemon({ id }),
});

jest.useFakeTimers();

describe("CreateTrainerForm", () => {
  beforeEach(cleanup);

  test("can be filled", async () => {
    render(
      <QueryProvider>
        <CreateTrainerForm
          pokemonListQuery={mockPokemonListQuery}
          pokemonQuery={mockPokemonQuery}
        />
      </QueryProvider>,
    );
    expect(await screen.findByText("Submit")).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/Trainer's name/i), {
      target: { value: "Ash Ketchum" },
    });
    fireEvent.change(screen.getByLabelText(/Trainer's age/i), {
      target: { value: "21" },
    });

    const combobox = screen.getByRole("combobox");
    fireEvent.change(combobox, { target: { value: "pikachu" } });
    jest.runAllTimers();

    const listbox = await waitFor(() => screen.getByRole("listbox"));
    fireEvent.click(listbox.firstChild!);

    fireEvent.click(screen.getByText("Submit"));

    expect(await screen.findByText("Success")).toBeInTheDocument();
  });

  test("displays errors after incorrect submission", async () => {
    render(
      <QueryProvider>
        <CreateTrainerForm
          pokemonListQuery={mockPokemonListQuery}
          pokemonQuery={mockPokemonQuery}
        />
      </QueryProvider>,
    );

    expect(await screen.findByText("Submit")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Submit"));

    expect(await screen.findAllByRole("alert")).toHaveLength(3);
  });
});
