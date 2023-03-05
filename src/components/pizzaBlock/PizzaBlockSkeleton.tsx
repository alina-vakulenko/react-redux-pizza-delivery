import React from "react";
import ContentLoader from "react-content-loader";

const PizzaBlockSkeleton: React.FC = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#ecebeb"
    foregroundColor="#ecebeb"
  >
    <circle cx="140" cy="125" r="125" />
    <rect x="0" y="265" rx="8" ry="8" width="280" height="27" />
    <rect x="0" y="428" rx="8" ry="8" width="91" height="27" />
    <rect x="128" y="418" rx="23" ry="23" width="152" height="45" />
    <rect x="0" y="308" rx="8" ry="8" width="280" height="88" />
  </ContentLoader>
);

export default PizzaBlockSkeleton;
