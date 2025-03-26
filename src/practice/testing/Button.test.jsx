import { render, screen } from "@testing-library/react";
import Button from "./Button";

test("renders button with correct label", () => {
  render(<Button label="Click Me" />);
  screen.debug(); // Debug the output if needed
  const buttonElement = screen.getByText(/Click Me/i);
  expect(buttonElement).toBeInTheDocument();
});




