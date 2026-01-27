import { useState } from "react";
import RestaurantMenuItem from "./RestrauntMenuItem";

const RestaurantMenuItemCard = ({
  resObj,
  setShowItemCard,
  index,
  indexCheck,
}) => {
  return (
    <div>
      <div className="w-6/12 mx-auto h-3 mt-4 bg-gray-200"></div>
      <div className="w-6/12 mx-auto my-3 flex-col">
        <div
          className="flex justify-between px-2 py-1 items-center bg-white cursor-pointer "
          onClick={() => {
            index == indexCheck
              ? setShowItemCard(null)
              : setShowItemCard(index);
          }}
        >
          <span className="font-bold text-black text-lg cursor-pointer">
            {resObj.card.card.title} ({resObj.card.card.itemCards.length})
          </span>
          <span className="cursor-pointer">⬇</span>
        </div>
        {index == indexCheck && (
          <RestaurantMenuItem
            key={resObj.card.card.title}
            itemList={resObj.card.card.itemCards}
          />
        )}
      </div>
    </div>
  );
};

export default RestaurantMenuItemCard;
