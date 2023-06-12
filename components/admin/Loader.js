import React from "react";
import { Circles } from "react-loader-spinner";
const Loader = () => {
  return (
    <div className="absolute h-full  top-1/2 left-1/2">
      <Circles
        height="50"
        width="50"
        color="#d1411e"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Loader;
