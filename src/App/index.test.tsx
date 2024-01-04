import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import "@testing-library/jest-dom";
import { GET_REACT_REPOSITORIES } from "../queries/RepositoriesQuery";
import App from ".";
import { webcrypto } from "crypto";

const ITEMS_PER_PAGE = 15;

Object.defineProperty(globalThis, "crypto", {
  value: {
    randomUUID: () => webcrypto.randomUUID(),
  },
});

const mocks = [
  {
    request: {
      query: GET_REACT_REPOSITORIES,
      variables: {
        first: ITEMS_PER_PAGE,
        last: null,
        after: null,
        before: null,
        querystring: "topic:python sort:updated-asc",
      },
    },
    result: {
      data: {
        search: {
          pageInfo: {
            hasNextPage: true,
            hasPreviousPage: false,
          },
          nodes: [
            {
              id: "1",
              name: "My Awesome Repo",
              stargazerCount: 3,
              forkCount: 4,
              url: "http://some-repo/url",
            },
          ],
        },
      },
    },
  },
];

const loadingMock = {
  delay: 30,
  ...mocks[0],
};

describe("Main Application", () => {
  it("should rendering initial screen", () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <App />
      </MockedProvider>
    );

    expect(screen.getByText(/popular repositories/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/type a search term/i));
  });

  describe("when fetching data", () => {
    it("shows an loading text during the fetch operation", async () => {
      render(
        <MockedProvider mocks={[loadingMock]} addTypename={false}>
          <App />
        </MockedProvider>
      );

      expect(await screen.findByText("Loading...")).toBeInTheDocument();
    });
  });

  describe("when the fetch operation is successfull finished", () => {
    it("should render a table containing the results", async () => {
      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <App />
        </MockedProvider>
      );

      expect(await screen.findByText(/My Awesome Repo/i)).toBeInTheDocument();
    });
  });
});
