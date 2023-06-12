import apiHandler from "../../../utils/api/api-handler";
import { findUser } from "../../../services/db/userServices";
import bcrypt from "bcrypt";
import createHttpError from "http-errors";
import httpStatusCodes from "../../../utils/httpStatusCode";

const check_password = async (req, res) => {
  //find user in DB
  const user = await findUser({ email: req.body.email });
  if (user) {
    //compare password
    const match = await bcrypt.compare(req.body.password, user.password);
    if (match) {
      res.status(httpStatusCodes.OK).json({
        message: "Password Matched",
      });
    } else {
      throw createHttpError(httpStatusCodes.UNAUTHORIZED, "Wrong Password");
    }
  } else {
    throw createHttpError(httpStatusCodes.NOT_FOUND, "User Not Found");
  }
};
export default apiHandler({ post: check_password });
