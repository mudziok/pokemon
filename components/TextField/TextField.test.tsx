import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { TextField } from "@/components/TextField/TextField";

describe("TextField", () => {
  beforeEach(cleanup);

  test("displays label", () => {
    render(<TextField label="Label" id="test" />);
    expect(screen.getByText("Label")).toBeInTheDocument();
  });

  test("displays helper text", () => {
    render(<TextField helperText="Helper text" id="test" />);
    expect(screen.getByText("Helper text")).toBeInTheDocument();
  });

  test("favors error text over helper text", () => {
    render(
      <TextField errorText="Error text" helperText="Helper text" id="test" />
    );

    expect(screen.getByText("Error text")).toBeInTheDocument();
    expect(screen.queryByText("Helper text")).not.toBeInTheDocument();
    expect(screen.queryByText("Error text")).toHaveClass("Mui-error");
  });

  test("updates value upon change event", () => {
    const onChange = jest.fn();
    render(<TextField onChange={onChange} id="test" />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test" } });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(input).toHaveValue("test");
  });
});
