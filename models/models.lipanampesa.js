import mongoose from "mongoose";
const LipaNaMpesaModelSchema = mongoose.Schema(
  {
    MerchantRequestID: {
      type: String,
      required: true,
      default: null,
    },
    CheckoutRequestID: {
      type: String,
      required: true,
      default: null,
    },
    ResultCode: {
      type: Number,
      required: true,
      default: null,
    },
    ResultDesc: {
      type: String,
      required: true,
      default: null,
    },

    PhoneNumber: {
      type: String,
      default: null,
    },
    Amount: {
      type: String,
      default: null,
    },
    MpesaReceiptNumber: {
      type: String,
      default: null,
    },
    TransactionDate: {
      type: String,
      default: null,
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

const LipaNaMpesa = mongoose.model("LipaNaMpesa", LipaNaMpesaModelSchema);

export default LipaNaMpesa;
