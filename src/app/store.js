import { configureStore } from "@reduxjs/toolkit";
import showsReducer from "../features/shows/showsSlice";
import showDetailReducer from "../features/show-detail/showDetailSlice";

// Redux-toolkit code
// export const store = configureStore({
//   reducer: {
//     shows: showsReducer,
//     showDetail: showDetailReducer,
//   },
// });

export const setupStore = (preloadedState) => {
  return configureStore({
    reducer: {
      shows: showsReducer,
      showDetail: showDetailReducer,
    },
    preloadedState,
  });
};
