// import { orderSchema } from "../../../yup_schema/products";

import apiHandler from "../../../../../utils/api/api-handler";
// import validateRequest from "../../../utils/api/yup-validator";
import { findOrders } from "../../../../../services/db/orderServices";
import { findSession } from "../../../../../services/db/sessionService";
import mongoose from "mongoose";
import createHttpError from "http-errors";

//@TODO :write method to check if the params are valid mongoose objectID

const getOrders = async (req, res) => {
  const { id } = req.query;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw createHttpError(401, "You are not authorized to view this page.");
  } else {
    const session = await findSession({
      userId: id,
    });
    if (session && session.expires >= new Date()) {
      const orders = await findOrders({
        customerId: id,
      });
      res.status(200).json({
        orders,
      });
    } else {
      throw createHttpError(401, "You are not authorized to view this page.");
    }
  }
};

export default apiHandler({
  get: getOrders,
});
