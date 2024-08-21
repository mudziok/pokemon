import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { Button } from "@/components/Button/Button";

describe("Button", () => {
  beforeEach(cleanup);

  test("displays children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button")).toHaveTextContent("Click me");
  });

  test("calls onClick", () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Click me</Button>);

    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
