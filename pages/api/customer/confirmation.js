const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import { buffer } from "micro";
import { findOrderAndUpdate } from "../../../services/db/orderServices";
import apiHandler from "../../../utils/api/api-handler";

const confirmation = async (req, res) => {
  const endpointSecret = process.env.WEBHOOK_SECRET_KEY;
  const payload = await buffer(req);
  const sig = req.headers["stripe-signature"];
  const event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);

  if (event.type === "checkout.session.completed") {
    if (event?.type === "checkout.session.completed") {
      const metadata = event.data?.object?.metadata;
      const paymentStatus = event.data?.object?.payment_status;
      console.log(paymentStatus);
      if (metadata?.orderId && paymentStatus === "paid") {
        await findOrderAndUpdate(metadata.orderId, { paymentStatus: true });
      }
    }
  }
  res.json("ok");
};

export default apiHandler({
  post: confirmation,
});

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };
