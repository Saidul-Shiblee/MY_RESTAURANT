import mongoose from "mongoose";
export const sessionsSchema = new mongoose.Schema({
  sessionToken: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  expires: {
    type: Date,
    required: true,
  },
});

export default mongoose.models.Sessions ||
  mongoose.model("Sessions", sessionsSchema);
