import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isAuthChecked: false,
  },
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
      state.isAuthChecked = true;
    },
    removeUser: (state, action) => {
      state.user = null;
      state.isAuthChecked = true;
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
