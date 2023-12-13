import { ReactNode } from "react";
import { Navbar } from "../components/Navbar";

export const BasicLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Navbar />
      <div className="m-5">{children}</div>
    </div>
  );
};
