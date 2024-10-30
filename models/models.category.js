import mongoose from "mongoose";

const CategoryModel = mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
      default: "",
    },
    Description: {
      type: String,
      default: "",
    },
    active: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Categories", CategoryModel);

export default Category;
