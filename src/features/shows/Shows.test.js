import React from "react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { fireEvent } from "@testing-library/react";

import { setupStore } from "../../app/store";
import { renderWithProviders } from "../../tests/store.util";
import { Shows } from "./Shows";

beforeEach(() => {
  jest.clearAllMocks();
});

const shows = [
  {
    id: 5,
    name: "Money Heist",
    language: "Spanish",
    genres: ["Drama", "Thriller"],
  },
  {
    id: 6,
    name: "Breaking Bad",
    language: "English",
  },
];
const searchShow = jest.fn();
const getShowList = jest.fn();

const renderComponent = (props) => {
  const { getByTestId } = renderWithProviders(
    <BrowserRouter>
      <Shows searchShow={searchShow} getShowList={getShowList} />
    </BrowserRouter>,
    {
      preloadedState: {
        shows: {
          showList: props || shows,
          status: "idle",
        },
        showDetail: {},
      },
    }
  );
  return { getByTestId };
};

export function makeTestStore(opts = {}) {
  const store = makeStore(opts);
  const origDispatch = store.dispatch;
  store.dispatch = jest.fn(origDispatch);
  return store;
}

test("renders shows", () => {
  const { getByTestId } = renderComponent();

  expect(getByTestId("shows")).toBeInTheDocument();
});

test("renders no-content-testid when shows empty", () => {
  const { getByTestId } = renderComponent([]);

  expect(getByTestId("no-content-testid")).toHaveTextContent(
    "No Shows are found for the Applied Filter!"
  );
});

test("searchShow dispatched when searching show", () => {
  const { getByTestId } = renderComponent();

  const searchInputElement = getByTestId("search-input");

  fireEvent.change(searchInputElement, { target: { value: "Money Heist" } });
  fireEvent.keyPress(searchInputElement, { key: "Enter", charCode: 13 });

  const store = makeTestStore();
  expect(store.dispatch(searchShow)).toHaveBeenCalledTimes(1);
});

test("getShowList dispatched when clicking on clear-icon", () => {
  const { getByTestId } = renderComponent();

  const searchInputElement = getByTestId("search-input");

  fireEvent.change(searchInputElement, { target: { value: "Money Heist" } });

  const clearIconElement = getByTestId("clear-icon");
  fireEvent.click(clearIconElement);

  expect(getShowList).toHaveBeenCalledTimes(1);
});
