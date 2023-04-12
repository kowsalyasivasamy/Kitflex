import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Shows } from "./features/shows/Shows";
import { ShowDetail } from "./features/show-detail/ShowDetail";
import "./App.css";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Shows />,
    },
    {
      path: "/show/:showId",
      element: <ShowDetail />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
