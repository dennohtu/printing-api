// The user model for authentication and authorization purposes
import mongoose from "mongoose";
import UserWalletTransaction from "./models.user.wallet.transactionHistory.js";

const UserWalletModelSchema = mongoose.Schema(
  {
    User_ID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    Amount: {
      type: Number,
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

UserWalletModelSchema.pre("remove", async function (next) {
  await UserWalletTransaction.deleteMany({ Wallet_ID: this._id });

  next();
});

const UserWallet = mongoose.model("User_Wallet", UserWalletModelSchema);

export default UserWallet;
