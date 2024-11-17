import express from "express";

const router = express.Router();

import { AddLog } from "../middleware/middleware.logs.js";
import { protect } from "../middleware/middleware.auth.js";
import { checkPermission } from "../middleware/middleware.permissions.js";
import {
  addMarketPlaceOrderPayment,
  createMarketplaceOrder,
  deleteMarketplaceOrder,
  payWithWallet,
  readAllMarketplaceOrders,
  readMarketPlaceOrder,
  readPaidMarketplaceOrders,
  updateMarketplaceOrder,
} from "../controllers/controllers.marketplace.orders.js";

router
  .route("/createOrder")
  .post(AddLog, checkPermission, createMarketplaceOrder);

router.route("/readOrders/:orderID").get(AddLog, readMarketPlaceOrder);
router.route("/readAllOrders").get(AddLog, readAllMarketplaceOrders);
router
  .route("/readAllPaidOrders")
  .get(protect(["admin", "farm_employee"]), AddLog, readPaidMarketplaceOrders);

router
  .route("/updateOrder/:orderId")
  .put(
    protect(["admin", "customer", "farmer", "institution", "farm_employee"]),
    AddLog,
    checkPermission,
    updateMarketplaceOrder
  );
router
  .route("/deleteOrder/:orderID")
  .delete(
    protect(["admin", "customer", "farmer", "institution", "farm_employee"]),
    AddLog,
    checkPermission,
    deleteMarketplaceOrder
  );

router
  .route("/payWithWallet/:orderID")
  .get(
    AddLog,
    protect(["admin", "institution", "farmer", "farm_employee", "customer"]),
    payWithWallet
  );

router
  .route("/pay")
  .post(AddLog, protect(["admin"]), addMarketPlaceOrderPayment);

export default router;
