import {
  CDN_URL,
  NON_VEG_SYMBOL,
  STAR_SVG,
  VEG_SYMBOL,
} from "../utils/constants";
import useCard from "../utils/useCard";

const Card = ({ item, addBtn, removeBtn, quantity }) => {
  const { name, description, price, defaultPrice, imageId, isVeg } =
    item?.card?.info;
  const { rating, ratingCountV2 } = item?.card?.info?.ratings?.aggregatedRating;
  const [
    more,
    handleMore,
    addItemDispatch,
    removeItemQuantityDispatch,
    removeItemDispatch,
  ] = useCard(item);
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
              handleMore();
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
        {addBtn ? (
          <span
            className="absolute bottom-3 rounded-lg border-2 border-green-300 p-2 font-medium text-lg left-20 bg-gray-50 cursor-pointer hover:bg-black hover:text-white"
            onClick={() => {
              addItemDispatch();
            }}
          >
            Add +
          </span>
        ) : (
          <></>
        )}

        {removeBtn ? (
          <div className="flex">
            <div
              className="absolute bottom-3 rounded-lg border-2 border-black font-bold p-2 left-14  h-11  hover:text-white cursor-pointer hover:bg-red-500"
              onClick={() => {
                removeItemQuantityDispatch();
              }}
            >
              -
            </div>
            <span
              className="flex justify-between absolute bottom-3 rounded-lg border-2 border-red-500 p-2 font-medium text-lg left-20 bg-gray-50 cursor-pointer hover:bg-black hover:text-white hover:border-black hover:font-bold"
              onClick={() => {
                removeItemDispatch();
              }}
            >
              Remove
            </span>
            <div
              className="absolute bottom-3 rounded-lg border-2 border-black p-2 -right-8.75  h-11  hover:bg-green-400 hover:text-white cursor-pointer font-bold"
              onClick={() => {
                addItemDispatch();
              }}
            >
              +
            </div>
            <div className="absolute border-2 border-black px-2 -bottom-2 left-27 py-0 rounded-lg text-sm font-bold">
              {quantity}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Card;
