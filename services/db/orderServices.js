import orderModel from "../../models/orders";

//Create a order
export const createOrder = async (orderObject) => {
  const order = orderModel(orderObject);
  const createdOrder = await order.save();
  return createdOrder;
};

//Get all orders
export const findOrders = async (filter) => {
  const findFilter = filter || {};
  const foundOrders = await orderModel.find(filter).sort({ createdAt: -1 });
  return foundOrders;
};
//Find Single Order
export const findOrder = async (filter) => {
  const foundOrder = await orderModel.findOne(filter).exec();
  return foundOrder;
};
//Find an order and update/Edit
export const findOrderAndUpdate = async (id, update) => {
  const updateOrder = await orderModel.findByIdAndUpdate(id, update, {
    new: true,
  });
  return updateOrder;
};

//Delete an order
export const removeOrder = async (id) => {
  const deletedOrder = await orderModel.findOneAndDelete(id);
  return deletedOrder;
};
