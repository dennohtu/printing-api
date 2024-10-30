import mongoose from "mongoose";

const Product_Details_Schema = mongoose.Schema(
  {
    Product_Variation: {
      type: String,
      required: true,
      default: "",
    },
    Product_Brand: {
      type: String,
      required: true,
      default: "",
    },
    Product_Size: {
      type: String,
      required: true,
      default: "",
    },
    Product_Price: {
      type: String,
      required: true,
      default: "",
    },
    Product_Photos: {
      type: Array,
      required: true,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);
const ProductsModel = mongoose.Schema(
  {
    Product_Name: {
      type: String,
      required: true,
      default: "",
    },

    Product_Description: {
      type: String,
      required: true,
      default: "",
    },
    Product_Variation: [Product_Details_Schema],
    Category_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categories",
      required: true,
    },

    active: {
      type: Boolean,
      required: true,
      default: true,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Products = mongoose.model("Products", ProductsModel);

export default Products;
