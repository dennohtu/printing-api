import express from "express";

const router = express.Router();

import {
  createBanner,
  readAllBannerDetails,
  readAllActiveBannerDetails,
  readBannerDetails,
  updateBannerDetails,
  deleteBanner,
} from "../controllers/controllers.banners.js";
import { AddLog } from "../middleware/middleware.logs.js";
import { protect } from "../middleware/middleware.auth.js";
import { checkPermission } from "../middleware/middleware.permissions.js";

router
  .route("/createBanner")
  .post(protect(["admin"]), AddLog, checkPermission, createBanner);
router
  .route("/readBanner/:BannerID")
  .get(
    protect(["admin", "farmer", "institution", "farm_employee", "customer"]),
    AddLog,
    checkPermission,
    readBannerDetails
  );
router
  .route("/readAllBanner")
  .get(
    protect(["admin", "farmer", "institution", "farm_employee", "customer"]),
    AddLog,
    readAllBannerDetails
  );
router
  .route("/readAllActiveBanner")
  .get(
    protect(["admin", "farmer", "institution", "farm_employee", "customer"]),
    AddLog,
    readAllActiveBannerDetails
  );
router
  .route("/updateBanner/:BannerID")
  .put(
    protect(["admin"]),
    AddLog,
    checkPermission,
    updateBannerDetails
  );
router
  .route("/deleteBanner/:BannerID")
  .delete(
    protect(["admin"]),
    AddLog,
    checkPermission,
    deleteBanner
  );

export default router;
