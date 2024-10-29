// @desc create CropCalendar details
// @method POST
// @route  api/cropcalendar/createCropCalendar
// @access private

import UserWallet from "../models/models.user.wallet.js";
import UserWalletTransaction from "../models/models.user.wallet.transactionHistory.js";

export const readUserWallet = async (req, res) => {
  try {
    const userId = req.params.UserID;
    const wallet = await UserWallet.findOne({
      User_ID: userId,
      active: true,
    });

    //create wallet if not found on read
    if (!wallet) {
      try {
        const newWallet = await UserWallet.create({
          User_ID: userId,
          Amount: 0,
        });
        return res.send(newWallet);
      } catch (err) {
        console.error(
          "No wallet found for this user... Error creating new wallet ",
          err.message
        );
        return res.status(503).send({
          message:
            "No wallet found for this user... Error creating new wallet ",
          error: err.message,
        });
      }
    }

    return res.send(wallet);
  } catch (err) {
    console.error("Error reading wallet details: ", err.message);
    res.status(503).send({
      message: "Could not fetch user wallet",
      error: err.message,
    });
  }
};

export const createWalletTransaction = async (req, res) => {
  try {
    //type can only be Deposit/withdraw
    if (
      req.body.Transaction_Type !== "Deposit" &&
      req.body.Transaction_Type !== "Withdraw" &&
      req.body.Transaction_Type !== "Reversal"
    ) {
      res.status(403).send({
        message:
          "Transaction type can only be 'Deposit', 'Withdraw' or 'Reversal'",
      });
      return;
    }
    if (req.body.Amount < 0) {
      res.status(403).send({
        message: "Transaction Amount cannot be less than 0",
      });
      return;
    }
    let wallet;
    if (req.body.Wallet_ID)
      wallet = await UserWallet.findById(req.body.Wallet_ID);
    else wallet = await UserWallet.findOne({ User_ID: req.body.User_ID });
    if (wallet) {
      if (
        req.body.Transaction_Type === "Withdraw" &&
        wallet.Amount - req.body.Amount_Transacted < 0
      ) {
        res.status(403).send({
          message:
            "Not enough money in your wallet to complete this transaction",
        });
        return;
      }
    } else {
      res.status(403).send({
        message: "Wallet does not exist",
      });
      return;
    }

    let createTransaction;
    if (req.body.Wallet_ID)
      createTransaction = await UserWalletTransaction.create(req.body);
    else
      createTransaction = await UserWalletTransaction.create({
        ...req.body,
        Wallet_ID: wallet._id,
      });
    res.json(createTransaction);
  } catch (e) {
    console.error("Error while trying to create Transaction details", e);

    res.status(503).send({
      message:
        "Something went wrong while trying to create Transaction details. Contact admin",
      error: e,
    });
  }
};

// @desc Read Wallet transaction details
// @method GET
// @route api/user/wallet/:WalletID/readTransactions
// @access private

export const readWalletTransactions = async (req, res) => {
  try {
    const walletId = req.params.WalletID;
    const transactionRecords = await UserWalletTransaction.find({
      Wallet_ID: walletId,
      active: true,
    });

    //  if no records throw 404 error
    transactionRecords.length > 0
      ? res.json(transactionRecords)
      : res.status(403).send({
          message: "No records found",
        });
  } catch (e) {
    console.error("Error while trying to read transaction details", e);

    res.status(503).send({
      message:
        "Something went wrong while trying to read transactions. Contact admin",
      error: e.message,
    });
  }
};

// @desc Read Wallet transaction details
// @method GET
// @route api/user/wallet/readAllTransactions
// @access private

export const readAllWalletTransactions = async (req, res) => {
  try {
    const queryList = req.query;
    //  find the crop calendar with the id
    const transactionDetails = await UserWalletTransaction.find({
      ...queryList,
      active: true,
    });

    //  if no records throw 404 error
    transactionDetails.length > 0
      ? res.json(transactionDetails)
      : res.status(403).send({
          message: "No records found",
        });
  } catch (e) {
    console.error("Error while trying to update transaction details", e);

    res.status(503).send({
      message:
        "Something went wrong while trying to read transaction records. Contact admin",
      error: e.message,
    });
  }
};
