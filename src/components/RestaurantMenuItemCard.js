import RestaurantMenuItem from "./RestrauntMenuItem";

const RestaurantMenuItemCard = ({
  resObj,
  setShowItemCard,
  index,
  indexCheck,
}) => {
  return (
    <div>
      <div className="mx-auto flex w-full flex-col">
        <div
          className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-[#E8E8E8] bg-white px-4 py-4 shadow-sm transition-all duration-200 hover:shadow-md dark:border-[#3A3A3A] dark:bg-[#2A2A2A] sm:px-5"
          onClick={() => {
            index == indexCheck
              ? setShowItemCard(null)
              : setShowItemCard(index);
          }}
        >
          <span className="cursor-pointer text-base font-semibold text-[#1C1C1C] dark:text-white sm:text-lg">
            {resObj.card.card.title} ({resObj.card.card.itemCards.length})
          </span>
          <span className="cursor-pointer text-xl text-[#696969] dark:text-gray-400">
            {index == indexCheck ? "-" : "+"}
          </span>
        </div>
        {index == indexCheck && (
          <div className="mt-3">
            <RestaurantMenuItem
              key={resObj.card.card.title}
              itemList={resObj.card.card.itemCards}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantMenuItemCard;
