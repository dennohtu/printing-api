import express from "express";
const router = express.Router();
import {
  createSendEmails,
  readSendEmails,
  readAllSendEmails,
  updateSendEmails,
  deleteSendEmails,
} from "../controllers/controllers.sendemails.js";
import { AddLog } from "../middleware/middleware.logs.js";
import { protect } from "../middleware/middleware.auth.js";
import { checkPermission } from "../middleware/middleware.permissions.js";

router
  .route("/createSendEmails")
  .post(
    protect(["admin", "farmer"]),
    AddLog,
    checkPermission,
    createSendEmails
  );
router
  .route("/readSendEmails/:SendEmailsID")
  .get(
    protect(["admin", "farmer", "institution"]),
    AddLog,
    checkPermission,
    readSendEmails
  );
router
  .route("/readAllSendEmails")
  .get(
    protect(["admin", "farmer", "institution"]),
    AddLog,
    checkPermission,
    readAllSendEmails
  );
router
  .route("/updateSendEmails/:SendEmailsID")
  .put(protect(["admin", "farmer"]), AddLog, checkPermission, updateSendEmails);
router
  .route("/deleteSendEmails/:SendEmailsID")
  .delete(
    protect(["admin", "farmer"]),
    AddLog,
    checkPermission,
    deleteSendEmails
  );

export default router;
