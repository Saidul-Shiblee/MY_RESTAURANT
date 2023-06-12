import apiHandler from "../../../../utils/api/api-handler";
import {
  findOrder,
  findOrderAndUpdate,
  removeOrder,
} from "../../../../services/db/orderServices";
import createHttpError from "http-errors";
import httpStatusCodes from "../../../../utils/httpStatusCode";
import { createNotification } from "../../../../services/db/notificationServices";
import { notificationMessage } from "../../../../lib/notificationMessage";

//Edit Order Route
const editOrder = async (req, res) => {
  const {
    query: { id },
  } = req;
  if (req.body.status > 3 || req.body.status < 1) {
    throw createHttpError(
      httpStatusCodes.BAD_REQUEST,
      "Request With Invalid Status Code"
    );
  }
  const updateOrder = await findOrderAndUpdate({ _id: id }, req.body);
  await createNotification({
    message: notificationMessage(req.body.status, id),
    recipient: "all",
    changedCollection: "orders",
    documentId: id,
  });
  res.status(200).json(updateOrder);
};
//Get Order Route
const getOrder = async (req, res) => {
  const {
    query,
    query: { id },
  } = req;
  const result = await findOrder({ _id: id });

  res.status(200).json(result);
};
//Delete Order Route
const deleteOrder = async (req, res) => {
  const {
    query: { id },
  } = req;
  const ordertoDelete = await findOrder({ _id: id });
  if (ordertoDelete) {
    if (ordertoDelete.status >= 3) {
      throw createHttpError(
        httpStatusCodes.BAD_REQUEST,
        "You are not allowed to delete a already delivered order"
      );
    } else {
      const deletedOrder = await removeOrder({ _id: id });
      await createNotification({
        message: `Order no ${id} is being deleted`,
        recipient: "all",
        changedCollection: "orders",
        documentId: id,
      });
      res.status(200).json({
        deletedOrder,
        message: "Order has been deleted successfully.",
      });
    }
  } else {
    throw createHttpError(
      httpStatusCodes.NOT_FOUND,
      "Requested Order Not Found"
    );
  }
};
export default apiHandler({
  put: editOrder,
  get: getOrder,
  delete: deleteOrder,
});
