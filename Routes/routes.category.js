import express from "express";

const router = express.Router();

import {
  createCategory,
  readAllCategoryDetails,
  readCategoryDetails,
  updateCategoryDetails,
  deleteCategory,
} from "../controllers/controllers.category.js";
import { AddLog } from "../middleware/middleware.logs.js";
import { protect } from "../middleware/middleware.auth.js";
import { checkPermission } from "../middleware/middleware.permissions.js";

router
  .route("/createCategory")
  .post(protect(["admin", "farmer"]), AddLog, checkPermission, createCategory);
router
  .route("/readCategory/:categoryID")
  .get(
    protect(["admin", "farmer", "institution", "farm_employee", "customer"]),
    AddLog,
    checkPermission,
    readCategoryDetails
  );
router
  .route("/readAllCategory")
  .get(
    protect(["admin", "farmer", "institution", "farm_employee", "customer"]),
    AddLog,
    readAllCategoryDetails
  );
router
  .route("/updateCategory/:categoryID")
  .put(
    protect(["admin", "farmer"]),
    AddLog,
    checkPermission,
    updateCategoryDetails
  );
router
  .route("/deleteCategory/:categoryID")
  .delete(
    protect(["admin", "farmer"]),
    AddLog,
    checkPermission,
    deleteCategory
  );

export default router;
