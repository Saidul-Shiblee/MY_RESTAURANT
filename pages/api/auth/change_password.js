import apiHandler from "../../../utils/api/api-handler";
import { findUser } from "../../../services/db/userServices";
import bcrypt from "bcrypt";
import createHttpError from "http-errors";
import httpStatusCodes from "../../../utils/httpStatusCode";
import hashPassword from "../../../utils/hashPassword";

const change_password = async (req, res) => {
  //find user in DB
  const user = await findUser({ email: req.body.email });
  if (user) {
    //compare password
    if (req.body.oldPassword === req.body.newPassword) {
      throw createHttpError(
        httpStatusCodes.BAD_REQUEST,
        "Old & New Password Cannot be same"
      );
    }
    const match = await bcrypt.compare(req.body.oldPassword, user.password);
    if (match) {
      const hashedPassword = await hashPassword(req.body.newPassword);
      user.password = hashedPassword;
      user.save();
      res.status(httpStatusCodes.OK).json({
        message: "Password Changed Successfully",
      });
    } else {
      throw createHttpError(httpStatusCodes.UNAUTHORIZED, "Wrong Password");
    }
  } else {
    throw createHttpError(httpStatusCodes.NOT_FOUND, "User Not Found");
  }
};
export default apiHandler({ post: change_password });
