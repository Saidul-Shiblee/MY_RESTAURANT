import mongoose from "mongoose";
export const ordersSchema = new mongoose.Schema(
  {
    customerId: {
      type: String,
      required: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    customerPhoneNo: {
      type: String,
      required: true,
    },
    customerEmail: {
      type: String,
      required: true,
    },
    deliveryAddress: {
      type: String,
      required: true,
    },
    orderDetails: {
      type: [{}],
      required: [true, "Product details can't be left blank"],
    },
    orderPrice: {
      type: Number,
      required: [true, "Order Total can't be left blank"],
    },
    paymentStatus: {
      type: Boolean,
      required: true,
    },
    status: {
      type: Number,
      default: 0,
    },
    paymentMethod: {
      type: Number,
      required: [true, "Payment Method can't be left blank"],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Orders || mongoose.model("Orders", ordersSchema);
