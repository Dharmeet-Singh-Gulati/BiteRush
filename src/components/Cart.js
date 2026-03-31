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
    return <h1>Cart is Empty</h1>;
  }
  return (
    <div className="w-6/12 mx-auto pt-15 relative">
      <div className="font-bold text-2xl w-6/12 mx-auto flex justify-center items-center h-20 mb-2 ">
        Cart
      </div>
      <div
        className="bg-black text-white text-lg rounded-2xl p-2 m-2  mb-10 w-40  mx-auto text-center  cursor-pointer"
        onClick={handlClearCart}
      >
        Clear Cart
      </div>
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
      <Link to={"/checkout"}>
        <div className="bg-green-500 fixed bottom-10 right-20 p-2 rounded-lg hover:bg-green-600 cursor-pointer duration-500 transition-all">
          <h3 className="text-2xl text-white font-bold inline-block">
            Check out
          </h3>
          <p className="text-white text-md inline-block mx-2 px-1">
            {RUPEE_SVG}
            {totalPayble}
          </p>
          {CHECK_OUT_SVG}
        </div>
      </Link>
    </div>
  );
};

export default Cart;
