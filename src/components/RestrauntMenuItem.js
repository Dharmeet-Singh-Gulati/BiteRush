import Card from "./Card";
const RestaurantMenuItem = ({ itemList }) => {
  return (
    <div className="transition-all duration-2000 ease-in-out">
      {console.log("Restraunt Menu item Called")}
      {itemList.map((item) => (
        <Card
          item={item}
          key={item.card.info.id}
          addBtn={true}
          removeBtn={false}
        />
      ))}
    </div>
  );
};

export default RestaurantMenuItem;
