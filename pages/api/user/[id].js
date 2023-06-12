import apiHandler from "../../../utils/api/api-handler";
import {
  findUserAndUpdate,
  removeUser,
} from "../../../services/db/userServices";
import dynamicObject from "../../../lib/dynamicObject";

const editUser = async (req, res) => {
  const {
    query: { id },
  } = req;
  const role = req.userRole;
  if (role === "admin") {
    const filter = dynamicObject(req.body);
    const result = await findUserAndUpdate({ _id: id }, filter);

    const { password, token, emailVerified, ...requiredData } = result._doc;
    res.status(200).json({ user: requiredData });
  } else {
    throw createHttpError(
      httpStatusCodes.UNAUTHORIZED,
      "You sre not authorized"
    );
  }
};

const deleteUser = async (req, res) => {
  const {
    query: { id },
  } = req;
  const role = req.userRole;
  if (role === "admin") {
    const result = await removeUser({ _id: id });
    res
      .status(200)
      .json({ result, message: "User has been deleted successfully." });
  } else {
    throw createHttpError(
      httpStatusCodes.UNAUTHORIZED,
      "You sre not authorized"
    );
  }
};

export default apiHandler({ put: editUser, delete: deleteUser });
