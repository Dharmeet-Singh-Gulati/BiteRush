import React, { lazy, Suspense, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "../index.css";
import Header from "./components/Header";
import Body from "./components/Body";
import About from "./components/About";
import Error from "./components/Error";
import Cart from "./components/Cart";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import RestrauntMenu from "./components/RestrauntMenu";
import UserInfo from "./utils/UserInfo";
import { Provider } from "react-redux";
import appStore from "./utils/Redux/appStore";
import Checkout from "./components/Checkout";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";

const Contact = lazy(() => import("./components/Contact"));

const AppLayout = () => {
  // const dispatch = useDispatch();
  
  return (
    <div className="app-layout">
      <Provider store={appStore}>
        <UserInfo.Provider value={{ name: "sidak", loggedIn: true }}>
          <Header />
        </UserInfo.Provider>
        <div className="pt-20">
          <Outlet />
        </div>
      </Provider>
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About name={"Dharmeet"} location={"Delhi"} />,
      },
      {
        path: "/contact",
        element: (
          <Suspense fallback={<h1>Lazy Loading</h1>}>
            <Contact />
          </Suspense>
        ),
      },
      {
        path: "/restraunts/:resId",
        element: <RestrauntMenu />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/checkout",
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);
