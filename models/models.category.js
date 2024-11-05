import mongoose from "mongoose";

const CategoryModel = mongoose.Schema(
  {
    Category_Name: {
      type: String,
      required: true,
      default: "",
    },
    Category_Description: {
      type: String,
      default: "",
    },
    Category_Banner: {
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
