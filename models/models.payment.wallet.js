import mongoose from "mongoose";

const Wallet_payment_schema = mongoose.Schema(
  {
    Wallet_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User_Wallet",
    },
    Mpesa_ID: {
      type: String,
      ref: "",
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

const WalletPaymentModel = mongoose.model(
  "Wallet_Payment",
  Wallet_payment_schema
);

export default WalletPaymentModel;
