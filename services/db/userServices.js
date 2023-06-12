import userModel from "../../models/users";
export const createUser = async (userObject) => {
  const user = userModel(userObject);
  const createdUser = await user.save();
  return createdUser;
};
//Get a single user
export const findUser = async (filter) => {
  const foundUser = await userModel.findOne(filter).exec();
  return foundUser;
};
//Get all users
export const findUsers = async (filter) => {
  const foundUsers = await userModel.find(filter);
  return foundUsers;
};
//Update User
export const findUserAndUpdate = async (filter, update) => {
  const updatedUser = await userModel.findOneAndUpdate(filter, update);
  return updatedUser;
};
//Delete User
export const removeUser = async (id) => {
  const deletedOrder = await userModel.findOneAndDelete(id);
  return deletedOrder;
};
