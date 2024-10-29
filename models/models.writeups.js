import mongoose from "mongoose";
const Writeup = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      default: "",
    },
    crop_ID: {
      type: mongoose.Schema.Types.ObjectId,
      default: "Crop",
    },
    text: {
      type: String,
      required: true,
      default: "",
    },
    table: {
      type: Object,
      default: [],
    },
    photo: {
      type: String,
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

const WriteupModel = mongoose.model("Writeup", Writeup);

export default WriteupModel;
