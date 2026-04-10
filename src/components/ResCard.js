import { Link } from "react-router-dom";
import { STAR_SVG, VEG_SYMBOL } from "../utils/constants";
import { CDN_URL } from "../utils/constants";
import { CHECK_OUT_SVG } from "../utils/constants";
import { addItem } from "../utils/Redux/cartSlice";
import { useDispatch } from "react-redux";

const VEGSYMBOL = VEG_SYMBOL;

const ResCard = (props) => {
  const { resData } = props;
  const { name: mealName, price: mealPrice } = resData?.card?.card?.info;
  const { name: restroName, avgRating } = resData?.card?.card?.restaurant?.info;
  const { minDeliveryTime, maxDeliveryTime } =
    resData?.card?.card?.restaurant?.info?.sla;
  const { imageId } = resData?.card?.card?.info;
  const { id: restrauntId } = resData?.card?.card?.restaurant?.info;
  const dispatch = useDispatch();

  return (
    <div className="res-card-container flex h-full flex-col justify-between overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-200 hover:shadow-md dark:bg-[#2A2A2A]">
      <div className="meal-wrapper relative">
        <div className="meal-logo overflow-hidden">
          <img
            className="res-logo h-44 w-full rounded-t-xl object-cover"
            alt="res-logo"
            src={CDN_URL + imageId}
          ></img>
        </div>
      </div>
      <div className="flex flex-grow flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{mealName}</h3>
            <h4 className="mt-1 text-sm text-gray-500 dark:text-gray-400">By {restroName}</h4>
          </div>
          <div className="shrink-0 text-[#EF4F5F]">{CHECK_OUT_SVG}</div>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <span>{STAR_SVG}</span>
            <h4>{avgRating}</h4>
          </div>
          <h4>{minDeliveryTime} - {maxDeliveryTime} mins</h4>
        </div>
        <div className="h-px w-full bg-[#E8E8E8] dark:bg-[#3A3A3A]"></div>
        <div className="flex flex-col gap-2">
          <img src={VEGSYMBOL} className="w-5"></img>
          <Link
            className="decoration-0 cursor-pointer"
            to={"restraunts/" + restrauntId}
          >
            <h4 className="text-sm text-gray-500 dark:text-gray-400">Explore menu details</h4>
          </Link>
          <h4 className="font-semibold text-gray-900 dark:text-white">Rs. {mealPrice / 100}</h4>
        </div>
        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          <h4 className="inline-flex w-fit rounded-full border border-[#E8E8E8] bg-[#F8F8F8] px-4 py-2 text-sm text-gray-500 dark:border-[#3A3A3A] dark:bg-[#1C1C1C] dark:text-gray-400">
            Customisable
          </h4>
          <h2
            className="add-btn cursor-pointer rounded-full bg-[#EF4F5F] px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:shadow-md"
            onClick={() => {
              let quantity = 1;
              dispatch(
                addItem({
                  id: resData?.card?.card?.info?.id,
                  item: resData.card,
                  quantity,
                }),
              );
            }}
          >
            Add
          </h2>
        </div>
      </div>
    </div>
  );
};

export const withPromotedLabel = (ResCard) => {
  return (props) => (
    <div className="relative">
      <ResCard {...props} />
      <label className="absolute left-4 top-4 rounded-full bg-[#1C1C1C] px-3 py-1 text-xs font-semibold text-white shadow-sm">
        Promoted
      </label>
    </div>
  );
};

export default ResCard;
