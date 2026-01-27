import { SWIGGY_API } from "./constants";
import { useState, useEffect } from "react";

const useBodyLogic = () => {
  const [listOfRestraunts, setListOfRestraunts] = useState([]);
  const [filterList, setFilterList] = useState([]);
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let res = await fetch(SWIGGY_API);
    let json = await res.json();

    setListOfRestraunts(
      (json?.data?.cards[1]?.groupedCard?.cardGroupMap?.DISH?.cards).slice(1)
    );
    setFilterList(
      (json?.data?.cards[1]?.groupedCard?.cardGroupMap?.DISH?.cards).slice(1)
    );
  };

  const topRatedRestraunts = () => {
    console.log("Clicked");
    const filteredList = listOfRestraunts.filter((resObj) => {
      return resObj?.card?.card?.restaurant?.info?.avgRating >= 4.4;
    });

    setFilterList(filteredList);
  };

  const reset = () => {
    setFilterList(listOfRestraunts);
    setSearchText("");
  };

  const search = (e) => {
    e.preventDefault();
    const filteredList = listOfRestraunts.filter((resObj) => {
      return resObj.card.card.info.name
        .toLowerCase()
        .includes(searchText.toLowerCase());
    });
    console.log(filteredList);

    setFilterList(filteredList);
  };

  const searchTextUpdate = (value) => {
    setSearchText(value);
  };

  return [
    listOfRestraunts,
    filterList,
    topRatedRestraunts,
    reset,
    searchText,
    search,
    searchTextUpdate,
  ];
};

export default useBodyLogic;
