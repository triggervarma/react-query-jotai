import { TourProps } from "antd";
import { MutableRefObject } from "react";

export const getTourSteps = (
  ref1: MutableRefObject<null>,
  ref2: MutableRefObject<null>,
  ref3: MutableRefObject<null>
) => {
  const steps: TourProps["steps"] = [
    {
      title: "Local Storage",
      description:
        "Click to use data from local storage even if it's not actual.",
      target: () => ref1.current,
    },
    {
      title: "Dababase",
      description:
        "Click to update form with actual data (local storage wont be removed - you can play with it).",
      target: () => ref2.current,
    },
    {
      title: "Tour",
      description: "Uncheck it to show the tour on save again.",
      target: () => ref3.current,
    },
  ];

  return steps;
};
