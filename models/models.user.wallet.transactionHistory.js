// The user model for authentication and authorization purposes
import mongoose from "mongoose";
import UserWallet from "./models.user.wallet.js";

const UserWalletHistoryModelSchema = mongoose.Schema(
  {
    Wallet_ID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "UserWallet",
    },
    Transaction_Type: {
      type: String,
      required: true,
    },
    Amount_Transacted: {
      type: Number,
      required: true,
      default: 0,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

UserWalletHistoryModelSchema.post("save", async function (doc) {
  console.log("Updating User wallet with new balance.");
  const walt = await UserWallet.findOne({ _id: doc.Wallet_ID });
  walt.Amount =
    doc.Transaction_Type === "Deposit"
      ? walt.Amount + doc.Amount_Transacted
      : walt.Amount - doc.Amount_Transacted < 0
      ? 0
      : walt.Amount - doc.Amount_Transacted;
  walt.save();
});

const UserWalletTransaction = mongoose.model(
  "UserWalletTransactionHistory",
  UserWalletHistoryModelSchema
);

export default UserWalletTransaction;
