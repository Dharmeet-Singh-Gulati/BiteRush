import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useOnline from "../utils/useOnline";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { addUser, removeUser } from "../utils/Redux/userSlice";
import { toggleTheme } from "../utils/Redux/themeSlice";

const LOGO = new URL("../utils/assets/logo.png", import.meta.url);

const navLinkClassName = ({ isActive }) =>
  `transition-colors duration-200 ${
    isActive
      ? "text-[#EF4F5F]"
      : "text-[#696969] hover:text-[#EF4F5F] dark:text-gray-400 dark:hover:text-[#EF4F5F]"
  }`;

const Header = ({ showToast }) => {
  const navigate = useNavigate();
  const isOnline = useOnline();
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const mode = useSelector((state) => state.theme.mode);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(addUser(user.uid));
        console.log("User Signed In SuccesFully", user);
      } else {
        dispatch(removeUser());
        console.log("User Signed Out SuccessFully");
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="fixed top-0 z-50 w-full border-b border-[#E8E8E8] bg-white/95 backdrop-blur transition-colors duration-300 dark:border-[#3A3A3A] dark:bg-[#1C1C1C]/95">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          to={"/"}
          className="logo-container flex min-w-0 items-center gap-3 rounded-xl border border-[#E8E8E8] bg-white px-3 py-2 shadow-sm transition-all duration-200 hover:shadow-md dark:border-[#3A3A3A] dark:bg-[#2A2A2A]"
        >
          <div className="w-11 overflow-hidden rounded-xl bg-[#EF4F5F]/10 p-1">
            <img
              className="logo h-9 w-full rounded-lg object-cover"
              src={LOGO.href}
            />
          </div>
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-base font-bold text-[#1C1C1C] dark:text-white sm:text-lg">
              BiteRush
            </span>
            <span className="text-xs text-[#696969] dark:text-gray-400">
              {isOnline ? "Online" : "Offline"}
            </span>
          </div>
        </Link>
        <div className="nav-items-container hidden items-center lg:flex">
          <ul className="flex items-center gap-6 text-sm font-medium text-[#696969] dark:text-gray-400">
            <li>
              <NavLink className={navLinkClassName} to={"/"}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink className={navLinkClassName} to={"/about"}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink className={navLinkClassName} to={"/contact"}>
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink className={navLinkClassName} to={"/order-history"}>
                Order History
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="hidden items-center gap-3 lg:flex">
          <button
            type="button"
            className="h-10 rounded-xl border border-[#E8E8E8] bg-white px-4 py-2 text-sm font-semibold text-[#1C1C1C] shadow-sm transition-all duration-200 hover:shadow-md dark:border-[#3A3A3A] dark:bg-[#2A2A2A] dark:text-white"
            onClick={() => {
              dispatch(toggleTheme());
            }}
          >
            {mode === "dark" ? "Light Mode" : "Dark Mode"}
          </button>
          <Link
            to={"/cart"}
            className="flex h-10 items-center rounded-xl border border-[#E8E8E8] bg-white px-4 py-2 text-sm font-semibold text-[#1C1C1C] shadow-sm transition-all duration-200 hover:shadow-md dark:border-[#3A3A3A] dark:bg-[#2A2A2A] dark:text-white"
          >
            Cart ({cartItems.length})
          </Link>
          <button
            className="login-btn h-10 cursor-pointer rounded-xl bg-[#EF4F5F] px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:shadow-md hover:brightness-95"
            onClick={() => {
              if (user) {
                signOut(auth)
                  .then(() => {
                    showToast("Logged out successfully");
                  })
                  .catch((error) => {
                    console.log(
                      "An Error Occured While Signing Out Please Try Agaon Later",
                      error.message,
                    );
                    showToast("Something went wrong", "error");
                  });
              } else {
                navigate("/login");
              }
            }}
          >
            {user ? "Logout" : "Login"}
          </button>
        </div>
        <div className="relative lg:hidden">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#E8E8E8] bg-white text-[#1C1C1C] shadow-sm transition-all duration-200 hover:shadow-md dark:border-[#3A3A3A] dark:bg-[#2A2A2A] dark:text-white"
            onClick={() => {
              setIsMenuOpen((prev) => !prev);
            }}
            aria-label="Toggle menu"
          >
            <span className="text-lg leading-none">{isMenuOpen ? "X" : "☰"}</span>
          </button>
          {isMenuOpen ? (
            <div className="absolute top-full right-0 mt-3 flex w-56 flex-col gap-3 rounded-lg bg-white p-4 shadow-md dark:bg-[#1C1C1C]">
              <NavLink
                className={navLinkClassName}
                to={"/"}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </NavLink>
              <NavLink
                className={navLinkClassName}
                to={"/about"}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </NavLink>
              <NavLink
                className={navLinkClassName}
                to={"/contact"}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </NavLink>
              <NavLink
                className={navLinkClassName}
                to={"/order-history"}
                onClick={() => setIsMenuOpen(false)}
              >
                Order History
              </NavLink>
              <button
                type="button"
                className="h-10 rounded-xl border border-[#E8E8E8] bg-white px-4 py-2 text-left text-sm font-semibold text-[#1C1C1C] shadow-sm transition-all duration-200 hover:shadow-md dark:border-[#3A3A3A] dark:bg-[#2A2A2A] dark:text-white"
                onClick={() => {
                  dispatch(toggleTheme());
                  setIsMenuOpen(false);
                }}
              >
                {mode === "dark" ? "Light Mode" : "Dark Mode"}
              </button>
              <Link
                to={"/cart"}
                className="flex h-10 items-center rounded-xl border border-[#E8E8E8] bg-white px-4 py-2 text-sm font-semibold text-[#1C1C1C] shadow-sm transition-all duration-200 hover:shadow-md dark:border-[#3A3A3A] dark:bg-[#2A2A2A] dark:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Cart ({cartItems.length})
              </Link>
              <button
                className="login-btn h-10 cursor-pointer rounded-xl bg-[#EF4F5F] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:shadow-md hover:brightness-95"
                onClick={() => {
                  setIsMenuOpen(false);
                  if (user) {
                    signOut(auth)
                      .then(() => {
                        showToast("Logged out successfully");
                      })
                      .catch((error) => {
                        console.log(
                          "An Error Occured While Signing Out Please Try Agaon Later",
                          error.message,
                        );
                        showToast("Something went wrong", "error");
                      });
                  } else {
                    navigate("/login");
                  }
                }}
              >
                {user ? "Logout" : "Login"}
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Header;
