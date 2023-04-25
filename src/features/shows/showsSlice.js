import { createSlice } from "@reduxjs/toolkit";
import { fetchShows } from "./showsAPI";

const initialState = {
  allShows: [],
  showList: [],
};

export const getShowList = () => {
  return async (dispatch) => {
    try {
      const response = await fetchShows();
      dispatch(getAllShows(response));
    } catch (err) {
      dispatch(getAllShows([]));
    }
  };
};

export const searchShow = (searchKey) => {
  return async (dispatch, getState) => {
    try {
      const allShows = getState().shows.allShows;
      const shows = allShows.filter((item) =>
        item.name.toLowerCase().includes(searchKey.toLowerCase())
      );
      dispatch(setShowList(shows));
    } catch (err) {
      dispatch(setShowList([]));
    }
  };
};

export const showsSlice = createSlice({
  name: "shows",
  initialState,
  reducers: {
    getAllShows: (state, action) => {
      state.allShows = action.payload;
      state.showList = action.payload;
    },
    setShowList: (state, action) => {
      state.showList = action.payload;
    },
    resetShowList: (state) => {
      state.showList = state.allShows;
    },
  },
});

// selector
export const selectShows = (state) => state.shows.showList;

// action
export const { getAllShows, setShowList, resetShowList } = showsSlice.actions;

// reducer
export default showsSlice.reducer;
