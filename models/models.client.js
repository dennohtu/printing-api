// The user model for authentication and authorization purposes
import mongoose from "mongoose";
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
    User_Address: {
      type: String,
      default: "",
    },
    User_Town: {
      type: String,
      default: "",
    },
    User_City: {
      type: String,
      default: "",
    },
    User_Country: {
      type: String,
      default: "",
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

const Client = mongoose.model("Client", userModelSchema);

export default Client;
