import ResCard, { withPromotedLabel } from "./ResCard";
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
    dish,
    isDish,
  ] = useBodyLogic();

  const isOnline = useOnline();

  if (!isOnline) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-3xl items-center justify-center px-4">
        <div className="w-full rounded-xl border border-[#E8E8E8] bg-white p-6 text-center shadow-sm dark:border-[#3A3A3A] dark:bg-[#2A2A2A] sm:p-8">
          <h1 className="text-xl font-semibold text-[#1C1C1C] dark:text-white sm:text-2xl lg:text-3xl">
            You are offline
          </h1>
          <p className="mt-3 text-sm text-[#696969] dark:text-gray-400 sm:text-base">
            Reconnect to browse restaurants and continue ordering.
          </p>
        </div>
      </div>
    );
  }

  if (listOfRestraunts.length === 0) {
    return <Shimmer />;
  }

  let ResCardPromoted = withPromotedLabel(ResCard);
  ResCardPromoted;

  return (
    <div className="body-container mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <div className="rounded-[28px] bg-linear-to-r from-[#FFF1F2] via-white to-[#FFF8F0] p-5 shadow-sm dark:from-[#2A1E20] dark:via-[#1C1C1C] dark:to-[#241F1B] sm:p-6">
        <p className="text-sm font-medium text-[#EF4F5F]">
          Discover your next meal
        </p>
        <div className="mt-2 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-xl font-bold text-[#1C1C1C] dark:text-white sm:text-2xl lg:text-3xl">
              Order from restaurants around you
            </h1>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 sm:text-base">
              Search by restaurant or dish and explore the best-rated picks.
            </p>
          </div>
          <div className="search w-full text-sm text-[#696969] dark:text-gray-400 sm:text-base lg:w-auto">
            Search By Name For Restraunts And By Dish For Dishes
          </div>
        </div>
      </div>
      <div className="rounded-2xl border border-[#E8E8E8] bg-white p-4 shadow-sm sm:p-5 dark:border-[#3A3A3A] dark:bg-[#2A2A2A]">
        <div className="filter flex flex-col gap-4">
          <form
            className="flex flex-col gap-3 lg:flex-row lg:items-center"
            onSubmit={(e) => {
              isDish(false);
              search(e);
            }}
          >
            <input
              className="input-text min-w-0 flex-1 rounded-lg border border-[#E8E8E8] bg-[#F8F8F8] px-4 py-3 text-sm text-[#1C1C1C] outline-none transition-all duration-200 focus:border-[#EF4F5F] focus:ring-2 focus:ring-[#EF4F5F]/20 dark:border-[#3A3A3A] dark:bg-[#2A2A2A] dark:text-white dark:placeholder:text-gray-500"
              type="text"
              placeholder="Search anything crispy..."
              value={searchText}
              onChange={(e) => searchTextUpdate(e.target.value)}
            />

            <button
              className="search-btn h-10 w-full rounded-lg bg-[#EF4F5F] px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:shadow-md hover:brightness-95 lg:w-auto"
              type="submit"
            >
              Search
            </button>
            <button
              className="search-btn h-10 w-full rounded-lg bg-[#EF4F5F] px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:shadow-md hover:brightness-95 lg:w-auto"
              type="submit"
              onClick={() => {
                console.log("Dish");
                console.log(dish);
                isDish(true);
              }}
            >
              Dish
            </button>
          </form>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <button
              className="filter-btn h-10 w-full rounded-full border border-[#E8E8E8] px-4 py-2 text-sm font-medium text-[#EF4F5F] transition-all duration-200 hover:shadow-md active:bg-[#EF4F5F] active:text-white dark:border-[#3A3A3A] dark:bg-[#2A2A2A] sm:w-auto"
              onClick={() => {
                topRatedRestraunts();
              }}
            >
              Top Rated
            </button>
            <button
              className="reset-btn h-10 w-full rounded-full border border-[#E8E8E8] bg-white px-4 py-2 text-sm font-medium text-[#1C1C1C] transition-all duration-200 hover:shadow-md active:bg-[#EF4F5F] active:text-white dark:border-[#3A3A3A] dark:bg-[#2A2A2A] dark:text-white sm:w-auto"
              onClick={() => {
                reset();
              }}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
      <div className="card-container grid grid-cols-1 gap-4 pb-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
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
