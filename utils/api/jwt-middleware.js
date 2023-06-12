import { expressjwt } from "express-jwt";
const util = require("util");

// public routes that don't require authentication
const authorizatioHheadersNotRequiredPath = [
  "/api/customer/.*",
  "/api/auth/login",
  "/api/auth/refresh",
];
//Convert each element to regex
const convertToRegex = authorizatioHheadersNotRequiredPath.map(
  (el) => new RegExp(el)
);

export default function jwtMiddleware(req, res) {
  for (const el of convertToRegex) {
    if (el.test(req.url)) {
      delete req.headers["authorization"];
    }
  }
  const middleware = expressjwt({
    secret: process.env.JWT_ACCESS_SECRET_KEY,
    algorithms: ["HS256"],
  }).unless({
    path: [...convertToRegex],
  });
  return util.promisify(middleware)(req, res);
}
