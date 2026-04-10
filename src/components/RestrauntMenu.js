import useRestrauntMenu from "../utils/useRestrauntMenu";
import { useNavigate, useParams } from "react-router-dom";
import RestaurantMenuItemCard from "./RestaurantMenuItemCard";
import { useState } from "react";
import { useSelector } from "react-redux";

const RestrauntMenu = () => {
  const { resId } = useParams();
  const [showItemCard, setShowItemCard] = useState(null);
  const [restaurantList] = useRestrauntMenu();
  const homePageData = useSelector((state) => state.homePage.homePageData);
  const navigate = useNavigate();

  if (homePageData.length === 0) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
        <h1 className="mb-3 text-xl font-bold text-[#1C1C1C] dark:text-white sm:text-2xl lg:text-3xl">
          Something went wrong
        </h1>

        <p className="mb-6 max-w-md text-sm text-[#696969] dark:text-gray-400 sm:text-base">
          We couldn’t load the restaurant menu. Please try again later or go
          back to explore more options.
        </p>

        <button
          onClick={() => navigate("/")}
          className="rounded-lg bg-[#EF4F5F] px-6 py-3 font-semibold text-white transition hover:bg-[#D83A4A]"
        >
          Go to Home
        </button>
      </div>
    );
  }
  let restaurantName = homePageData.filter((restraunt) => {
    return restraunt.card.card.restaurant.info.id === resId;
  });
  restaurantName = restaurantName[0].card.card.restaurant.info.name;

  if (!restaurantList.length) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-[#E8E8E8] bg-white p-8 text-center shadow-sm dark:border-[#3A3A3A] dark:bg-[#2A2A2A]">
          <h1 className="text-xl font-semibold text-[#1C1C1C] dark:text-white">
            Loading menu
          </h1>
        </div>
      </div>
    );
  }
  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="rounded-[28px] bg-linear-to-r from-[#FFF1F2] via-white to-[#FFF8F0] px-5 py-6 shadow-sm dark:from-[#2A1E20] dark:via-[#1C1C1C] dark:to-[#241F1B] sm:px-6 sm:py-8">
        <p className="text-sm font-medium text-[#EF4F5F]">Menu</p>
        <div className="mt-2 text-xl font-bold text-[#1C1C1C] dark:text-white sm:text-2xl lg:text-3xl">
          {restaurantName}
        </div>
        <p className="mt-2 text-sm text-[#696969] dark:text-gray-400 sm:text-base">
          Browse categories and add your favorites to cart.
        </p>
      </div>
      <div className="mt-6 space-y-4">
        {restaurantList.map((resObj, index) => (
          <RestaurantMenuItemCard
            key={resObj.card.card.title}
            resObj={resObj}
            index={index}
            indexCheck={showItemCard}
            setShowItemCard={(index) => {
              setShowItemCard(index);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default RestrauntMenu;
