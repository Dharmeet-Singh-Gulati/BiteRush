import {
  addItem,
  removeItemQuantity,
  removeItem,
} from "../utils/Redux/cartSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";

const useCard = (item) => {
  const [more, setMore] = useState(false);
  const dispatch = useDispatch();
  const handleMore = () => {
    setMore(!more);
  };
  const addItemDispatch = () => {
    let quantity = 1;
    dispatch(addItem({ id: item.card.info.id, item, quantity }));
  };
  const removeItemQuantityDispatch = () => {
    dispatch(removeItemQuantity({ id: item.card.info.id }));
  };
  const removeItemDispatch = () => {
    dispatch(removeItem({ id: item.card.info.id }));
  };

  return [
    more,
    handleMore,
    addItemDispatch,
    removeItemQuantityDispatch,
    removeItemDispatch,
  ];
};

export default useCard;
