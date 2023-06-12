import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const LayoutCustomer = ({ children }) => {
  return (
    <div className="">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default LayoutCustomer;
