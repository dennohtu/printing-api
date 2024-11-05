import mongoose from "mongoose";

const userRoleolesModelSchema = mongoose.Schema(
  {
    User: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    Role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
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

const UserRole = mongoose.model("User_Role", userRoleolesModelSchema);

export default UserRole;
