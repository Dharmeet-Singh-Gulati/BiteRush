import ResCard, { withPromotedLabel } from "./RestrauntCard";
import Shimmer from "./Shimmer";
import useBodyLogic from "../utils/useBodyLogic";
import useOnline from "../utils/useOnline";

const Body = () => {
  const [
    listOfRestraunts,
    filterList,
    topRatedRestraunts,
    reset,
    searchText,
    search,
    searchTextUpdate,
  ] = useBodyLogic();

  const isOnline = useOnline();

  if (!isOnline) {
    return (
      <>
        {console.log("Me called")}
        <h1>You are Offline</h1>
      </>
    );
  }

  if (listOfRestraunts.length === 0) {
    return <Shimmer />;
  }

  let ResCardPromoted = withPromotedLabel(ResCard);
  console.log(ResCardPromoted);

  return (
    <div className="body-container my-5 mx-30 flex flex-col">
      <div className="search">Only Search by name available</div>
      <div className="filter">
        <form
          onSubmit={(e) => {
            search(e);
          }}
        >
          <input
            className="input-text m-3 border-2 border-b-slate-800 px-3 py-1 rounded-lg"
            type="text"
            placeholder="Search anything Crispy ... "
            value={searchText}
            onChange={(e) => searchTextUpdate(e.target.value)}
          />

          <button
            className="search-btn m-3 border-2 border-b-slate-800 px-3 py-1  bg-orange-100 transition-all duration-250 rounded-lg hover:bg-orange-400"
            type="submit"
          >
            Search
          </button>
        </form>

        <button
          className="filter-btn m-3 border-2 border-stone-800 px-2 py-1 rounded-lg"
          onClick={() => {
            topRatedRestraunts();
          }}
        >
          Top reated restraunts
        </button>
        <button
          className="reset-btn m-3 border-2 border-stone-800 px-2 py-1 rounded-lg"
          onClick={() => {
            reset();
          }}
        >
          Reset
        </button>
      </div>
      <div className="card-container my-10 flex  ml-32.5 flex-wrap pb-12 gap-5">
        {filterList.map((resObj) => {
          return resObj?.card?.card?.restaurant?.info?.promoted ? (
            <ResCardPromoted
              key={resObj?.card?.card?.info?.id}
              resData={resObj}
            />
          ) : (
            <ResCard key={resObj?.card?.card?.info?.id} resData={resObj} />
          );
        })}
      </div>
    </div>
  );
};

export default Body;
