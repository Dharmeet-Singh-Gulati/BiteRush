import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useOnline from "../utils/useOnline";
import UserInfo from "../utils/UserInfo";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { addUser, removeUser } from "../utils/Redux/userSlice";

const LOGO = new URL("../utils/assets/logo.jpg", import.meta.url);
const Header = () => {
  const [loginBtn, setLoginBtn] = useState("Login");
  const isOnline = useOnline();
  const userInfo = useContext(UserInfo);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(addUser(user.uid));
        console.log("user from auth", typeof user);
        console.log("user from auth", user);
      } else {
        dispatch(removeUser());
        console.log("No user", user);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="bg-pink-200 flex justify-between fixed z-50 mt-0 w-full">
      <div className="logo-container w-20 ml-2 p-2 rounded-full bg-orange-400 my-1">
        <img className="logo rounded-full" src={LOGO.href} />
      </div>
      <div className="nav-items-container flex items-center ">
        <ul className="flex justify-center mr-20">
          <li className="mr-5">Online Status: {isOnline ? "🟢" : "🔴"}</li>
          <li className="mr-5">
            <Link to={"/"}>Home</Link>
          </li>
          <li className="mr-5">
            <Link to={"/about"}>About Us</Link>
          </li>
          <li className="mr-5">
            <Link to={"/contact"}>Contact Us</Link>
          </li>
          <li className="mr-10 text-m">
            <Link to={"/cart"}>🛒 ({cartItems.length} - items)</Link>
          </li>

          <button
            className="login-btn border-2 border-solid px-5 rounded-lg bg-pink-50 hover:bg-pink-75 ease-in transition-all duration-200 cursor-pointer"
            onClick={() => {
              loginBtn === "Login"
                ? setLoginBtn("Logout")
                : setLoginBtn("Login");
            }}
          >
            {loginBtn}
          </button>
          <li className="mr-10">{userInfo.name}</li>
          <li
            onClick={() =>
              signOut(auth)
                .then(() => {
                  console.log("SignedOut Successfully");
                })
                .catch((error) => {
                  console.log("Sign Out failed - ", error.message);
                })
            }
          >
            SignOut
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
