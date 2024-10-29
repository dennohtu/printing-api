import { secrets } from "../config/config.config.js";
import request from "request";
import axios from "axios";
export const access = (req, res, next) => {
  try {
    const url =
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
    const auth = `Basic ${new Buffer.from(
      secrets.SAFARICOM_CONSUMER_KEY + ":" + secrets.SAFARICOM_CONSUMER_SECRET
    ).toString("base64")}`;
    axios
      .get(url, {
        headers: {
          Authorization: auth,
        },
      })
      .then((resp) => {
        req.safaricom_access_token = resp.data.access_token;
        next();
      })
      .catch((err) => {
        console.error(err.message);
        res.status(500).send({
          message: "Could not complete request",
          error: err.message,
        });
      });
  } catch (e) {
    console.error("Something went wrong with the payment", e);
    res.status(401).send({
      message: "Something went wrong with the payment",
      error: e.message,
    });
  }
};
