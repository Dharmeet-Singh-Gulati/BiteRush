import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/Redux/cartSlice";
import {
  CDN_URL,
  NON_VEG_SYMBOL,
  STAR_SVG,
  VEG_SYMBOL,
} from "../utils/constants";
const RestaurantMenuItem = ({ itemList }) => {
  return (
    <div className="transition-all duration-2000 ease-in-out">
      {itemList.map((item) => (
        <Card item={item} key={item.card.info.id} />
      ))}
    </div>
  );
};

const Card = ({ item }) => {
  const [more, setMore] = useState(false);
  const dispatch = useDispatch();

  const { name, description, price, defaultPrice, imageId, isVeg } =
    item?.card?.info;
  const { rating, ratingCountV2 } = item?.card?.info?.ratings?.aggregatedRating;
  return (
    <div
      key={name + description}
      className="flex border-b-4 border-gray-200 p-2 my-2"
    >
      <div className="w-9/12 flex-col">
        <div>
          {" "}
          <img className="h-5" src={isVeg ? VEG_SYMBOL : NON_VEG_SYMBOL} />{" "}
        </div>
        <div className="font-bold text-lg">{name}</div>
        <div>₹ {defaultPrice ? defaultPrice / 100 : price / 100}</div>
        <div className="flex relative">
          {rating ? (
            <>
              <span className="absolute top-1">{STAR_SVG}</span>
              <span className="px-4">
                {rating} ({ratingCountV2})
              </span>
            </>
          ) : (
            <></>
          )}
        </div>
        <div>
          <p className={more ? "" : "line-clamp-2"}>{description}</p>
          <span
            className="cursor-pointer font-medium"
            onClick={() => {
              setMore(!more);
            }}
          >
            {more ? "less" : "...more"}
          </span>
        </div>
      </div>
      <div className="relative">
        <img
          className="h-30 pl-10  "
          src={new URL(CDN_URL + imageId, import.meta.url).href}
        />
        <span
          className="absolute bottom-3 rounded-lg border-2 border-green-300 p-2 font-medium text-lg left-20 bg-gray-50 cursor-pointer hover:bg-black hover:text-white"
          onClick={() => {
            dispatch(addItem("pizza"));
          }}
        >
          Add +
        </span>
      </div>
    </div>
  );
};

export default RestaurantMenuItem;
