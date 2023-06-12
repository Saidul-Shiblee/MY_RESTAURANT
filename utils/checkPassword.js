import bcrypt from "bcrypt";
export default async function checkPassword(password, hashedPassword) {
  const match = await bcrypt.compare(password, hashedPassword);
  return match;
}
