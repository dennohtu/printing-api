import express from "express";
const router = express.Router();

import { AddLog } from "../middleware/middleware.logs.js";
import { protect } from "../middleware/middleware.auth.js";
import { checkPermission } from "../middleware/middleware.permissions.js";
import {
  createWalletTransaction,
  readAllWalletTransactions,
  readUserWallet,
  readWalletTransactions,
} from "../controllers/controllers.user.wallettransactions.js";

router
  .route("/readWallet/:UserID")
  .get(
    AddLog,
    protect(["admin", "farmer", "farm_employee", "institution", "customer"]),
    readUserWallet
  );

router
  .route("/createTransaction")
  .post(
    protect(["admin", "farmer", "farm_employee", "institution","customer"]),
    AddLog,
    checkPermission,
    createWalletTransaction
  );
router
  .route("/:WalletID/readTransactions")
  .get(
    protect(["admin", "farmer", "institution", "farm_employee","customer"]),
    AddLog,
    checkPermission,
    readWalletTransactions
  );
router
  .route("/readAllTransactions")
  .get(
    protect(["admin", "farmer", "institution", "farm_employee","customer"]),
    AddLog,
    checkPermission,
    readAllWalletTransactions
  );

export default router;
