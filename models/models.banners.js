import mongoose from "mongoose";

const BannerModel = mongoose.Schema(
  {
    Message: {
      type: String,
      required: true,
      default: "",
    },
    Expiry: {
      type: Date,
      default: new Date(new Date().getTime() + 86400000),
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

const Banners = mongoose.model("Banners", BannerModel);

export default Banners;
