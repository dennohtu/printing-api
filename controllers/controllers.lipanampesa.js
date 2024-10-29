import LipaNaMpesaModel from "../models/models.lipanampesa.js";
import { secrets } from "../config/config.config.js";
import request from "request";
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

  if (type === "farm") {
    const payment = await FarmPaymentModel.findById(id);
    return res.send(payment);
  } else if (type === "marketplace") {
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
        "Incorrect type passed. Types allowed are: farm, marketplace, wallet and mpesa",
    });
  }
};

export const getAllTransactions = (req, res) => {
  if (
    req.query.category !== "farm" &&
    req.query.category !== "marketplace" &&
    req.query.category !== "wallet"
  ) {
    return res.status(403).send({
      message: "Category can only be one of 'farm', 'marketplace' or 'wallet'",
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

export const payment_callback = async (req, res) => {
  console.log("-------Callback Enpoint hit---------");
  const checkout_request_id = req.body.checkout_request_id;
  const mpesaReference = req.body.mpesa_receipt_id;
  console.log(checkout_request_id, mpesaReference);
  if (!mpesaReference) {
    console.log("No Mpesa Reference Provided. Not updating anything");
    res.send("Processing complete. No update made");
    return;
  }
  if (!checkout_request_id) {
    console.log("No Checkout Request ID Provided. Not updating anything");
    res.send("Processing complete. No update made");
    return;
  }
  //find payment in farm
  let payment = await FarmPaymentModel.findOne({
    checkoutRequestId: checkout_request_id,
  }).populate("Farm_ID");
  //find payment in order
  if (!payment) {
    payment = await OrderPaymentModel.findOne({
      checkoutRequestId: checkout_request_id,
    });
    if (!payment) {
      //find payment in wallets
      payment = await WalletPaymentModel.findOne({
        checkoutRequestId: checkout_request_id,
      });
      if (!payment) {
        console.log(
          "No payment for the provided checkout request id found. Not updating"
        );
        console.log("............End of Callback.............");
        res.send("Processing complete. No update made");
        return;
      }
      const wallet = await UserWallet.findOne({ _id: payment.Wallet_ID });
      const user = await User.findOne({ _id: wallet.User_ID });
      const phone = payment.payment_phone;
      sendSMS(
        phone,
        `Dear ${user.User_First_Name}, We have received and Successfully processed your payment of Kshs ${payment.amount}, deposit to personal wallet. Login to see your available balance. Thank you for your continued support.`
      );
      sendEmail(
        "thoriumorganicfoods@gmail.com",
        "New Wallet Deposit Confirmed",
        `User ${user.User_First_Name} ${user.User_Last_Name} has deposited Kshs ${payment.amount} into their personal wallet`
      );
      await UserWalletTransaction.create({
        Wallet_ID: payment.Wallet_ID,
        Transaction_Type: "Deposit",
        Amount_Transacted: payment.amount,
      });
    } else {
      const phone = payment.payment_phone;
      const order = await Products_Order_Model.findOne({
        _id: payment.Order_ID,
      });
      const user = await User.findOne({ _id: order.User_ID });
      sendSMS(
        phone,
        `Dear ${user.User_First_Name}, We have received and Successfully processed your payment of Kshs ${payment.amount}, payment for order #${payment.Order_ID}. Thank you for your continued support.`
      );
      sendEmail(
        "thoriumorganicfoods@gmail.com",
        "New Order Payment Confirmed",
        `User ${user.User_First_Name} ${user.User_Last_Name} has paid Kshs ${payment.amount} for marketplace order #${payment.Order_ID}. The order is ready to be delivered.`
      );
      await Products_Order_Model.findOneAndUpdate(
        { _id: payment.Order_ID },
        { status: "COMPLETE" }
      );
    }
  } else {
    const phone = payment.payment_phone;
    const farm = await Farm.findOne({ _id: payment.Farm_ID });
    const user = await User.findOne({ _id: farm.User_ID });
    sendSMS(
      phone,
      `Dear ${user.User_First_Name}, We have received and Successfully processed your payment of Kshs ${payment.amount}, subscription for the farm ${payment.Farm_ID.Farm_Name}. Thank you for your continued support`
    );
    sendEmail(
      "thoriumorganicfoods@gmail.com",
      "New Farm Subscription Payment Confirmed",
      `User ${user.User_First_Name} ${user.User_Last_Name} has paid Kshs ${payment.amount} for farm subscription. The activated farm is ${farm.Farm_Name}.`
    );
    await Farm.findOneAndUpdate(
      { _id: payment.Farm_ID },
      {
        isSubscriptionFeePaid: true,
        Subscription_Expiry_Date: new Date(
          new Date().setFullYear(new Date().getFullYear() + 1)
        ).getTime(),
      }
    );
  }
  payment.Mpesa_ID = mpesaReference;
  payment.status = "COMPLETE";
  payment.save();
  console.log(".............Callback transaction Successful..............");
  console.log(".............Callback Procesing complete..............");
  res.send("Processing Successful");
};
