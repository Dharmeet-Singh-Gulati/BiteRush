import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import userReducer from "./userSlice";
import homePageSliceReducer from "./homePageSlice";

const loadState = () => {
  try {
    const data = JSON.parse(localStorage.getItem("cartData"));
    if (!data) return undefined;
    return {
      cart: data,
    };
  } catch (error) {
    console.log("Errro Caught => ", error);
  }
};

const appStore = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    homePage: homePageSliceReducer,
  },
  preloadedState: loadState(),
});

export default appStore;

appStore.subscribe(() => {
  const data = appStore.getState();
  localStorage.setItem("cartData", JSON.stringify(data.cart));
});
