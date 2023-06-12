import apiHandler from "../../../utils/api/api-handler";
import { findUser } from "../../../services/db/userServices";
import createHttpError from "http-errors";
import httpStatusCodes from "../../../utils/httpStatusCode";
import dynamicObject from "../../../lib/dynamicObject";

const getUser = async (req, res) => {
  const filter = dynamicObject(req.body);
  const result = await findUser(filter);

  res.status(200).json({
    result,
  });
};

export default apiHandler({ post: getUser });
