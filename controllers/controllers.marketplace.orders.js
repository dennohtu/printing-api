import Products_Order_Model from "../models/models.marketplace.order.js";
import Products_Model from "../models/models.marketplace.product.js";
import OrderPaymentModel from "../models/models.payment.order.js";
import UserWallet from "../models/models.user.wallet.js";
import UserWalletTransaction from "../models/models.user.wallet.transactionHistory.js";

// @desc create Marketplace Order
// @method POST
// @route  api/marketplace/createOrder
// @access private

export const createMarketplaceOrder = async (req, res) => {
  try {
    const productId = req.body.Product_ID;
    const qty = Number.parseInt(req.body.quantity);
    const userId = req.body.User_ID;
    const product = await Products_Model.findOne({
      _id: productId,
      active: true,
    });
    if (!product) {
      res.status(403).send({
        message: "No such product exists",
      });
      return;
    }
    //check if an order exists for current user
    const orderExists = await Products_Order_Model.findOne({
      User_ID: userId,
      status: "PENDING",
    });
    if (orderExists) {
      const prodTotalCost = product.Product_Unit_Price * qty;
      const order = {
        Total_Cost: orderExists.Total_Cost + prodTotalCost,
        User_ID: userId,
      };
      const prod = {
        Product_ID: productId,
        quantity: qty,
        Total_Cost: prodTotalCost,
      };
      //check if product exists in list
      const productExists = orderExists.Products.filter((p) =>
        p.Product_ID.equals(productId)
      );
      console.log(productExists);
      let createMarketplaceOrder;
      if (productExists.length > 0) {
        const newQty = qty + productExists[0].quantity;
        const newTotalCost = newQty * product.Product_Unit_Price;
        createMarketplaceOrder = await Products_Order_Model.findOneAndUpdate(
          { _id: orderExists._id },
          {
            Total_Cost:
              orderExists.Total_Cost -
              productExists[0].Total_Cost +
              newTotalCost,
            User_ID: userId,
          },
          { new: true }
        ).populate(["User_ID", "Products.Product_ID"]);
        createMarketplaceOrder.Products.map((prod) => {
          if (prod.Product_ID.equals(productId)) {
            prod.Total_Cost = newTotalCost;
            prod.quantity = newQty;
          }
          return;
        });
        createMarketplaceOrder.save();
        res.json(createMarketplaceOrder);
        return;
      }
      createMarketplaceOrder = await Products_Order_Model.findOneAndUpdate(
        { _id: orderExists._id },
        order,
        { new: true }
      );
      createMarketplaceOrder.Products.push(prod);
      await createMarketplaceOrder.save();
      await createMarketplaceOrder.populate(["User_ID", "Products.Product_ID"]);
      res.json(createMarketplaceOrder);
      return;
    }

    const prodTotalCost = product.Product_Unit_Price * qty;
    const order = {
      Total_Cost: prodTotalCost,
      User_ID: userId,
      status: "PENDING",
    };
    const prod = {
      Product_ID: productId,
      quantity: qty,
      Total_Cost: prodTotalCost,
    };
    const createMarketplaceOrder = await Products_Order_Model.create(order);
    createMarketplaceOrder.Products.push(prod);
    await createMarketplaceOrder.save();
    await createMarketplaceOrder.populate(["User_ID", "Products.Product_ID"]);
    res.json(createMarketplaceOrder);
  } catch (e) {
    console.error("Error while trying to create Marketplace Order", e);

    res.status(503).send({
      message:
        "Something went wrong while trying to createMarketplace Order. Contact admin",
      error: e,
    });
  }
};

// @desc add to Marketplace Order
// @method POST
// @route  api/marketplace/addToOrder
// @access private
export const addOrderItem = async (req, res) => {
  try {
    const orderId = req.body.Order_ID;
    const productId = req.body.Product_ID;
    const qty = Number.parseInt(req.body.quantity);
    const product = await Products_Model.findOne({
      _id: productId,
      active: true,
    });
    if (!product) {
      res.status(403).send({
        message: "No such product exists",
      });
      return;
    }
    const order = await Products_Order_Model.findOne({
      _id: orderId,
      active: true,
    });
    if (!order) {
      res.status(403).send({
        message: "No such order exists",
      });
      return;
    }

    const exists = order.Products.filter((ob) =>
      ob.Product_ID.equals(productId)
    );
    let updateMarketplaceOrder;
    let newTotal;
    let newQty;
    if (exists.length > 0) {
      newQty = exists[0].quantity + qty;
      newTotal = product.Product_Unit_Price * newQty;
      const ordernew = {
        Total_Cost: order.Total_Cost - exists[0].Total_Cost + newTotal,
      };
      updateMarketplaceOrder = await Products_Order_Model.findOneAndUpdate(
        { _id: orderId, active: true },
        ordernew,
        { new: true }
      ).populate("Products.Product_ID");
    } else {
      newTotal = product.Product_Unit_Price * qty;
      newQty = qty;
      const ordernew = {
        Total_Cost: order.Total_Cost + prodTotalCost,
      };
      updateMarketplaceOrder = await Products_Order_Model.findOneAndUpdate(
        { _id: orderId, active: true },
        ordernew,
        { new: true }
      ).populate("Products.Product_ID");
    }

    updateMarketplaceOrder.Products.map((prod) => {
      if (prod.Product_ID.equals(productId)) {
        prod.Total_Cost = newTotal;
        prod.quantity = newQty;
      }
    });

    updateMarketplaceOrder.save();
    res.json(updateMarketplaceOrder);
  } catch (e) {
    console.error("Error while trying to update  Marketplace Order", e);

    res.status(503).send({
      message:
        "Something went wrong while trying to update Marketplace Order. Contact admin",
      error: e.message,
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
      .populate("User_ID")
      .populate("Products.Product_ID");

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
      .populate("User_ID")
      .populate("Products.Product_ID");

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

// @desc remove from Marketplace order
// @method PUT
// @route api/Marketplace/removeFromOrder
// @access private

export const removeMktPlaceProduct = async (req, res) => {
  try {
    const productId = req.body.Product_ID;
    const orderId = req.body.Order_ID;

    const product = await Products_Model.findOne({
      _id: productId,
      active: true,
    });

    if (!product) {
      res.status(403).send({
        message: "Order with provided ID not found",
      });
      return;
    }

    const order = await Products_Order_Model.findOne({
      _id: orderId,
      active: true,
    });

    if (!order) {
      res.status(403).send({
        message: "No such order exists",
      });
      return;
    }

    //pop item from array
    const item = order.Products.filter((ob) => ob.Product_ID.equals(productId));
    if (item.length === 0) {
      res.status(403).send({
        message: "Product is not part of this order",
      });
      return;
    }

    //decrement total order cost
    const newTotal = order.Total_Cost - item[0].Product_ID.Product_Unit_Price;
    const updatedOrderCost = {
      Total_Cost: newTotal,
    };

    //save
    const prod = await Products_Order_Model.findOneAndUpdate(
      { _id: orderId },
      updatedOrderCost,
      {
        new: true,
      }
    );

    prod.Products.map(async (product) => {
      if (product.Product_ID.equals(productId)) {
        const index = prod.Products.findIndex((p) =>
          p.Product_ID.equals(productId)
        );
        if (index === -1) {
          await Products_Order_Model.findOneAndUpdate(
            { _id: orderId },
            { Total_Cost: order.Total_Cost }
          ).populate(["User_ID", "Products.Product_ID"]);
        } else {
          //decrement quantity & total_cost per product
          if (prod.Products[index].quantity > 1) {
            prod.Products[index].quantity--;
            const updateTotalCost =
              prod.Products[index].Total_Cost -
              prod.Products[index].Product_ID.Product_Unit_Price;
            prod.Products[index].Total_Cost = updateTotalCost;
          } else {
            prod.Products.splice(index, 1);
          }

          console.log(prod);
          prod.save();
        }
      }
      return;
    });
    res.json(prod);
  } catch (e) {
    console.error(
      "Error while trying to update marketplace product details",
      e
    );

    res.status(503).send({
      message:
        "Something went wrong while trying to update the marketplace product record. Contact admin",
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
      status: "COMPLETE",
      active: true,
    })
      .populate("Wallet_Transaction_ID")
      .populate({
        path: "Order_ID",
        populate: {
          path: "Products.Product_ID",
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
