import accountModel from "../../models/accounts";

export const findAccount = async (filter) => {
  const foundAccount = await accountModel.findOne(filter).exec();
  return foundAccount;
};
