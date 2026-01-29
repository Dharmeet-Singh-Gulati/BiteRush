import { clearCart } from "../utils/Redux/cartSlice";
import { Card } from "./RestrauntMenuItem";
import { useDispatch, useSelector } from "react-redux";
const Cart = () => {
  const itemList = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const handlClearCart = () => {
    dispatch(clearCart());
  };
  if (!itemList.length) {
    return <h1>Cart is Empty</h1>;
  }
  return (
    <div className="w-6/12 mx-auto pt-15 ">
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
          />
        );
      })}
    </div>
  );
};

export default Cart;
