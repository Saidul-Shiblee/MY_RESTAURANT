import apiHandler from "../../../../../utils/api/api-handler";
import { findProducts } from "../../../../../services/db/productServices";

const getProducts = async (req, res) => {
  const result = await findProducts();
  res.status(201).json({
    result,
  });
};

export default apiHandler({
  get: getProducts,
});
