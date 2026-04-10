const Shimmer = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-6 rounded-[28px] bg-white p-6 shadow-sm dark:bg-[#2A2A2A]">
        <div className="h-4 w-28 animate-pulse rounded-full bg-gray-200 dark:bg-[#3A3A3A]"></div>
        <div className="mt-4 h-8 w-72 animate-pulse rounded-full bg-gray-200 dark:bg-[#3A3A3A]"></div>
        <div className="mt-6 flex flex-col gap-3 md:flex-row">
          <div className="h-12 flex-1 animate-pulse rounded-xl bg-gray-200 dark:bg-[#3A3A3A]"></div>
          <div className="h-12 w-32 animate-pulse rounded-xl bg-gray-200 dark:bg-[#3A3A3A]"></div>
        </div>
      </div>
      <div className="shimmer-container grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        <ShimmerCard />
        <ShimmerCard />
        <ShimmerCard />
        <ShimmerCard />
        <ShimmerCard />
        <ShimmerCard />
        <ShimmerCard />
        <ShimmerCard />
        <ShimmerCard />
      </div>
    </div>
  );
};

const ShimmerCard = () => {
  return (
    <div className="shimmer-card-container overflow-hidden rounded-xl border border-[#E8E8E8] bg-white p-4 shadow-sm dark:border-[#3A3A3A] dark:bg-[#2A2A2A]">
      <div className="h-52 animate-pulse rounded-xl bg-gray-200 dark:bg-[#3A3A3A]"></div>
      <div className="mt-4">
        <div className="h-6 w-3/4 animate-pulse rounded-full bg-gray-200 dark:bg-[#3A3A3A]"></div>
        <div className="mt-3 h-4 w-1/2 animate-pulse rounded-full bg-gray-200 dark:bg-[#3A3A3A]"></div>
        <div className="mt-4 h-px w-full bg-gray-100 dark:bg-[#3A3A3A]"></div>
        <div className="mt-4 space-y-3">
          <div className="h-4 w-2/3 animate-pulse rounded-full bg-gray-200 dark:bg-[#3A3A3A]"></div>
          <div className="h-4 w-1/3 animate-pulse rounded-full bg-gray-200 dark:bg-[#3A3A3A]"></div>
          <div className="h-10 w-24 animate-pulse rounded-full bg-gray-200 dark:bg-[#3A3A3A]"></div>
        </div>
      </div>
    </div>
  );
};

export default Shimmer;
