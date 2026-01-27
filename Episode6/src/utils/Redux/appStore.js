import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

const appStore = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
console.log(
  "App store is ",
  appStore.subscribe(() => console.log("Listener Called from App Store!!")),
);

export default appStore;
