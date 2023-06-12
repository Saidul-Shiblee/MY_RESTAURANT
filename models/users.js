import mongoose from "mongoose";
export const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name can't be left blank"],
      maxLength: [50, "Name is too long"],
    },
    email: {
      type: String,
      required: [true, "Email can't be left blank"],
      validator: {},
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password can't be left blank"],
      validator: {},
    },
    role: {
      type: String,
      required: [true, "role can't be left blank"],
    },
    status: {
      type: Number,
      default: 1,
    },
    token: {
      type: String,
    },
    image: {
      type: {
        url: {
          type: String,
          required: [true, "Url can't be left blank"],
        },
        publicId: {
          type: String,
          required: [true, "PublicId can't be left blank"],
        },
      },
      required: [true, "Image can't be left blank"],
      _id: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Users || mongoose.model("Users", userSchema);
