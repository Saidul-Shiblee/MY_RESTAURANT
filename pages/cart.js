// import pizzaImage from "../public/images/pizza.png";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { useDispatch, useSelector } from "react-redux";
import useHasMounted from "../hooks/useHasMounted";
import {
  addToCart,
  getItems,
  getTotal,
  removeFromCart,
} from "../services/redux/features/cartSlice";

const Cart = () => {
  const { data: session, status } = useSession();
  const orderTotal = useSelector(getTotal);
  const cartItems = useSelector(getItems);
  const hasMounted = useHasMounted();
  const dispatch = useDispatch();
  const increaseQuantity = (payload) => {
    dispatch(addToCart(payload));
  };
  const decreaseQuantity = (payload) => {
    dispatch(removeFromCart(payload));
  };

  if (!hasMounted) {
    return null;
  }

  if (cartItems?.length > 0 && session?.user?.id === cartItems?.[0]?.userId) {
    return (
      <div className="w-full py-20 px-10 flex mt-20">
        <div className="w-4/5">
          <table className="table-auto w-full">
            <thead className="">
              <tr className="flex justify-between w-full mb-4">
                <th className=" w-1/6">Product </th>
                <th className="w-1/6">Name</th>
                <th className="w-1/6">Extras</th>
                <th className="w-1/6">Size</th>
                <th className="w-1/6">Price</th>
                <th className="w-1/6">Qunatity</th>
                <th className="w-1/6">Total</th>
              </tr>
            </thead>
            <tbody className="flex flex-col gap-4 ">
              {cartItems?.map((item) => (
                <tr
                  key={item.productId}
                  className="flex justify-between items-center w-full  "
                >
                  <td className="w-1/6 flex justify-center">
                    <Image
                      src={item.productImage}
                      width="50"
                      height="50"
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  </td>
                  <td className="w-1/6 text-center">{item.productName}</td>
                  <td className="w-1/6 text-center">
                    {item.option.join(" , ")}
                  </td>
                  <td className="w-1/6 text-center">{item.size}</td>
                  <td className="w-1/6 text-center">Tk {item.productPrice}</td>
                  <td className="w-1/6 text-center flex justify-center items-center gap-2">
                    <div>{Number(item.quantity)}</div>
                    <div className="flex flex-col gap-[4px]">
                      <div
                        onClick={() => {
                          let obj = {
                            productId: item.productId,
                            option: item.option,
                            size: item.size,
                          };
                          increaseQuantity(obj);
                        }}
                        className="bg-[#d1411e] h-[16px] flex justify-center items-center  p-1 font-semibold  text-white cursor-pointer active:scale-95 shadow-lg "
                      >
                        <p className="-mt-[3px]">+</p>
                      </div>
                      <div
                        onClick={() => {
                          let obj = {
                            productId: item.productId,
                            option: item.option,
                            size: item.size,
                          };
                          decreaseQuantity(obj);
                        }}
                        className="bg-[#d1411e] h-[16px] flex justify-center items-center  p-1 font-semibold  text-white cursor-pointer active:scale-95 shadow-lg"
                      >
                        <p className="-mt-[3px]">-</p>
                      </div>
                    </div>
                  </td>
                  <td className="w-1/6 text-center">
                    Tk {item.productPrice * item.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-1/5 ">
          <div className="bg-gray-800/80 p-4 text-white flex flex-col justify-between gap-6">
            <h3 className="text-2xl font-semibold">Cart Total</h3>
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold">Subtotal:{orderTotal}</h3>
              <h3 className="font-semibold">Discount:{0}</h3>
              <h3 className="font-semibold">Total:{orderTotal - 0}</h3>
            </div>
            <Link
              href={"./checkout"}
              className=" w-full text-center px-2 py-1 bg-[#d1411e] rounded-full"
            >
              Checkout Now!
            </Link>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-full py-20 px-10 flex mt-20">
        <div className=" w-full">
          <p className=" text-2xl text-center">
            Cart is Empty!Please add Some items
          </p>
        </div>
      </div>
    );
  }
};

Cart.requiredAuthCustomer = true;

export default Cart;
