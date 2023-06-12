import notificationModel from "../../models/notification";

//Create Notification
export const createNotification = async (notificationObject) => {
  const notification = notificationModel(notificationObject);
  const createNotification = await notification.save();
  return createNotification;
};

//Get Notifications

export const findNotifications = async (filter) => {
  const notifications = await notificationModel.find(filter).exec();
  return notifications;
};

//Edit Notification
export const findNotificationAndUpdate = async (id, update) => {
  const updatedNotification = await notificationModel.findByIdAndUpdate(
    id,
    update,
    {
      new: true,
    }
  );
  return updatedNotification;
};
