const cloudinary = require("cloudinary").v2;

import createHttpError from "http-errors";
import apiHandler from "../../../utils/api/api-handler";
import httpStatusCodes from "../../../utils/httpStatusCode";

const deleteImage = async (req, res) => {
  const { public_id } = req.body;
  console.log(public_id);
  cloudinary.config({
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    cloud_name: process.env.CLOUDINARY_NAME,
  });
  const result = await cloudinary.uploader.destroy(public_id);
  if (result.result === "ok") {
    res.status(200).json("Deleted Successfully");
  } else {
    throw createHttpError(httpStatusCodes.NOT_FOUND, "Not Found");
  }
};

export default apiHandler({
  delete: deleteImage,
});
