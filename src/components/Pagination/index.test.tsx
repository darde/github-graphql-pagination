import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Pagination from ".";
import { webcrypto } from "crypto";

Object.defineProperty(globalThis, "crypto", {
  value: {
    randomUUID: () => webcrypto.randomUUID(),
  },
});

const handlePageClick = jest.fn((id: number): void => {
  console.log(id);
});

describe("Pagination", () => {
  beforeEach(() => {
    render(
      <Pagination
        handlePageClick={handlePageClick}
        hasNextPage
        hasPreviousPage={false}
        page={1}
        labels={[1, 2, 3, 4, 5]}
      />
    );
  });
  it("should render the pagination tab correctly", () => {
    expect(screen.getByText(1)).toBeInTheDocument();
  });

  it('when the "hasPreviousPage" is false, should disable the first pagination button', () => {
    const firstBtn = screen.getByText("1");

    expect(firstBtn).toBeInTheDocument();
    expect(firstBtn).toBeDisabled();
  });

  it('when the "hasPreviousPage" is true, should enable the first pagination button', () => {
    render(
      <Pagination
        handlePageClick={handlePageClick}
        hasNextPage
        hasPreviousPage
        page={7}
        labels={[6, 7, 8, 9, 10]}
      />
    );
    const firstBtn = screen.getByText("6");

    expect(firstBtn).toBeInTheDocument();
    expect(firstBtn).toBeEnabled();
  });

  it("should call the handlePageClick function when hit an enabled pagination button", () => {
    const btn = screen.getByText("2");

    fireEvent.click(btn);

    expect(handlePageClick).toHaveBeenCalledTimes(1);
  });
});
