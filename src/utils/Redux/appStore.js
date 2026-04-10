import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import userReducer from "./userSlice";
import orderHistorySliceReducer from "./orderHistorySlice";
import homePageSliceReducer from "./homePageSlice";
import themeReducer from "./themeSlice";

const loadState = () => {
  try {
    const data = JSON.parse(localStorage.getItem("appState"));
    if (!data) return undefined;
    return {
      cart: data.cart || [],
      orderHistory: data.orderHistory || [],
      theme: {
        mode: localStorage.getItem("theme") === "dark" ? "dark" : "light",
      },
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
    orderHistory: orderHistorySliceReducer,
    theme: themeReducer,
  },
  preloadedState: loadState(),
});

export default appStore;

appStore.subscribe(() => {
  const data = appStore.getState();
  const appState = {
    cart: data.cart,
    orderHistory: data.orderHistory,
  };
  localStorage.setItem("appState", JSON.stringify(appState));
  localStorage.setItem("theme", data.theme.mode);
});
