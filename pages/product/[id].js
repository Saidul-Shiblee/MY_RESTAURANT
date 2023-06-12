import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import ProductLoader from "../../components/ProductLoader";
import isEmpty from "../../lib/isEmpty";
import {
  addToCart,
  getItems,
  resetCart,
} from "../../services/redux/features/cartSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Product = () => {
  const router = useRouter();
  const { query: id } = router;
  const { data: session } = useSession();
  const [item, setItem] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const cartItems = useSelector(getItems);

  React.useEffect(() => {
    const getPost = async () => {
      setLoading(true);
      const res = await fetch(
        `https://storied-kringle-7d90e7.netlify.app/api/customer/private/products/${router.query.id}`
      );
      const data = await res.json();
      setLoading(false);
      setItem(data);
    };
    getPost();
  }, [router.query.id]);

  const dispatch = useDispatch();
  const initialPrice = item?.sizeWisePrice?.[0].price;
  const initialSize = item?.sizeWisePrice?.[0].size;

  let currentPrice, currentSize;
  const [optionWisePrice, setptionWisePrice] = React.useState([]);
  const [sizeWisePrice, setSizeWisePrice] = React.useState({});
  if (isEmpty(sizeWisePrice)) {
    currentPrice = initialPrice;
    currentSize = initialSize;
  } else {
    currentPrice = sizeWisePrice?.price;
    currentSize = sizeWisePrice?.size;
  }
  const [quantity, setQuantity] = React.useState(1);
  const optionPrice = optionWisePrice.reduce((acc, cv) => {
    return cv.price + acc;
  }, 0);

  //notify
  const notify = (msg, status) => toast[status](msg);

  const handleAddToCart = () => {
    if (session?.user?.id !== cartItems?.[0]?.userId) {
      localStorage.removeItem("foody_cart");
      dispatch(resetCart());
    }

    let orderItem = {
      productName: item?.name,
      productImage: item?.image?.url,
      productId: item?._id,
      size: currentSize,
      quantity: quantity,
      option: optionWisePrice.map((opt) => opt.option),
      productPrice: currentPrice + optionPrice,
      userId: session?.user?.id,
    };
    dispatch(addToCart(orderItem));
    notify("Item added in the cart", "success");
  };

  const handleOption = (incomingOption) => {
    if (optionWisePrice?.find((el) => el._id === incomingOption._id)) {
      setptionWisePrice(
        optionWisePrice.filter((el) => el._id !== incomingOption._id)
      );
    } else {
      setptionWisePrice((pv) => [...pv, incomingOption]);
    }
  };

  return loading ? (
    <ProductLoader />
  ) : (
    <div className="px-20 pb-20 pt-10 mt-[80px] w-full flex justify-between  items-center bg-[#f3f2f2]">
      <div className="relative w-2/6 h-[70%] py-8 flex justify-center items-center">
        <Image
          alt=""
          src={item?.image?.url}
          height="200"
          width="200"
          className="w-[300px] h-[300px] object-cover shadow-2xl rounded-lg"
        />
      </div>
      <div className="w-4/6 flex flex-col gap-6 items-start pl-16 ml-10">
        <h2 className="text-xl font-bold text-[#d1411e]">{item?.name}</h2>
        <p className=" text-sm text-gray-600">{item?.desc}</p>
        <div className="text-xl font-bold text-[#d1411e] flex flex-col">
          <h2 className="text-xl font-bold text-gray-600">Price:</h2>
          <h3>
            {" "}
            {isNaN(currentPrice + optionPrice)
              ? currentPrice
              : currentPrice + optionPrice}
          </h3>
        </div>
        <h2 className="text-xl font-bold text-gray-600">Choose the Size:</h2>

        <div className="flex  justify-start gap-4">
          {item?.sizeWisePrice?.map((el) => (
            <span
              key={el._id}
              onClick={() => setSizeWisePrice(el)}
              className={`flex justify-center active:scale-95 items-center px-2 py-1 rounded-full text-sm font-semibold cursor-pointer shadow-lg 
              ${
                currentSize === el.size
                  ? "bg-[#d1411e]  text-slate-100"
                  : "bg-slate-200  text-[#d1411e]"
              }`}
            >
              {el.size}
            </span>
          ))}
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-bold text-gray-600">
            Choose additional ingridients:
          </h3>

          <div className="flex gap-3 ">
            {item?.optionWisePrice?.map((el) => (
              <span
                key={el._id}
                onClick={() => {
                  handleOption(el);
                }}
                className={`cursor-pointer active:scale-95 text-xs  px-2 rounded-full py-1 border-rounded shadow-lg 
                            ${
                              optionWisePrice?.find((opt) => opt._id === el._id)
                                ? "bg-[#d1411e]  text-slate-100"
                                : "bg-slate-200  text-[#d1411e]"
                            }
                `}
              >
                {el.option}
              </span>
            ))}{" "}
          </div>
        </div>
        <div className="flex gap-2">
          <input
            type="number"
            min={1}
            className="w-[50px] text-center bg-slate-100 text text-gray-600 inner_Shadow"
            placeholder="Qty"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <div
            onClick={handleAddToCart}
            className=" active:scale-95  bg-[#d1411e]  text-slate-100 px-4 py-1  cursor-pointer"
          >
            Add
          </div>
        </div>
      </div>
    </div>
  );
};

Product.requiredAuthCustomer = true;
export default Product;
