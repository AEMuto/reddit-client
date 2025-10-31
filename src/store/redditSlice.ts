import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchTerm: "",
  selectedSubreddit: "Home",
};

export type AppState = typeof initialState;

export const redditSlice = createSlice({
  name: "reddit",
  initialState,
  reducers: {
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    setSelectedSubreddit(state, action) {
      state.selectedSubreddit = action.payload;
    },
  },
  selectors: {
    selectSearchTerm: (state: AppState) => state.searchTerm,
    selectSelectedSubreddit: (state: AppState) => state.selectedSubreddit,
  },
});

export const { setSearchTerm, setSelectedSubreddit } = redditSlice.actions;
export const { selectSearchTerm, selectSelectedSubreddit } = redditSlice.selectors;