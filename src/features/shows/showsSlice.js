import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchShows, searchShows } from "./showsAPI";

const initialState = {
  showList: [],
  status: "idle",
};

export const getShowList = createAsyncThunk("shows/fetchShows", async () => {
  const response = await fetchShows();
  return response;
});

export const searchShow = createAsyncThunk("shows/searchShow", async (key) => {
  const response = await searchShows(key);
  return response.map((val) => val.show);
});

export const showsSlice = createSlice({
  name: "shows",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getShowList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getShowList.fulfilled, (state, action) => {
        state.status = "idle";
        state.showList = action.payload;
      })
      .addCase(searchShow.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchShow.fulfilled, (state, action) => {
        state.status = "idle";
        state.showList = action.payload;
      });
  },
});

//selector
export const selectShows = (state) => state.shows.showList;

export default showsSlice.reducer;
