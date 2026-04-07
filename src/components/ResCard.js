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
    <div className="res-card-container border-2 border-black h-75 w-120 p-2.5 bg-white rounded-2xl ">
      <div className="upper-section flex mt-0.5 mx-1 items-center justify-between">
        <div className="upper-left flex-col relative py-0.5 rounded-[10px]">
          <h4 className="res-name text-[#3f3f3f]">By {restroName}</h4>
          <div className="rating-eta items-center mt-1">
            <span className="absolute bottom-1">{STAR_SVG}</span>
            <h4 className="rating mr-5 pl-5 inline-block text-[#5b5a5a]">
              {avgRating}
            </h4>
            <h4 className="eta inline-block text-[#5b5a5a]">
              {minDeliveryTime} - {maxDeliveryTime} MINS
            </h4>
          </div>
        </div>
        <div className="upper-right">{CHECK_OUT_SVG}</div>
      </div>
      <div className="separator mb-4">
        <pre> ..................................................</pre>
      </div>
      <div className="lower-section flex pl-1">
        <div className="lower-left flex-col gap-1 w-50 shrink-0">
          <img src={VEGSYMBOL} className="w-5"></img>
          <Link
            className="decoration-0 cursor-pointer"
            to={"restraunts/" + restrauntId}
          >
            <h3 className="meal-name text-[#2c2c2c]">{mealName}</h3>{" "}
          </Link>
          <h4 className="price">â‚¹ {mealPrice / 100}</h4>
          <h4 className="more-details-btn w-27.5 border-solid border pl-4 rounded-lg text-[#5b5a5a]">
            More Details
          </h4>
        </div>
        <div className="lower-right">
          <div className="meal-wrapper relative">
            <div className="meal-logo flex justify-center overflow-hidden h-42.5 w-43.75 rounded-lg">
              <img
                className="res-logo h-43.75 "
                alt="res-logo"
                src={CDN_URL + imageId}
              ></img>

              <h2
                className="add-btn absolute text-green-600 -bottom-1.75 bg-white py-0.5 px-8 
              border border-[#ddd] transition-all duration-200 hover:bg-[#f0eeee] hover:text-[#099F09] cursor-pointer"
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
          <h5 className="customisable-banner mb-1  pb-0 pl-12 text-[#5b5a5a]">
            Customisable
          </h5>
        </div>
      </div>
    </div>
  );
};

export const withPromotedLabel = (ResCard) => {
  return (props) => (
    <div className="relative">
      <ResCard {...props} />
      <label className="absolute bg-black text-white rounded-lg p-2 left-52 top-25">
        Promoted
      </label>
    </div>
  );
};

export default ResCard;
