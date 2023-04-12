import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Shows } from './features/shows/Shows';
import { ShowDetail } from './features/show-detail/ShowDetail';
import './App.css';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Shows />
    },
    {
      path: "/show/:showId",
      element: <ShowDetail />,
    }
  ]);

  return (
    <RouterProvider router={router}/>
    // <BrowserRouter>
    //   <Switch>
    //     <Route exact path='/' Component={Shows} />
    //     <Route path='/:showId' Component={ShowDetail} />
    //   </Switch>
    // </BrowserRouter>
  );
}

export default App;
