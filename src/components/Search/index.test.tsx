import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Search from ".";

const mockHandleSearch = jest.fn((term: string): void => {
  console.log(term);
});

describe("Search component", () => {
  beforeEach(() => {
    render(<Search handleSearch={mockHandleSearch} />);
    jest.clearAllMocks();
  });

  it("should render the search component correctly", () => {
    expect(
      screen.getByPlaceholderText(/type a search term/i)
    ).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  describe("when you type a valid term", () => {
    it("should call the handleSearch function on the button click", () => {
      const btnSearch = screen.getByRole("button");
      const inputField = screen.getByPlaceholderText(/type a search term/i);

      fireEvent.change(inputField, { target: { value: "React" } });

      fireEvent.click(btnSearch, { target: {} });

      expect(mockHandleSearch).toHaveBeenCalledTimes(1);
    });
  });

  describe("when you leave the input field blank, and hit the search button", () => {
    it("show a warning message", () => {
      const btnSearch = screen.getByRole("button");

      fireEvent.click(btnSearch, { target: {} });

      expect(
        screen.getByText(/Please, type a valid term./i)
      ).toBeInTheDocument();
    });

    it("should not call the handleSearch callback function", () => {
      const btnSearch = screen.getByRole("button");

      fireEvent.click(btnSearch, { target: {} });

      expect(mockHandleSearch).toHaveBeenCalledTimes(0);
    });
  });
});
