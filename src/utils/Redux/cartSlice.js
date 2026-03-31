import { createSlice, current } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      let { id, item, quantity } = action.payload;
      for (let i = 0; i < state.items.length; i++) {
        if (id === state.items[i].id) {
          state.items[i].quantity += 1;
          current(state);
          return;
        }
      }
      state.items.push({ id, item, quantity });
    },

    clearCart: (state) => {
      state.items = [];
    },
    removeItem: (state, action) => {
      const { id } = action.payload;
      for (let i = 0; i < state.items.length; i++) {
        if (id === state.items[i].id) {
          state.items.splice(i, 1);
          break;
        }
      }
    },
    removeItemQuantity: (state, action) => {
      const { id } = action.payload;
      for (let i = 0; i < state.items.length; i++) {
        if (id === state.items[i].id) {
          if (state.items[i].quantity == 1) {
            state.items.splice(i, 1);
          } else {
            state.items[i].quantity -= 1;
            current(state);
          }
          break;
        }
      }
    },
  },
});

export const { addItem, clearCart, removeItem, removeItemQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
