import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const OrderHistory = () => {
  const orderHistory = useSelector((state) => state.orderHistory.orderHistory);

  if (!orderHistory.length) {
    return (
      <div className="mx-auto max-w-5xl p-6">
        <div className="flex min-h-[50vh] flex-col items-center justify-center rounded-xl bg-white p-8 text-center shadow-sm dark:bg-[#2A2A2A]">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">No orders yet</h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Your completed orders will appear here once you place one.
          </p>
          <Link
            to={"/"}
            className="mt-6 rounded-xl bg-[#EF4F5F] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:shadow-md"
          >
            Start Ordering
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl p-6">
      <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">Order History</h1>
      {orderHistory
        .slice()
        .reverse()
        .map((order) => (
          <div key={order.uid} className="mb-4 rounded-xl bg-white p-4 shadow-sm dark:bg-[#2A2A2A]">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="font-semibold text-gray-900 dark:text-white">Order #{order.uid}</h2>
                <div className="mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <p>Items: {order.itemCount}</p>
                  <p>Payment: {order.paymentMethod}</p>
                  <p>Address: {order.address}</p>
                </div>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(order.uid).toLocaleString()}
              </div>
            </div>
            <div className="mt-4 border-t border-[#E8E8E8] pt-3 font-semibold text-gray-900 dark:border-[#3A3A3A] dark:text-white">
              Total: Rs. {order.totalPayment}
            </div>
          </div>
        ))}
    </div>
  );
};

export default OrderHistory;
