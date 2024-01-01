import { Skeleton } from "antd";

import { itemsOnPage } from "../../constants";
import "./styles.css";

export const SkeletonList = () => {
  const renderSkeletonList = () => {
    const skeletons = [];
    for (let i = 0; i < itemsOnPage; i++) {
      skeletons.push(<Skeleton key={i} className="skeleton" />);
    }

    return skeletons;
  };

  return renderSkeletonList();
};
