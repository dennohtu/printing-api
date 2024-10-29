import express from "express";

const router = express.Router();

import {
  uploadDocument,
  deleteDocument,
} from "../controllers/controllers.uploads.js";
import { AddLog } from "../middleware/middleware.logs.js";
import { protect } from "../middleware/middleware.auth.js";
import { checkPermission } from "../middleware/middleware.permissions.js";

router
  .route("/uploadDocument/:folder")
  .post(
    protect(["admin", "institution", "farmer", "farm_employee", "customer"]),
    AddLog,
    uploadDocument
  );
router
  .route("/deleteDocument/:folder/:imgName")
  .delete(
    protect(["admin", "institution", "farmer", "farm_employee","customer"]),
    AddLog,
    deleteDocument
  );
export default router;
