import sessionsModel from "../../models/sessions";

export const findSession = async (filter) => {
  const foundSession = await sessionsModel.findOne(filter).exec();
  return foundSession;
};
