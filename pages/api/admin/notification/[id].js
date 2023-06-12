import apiHandler from "../../../../utils/api/api-handler";

import { findNotificationAndUpdate } from "../../../../services/db/notificationServices";

//Edit Notification Route
const editNotification = async (req, res) => {
  const {
    query: { id },
  } = req;

  console.log(id, req.body);
  const updatedNotification = await findNotificationAndUpdate(
    { _id: id },
    req.body
  );

  res.status(200).json(updatedNotification);
};

export default apiHandler({
  put: editNotification,
});
