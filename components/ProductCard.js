import Image from "next/image";
import React from "react";
import { useRouter } from "next/router";

const ProductCard = ({ product }) => {
  let size = [];
  for (let i = 0; i < product.sizeWisePrice.length; i++) {
    size.push(`${JSON.stringify(product.sizeWisePrice[i])}`);
  }
  let option = [];
  for (let i = 0; i < product.optionWisePrice.length; i++) {
    option.push(`${JSON.stringify(product.optionWisePrice[i])}`);
  }
  //  ;
  const router = useRouter();
  const handleClick = (id) => {
    router.push(
      {
        pathname: `/product/${id}`,
        query: {
          id: id,
        },
      },
      `/product/${id}`
    );
  };

  return (
    <div
      className=" gap-4 rounded-lg flex flex-col    w-[23%]  bg-white rounded-t-lg  pb-4 cursor-pointer hover:scale-[1.005] shadow-md hover:shadow-xl transitiona-all ease-in-out duration-100"
      onClick={() => handleClick(product._id)}
    >
      <div className=" relative w-full h-[250px] ">
        {" "}
        <Image
          className="w-full rounded-t-lg h-[250px]"
          src={product?.image?.url}
          alt={product.name}
          width={100}
          height={100}
          objectfit="cover"
        />
      </div>
      <div className="w-full h-3/5 flex flex-col justify-between gap-2">
        <div>
          <h3 className=" text-2xl font-bold px-2 text-[#d1411e]">
            {product.name}
          </h3>
        </div>
        <div>
          <h3 className=" text-xl font-bold px-2 text-[#d1411e]">
            BDT-{product.sizeWisePrice?.[0].price}
          </h3>
        </div>
        <div className="flex gap-1 flex-wrap px-2">
          {product.ingredients.map((ingredient, ind) => {
            return (
              <div
                key={ind}
                className="text-xs  px-2 rounded-full py-1 border-rounded bg-[#d1411e] text-white"
              >
                {ingredient}
              </div>
            );
          })}
        </div>
        <div className="flex px-2 gap-1 ">
          {product?.sizeWisePrice?.map((obj, ind) => {
            return (
              <div
                key={ind}
                className={`px-2 text-sm font-semibold py-1 rounded-full text-[#d1411e] bg-white cursor-pointer shadow-md`}
              >
                {obj["size"]}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
