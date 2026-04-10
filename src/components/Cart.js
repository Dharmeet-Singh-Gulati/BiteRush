import Card from "./Card";
import { clearCart } from "../utils/Redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { CHECK_OUT_SVG, RUPEE_SVG } from "../utils/constants";
import { Link } from "react-router-dom";
const Cart = () => {
  // Add a custom Hook to address Ui and Data layer differently
  const itemList = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const totalPayble = itemList.reduce((acc, curr) => {
    let quantity = curr.quantity;
    curr =
      (curr?.item?.card?.info?.price ||
        curr?.item?.card?.info?.defaultPrice ||
        0) * quantity;
    curr = curr / 100;
    acc += curr;
    return acc;
  }, 0);
  const handlClearCart = () => {
    dispatch(clearCart());
  };
  if (!itemList.length) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-4xl items-center justify-center px-4 py-10">
        <div className="w-full rounded-xl border border-[#E8E8E8] bg-white p-6 text-center shadow-sm dark:border-[#3A3A3A] dark:bg-[#2A2A2A] sm:p-8">
          <h1 className="text-xl font-semibold text-[#1C1C1C] dark:text-white sm:text-2xl lg:text-3xl">Cart is empty</h1>
          <p className="mt-3 text-sm text-[#696969] dark:text-gray-400 sm:text-base">
            Add a few dishes to see your order summary here.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-6 rounded-[28px] bg-linear-to-r from-[#FFF1F2] via-white to-[#FFF8F0] p-5 shadow-sm dark:from-[#2A1E20] dark:via-[#1C1C1C] dark:to-[#241F1B] sm:p-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-xl font-bold text-[#1C1C1C] dark:text-white sm:text-2xl lg:text-3xl">Your Cart</h1>
            <p className="mt-2 text-sm text-[#696969] dark:text-gray-400 sm:text-base">
              Review your selected items before checkout.
            </p>
          </div>
          <div
            className="flex h-10 w-full cursor-pointer items-center justify-center rounded-xl border border-[#E8E8E8] bg-white px-4 py-2 text-sm font-semibold text-[#1C1C1C] shadow-sm transition-all duration-200 hover:shadow-md dark:border-[#3A3A3A] dark:bg-[#2A2A2A] dark:text-white lg:w-fit"
            onClick={handlClearCart}
          >
            Clear Cart
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_350px]">
        <div className="min-w-0">
          {itemList.map((item) => {
            return (
              <Card
                item={item.item}
                key={item.item.card.info.id}
                addBtn={false}
                removeBtn={true}
                quantity={item.quantity}
              />
            );
          })}
        </div>
        <div className="h-fit rounded-xl border border-[#E8E8E8] bg-white p-5 shadow-sm lg:sticky lg:top-28 dark:border-[#3A3A3A] dark:bg-[#2A2A2A]">
          <h3 className="text-xl font-semibold text-[#1C1C1C] dark:text-white sm:text-2xl">Summary</h3>
          <div className="mt-5 flex items-center justify-between text-sm text-[#696969] dark:text-gray-400">
            <span>Items</span>
            <span>{itemList.length}</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-sm text-[#696969] dark:text-gray-400">
            <span>Total</span>
            <span>
              {RUPEE_SVG}
              {totalPayble}
            </span>
          </div>
          <Link to={"/checkout"}>
            <div className="mt-6 flex min-h-10 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#EF4F5F] px-4 py-3 text-white shadow-sm transition-all duration-200 hover:shadow-md hover:brightness-95">
              <h3 className="text-base font-semibold">Check out</h3>
              <p className="text-sm">
                {RUPEE_SVG}
                {totalPayble}
              </p>
              {CHECK_OUT_SVG}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
