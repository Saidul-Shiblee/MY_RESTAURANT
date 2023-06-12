import Image from "next/image";
import paidImage from "../../public/images/paid.png";
import checkedImage from "../../public/images/checked.png";
import prepareingImage from "../../public/images/bake.png";
import onTheWayImage from "../../public/images/bike.png";
import deliveredImage from "../../public/images/delivered.png";
import { getSession } from "next-auth/react";
import { ORDER_STATUS } from "../../lib/constant";
import { useEffect, useState } from "react";

const fetchData = async (req, userID, id) => {
  const result = await fetch(
    `https://storied-kringle-7d90e7.netlify.app/api/customer/private/orders/order`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Cookie: req,
      },
      withCredentials: true,
      body: JSON.stringify({ userId: userID, productId: id }),
    }
  );
  return await result.json();
};

const Order = ({ data }) => {
  const [order, setOrder] = useState(data);

  useEffect(() => {
    let interval;
    if (order.status >= 3) {
      clearInterval(interval);
      return;
    }
    async function getOrderDetails() {
      // Fetch the updated data from the server
      try {
        const newData = await fetchData(
          order?.cookie,
          order?.customerId,
          order?._id
        );
        // Update the state with the new data
        setOrder(newData.order);
      } catch (error) {}
    }
    // Fetch the data every 5 seconds
    interval = setInterval(getOrderDetails, 5000);

    return () => clearInterval(interval);
  }, [order.status]);

  return (
    <div className="w-full h-screen p-20 flex items-center ">
      <div className="w-[70%] flex justify-between gap-8">
        <div className="w-1/5 flex flex-col justify-center items-center gap-2">
          <Image
            alt=""
            src={paidImage}
            className={`object-contain w-16 h-16 opacity `}
          />
          <Image
            alt=""
            src={checkedImage}
            className="object-contain w-5 h-5 "
          />
        </div>
        <div className="w-1/5 flex flex-col justify-center items-center gap-2">
          <Image
            alt=""
            src={prepareingImage}
            className={`object-contain w-16 h-16  ${
              order?.status === 1
                ? "opcity animate-pulse"
                : order?.status > 1
                ? ""
                : "opacity-50"
            }`}
          />
          <Image
            alt=""
            src={checkedImage}
            className={`object-contain w-5 h-5 ${
              order?.status > 1 ? "" : "invisible"
            } `}
          />
        </div>
        <div className="w-1/5 flex flex-col justify-center items-center gap-2">
          <Image
            alt=""
            src={onTheWayImage}
            className={`object-contain w-16 h-16  ${
              order?.status === 2
                ? "opcity animate-pulse"
                : order?.status > 2
                ? ""
                : "opacity-50"
            }`}
          />
          <Image
            alt=""
            src={checkedImage}
            className={`object-contain w-5 h-5 ${
              order?.status > 2 ? "" : "invisible"
            } `}
          />
        </div>
        <div className="w-1/5 flex flex-col justify-center items-center gap-2">
          <Image
            alt=""
            src={deliveredImage}
            className={`object-contain w-16 h-16  ${
              order?.status < 2 ? "opacity-50" : ""
            }`}
          />
          <Image
            alt=""
            src={checkedImage}
            className={`object-contain w-5 h-5 ${
              order?.status > 2 ? "" : "invisible"
            } `}
          />
        </div>
      </div>

      <div className="w-[30%] shadow-xl">
        <div className="bg-gray-800/80 p-4 text-white flex flex-col justify-between gap-6">
          <h3 className="text-2xl font-semibold">Order Details</h3>
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">
              Order Id: <span className=" font-normal">{order?._id}</span>
            </h3>
            <h3 className="font-semibold ">
              Customer Name:{" "}
              <span className=" font-normal">{order?.customerName}</span>
            </h3>
            <h3 className="font-semibold">
              Address:{" "}
              <span className=" font-normal">{order?.deliveryAddress}</span>
            </h3>
            <h3 className="font-semibold ">
              Order Status:{" "}
              <span className="animate-pulse text-emerald-500">
                {ORDER_STATUS[order?.status]}
              </span>
            </h3>
          </div>
          <a className=" w-full text-center px-2 py-1 bg-gree rounded-full bg-emerald-500	">
            Paid
          </a>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.query;
  const { req } = context;
  const session = await getSession({ req });
  const data = await fetchData(req.headers.cookie, session?.user?.id, id);
  data.order.cookie = req.headers.cookie;
  return {
    props: { data: data.order },
  };
}
Order.requiredAuthCustomer = true;
export default Order;
