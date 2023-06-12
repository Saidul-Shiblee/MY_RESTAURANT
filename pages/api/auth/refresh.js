import apiHandler from "../../../utils/api/api-handler";
import { findUser } from "../../../services/db/userServices";
import createHttpError from "http-errors";
import httpStatusCodes from "../../../utils/httpStatusCode";
import createTokenAndCookie from "../../../utils/createTokenAndCookie";
import verifyToken from "../../../utils/verifyToken";

const refresh = async (req, res) => {
  const cookies = req.cookies;
  //find the token in DB
  const user = await findUser({ token: `${cookies.jwtToken}` });
  console.log(user);
  if (!user) {
    //throw error if the token not foound in DB
    throw createHttpError(
      httpStatusCodes.UNAUTHORIZED,
      "Request with no or wrong refresh token"
    );
  } else {
    try {
      //verify the refresh token
      const decodedToken = verifyToken(
        cookies.jwtToken,
        process.env.JWT_REFRESH_SECRET_KEY
      );
      if (!decodedToken?.username) {
        throw createHttpError(
          httpStatusCodes.INTERNAL_SERVER_ERROR,
          "Error while decoding token"
        );
      } else {
        //response with new access token
        const { accessToken } = await createTokenAndCookie(user);
        res.status(200).json({
          message: "New access token generated",
          accessToken,
        });
      }
    } catch (error) {
      //throw error if the token is expired
      throw createHttpError(httpStatusCodes.UNAUTHORIZED, "jwt expired");
    }
  }
};

export default apiHandler({ get: refresh });
