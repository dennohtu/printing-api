import mongoose from "mongoose";
const ShipmentsModelSchema = mongoose.Schema(
  {
    shipmentMethod: {
      type: String,
      required: true,
      default: "",
    },
    shipmentDate: {
      type: Date,
      required: true,
      default: "",
    },
    shipmentTime: {
      type: Date,
      required: true,
      default: "",
    },
    shipMentStatus: {
      type: String,
      required: true,
      default: "",
    },
    User_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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

const Shipments = mongoose.model("Shipments", ShipmentsModelSchema);

export default Shipments;
