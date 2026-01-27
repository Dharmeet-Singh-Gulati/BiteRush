import useRestrauntMenu from "../utils/useRestrauntMenu";
import { useParams } from "react-router-dom";
import RestaurantMenuItemCard from "./RestaurantMenuItemCard";
import { useState } from "react";

const RestrauntMenu = () => {
  const { resId } = useParams();
  const [showItemCard, setShowItemCard] = useState(null);

  console.log(resId);

  const [restaurantList] = useRestrauntMenu();

  if (!restaurantList.length) {
    return <h1>Loading</h1>;
  }
  return (
    <>
      <div className="text-center text-2xl font-bold py-10 ">
        Name of the Restaurant: {resId}
      </div>
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
    </>
  );
};

export default RestrauntMenu;