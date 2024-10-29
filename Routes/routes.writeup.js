import express from "express";
const router = express.Router();

import { AddLog } from "../middleware/middleware.logs.js";
import { protect } from "../middleware/middleware.auth.js";
import { checkPermission } from "../middleware/middleware.permissions.js";
import {
  createWriteup,
  deletewriteup,
  readAllWriteups,
  readWriteup,
  updatewriteup,
} from "../controllers/controllers.writeup.js";

router
  .route("/createwriteup")
  .post(protect(["admin"]), AddLog, checkPermission, createWriteup);
router
  .route("/readwriteup/:writeupID")
  .get(
    protect([
      "admin",
      "farmer",
      "farm_employee",
      "institution",
      "farm_employee",
    ]),
    AddLog,
    checkPermission,
    readWriteup
  );
router
  .route("/readAllwriteup")
  .get(
    protect([
      "admin",
      "farmer",
      "farm_employee",
      "institution",
      "farm_employee",
    ]),
    AddLog,
    checkPermission,
    readAllWriteups
  );
router
  .route("/updatewriteup/:writeupID")
  .put(protect(["admin"]), AddLog, checkPermission, updatewriteup);
router
  .route("/deletewriteup/:writeupID")
  .delete(protect(["admin"]), AddLog, checkPermission, deletewriteup);

export default router;
