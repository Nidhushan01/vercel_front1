import { render, screen, fireEvent } from "@testing-library/react";
import InputField from "./InputField";
import { vi } from "vitest"; // Import vi for mock functions

test("updates value when typing", () => {
  const mockOnChange = vi.fn(); // Create mock function
  render(<InputField label="Enter Name:" onChange={mockOnChange} />);

  const inputElement = screen.getByLabelText("Enter Name:"); // Now it works

  fireEvent.change(inputElement, { target: { value: "John Doe" } });

  expect(inputElement.value).toBe("John Doe"); // Assert that input updates
  expect(mockOnChange).toHaveBeenCalledTimes(1); // Check if onChange is called
  expect(mockOnChange).toHaveBeenCalledWith("John Doe"); // Check if it was called with correct value
});







