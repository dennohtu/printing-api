import express from "express";

const router = express.Router();

import { AddLog } from "../middleware/middleware.logs.js";
import { protect } from "../middleware/middleware.auth.js";
import { checkPermission } from "../middleware/middleware.permissions.js";
import {
  addProductStock,
  createMarketplaceProduct,
  deleteMarketplaceProduct,
  readAllMarketplaceProducts,
  readMarketPlaceProducts,
  updateMarketplaceProducts,
} from "../controllers/controllers.marketplace.products.js";

router
  .route("/createProduct")
  .post(protect(["admin"]), AddLog, checkPermission, createMarketplaceProduct);
router.route("/readProducts/:productID").get(AddLog, readMarketPlaceProducts);
router.route("/readAllProducts").get(AddLog, readAllMarketplaceProducts);
router
  .route("/updateProducts/:productID")
  .put(protect(["admin"]), AddLog, updateMarketplaceProducts);

router
  .route("/addProductStock/:productID")
  .put(protect(["admin"]), AddLog, checkPermission, addProductStock);
router
  .route("/deleteProduct/:productID")
  .delete(
    protect(["admin"]),
    AddLog,
    checkPermission,
    deleteMarketplaceProduct
  );

export default router;
