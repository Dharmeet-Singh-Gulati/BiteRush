import { useEffect } from "react";
import { Link } from "react-router-dom";
import useOnline from "../utils/useOnline";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { addUser, removeUser } from "../utils/Redux/userSlice";

const LOGO = new URL("../utils/assets/logo.jpg", import.meta.url);

const Header = () => {
  const isOnline = useOnline();
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  
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
            className="login-btn border-2 border-solid px-5 rounded-lg bg-pink-50 hover:bg-pink-75 ease-in transition-all duration-200 cursor-pointer hover:bg-gray-200"
            onClick={() => {
              signOut(auth).catch((error) => {
                console.log(
                  "An Error Occured While Signing Out Please Try Agaon Later",
                  error.message,
                );
              });
            }}
          >
            {user ? "Logout" : "Login"}
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Header;
