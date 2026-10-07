import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: [
        2,
        "The name of the product must be atleast 2 characters long",
      ],
    },
    image: {
      type: String,
      required: true,
      match: [
        /^https?:\/\//,
        'The image URL must start with "http://" or "https://"',
      ],
    },
    code: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
      minLength: [2, "The brand must be atleast 2 characters long"],
    },
    price: {
      type: Number,
      required: true,
      min: [0, "The price must be a positive number"],
    },
    description: {
      type: String,
      required: true,
      minLength: [20, "Description must be atleast 20 characters long"],
      maxLength: [300, "Description must be less than 300 characters long"],
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    boughtBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export { Product };
