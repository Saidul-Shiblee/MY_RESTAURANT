const cloudinary = require("cloudinary").v2;
require("dotenv").config();

let timestamp = Math.round(new Date().getTime() / 1000);

export const generateSignature = cloudinary.utils.api_sign_request(
  {
    timestamp: timestamp,
    public_id: "foody/products",
  },
  process.env.CLOUDINARY_API_SECRET
);
