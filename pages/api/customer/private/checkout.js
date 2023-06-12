import apiHandler from "../../../../utils/api/api-handler";
import stripe from "stripe";
import { createOrder } from "../../../../services/db/orderServices";
import { createNotification } from "../../../../services/db/notificationServices";
const checkout = async (req, res) => {
  const result = req.body;
  console.log(result.customerDetails);
  const order = await createOrder({
    customerId: result.customerDetails.customerId,
    customerName: result.customerDetails.fullName,
    customerPhoneNo: result.customerDetails.phoneNo,
    customerEmail: result.customerDetails.email,
    deliveryAddress: result.customerDetails.deliveryAddress,
    orderDetails: result.ordertDetails,
    orderPrice: result.ordertDetails.reduce((iV, cV) => {
      return iV + cV.productPrice;
    }, 0),
    paymentStatus: 0,
    paymentMethod: 1,
  });
  console.log(order);
  await createNotification({
    message: "New order placed",
    recipient: "all",
    changedCollection: "orders",
    documentId: order._id,
  });
  const stripeSession = stripe(process.env.STRIPE_SECRET_KEY);
  const line_items = result.ordertDetails.map((el) => {
    return {
      quantity: el.quantity,
      price_data: {
        currency: "BDT",
        product_data: { name: el.productName, images: [el.productImage] },
        unit_amount: el.productPrice * 100,
      },
    };
  });
  const session = await stripeSession.checkout.sessions.create({
    line_items: line_items,
    mode: "payment",
    customer_email: result.customerDetails.email,
    success_url: `${
      req.headers.origin
    }/confirmation/?success=true&order_id=${order._id.toString()}`,
    cancel_url: `${req.headers.origin}/confirmation/?canceled=true`,
    metadata: { orderId: order._id.toString() },
  });
  res.json(session.url);
};

export default apiHandler({
  post: checkout,
});
