import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MAX_ORDER_HISTORY } from "../utils/constants";
import { addOrderHistory } from "../utils/Redux/orderHistorySlice";
import { clearCart } from "../utils/Redux/cartSlice";

const DELIVERY_FEE = 50;
const FALLBACK_SUBTOTAL = 500;

const Checkout = ({ showToast }) => {
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const cartSubtotal = cartItems.reduce((acc, curr) => {
    const itemPrice =
      curr?.item?.card?.info?.price ||
      curr?.item?.card?.info?.defaultPrice ||
      0;

    return acc + itemPrice * curr.quantity;
  }, 0);

  const subtotal = cartSubtotal ? cartSubtotal / 100 : FALLBACK_SUBTOTAL;
  const totalPayment = subtotal + DELIVERY_FEE;
  const isAddressFilled = address.trim().length > 0;

  const handlePlaceOrder = () => {
    if (!isAddressFilled) {
      setError("Please enter your delivery address.");
      return;
    }

    setError("");

    const order = {
      uid: new Date().getTime(),
      address: address.trim(),
      paymentMethod,
      deliveryFee: DELIVERY_FEE,
      subtotal,
      totalPayment,
      itemCount: cartItems.length,
    };

    console.log("Order placed:", order);
    dispatch(addOrderHistory(order));
    dispatch(clearCart());
    showToast("Order placed successfully!");
    return;
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
        <h1 className="mb-3 text-xl font-bold text-[#1C1C1C] dark:text-white sm:text-2xl lg:text-3xl">
          Your cart is empty
        </h1>

        <p className="mb-6 max-w-md text-sm text-[#696969] dark:text-gray-400 sm:text-base">
          Looks like you haven’t added anything yet. Start exploring restaurants
          and add your favorite meals.
        </p>

        <button
          onClick={() => navigate("/")}
          className="rounded-lg bg-[#EF4F5F] px-6 py-3 font-semibold text-white transition hover:bg-[#D83A4A]"
        >
          Go to Home
        </button>
      </div>
    );
  }

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
        <div className="rounded-xl border border-[#E8E8E8] bg-white p-5 shadow-sm dark:border-[#3A3A3A] dark:bg-[#2A2A2A] sm:p-7">
          <h1 className="mb-2 text-xl font-bold text-[#1C1C1C] dark:text-white sm:text-2xl lg:text-3xl">Checkout</h1>
          <p className="mb-6 text-sm leading-6 text-[#696969] dark:text-gray-400 sm:text-base">
            Review your payment details and confirm the delivery address for
            your order.
          </p>

          <div className="mb-5">
            <label
              className="mb-2 block font-semibold text-[#1C1C1C] dark:text-white"
              htmlFor="address"
            >
              Delivery Address
            </label>
            <textarea
              id="address"
              className={`min-h-27.5 w-full resize-y rounded-xl border bg-[#F8F8F8] px-4 py-3 text-[#1C1C1C] outline-none transition dark:bg-[#2A2A2A] dark:text-white dark:placeholder:text-gray-500 ${
                error
                  ? "border-red-600"
                  : "border-[#E8E8E8] focus:border-[#EF4F5F] dark:border-[#3A3A3A]"
              }`}
              placeholder="Enter your full delivery address"
              value={address}
              onChange={(event) => {
                setAddress(event.target.value);
                if (event.target.value.trim()) {
                  setError("");
                }
              }}
              required
            />
            {error ? (
              <p className="mt-2 text-sm text-red-600">{error}</p>
            ) : null}
          </div>

          <div className="mb-5">
            <span className="mb-2 block font-semibold text-[#1C1C1C] dark:text-white">
              Payment Method
            </span>
            <div className="grid gap-3 sm:grid-cols-2">
              <label
                className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-[#1C1C1C] transition dark:text-white ${
                  paymentMethod === "cod"
                    ? "border-[#EF4F5F] bg-[#FFF1F2] shadow-sm dark:bg-[#3A2328]"
                    : "border-[#E8E8E8] bg-white hover:shadow-md dark:border-[#3A3A3A] dark:bg-[#2A2A2A]"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={(event) => setPaymentMethod(event.target.value)}
                  className="h-4 w-4 accent-[#EF4F5F]"
                />
                <span>Cash on Delivery</span>
              </label>

              <label
                className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-[#1C1C1C] transition dark:text-white ${
                  paymentMethod === "upi"
                    ? "border-[#EF4F5F] bg-[#FFF1F2] shadow-sm dark:bg-[#3A2328]"
                    : "border-[#E8E8E8] bg-white hover:shadow-md dark:border-[#3A3A3A] dark:bg-[#2A2A2A]"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="upi"
                  checked={paymentMethod === "upi"}
                  onChange={(event) => setPaymentMethod(event.target.value)}
                  className="h-4 w-4 accent-[#EF4F5F]"
                />
                <span>UPI</span>
              </label>
            </div>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              className="h-10 rounded-xl border border-[#E8E8E8] bg-white px-4 py-2 font-semibold text-[#1C1C1C] transition hover:shadow-md dark:border-[#3A3A3A] dark:bg-[#2A2A2A] dark:text-white"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="h-10 rounded-xl bg-[#EF4F5F] px-4 py-2 font-semibold text-white transition hover:shadow-md hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
              onClick={handlePlaceOrder}
              disabled={!isAddressFilled}
            >
              Place Order
            </button>
          </div>
        </div>

        <div className="h-fit rounded-xl border border-[#E8E8E8] bg-white p-5 shadow-sm lg:sticky lg:top-28 dark:border-[#3A3A3A] dark:bg-[#2A2A2A]">
          <h2 className="text-xl font-semibold text-[#1C1C1C] dark:text-white sm:text-2xl">
            Order Summary
          </h2>
          <div className="mt-5 flex items-center justify-between text-sm text-[#696969] dark:text-gray-400">
            <span>Items Total</span>
            <span>Rs. {subtotal}</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-sm text-[#696969] dark:text-gray-400">
            <span>Delivery Fee</span>
            <span>Rs. {DELIVERY_FEE}</span>
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-[#E8E8E8] pt-4 text-base font-semibold text-[#1C1C1C] dark:border-[#3A3A3A] dark:text-white">
            <span>Total Payment</span>
            <span>Rs. {totalPayment}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
