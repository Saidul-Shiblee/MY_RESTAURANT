import jwt from "jsonwebtoken";

export default function verifyToken(token, secret) {
  let decoded = jwt.verify(token, secret);
  return decoded;
}
