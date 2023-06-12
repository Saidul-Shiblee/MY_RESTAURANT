import createHttpError from "http-errors";
import { findNotifications } from "../../../../services/db/notificationServices";
import apiHandler from "../../../../utils/api/api-handler";
import httpStatusCodes from "../../../../utils/httpStatusCode";

const getNotifications = async (req, res) => {
  const role = req.userRole;
  let notification;
  if (role === "admin") {
    notification = await findNotifications({});
  } else if (role === "user") {
    notification = await findNotifications({ recipient: "all" });
  } else {
    throw createHttpError(
      httpStatusCodes.UNAUTHORIZED,
      "You are not authorized"
    );
  }
  res.status(200).json({
    result: notification,
  });
};

export default apiHandler({
  get: getNotifications,
});
