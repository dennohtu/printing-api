import mongoose from "mongoose";

const Order_payment_schema = mongoose.Schema(
  {
    Order_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Marketplace_Order",
    },
    Mpesa_ID: {
      type: String,
      ref: "",
    },
    Wallet_Transaction_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserWalletTransactionHistory",
    },
    amount: {
      type: Number,
      default: 0,
    },
    payment_phone: {
      type: String,
      default: "",
    },
    checkoutRequestId: {
      type: String,
      default: "",
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
