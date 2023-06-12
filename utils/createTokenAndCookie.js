import jwt from "jsonwebtoken";
import cookie from "cookie";
// import userModel from "../models/users";
export default async function createTokenAndCookie(user) {
  //create access token
  const accessToken = jwt.sign(
    {
      username: user.name,
      email: user.email,
      role: user.role,
      _id: user._id,
    },
    process.env.JWT_ACCESS_SECRET_KEY,
    { expiresIn: 60 * 60 }
  );
  //create refresh token
  const refreshToken = jwt.sign(
    {
      username: user.name,
      email: user.email,
      role: user.role,
      _id: user._id,
    },
    process.env.JWT_REFRESH_SECRET_KEY,
    { expiresIn: 60 * 60 * 24 }
  );

  // set refresh token in the cookie
  const jwtCookie = cookie.serialize("jwtToken", refreshToken, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24,
    path: "/",
  });

  return { accessToken, refreshToken, jwtCookie };
}
