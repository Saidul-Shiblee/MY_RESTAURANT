import apiHandler from "../../../../utils/api/api-handler";
import {
  findProducts,
  findProduct,
} from "../../../../services/db/productServices";

import { createProduct } from "../../../../services/db/productServices";
import { productSchema } from "../../../../yup_schema/products";
import validateRequest from "../../../../utils/api/yup-validator";
import createHttpError from "http-errors";
import httpStatusCodes from "../../../../utils/httpStatusCode";
import isEmpty from "../../../../lib/isEmpty";

//Route for get all Products
const getProducts = async (req, res) => {
  if (!isEmpty(req.query)) {
    const { productName } = req.query;
    const result = await findProduct({ name: productName });
    res.status(200).json({
      result,
    });
  } else {
    const result = await findProducts();
    res.status(200).json({
      products: result,
    });
  }
};

//Route for add a Product
const addProducts = async (req, res) => {
  console.log(req.body.data);
  const product = req.body.data;
  console.log(product);
  const data = await validateRequest(product, productSchema);
  if (!data) {
    throw createHttpError(httpStatusCodes.BAD_REQUEST, "Bad Request");
  }
  const result = await createProduct(data);
  res.status(201).json({ product: result });
};

export default apiHandler({
  get: getProducts,
  post: addProducts,
});
