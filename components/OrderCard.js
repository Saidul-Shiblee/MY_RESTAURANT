import Image from "next/image";
import React from "react";
import useHasMounted from "../hooks/useHasMounted";
import { ORDER_STATUS } from "../lib/constant";
import moment from "moment";
import { useRouter } from "next/router";

const OrderCard = ({ order }) => {
  const hasMounted = useHasMounted();
  const router = useRouter();
  if (!hasMounted) {
    return null;
  }

  const handleClick = (id) => {
    router.push(
      {
        pathname: `/order/${id}`,
      },
      `/order/${id}`
    );
  };

  return (
    <div
      className=" gap-2 rounded-lg flex flex-col  w-[16%]  bg-white rounded-t-lg shadow-lg pb-4 cursor-pointer"
      onClick={() => handleClick(order._id)}
    >
      <div className=" relative w-full h-[180px] ">
        {" "}
        <Image
          className="w-full rounded-t-lg h-[180px]"
          src={order?.orderDetails?.[0]?.productImage}
          alt={order?.orderDetails?.[0]?.productName}
          width={100}
          height={100}
          objectfit="cover"
        />
      </div>
      <div className="w-full h-3/5 flex flex-col justify-between gap-2">
        <div>
          <h3 className="px-2 text-gray-600">
            {`${order?.orderDetails?.[0]?.productName} ${
              order?.orderDetails.length > 1 ? "& more..." : ""
            }`}
          </h3>
        </div>
        <div className="flex justify-between px-2 text-sm">
          <p className=" text-gray-600">
            {moment(order?.createdAt).format("L")}
          </p>
          <p className=" text-gray-600">{ORDER_STATUS[order?.status]}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
