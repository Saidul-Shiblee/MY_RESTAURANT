import React from "react";
import { resetCart } from "../services/redux/features/cartSlice";

import { useDispatch } from "react-redux";
import Link from "next/link";

const confirmation = () => {
  const dispatch = useDispatch();

  const [message, setMessage] = React.useState("");
  const [query, setQuery] = React.useState("");
  React.useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Your order has been received");
      setQuery(query.get("order_id"));
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
    localStorage.removeItem("foody_cart");
    dispatch(resetCart());
  }, []);
  if (message.length === 0) return null;
  return (
    <div className="w-screen h-[calc(100vh_-_80px)] p-20 flex justify-center items-center ">
      <div>
        {message}.Meantime you can track your order{" "}
        <Link href={`/order/${query}`} className=" text-blue-600 underline">
          here
        </Link>
      </div>
    </div>
  );
};

export default confirmation;
