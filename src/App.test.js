import React from "react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";

import { renderWithProviders } from "./tests/store.util";
import { setupStore } from "./app/store";
import App from "./App";

beforeEach(() => {
  jest.clearAllMocks();
});

test("renders shows default", () => {
  const { getByTestId } = renderWithProviders(
    <Provider store={setupStore({})}>
      <App />
    </Provider>
  );
  expect(getByTestId("shows")).toBeInTheDocument();
});
