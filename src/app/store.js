import { configureStore } from "@reduxjs/toolkit";
import showsReducer from "../features/shows/showsSlice";
import showDetailReducer from "../features/show-detail/showDetailSlice";

export const store = configureStore({
  reducer: {
    shows: showsReducer,
    showDetail: showDetailReducer,
  },
});
