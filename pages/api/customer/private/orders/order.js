import createHttpError from "http-errors";
import { findOrder } from "../../../../../services/db/orderServices";
import { findSession } from "../../../../../services/db/sessionService";
import apiHandler from "../../../../../utils/api/api-handler";

const getOrder = async (req, res) => {
  const { userId, productId } = req.body;
  if (userId && productId) {
    const session = await findSession({
      userId: userId,
    });

    if (session && session.expires >= new Date()) {
      const order = await findOrder({
        _id: productId,
      });

      res.status(200).json({
        order,
      });
    } else {
      throw createHttpError(401, "You are not authorized to view this page.");
    }
  } else {
    res.status(400).json({
      Message: "Bad Request",
    });
  }
};

export default apiHandler({
  post: getOrder,
});
