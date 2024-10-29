import mongoose from "mongoose";

const Product_Details_Schema = mongoose.Schema(
  {
    Product_Image: {
      type: String,
      default: "",
    },
    Product_Name: {
      type: String,
      required: true,
      default: "",
    },
    Product_Stock_Quantity: {
      type: Number,
      required: true,
      default: 0,
    },
    Product_Unit: {
      type: String,
      default: "kg",
    },
    Product_Unit_Price: {
      type: Number,
      required: true,
      default: 0,
    },
    Product_Description: {
      type: String,
      default: "",
      required: true,
    },
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
  },
  {
    timestamps: true,
  }
);

const Products_Model = mongoose.model(
  "Marketplace_Products",
  Product_Details_Schema
);

export default Products_Model;
