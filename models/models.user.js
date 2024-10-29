// The user model for authentication and authorization purposes
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import RoleModel from "./models.roles.js";
import { secrets } from "../config/config.config.js";
import UserWallet from "./models.user.wallet.js";
const userModelSchema = mongoose.Schema(
  {
    User_First_Name: {
      type: String,
      default: "",
    },
    User_Last_Name: {
      type: String,
      default: "",
    },
    User_Phone: {
      type: String,
      unique: true,
      default: "",
    },
    User_Email: {
      type: String,
      unique: true,
      default: "",
    },
    User_Gender: {
      type: String,
      default: "",
    },
    User_Password: {
      type: String,
    },

    User_Onboard_Date: {
      type: Date,
      default: () => Date.now(),
    },
    User_Subscription_Status: {
      type: Boolean,
      default: false,
    },
    User_IsPhone_Validated: {
      type: Boolean,
      default: false,
    },
    User_Passport_Photo: {
      type: String,
      default: "",
    },
    active: {
      type: Boolean,
      required: true,
      default: true,
    },
    hasResetPassword: {
      type: Boolean,
      required: true,
      default: false,
    },
    User_Role_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },

    Permission_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PermissionsDefault",
    },
    User_Id_Card_Front: {
      type: String,
      default: "",
    },
    User_Id_Card_Back: {
      type: String,
      default: "",
    },
    User_KRA_Pin: {
      type: String,
      default: "",
    },

    User_Accepted_Terms: {
      type: Boolean,
      default: false,
    },
    User_Verified: {
      type: Boolean,
      default: false,
    },
    User_Thorium_Farmer: {
      type: Boolean,
      default: false,
    },
    User_Organic_Farmer: {
      type: Boolean,
      default: false,
    },
    User_Carbon_Credits: {
      type: Number,
      default: 0,
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

userModelSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.User_Password);
};

userModelSchema.pre("save", async function (next) {
  if (!this.isModified("User_Password")) {
    console.log("the password is not changed");
    next();
  } else {
    console.log("salting the gaddamn password ", this.User_Password);
    const salt = await bcrypt.genSalt(12);
    this.User_Password = await bcrypt.hash(this.User_Password, salt);
    console.log("salting the gaddamn password ", this.User_Password);
  }
});

userModelSchema.pre("save", async function (next) {
  console.log("the role is this in the model ", this.User_Role_ID);
  if (this.User_Role_ID !== undefined) {
    next();
  } else {
    const roleDefault = {
      role_name: secrets.DEFAULT_USER,
    };
    const options = {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    };
    const defaultRole = await RoleModel.findOneAndUpdate(
      { role_name: secrets.DEFAULT_USER },
      roleDefault,
      options
    );
    this.User_Role_ID = defaultRole._id;
  }
});

userModelSchema.post("save", async function (doc) {
  const walt = await UserWallet.findOne({ User_ID: doc._id });
  if (!walt) {
    console.log("No wallet. creating user wallet");
    await UserWallet.create({
      User_ID: doc._id,
      Amount: 0,
    });
  } else {
    if (!doc.active) {
      console.log("User Deleted. Updating Wallet.");
      await UserWallet.findOneAndUpdate(
        {
          User_ID: doc._id,
        },
        {
          active: false,
        }
      );
    } else
      console.log("Wallet exists. Not creating. User active. Not updating");
  }
});

userModelSchema.post("findOneAndUpdate", async function (doc) {
  const walt = await UserWallet.findOne({ User_ID: doc._id });
  if (!walt) {
    console.log("No wallet. creating user wallet");
    await UserWallet.create({
      User_ID: doc._id,
      Amount: 0,
    });
  } else {
    if (!doc.active) {
      console.log("User Deleted. Updating Wallet.");
      await UserWallet.findOneAndUpdate(
        {
          User_ID: doc._id,
        },
        {
          active: false,
        }
      );
    } else
      console.log("Wallet exists. Not creating. User active. Not updating");
  }
});

userModelSchema.post("findByIdAndUpdate", async function (doc) {
  const walt = await UserWallet.findOne({ User_ID: doc._id });
  if (!walt) {
    console.log("No wallet. creating user wallet");
    await UserWallet.create({
      User_ID: doc._id,
      Amount: 0,
    });
  } else {
    if (!doc.active) {
      console.log("User Deleted. Updating Wallet.");
      await UserWallet.findOneAndUpdate(
        {
          User_ID: doc._id,
        },
        {
          active: false,
        }
      );
    } else
      console.log("Wallet exists. Not creating. User active. Not updating");
  }
});

userModelSchema.pre("remove", async function (next) {
  await UserWallet.deleteOne({ User_ID: this._id });

  next();
});

const User = mongoose.model("User", userModelSchema);

export default User;
