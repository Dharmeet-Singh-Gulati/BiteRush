import { useState, useEffect } from "react";
import { resList } from "../utils/mockMenuData";

const useRestrauntMenu = () => {
  const [restaurantList, setRestaurantList] = useState([]);
  const [filterList, setFilterList] = useState([]);
  const [vegFilter, setVegFilter] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  let fetchData = () => {
    let data =
      resList.data.cards[4].groupedCard.cardGroupMap.REGULAR.cards.filter(
        (resObj) =>
          resObj.card.card["@type"] ===
          "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory",
      );
    setRestaurantList(data);
    setFilterList(data);
  };

  let isVegFilter = () => {
    if (vegFilter === false) {
      let filteredList = filterList.filter((restro) => {
        return restro?.card?.info?.isVeg === 1;
      });

      setFilterList(filteredList);
    } else {
      setFilterList(restaurantList);
    }
    setVegFilter(!vegFilter);
  };

  return [restaurantList, filterList, isVegFilter, vegFilter];
};

export default useRestrauntMenu;
