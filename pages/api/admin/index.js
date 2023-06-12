import createHttpError from "http-errors";
import { findNotifications } from "../../../services/db/notificationServices";
import { findOrders } from "../../../services/db/orderServices";
import { findProducts } from "../../../services/db/productServices";
import { findUsers } from "../../../services/db/userServices";
import apiHandler from "../../../utils/api/api-handler";
import httpStatusCodes from "../../../utils/httpStatusCode";

const getDashboardInfo = async (req, res) => {
  const role = req.userRole;
  let result = {};

  const fetchCommonData = async () => {
    result.totalOrders = (
      await findOrders({ status: { $lte: Number(2) } })
    ).length;
    result.totalProducts = (await findProducts()).length;
    result.totalCustomers = (await findUsers({ role: "customer" })).length;

    const orders = await findOrders();
    let todate = new Date();
    result.todaysSale = orders.reduce((pV, cV) => {
      const createdAt = new Date(cV.createdAt);
      const todateStart = new Date(
        todate.getFullYear(),
        todate.getMonth(),
        todate.getDate()
      );
      const createdAtStart = new Date(
        createdAt.getFullYear(),
        createdAt.getMonth(),
        createdAt.getDate()
      );
      if (createdAtStart.getTime() === todateStart.getTime()) {
        return pV + cV.orderPrice;
      }
      return pV;
    }, 0);
  };
  if (role === "admin") {
    result.totalNotifications = (
      await findNotifications({ status: false })
    ).length;
    await fetchCommonData();
  } else if (role === "user") {
    result.totalNotifications = (
      await findNotifications({
        $and: [{ recipient: "all" }, { status: false }],
      })
    ).length;

    await fetchCommonData();
  } else {
    throw createHttpError(
      httpStatusCodes.UNAUTHORIZED,
      "You are not authorized"
    );
  }
  res.status(200).json({
    result,
  });
};

export default apiHandler({
  get: getDashboardInfo,
});
