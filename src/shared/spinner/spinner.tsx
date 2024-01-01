import { Spin } from "antd";
import { FC } from "react";

import "./styles.css";

interface SpinnerProps {
  show: boolean;
}

export const Spinner: FC<SpinnerProps> = ({ show }) => {
  if (!show) return null;

  return (
    <div className="spinner">
      <Spin />
    </div>
  );
};
