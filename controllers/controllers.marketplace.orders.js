import Client from "../models/models.client.js";
import Products_Order_Model from "../models/models.marketplace.order.js";
import Products_Model from "../models/models.marketplace.product.js";
import OrderPaymentModel from "../models/models.payment.order.js";
import UserWallet from "../models/models.user.wallet.js";
import UserWalletTransaction from "../models/models.user.wallet.transactionHistory.js";

function randomString(length) {
  let chars = "QWERTYUIOPLKJHGFDSAZXCVBNM1234567890";
  var result = "";
  for (var i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}
// @desc create Marketplace Order
// @method POST
// @route  api/marketplace/createOrder
// @access private

export const createMarketplaceOrder = async (req, res) => {
  try {
    let data = req.body;
    //check if a client exists with email provided
    let user = await Client.findOne({ User_Email: data.client.User_Email });
    if (!user) {
      const client = new Client(data.client);
      user = await client.save();
    }
    //create new order for the user
    let product = await Products_Model.findOne({ _id: data.order.Product_ID });
    if (!product) {
      res.status(400).send("Invalid product");
      return;
    }
    const order = new Products_Order_Model({
      Client: user,
      Product: product,
      Quantity: data.order.quantity,
      Order_ID: randomString(8),
    });

    let newOrder = await order.save();

    res.send("Order " + newOrder.Order_ID + " created successfully");
  } catch (e) {
    console.error("Error while trying to create Marketplace Order", e);

    res.status(503).send({
      message:
        "Something went wrong while trying to createMarketplace Order. Contact admin",
      error: e,
    });
  }
};

// @desc Read Mrketplace order details
// @method GET
// @route api/marketplace/readProducts/:orderID
// @access private

export const readMarketPlaceOrder = async (req, res) => {
  try {
    const MarketPlaceOrderRecords = await Products_Order_Model.findOne({
      _id: req.params.orderID,
    })
      .populate("Client")
      .populate("Product");

    if (MarketPlaceOrderRecords) {
      res.json(MarketPlaceOrderRecords);
    } else {
      res.status(403).send({
        message: "MarketPlace Order  not found",
      });
    }
  } catch (e) {
    console.error("Error while trying to read MarketPlaceOrder details", e);

    res.status(503).send({
      message:
        "Something went wrong while trying to read MarketPlaceOrder. Contact admin",
      error: e,
    });
  }
};

// @desc Read all MarketPlaceOrders details
// @method GET
// @route api/MarketPlace/readAllOrders
// @access private

export const readAllMarketplaceOrders = async (req, res) => {
  try {
    const queryList = req.query;
    //  find the crop calendar with the id
    const MarketPlaceOrderDetails = await Products_Order_Model.find({
      ...queryList,
      active: true,
    })
      .populate("Client")
      .populate("Product");

    if (MarketPlaceOrderDetails.length > 0) {
      res.json(MarketPlaceOrderDetails);
    } else {
      res.status(403).send({
        message: "No Marketplace Order records found",
      });
    }
  } catch (e) {
    console.error("Error while trying to update Marketplace Order details", e);

    res.status(503).send({
      message:
        "Something went wrong while trying to read Marketplace Order records. Contact admin",
      error: e.message,
    });
  }
};

export const updateMarketplaceOrder = async (req, res) => {
  try {
    const order = await Products_Order_Model.findOneAndUpdate(
      { _id: req.params.orderId },
      { ...req.body },
      { new: true }
    );
    res.send(order);
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "COuld not update order",
      error: err.message,
    });
  }
};

// @desc deactivate marketplace order instead of delete from db
// @route api/marketplace/deleteorder/:orderID
// @access private
export const deleteMarketplaceOrder = async (req, res) => {
  try {
    const prodID = req.params.orderID;
    const product = await Products_Order_Model.findOne({ _id: prodID });
    if (product) {
      if (product.status === "PENDING") {
        product.delete();
      } else {
        product.active = false;
        product.save();
      }
      res.json({
        message: "deleted successfully",
      });
    } else {
      res.status(403).send({
        message: "The order does not exist",
      });
    }
  } catch (e) {
    console.error("Error while trying to delete marketplace order", e);

    res.status(503).send({
      message:
        "Something went wrong while trying to delete the marketplace order.",
      error: e,
    });
  }
};

export const readPaidMarketplaceOrders = async (req, res) => {
  try {
    const orders = await OrderPaymentModel.find({
      active: true,
    }).populate({
      path: "Order_ID",
      populate: {
        path: "Product",
        model: "Marketplace_Products",
        populate: {
          path: "Category_ID",
          model: "Categories",
        },
      },
    });

    if (orders.length === 0) {
      res.status(403).send({
        message: "No orders found",
      });
    } else {
      res.send(orders);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "An error occured while processing your request",
      error: err.message,
    });
  }
};

export const addMarketPlaceOrderPayment = async (req, res) => {
  try {
    let data = req.body;
    //order exists
    let order = await Products_Order_Model.findOne({ _id: data.Order_ID });
    if (!order) {
      res.status(400).send("Invalid Order Id");
      return;
    }
    //amount > 0
    if (data.Amount_Paid <= 0) {
      res.status(400).send("Amount to be paid must be greater than 0");
      return;
    }
    let payment = new OrderPaymentModel({
      ...data,
      Payment_ID: randomString(8),
    });
    let savedPayment = await payment.save();

    res.send(
      "Payment with reference #" +
        savedPayment.Payment_ID +
        " saved successfully"
    );
  } catch (err) {
    res.status(503).send({
      message: "An error occured when processing your request",
      error: err.message,
    });
  }
};

export const payWithWallet = async (req, res) => {
  try {
    const order = await Products_Order_Model.findOne({
      _id: req.params.orderID,
      active: true,
    });
    if (!order) {
      res.status(403).send({
        message: "Invalid Order number",
      });
      return;
    }
    const wallet = await UserWallet.findOne({ User_ID: req.user?.id });
    if (wallet.Amount - order.Total_Cost < 0) {
      res.status(403).send({
        message: "Not enough funds in wallet",
      });
      return;
    }
    const transaction = await UserWalletTransaction.create({
      Wallet_ID: wallet._id,
      Transaction_Type: "Withdrawal",
      Amount_Transacted: order.Total_Cost,
    });

    const payment = await OrderPaymentModel.create({
      Wallet_Transaction_ID: transaction._id,
      status: "COMPLETE",
      Order_ID: order._id,
      Payment_Date: new Date().toISOString(),
    });
    await Products_Order_Model.findOneAndUpdate(
      { _id: order._id },
      { status: "COMPLETE" }
    );
    res.send(payment);
  } catch (err) {
    console.error(err);
    res.status(503).send({
      message: "An error occured when processing your request",
      error: err.message,
    });
  }
};
