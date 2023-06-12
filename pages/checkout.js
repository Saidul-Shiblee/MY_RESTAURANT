import CheckoutForm from "../components/Checkout/CheckoutForm";

import React from "react";
import useHasMounted from "../hooks/useHasMounted";
import { useSelector } from "react-redux";
import { getItems } from "../services/redux/features/cartSlice";

const Checkout = () => {
  const cartItems = useSelector(getItems);
  const hasMounted = useHasMounted();
  if (!hasMounted) {
    return null;
  }
  if (cartItems.length === 0) {
    return (
      <div className="w-full py-20 px-10 flex mt-20">
        <div className=" w-full">
          <p className=" text-2xl text-center">
            You need to add some item before checkout
          </p>
        </div>
      </div>
    );
  } else {
    return <CheckoutForm />;
  }
};

Checkout.requiredAuthCustomer = true;

export default Checkout;
