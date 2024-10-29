import mongoose from "mongoose";
const ResetPasswordModelSchema = mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      default: "",
    },
    email: {
      type: String,
      required: true,
      default: "",
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

const ResetPassword = mongoose.model("ResetPassword", ResetPasswordModelSchema);

export default ResetPassword;
