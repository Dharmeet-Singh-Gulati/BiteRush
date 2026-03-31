const Shimmer = () => {
  return (
    <div className="shimmer-container">
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
  );
};

const ShimmerCard = () => {
  return (
    <div className="shimmer-card-container">
      <div className="right">
        <div className="shimmer-value"></div>
        <div className="shimmer-value"></div>
      </div>
      <div className="left">
        <div className="shimmer-value"></div>
      </div>
    </div>
  );
};

export default Shimmer;
