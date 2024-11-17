import mongoose from "mongoose";

const Product_Order = mongoose.Schema(
  {
    Order_ID: {
      type: String,
      required: true,
    },
    Status: {
      type: String,
      required: true,
      default: "PENDING",
    },
    Client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    fulfilled: {
      type: Number,
      default: 0,
    },
    Product: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Marketplace_Products",
    },
    Quantity: {
      type: Number,
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

const Products_Order_Model = mongoose.model("Marketplace_Order", Product_Order);

export default Products_Order_Model;
