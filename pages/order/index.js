import { getSession } from "next-auth/react";
import React from "react";
import OrderCard from "../../components/OrderCard";
import OrderLoader from "../../components/OrderLoader";

const Order = ({ productList }) => {
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    if (productList) {
      setLoading(false);
    }
  }, [productList]);
  if (!loading) {
    return (
      <div className="p-10 mt-20 flex gap-8 flex-wrap justify-center">
        {productList?.orders?.map((order) => (
          <OrderCard key={order._id} order={order} />
        ))}
      </div>
    );
  } else {
    return (
      <div className="p-10 mt-20 flex gap-8 flex-wrap justify-center">
        <OrderLoader />
      </div>
    );
  }
};

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });
  const res = await fetch(
    `https://storied-kringle-7d90e7.netlify.app/api/customer/private/orders/${session?.user?.id}`,
    {
      withCredentials: true,
      headers: {
        Cookie: req.headers.cookie,
      },
    }
  );

  const data = await res.json();
  return {
    props: {
      productList: data,
    },
  };
}
Order.requiredAuthCustomer = true;
export default Order;
