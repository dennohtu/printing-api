import express from "express";
const router = express.Router();
import {
  confirmPayment,
  getAllTransactions,
  getTransaction,
} from "../controllers/controllers.lipanampesa.js";

import { AddLog } from "../middleware/middleware.logs.js";
import { protect } from "../middleware/middleware.auth.js";

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

export default router;
