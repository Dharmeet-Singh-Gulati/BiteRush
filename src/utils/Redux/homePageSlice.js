import { createSlice } from "@reduxjs/toolkit";

const homePageSlice = createSlice({
  name: "homePage",
  initialState: {
    homePageData: [],
  },
  reducers: {
    addHomePageData: (state, action) => {
      state.homePageData = action.payload;
    },
    removeHomePageData: (state, action) => {
      state.homePageData = [];
    },
  },
});

export const { addHomePageData, removeHomePageData } = homePageSlice.actions;

export default homePageSlice.reducer;
