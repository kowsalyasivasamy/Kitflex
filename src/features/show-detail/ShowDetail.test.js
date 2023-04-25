import React from "react";

import { renderWithProviders } from "../../tests/store.util";
import { ShowDetail } from "./ShowDetail";

beforeEach(() => {
  jest.clearAllMocks();
});

const showInfo = {
  id: 5,
  name: "Money Heist",
  summary:
    "A criminal mastermind who goes by The Professor has a plan to pull off the biggest heist in recorded history",
  language: "Spanish",
  premiered: "2 May 2017",
  ended: "3 December 2021",
  seasons: [
    {
      number: 1,
      summary: "Test Summary",
      episodeOrder: 1,
    },
  ],
};

const renderComponent = () => {
  const { getByTestId } = renderWithProviders(<ShowDetail />, {
    preloadedState: {
      shows: {},
      showDetail: {
        showInfo,
      },
    },
  });
  return { getByTestId };
};

test("renders details-section", () => {
  const { getByTestId } = renderComponent();

  expect(getByTestId("details-section")).toBeInTheDocument();
});

test("renders seasons-section", () => {
  const { getByTestId } = renderComponent();

  expect(getByTestId("seasons-section")).toBeInTheDocument();
});
