import { userLoginSchema } from "../../../yup_schema/userLogin";
import apiHandler from "../../../utils/api/api-handler";
import validateRequest from "../../../utils/api/yup-validator";
import { findUser } from "../../../services/db/userServices";
import bcrypt from "bcrypt";
import createTokenAndCookie from "../../../utils/createTokenAndCookie";
const login = async (req, res) => {
  //validate user input
  const data = await validateRequest(req.body, userLoginSchema);
  //find user in DB
  const user = await findUser({ email: data.email });
  if (user) {
    //compare password
    const match = await bcrypt.compare(data.password, user.password);
    if (match) {
      //create tokens and cookie
      const { accessToken, refreshToken, jwtCookie } =
        await createTokenAndCookie(user);

      const { password, token, createdAt, updatedAt, __v, ...others } = {
        ...user,
      }._doc;
      //save the refresh token in db
      user.token = refreshToken;
      user.save();
      //set headet and send request
      res.setHeader("Set-Cookie", jwtCookie);
      res.status(200).json({
        accessToken,
        user: others,
      });
    } else {
      res.status(401).json({ message: "Invalid Credential" });
    }
  } else {
    res.status(401).json({ message: "Invalid Credential" });
  }
};

export default apiHandler({ post: login });
