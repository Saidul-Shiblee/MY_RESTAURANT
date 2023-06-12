import mongoose from "mongoose";
export const accountsSchema = new mongoose.Schema({
  providerAccountId: {
    type: String,
  },
});

export default mongoose.models.Accounts ||
  mongoose.model("Accounts", accountsSchema);
