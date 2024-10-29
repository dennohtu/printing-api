import express from "express";
const router = express.Router();
import {
  confirmPayment,
  createStk,
  getAllTransactions,
  getTransaction,
  payment_callback,
} from "../controllers/controllers.lipanampesa.js";

import { AddLog } from "../middleware/middleware.logs.js";
import { protect } from "../middleware/middleware.auth.js";
import { access } from "../middleware/middleware.mpesaAccessToken.js";

router
  .route("/stkpush/create")
  .post(
    protect([
      "admin",
      "farmer",
      "institution",
      "customer",
      "farmer_employee",
      "other",
    ]),
    AddLog,
    createStk
  );

router
  .route("/stkpush/confirm")
  .post(
    protect([
      "admin",
      "farmer",
      "institution",
      "customer",
      "farmer_employee",
      "other",
    ]),
    AddLog,
    confirmPayment
  );

router
  .route("/stkpush/transactions/:id")
  .get(
    protect([
      "admin",
      "farmer",
      "institution",
      "customer",
      "farmer_employee",
      "other",
    ]),
    AddLog,
    getTransaction
  );

router
  .route("/stkpush/transactions")
  .get(
    protect([
      "admin",
      "farmer",
      "institution",
      "customer",
      "farmer_employee",
      "other",
    ]),
    AddLog,
    getAllTransactions
  );

router.route("/stkpush/callback").put(AddLog, payment_callback);

export default router;
