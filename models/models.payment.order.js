import mongoose from "mongoose";

const Order_payment_schema = mongoose.Schema(
  {
    Payment_ID: {
      type: String,
      required: true,
    },
    Order_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Marketplace_Order",
    },
    Transaction_Reference: {
      type: String,
      default: "CASH",
    },
    Amount_Paid: {
      type: Number,
      default: 0,
    },
    Balance: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      default: "NOT_COMPLETE",
    },
    active: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true }
);

const OrderPaymentModel = mongoose.model("Order_Payment", Order_payment_schema);

export default OrderPaymentModel;
