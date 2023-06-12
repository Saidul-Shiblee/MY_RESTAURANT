import { productSchema } from "../../../../../yup_schema/products";
import apiHandler from "../../../../../utils/api/api-handler";
import validateRequest from "../../../../../utils/api/yup-validator";
import {
  createProduct,
  findProducts,
} from "../../../../../services/db/productServices";

const addProduct = async (req, res) => {
  const data = await validateRequest(req.body, productSchema);
  const result = await createProduct(data);
  res.status(201).json({
    result,
  });
};

const getProducts = async (req, res) => {
  const result = await findProducts();
  res.status(201).json({
    result,
  });
};

export default apiHandler({
  post: addProduct,
  get: getProducts,
});
