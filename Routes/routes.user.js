import {
  checkOTPValid,
  deleteUserDetails,
  loginUser,
  readAllUserDetails,
  registerNewUser,
  sendOTPToPhoneNUmber,
  updateUserDetails,
  verifyUser,
  readOrderHistory,
  registerClient,
  getClientDetailsByEmail,
} from "../controllers/controllers.user.js";

import { AddLog } from "../middleware/middleware.logs.js";
import express from "express";
import { protect, verify } from "../middleware/middleware.auth.js";
import { requestLimit } from "../middleware/middleware.rateLimit.js";

const router = express.Router();

router.route("/register").post(AddLog, registerNewUser);
router.route("/login").post(AddLog, loginUser);
router.route("/checkOTPValid").post(AddLog, checkOTPValid);
router.route("/sendOTPToPhoneNUmber").post(AddLog, sendOTPToPhoneNUmber);
router.route("/verifyToken").get(AddLog, verify);

//create user
router.route("/createUser").post(protect(["admin"]), AddLog, registerNewUser);

router.route("/createClient").post(AddLog, registerClient);

router.route("/getClientByEmail").get(AddLog, getClientDetailsByEmail);

//read all users
router
  .route("/readAllUser")
  .get(protect(["admin"]), AddLog, readAllUserDetails);

router
  .route("/readOrderHistory/:Order_ID")
  .get(protect(["customer"]), AddLog, readOrderHistory);

//update user
router
  .route("/updateUser/:userID")
  .put(protect(["customer"]), AddLog, updateUserDetails);

//delete user
router
  .route("/deleteUser/:userID")
  .delete(protect([]), AddLog, deleteUserDetails);

router.route("/verify/:userID").get(protect([]), AddLog, verifyUser);

export default router;
