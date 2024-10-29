import mongoose from "mongoose";

const rolesModelSchema = mongoose.Schema(
  {
    role_name: {
      type: String,
      required: true,
      unique: true,
    },
    role_description: {
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

rolesModelSchema.pre("save", async function (next) {
  if (!this.isModified("role_name")) {
    next();
  }

  this.role_name = this.role_name.toLowerCase();
});
const Role = mongoose.model("Role", rolesModelSchema);

export default Role;
