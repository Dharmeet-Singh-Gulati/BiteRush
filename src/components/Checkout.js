import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const DELIVERY_FEE = 50;
const FALLBACK_SUBTOTAL = 500;

const Checkout = () => {
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [error, setError] = useState("");

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

    ("Order placed:",
      {
        address: address.trim(),
        paymentMethod,
        deliveryFee: DELIVERY_FEE,
        subtotal,
        totalPayment,
        itemCount: cartItems.length,
      });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-orange-50 px-4 py-10">
      <div className="w-full max-w-130 rounded-xl border border-orange-100 bg-white p-6 shadow-md sm:p-7">
        <h1 className="mb-2 text-3xl font-bold text-gray-800">Checkout</h1>
        <p className="mb-6 leading-6 text-gray-500">
          Review your payment details and confirm the delivery address for your
          order.
        </p>

        <div className="mb-5">
          <label
            className="mb-2 block font-bold text-gray-700"
            htmlFor="address"
          >
            Delivery Address
          </label>
          <textarea
            id="address"
            className={`min-h-27.5 w-full resize-y rounded-xl border bg-gray-50 px-4 py-3 outline-none transition focus:ring-2 ${
              error
                ? "border-red-600 focus:border-red-600 focus:ring-red-100"
                : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
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
          {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
        </div>

        <div className="mb-5">
          <span className="mb-2 block font-bold text-gray-700">
            Payment Method
          </span>
          <div className="grid gap-3 sm:grid-cols-2">
            <label
              className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-gray-700 transition ${
                paymentMethod === "cod"
                  ? "border-blue-500 bg-blue-50 shadow-sm"
                  : "border-gray-300 bg-white hover:border-blue-300"
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={(event) => setPaymentMethod(event.target.value)}
                className="h-4 w-4 accent-blue-500"
              />
              <span>Cash on Delivery</span>
            </label>

            <label
              className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-gray-700 transition ${
                paymentMethod === "upi"
                  ? "border-blue-500 bg-blue-50 shadow-sm"
                  : "border-gray-300 bg-white hover:border-blue-300"
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value="upi"
                checked={paymentMethod === "upi"}
                onChange={(event) => setPaymentMethod(event.target.value)}
                className="h-4 w-4 accent-blue-500"
              />
              <span>UPI</span>
            </label>
          </div>
        </div>

        <div className="mb-5 rounded-xl border border-orange-200 bg-orange-50 p-4">
          <div className="mb-3 flex items-center justify-between text-gray-700">
            <span>Items Total</span>
            <span>Rs. {subtotal}</span>
          </div>
          <div className="mb-3 flex items-center justify-between text-gray-700">
            <span>Delivery Fee</span>
            <span>Rs. {DELIVERY_FEE}</span>
          </div>
          <div className="flex items-center justify-between border-t border-orange-300 pt-3 text-base font-bold text-gray-900">
            <span>Total Payment</span>
            <span>Rs. {totalPayment}</span>
          </div>
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            className="rounded-xl bg-gray-300 px-4 py-3 font-bold text-gray-800 transition hover:bg-gray-400"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="rounded-xl bg-blue-500 px-4 py-3 font-bold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
            onClick={handlePlaceOrder}
            disabled={!isAddressFilled}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
