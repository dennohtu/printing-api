import express from "express";

const router = express.Router();

import {
  createShipments,
  readShipments,
  readAllShipments,
  updateShipments,
  deleteShipments,
} from "../controllers/controllers.shipments.js";
import { AddLog } from "../middleware/middleware.logs.js";
import { protect } from "../middleware/middleware.auth.js";
import { checkPermission } from "../middleware/middleware.permissions.js";

router
  .route("/createShipments")
  .post(protect(["admin", "farmer"]), AddLog, checkPermission, createShipments);
router
  .route("/readShipments/:ShipmentsID")
  .get(
    protect(["admin", "farmer", "institution"]),
    AddLog,
    checkPermission,
    readShipments
  );
router
  .route("/readAllShipments")
  .get(
    protect(["admin", "farmer", "institution"]),
    AddLog,
    checkPermission,
    readAllShipments
  );
router
  .route("/updateShipments/:ShipmentsID")
  .put(protect(["admin", "farmer"]), AddLog, checkPermission, updateShipments);
router
  .route("/deleteShipments/:ShipmentsID")
  .delete(
    protect(["admin", "farmer"]),
    AddLog,
    checkPermission,
    deleteShipments
  );

export default router;
