import mongoose from "mongoose";
export const notificationSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    recipient: {
      type: String,
      required: true,
    },
    changedCollection: {
      type: String,
      required: true,
    },
    documentId: {
      type: String,
      required: true,
    },
    readBy: {
      type: String,
    },
    status: {
      type: Boolean,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Notifications ||
  mongoose.model("Notifications", notificationSchema);
