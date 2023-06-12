// import { orderSchema } from "../../../yup_schema/products";
import apiHandler from "../../../../utils/api/api-handler";
// import validateRequest from "../../../utils/api/yup-validator";
import { findOrders } from "../../../../services/db/orderServices";

const getOrders = async (req, res) => {
  const result = await findOrders();

  res.status(201).json({
    orders: result,
  });
};

export default apiHandler({
  get: getOrders,
});
