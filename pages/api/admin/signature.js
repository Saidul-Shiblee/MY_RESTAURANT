const cloudinary = require("cloudinary").v2;
const _ = require("lodash");
import apiHandler from "../../../utils/api/api-handler";

const getSignature = async (req, res) => {
  let timestamp = Math.round(new Date().getTime() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp: timestamp,
      folder: req.body.folder,
    },
    process.env.CLOUDINARY_API_SECRET
  );

  res.status(200).json({
    signature,
    timestamp,
  });
};

export default apiHandler({
  post: getSignature,
});
