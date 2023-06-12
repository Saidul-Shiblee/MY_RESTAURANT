import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductLoader = () => {
  return (
    <div className="px-20 pb-20 pt-10 mt-[80px] w-full flex justify-between  items-center bg-[#f3f2f2]">
      <div className="relative w-2/6 h-[70%] py-8 flex justify-center items-center">
        <Skeleton width={300} height={300} />
      </div>
      <div className="w-4/6 flex flex-col gap-6 items-start pl-16 ml-10">
        <div>
          <Skeleton width={50} height={10} />
          <Skeleton width={400} height={10} />
          <Skeleton width={400} height={10} />
        </div>

        <div className="text-xl font-bold text-[#d1411e] flex flex-col">
          <Skeleton width={230} height={10} />
        </div>

        <div className="flex  justify-start gap-4">
          <Skeleton width={230} height={10} />
        </div>
        <div className="flex flex-col gap-4">
          <Skeleton width={230} height={10} />
        </div>
        <div className="flex gap-2">
          <Skeleton width={70} height={10} />
          <Skeleton width={70} height={10} />
        </div>
      </div>
    </div>
  );
};
export default ProductLoader;
