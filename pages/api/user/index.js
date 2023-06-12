import { userSchema } from "../../../yup_schema/user";
import apiHandler from "../../../utils/api/api-handler";
import validateRequest from "../../../utils/api/yup-validator";
import {
  createUser,
  findUser,
  findUserAndUpdate,
  findUsers,
} from "../../../services/db/userServices";
import hashPassword from "../../../utils/hashPassword";
import createHttpError from "http-errors";
import httpStatusCodes from "../../../utils/httpStatusCode";
import dynamicObject from "../../../lib/dynamicObject";

const registerUser = async (req, res) => {
  const data = await validateRequest(req.body.user, userSchema);
  const foundUser = await findUser({ email: data.email });
  if (!foundUser) {
    const hashedPassword = await hashPassword(data.password);
    data.password = hashedPassword;
    const result = await createUser(data);
    res.status(201).json({
      _id: result._id,
      name: result.name,
      email: result.email,
      role: result.role,
      image: result.image,
    });
  } else {
    throw createHttpError(
      httpStatusCodes.BAD_REQUEST,
      "User with same email already exisits"
    );
  }
};

const getAllusers = async (req, res) => {
  const role = req.userRole;
  if (role === "admin") {
    const result = await findUsers({ role: { $ne: "customer" } });
    const newResult = result.map((el) => {
      const { password, token, emailVerified, ...requiredData } = el?._doc;
      return requiredData;
    });

    res.status(200).json({
      users: newResult,
    });
  } else {
    throw createHttpError(
      httpStatusCodes.UNAUTHORIZED,
      "You are not authorized"
    );
  }
};

export default apiHandler({ post: registerUser, get: getAllusers });
