import LipaNaMpesaModel from "../models/models.lipanampesa.js";
import { secrets } from "../config/config.config.js";
import axios from "axios";
import Products_Order_Model from "../models/models.marketplace.order.js";
import WalletPaymentModel from "../models/models.payment.wallet.js";
import UserWallet from "../models/models.user.wallet.js";
import UserWalletTransaction from "../models/models.user.wallet.transactionHistory.js";
import { sendSMS } from "../utils/utils.sendSMS.js";
import { sendEmail } from "../utils/utils.sendEmails.js";
import User from "../models/models.user.js";

const formatDate = (dateString) => {
  const date = new Date(dateString);

  return `${date.getFullYear()}-${
    date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
  }-${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}`;
};

export const confirmPayment = (req, res) => {
  const checkoutRequestID = req.body.checkoutRequestID;
  if (!checkoutRequestID) {
    return res.status(403).send({
      message: "Checkout Request ID is required",
    });
  }
  return axios
    .post(
      secrets.PAYLENT_BASE_URL + secrets.PAYLENT_CONFIRM_URL,
      {
        checkout_request_id: checkoutRequestID,
      },
      {
        params: {
          client_secret: secrets.PAYLENT_CLIENT_SECRET,
        },
        headers: {
          ContentType: "applicaiton/json",
          Accept: "application/json",
          utm_source: "web",
        },
      }
    )
    .then(async (response1) => {
      const data = response1.data;
      if (data.data.ResultCode !== "0") {
        return res.status(403).send({
          message: "Payment processing not successful",
          error: data.data.ResultDesc,
          checkoutRequestID: checkoutRequestID,
        });
      } else {
        res.send({
          message: data.data.ResultDesc,
        });
      }
    })
    .catch((err) => {
      if (err.response && err.response.status === 500) {
        res.status(403).send({
          message: "User has not made any input",
        });
      } else {
        res.status(500).send({
          message: "Could not confirm payment",
          error: err.message,
        });
      }
    });
};

export const getTransaction = async (req, res) => {
  const id = req.params.id;
  const type = req.query.type;

  if (type === "marketplace") {
    const payment = await OrderPaymentModel.findById(id);
    return res.send(payment);
  } else if (type === "wallet") {
    const payment = await WalletPaymentModel.findById(id);
    return res.send(payment);
  } else if (type === "mpesa") {
    const data = await getTransactions({ mpesaReference: id });
    if (data.data) {
      res.send(data.data);
    } else {
      res.status(403).send(data.error);
    }
  } else {
    res.status(403).send({
      message:
        "Incorrect type passed. Types allowed are: marketplace, wallet and mpesa",
    });
  }
};

export const getAllTransactions = (req, res) => {
  if (req.query.category !== "marketplace" && req.query.category !== "wallet") {
    return res.status(403).send({
      message: "Category can only be one of 'marketplace' or 'wallet'",
    });
  }
  const data = {
    action_type: "contribute_intitiative",
    reference_occasion: "changisha",
    reference_occasion_id: secrets.PAYLENT_REFERENCE_OCCASION_ID,
    user_id: secrets.PAYLENT_USER_ID,
    category:
      req.query.category === "farm"
        ? "farm_subscription"
        : req.query.category === "marketplace"
        ? "marketplace_payment"
        : "wallet_deposit",
    limit: "20",
    sort: "-created_at",
    from: req.query.from ? formatDate(req.query.from) : undefined,
    to: req.query.to ? formatDate(req.query.to) : undefined,
    user_Phone: req.query.phone ? req.query.phone : undefined,
  };
  Object.keys(data).forEach(
    (key) => data[key] === undefined && delete data[key]
  );

  axios
    .get(secrets.PAYLENT_BASE_URL + secrets.PAYLENT_TRANSACTIONS_URL, {
      params: data,
      headers: {
        ContentType: "applicaiton/json",
        Accept: "application/json",
        utm_source: "web",
      },
    })
    .then((response) => {
      const data = response.data.data;
      res.send(data);
    })
    .catch((err) => {
      if (err.response && err.response.data) {
        res.status(403).send({ error: err.response });
      } else
        res.status(403).send({
          message: "Could not fetch transactions",
          error: err.message,
        });
    });
};
