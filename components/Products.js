import React from "react";
import ProductCard from "./ProductCard";

const Products = ({ productList }) => {
  return (
    <div
      className="py-10 px-20 flex flex-col items-center bg-gray-50"
      id="menu"
    >
      <div className="flex flex-col items-center mb-10">
        <h2 className="text-center text-gray-600 text-2xl font-bold mb-10">
          Menu
        </h2>
        <p className="text-center text-gray-600 w-1/2">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos dolorem
          rem voluptas nesciunt perspiciatis! Tenetur, minima quae! Corporis rem
          nisi dolor consequatur numquam, nobis odit voluptas sit sunt fuga
          error.
        </p>
      </div>
      <div className="w-full flex gap-y-6 flex-wrap justify-between">
        {productList.map((product, ind) => (
          <ProductCard key={ind} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
