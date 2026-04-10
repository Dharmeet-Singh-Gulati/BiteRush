import { createSlice } from "@reduxjs/toolkit";

const orderHistorySlice = createSlice({
  name: "orderHistorySlice",
  initialState: {
    orderHistory: [],
  },
  reducers: {
    addOrderHistory: (state, action) => {
      if (Object.keys(state.orderHistory).length >= 20) {
        console.log("Greater Than 20");
        state.orderHistory = state.orderHistory.slice(0, 19);
      }
      state.orderHistory.push(action.payload);
    },
  },
});

export const { addOrderHistory } = orderHistorySlice.actions;

export default orderHistorySlice.reducer;
