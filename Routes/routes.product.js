import express from "express";

const router = express.Router();

import {
  createProduct,
  readAllProductDetails,
  readProductDetails,
  createProductVariation,
  updateProductVariationDetails,
  updateProductDetails,
  deleteProduct,
} from "../controllers/controller.products.js";
import { AddLog } from "../middleware/middleware.logs.js";
import { protect } from "../middleware/middleware.auth.js";
import { checkPermission } from "../middleware/middleware.permissions.js";

router
  .route("/createProduct")
  .post(protect(["admin", "farmer"]), AddLog, checkPermission, createProduct);
router
  .route("/createProductVariation/:productID")
  .post(
    protect(["admin", "farmer"]),
    AddLog,
    checkPermission,
    createProductVariation
  );

router
  .route("/readProduct/:productID")
  .get(
    protect(["admin", "farmer", "institution"]),
    AddLog,
    checkPermission,
    readProductDetails
  );
router.route("/readAllProduct").get(AddLog, readAllProductDetails);
router
  .route("/updateProductVariation/:productID/:variationID")
  .put(
    protect(["admin", "farmer"]),
    AddLog,
    checkPermission,
    updateProductVariationDetails
  );
router
  .route("/updateProduct/:productID")
  .put(
    protect(["admin", "farmer"]),
    AddLog,
    checkPermission,
    updateProductDetails
  );
router
  .route("/deleteProduct/:productID")
  .delete(protect(["admin", "farmer"]), AddLog, checkPermission, deleteProduct);

export default router;
