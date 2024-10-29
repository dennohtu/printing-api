import mongoose from "mongoose";

const Product_Order = mongoose.Schema(
  {
    Total_Cost: {
      type: Number,
      required: true,
      default: 0,
    },
    Products: [
      {
        Product_ID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Marketplace_Products",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
        Total_Cost: {
          type: Number,
          required: true,
          default: 0,
        },
      },
    ],
    status: {
      type: String,
      required: true,
      default: "PENDING",
    },
    User_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    fulfilled: {
      type: Number,
      default: 0,
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
