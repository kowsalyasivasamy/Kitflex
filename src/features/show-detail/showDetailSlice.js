import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getShowInfo } from "./showDetailAPI";

const initialState = {
  showInfo: {},
  status: "idle",
};

export const getShowDetails = createAsyncThunk(
  "show-detail/getShowInfo",
  async (showId) => {
    const response = await getShowInfo(showId);
    return response;
  }
);

export const showDetailSlice = createSlice({
  name: "showDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getShowDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getShowDetails.fulfilled, (state, action) => {
        state.status = "idle";
        state.showInfo = action.payload;
      });
  },
});

//selector
export const selectShowInfo = (state) => state.showDetail.showInfo;

export default showDetailSlice.reducer;
