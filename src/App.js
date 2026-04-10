import React, { lazy, Suspense, useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import "../index.css";
import Header from "./components/Header";
import Body from "./components/Body";
import About from "./components/About";
import Error from "./components/Error";
import Cart from "./components/Cart";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useOutletContext,
} from "react-router-dom";
import RestrauntMenu from "./components/RestrauntMenu";
import { Provider, useSelector } from "react-redux";
import appStore from "./utils/Redux/appStore";
import Checkout from "./components/Checkout";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import OrderHistory from "./components/OrderHistory";
import Toast from "./components/Toast";
import Contact from "./components/Contact"; 

const LoginPage = () => {
  const { showToast } = useOutletContext();

  return <Login showToast={showToast} />;
};

const CheckoutPage = () => {
  const { showToast } = useOutletContext();

  return <Checkout showToast={showToast} />;
};

const AppShell = ({ toast, showToast }) => {
  const mode = useSelector((state) => state.theme.mode);

  return (
    <div className={mode === "dark" ? "dark" : ""}>
      {toast ? <Toast message={toast.message} type={toast.type} /> : null}
      <div className="app-layout min-h-screen bg-[#F8F8F8] font-['Poppins',sans-serif] text-[#1C1C1C] transition-colors duration-300 dark:bg-[#121212] dark:text-white">
        <Header showToast={showToast} />
        <div className="pt-24">
          <Outlet context={{ showToast }} />
        </div>
      </div>
    </div>
  );
};

const AppLayout = () => {
  const [toast, setToast] = useState(null);
  const toastTimerRef = useRef(null);

  const showToast = (message, type = "success") => {
    console.log("TOAST TRIGGERED:", message);
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    setToast({ message, type });
    toastTimerRef.current = setTimeout(() => {
      setToast(null);
    }, 2500);
  };

  return (
    <Provider store={appStore}>
      <AppShell toast={toast} showToast={showToast} />
    </Provider>
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
        path: "/order-history",
        element: <OrderHistory />,
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
            <CheckoutPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);
