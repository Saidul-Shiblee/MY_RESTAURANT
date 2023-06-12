import mongoose from "mongoose";
export const productsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product title can't be left blank"],
      maxLength: [50, "Name is too long"],
    },

    desc: {
      type: String,
      required: [true, "Product description can't be left blank"],
    },
    sizeWisePrice: {
      type: [
        {
          size: {
            type: String,
            required: [true, "Size can't be left blank"],
          },
          price: {
            type: Number,
            required: [true, "Size wise product price can't be left blank"],
          },
          _id: {
            type: mongoose.Schema.Types.ObjectId,
          },
        },
      ],
      required: [true, "Size & corresponding price can't be left blank"],
    },

    optionWisePrice: {
      type: [
        {
          option: {
            type: String,
            required: [true, "Additiona option can't be left blank"],
          },
          price: {
            type: Number,
            required: [true, "option wise product price can't be left blank"],
          },
          _id: {
            type: mongoose.Schema.Types.ObjectId,
          },
        },
      ],
      required: [true, "Option & corresponding price can't be left blank"],
    },
    ingredients: {
      type: [String],
      required: [true, "Ingredients can't be left blank"],
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
        _id: {
          type: mongoose.Schema.Types.ObjectId,
        },
      },
      required: [true, "Image can't be left blank"],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Products ||
  mongoose.model("Products", productsSchema);
