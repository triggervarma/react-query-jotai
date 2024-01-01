import { FC, PropsWithChildren } from "react";

import "./styles.css";

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return <div className="layout">{children}</div>;
};
