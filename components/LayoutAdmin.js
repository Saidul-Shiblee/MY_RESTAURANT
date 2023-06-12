import React from "react";
import useHasMounted from "../hooks/useHasMounted";
import SideBar from "./admin/SideBar";

const LayoutAdmin = ({ children }) => {
  const hasMounted = useHasMounted();
  if (!hasMounted) {
    return null;
  }
  return (
    <div className="">
      <div className="main-div"></div>
      <SideBar />
      {children}
    </div>
  );
};

export default LayoutAdmin;
