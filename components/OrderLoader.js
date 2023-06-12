import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SingleSkeleton = () => {
  return (
    <div className=" gap-2 rounded-lg flex flex-col  w-[16%]  bg-white rounded-t-lg shadow-lg pb-4 cursor-pointer">
      <div className="  w-full h-[180px] ">
        <Skeleton width={"100%"} height={180} />
      </div>
      <div className="w-full h-3/5 flex flex-col justify-between gap-2">
        <div>
          <Skeleton width={150} height={20} />
        </div>
        <div className="flex justify-between px-2 text-sm">
          <Skeleton width={70} height={10} />
          <Skeleton width={70} height={10} />
        </div>
      </div>
    </div>
  );
};
export default function OrderLoader() {
  return (
    <>
      <SingleSkeleton />
      <SingleSkeleton />
      <SingleSkeleton />
      <SingleSkeleton />
      <SingleSkeleton />
    </>
  );
}
