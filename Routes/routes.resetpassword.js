import express from "express";

const router = express.Router();

import {
  createResetPassword,
  resetPassword,
  // readAllResetPassword,
  // updateResetPassword,
  // deleteResetPassword,
} from "../controllers/controllers.resetpassword.js";
import { AddLog } from "../middleware/middleware.logs.js";
import { protect } from "../middleware/middleware.auth.js";

router.route("/createResetPassword").post(createResetPassword);
router.route("/resetPassword").post(AddLog, resetPassword);

// router.route('/readAllResetPassword').get(protect(["admin","farmer","institution"]), AddLog,checkPermission,readAllResetPassword)
// router.route('/updateResetPassword/:ResetPasswordID').put(protect(["admin","farmer"]), AddLog,checkPermission,updateResetPassword)
// router.route('/deleteResetPassword/:ResetPasswordID').delete(protect(["admin","farmer"]), AddLog,checkPermission,deleteResetPassword)
//

export default router;
