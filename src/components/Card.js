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
  const isMenuCard = addBtn;
  const isCartCard = removeBtn;
  return (
    <div
      key={name + description}
      className={`my-3 overflow-hidden rounded-xl bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md dark:bg-[#2A2A2A] ${
        isMenuCard
          ? "flex flex-col gap-4 lg:flex-row lg:items-start"
          : "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      }`}
    >
      {isCartCard ? (
        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg self-center sm:self-auto">
          <img
            className="h-full w-full object-cover"
            src={new URL(CDN_URL + imageId, import.meta.url).href}
          />
        </div>
      ) : null}

      <div className={`min-w-0 flex flex-1 flex-col ${isMenuCard ? "gap-2" : "gap-1"}`}>
        <div>
          <img className="h-5" src={isVeg ? VEG_SYMBOL : NON_VEG_SYMBOL} />
        </div>
        <div className="text-lg font-semibold text-gray-900 dark:text-white sm:text-xl">{name}</div>
        {isCartCard ? (
          <div className="line-clamp-1 text-sm text-gray-500 dark:text-gray-400">
            {description ? description : "Freshly prepared item"}
          </div>
        ) : null}
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
          {rating ? (
            <div className="flex items-center gap-1">
              <span>{STAR_SVG}</span>
              <span>
                {rating} ({ratingCountV2})
              </span>
            </div>
          ) : (
            <></>
          )}
          <div className="font-semibold text-gray-900 dark:text-white">
            Rs. {defaultPrice ? defaultPrice / 100 : price / 100}
          </div>
        </div>
        {isMenuCard ? (
          <div className="min-w-0">
            <p className={`text-sm text-gray-500 dark:text-gray-400 ${more ? "" : "line-clamp-2"}`}>
              {description}
            </p>
            <span
              className="cursor-pointer text-sm font-medium text-[#EF4F5F]"
              onClick={() => {
                handleMore();
              }}
            >
              {more ? "less" : "...more"}
            </span>
          </div>
        ) : null}
      </div>

      {isMenuCard ? (
        <div className="w-full flex-shrink-0 lg:w-32">
          <div className="h-40 w-full overflow-hidden rounded-lg lg:h-32 lg:w-32">
            <img
              className="h-full w-full object-cover"
              src={new URL(CDN_URL + imageId, import.meta.url).href}
            />
          </div>
          <span
            className="mt-2 flex h-10 w-full cursor-pointer items-center justify-center rounded-lg bg-[#EF4F5F] px-4 py-2 text-center text-sm font-semibold text-white"
            onClick={() => {
              addItemDispatch();
            }}
          >
            Add
          </span>
        </div>
      ) : null}

      {isCartCard ? (
        <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-end">
          <div
            className="flex h-10 min-w-10 cursor-pointer items-center justify-center rounded border border-[#E8E8E8] px-3 py-2 text-sm font-semibold text-[#1C1C1C] dark:border-[#3A3A3A] dark:text-white"
            onClick={() => {
              removeItemQuantityDispatch();
            }}
          >
            -
          </div>
          <div className="min-w-8 text-center text-sm font-semibold text-gray-900 dark:text-white">
            {quantity}
          </div>
          <div
            className="flex h-10 min-w-10 cursor-pointer items-center justify-center rounded border border-[#E8E8E8] px-3 py-2 text-sm font-semibold text-[#1C1C1C] dark:border-[#3A3A3A] dark:text-white"
            onClick={() => {
              addItemDispatch();
            }}
          >
            +
          </div>
          <span
            className="cursor-pointer text-sm font-medium text-red-500"
            onClick={() => {
              removeItemDispatch();
            }}
          >
            Remove
          </span>
        </div>
      ) : null}
    </div>
  );
};

export default Card;
