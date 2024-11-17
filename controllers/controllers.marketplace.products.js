import Products_Model from "../models/models.marketplace.product.js";

// @desc create Marketplace Product
// @method POST
// @route  api/marketplace/createProduct
// @access private

export const createMarketplaceProduct = async (req, res) => {
  try {
    const createMarketplaceProduct = await Products_Model.create(req.body);
    res.json(createMarketplaceProduct);
  } catch (e) {
    console.error("Error while trying to create Marketplace Product", e);

    res.status(503).send({
      message:
        "Something went wrong while trying to createMarketplace Product. Contact admin",
      error: e,
    });
  }
};

// @desc Read Mrketplace product details
// @method GET
// @route api/marketplace/readProducts/:productID
// @access private

export const readMarketPlaceProducts = async (req, res) => {
  try {
    const MarketPlaceProductsRecords = await Products_Model.findOne({
      _id: req.params.productID,
      active: true,
    }).populate("Category_ID");

    if (MarketPlaceProductsRecords) {
      res.json(MarketPlaceProductsRecords);
    } else {
      res.status(204).send({
        message: "MarketPlace Products  not found",
      });
    }
  } catch (e) {
    console.error("Error while trying to read MarketPlaceProduct details", e);

    res.status(503).send({
      message:
        "Something went wrong while trying to read MarketPlaceProduct. Contact admin",
      error: e,
    });
  }
};

// @desc Read all MarketPlaceProducts details
// @method GET
// @route api/MarketPlace/readAllProducts
// @access private

export const readAllMarketplaceProducts = async (req, res) => {
  try {
    const queryList = req.query;
    //  find the crop calendar with the id
    const MarketPlaceProductDetails = await Products_Model.find({
      ...queryList,
      active: true,
    }).populate("Category_ID");

    if (MarketPlaceProductDetails.length > 0) {
      res.json(MarketPlaceProductDetails);
    } else {
      res.status(404).send({
        message: "No Marketplace Products records found",
      });
    }
  } catch (e) {
    console.error(
      "Error while trying to update Marketplace Products details",
      e
    );

    res.status(503).send({
      message:
        "Something went wrong while trying to read Marketplace Products records. Contact admin",
      error: e,
    });
  }
};

// @desc update Marketplace Products stock
// @method PUT
// @route api/Marketplace/updateProductStock/:productID
// @access private
export const addProductStock = async (req, res) => {
  try {
    const marketplaceProductID = req.params.productID;
    const product = await Products_Model.findOne({ _id: marketplaceProductID });
    if (!product) {
      res.status(403).send({
        message: "Product with provided ID not found",
      });
      return;
    }
    //change stock only
    if (req.body.Stock_To_Add) {
      const newQty = product.Product_Stock_Quantity + req.body.Stock_To_Add;
      const prod = await Products_Model.findOneAndUpdate(
        { _id: marketplaceProductID },
        {
          Product_Stock_Quantity: newQty,
        },
        {
          new: true,
        }
      );
      res.json(prod);
    } else {
      res.status(409).send({
        message: "You need to provide the additional stock to increment",
      });
    }
  } catch (e) {
    console.error(
      "Error while trying to update marketplace product details",
      e
    );

    res.status(503).send({
      message:
        "Something went wrong while trying to update the marketplace product record. Contact admin",
      error: e,
    });
  }
};

// @desc update Marketplace Products details
// @method PUT
// @route api/Marketplace/updateProduct/:productID
// @access private

export const updateMarketplaceProducts = async (req, res) => {
  try {
    const marketplaceProductID = req.params.productID;
    const product = await Products_Model.findOne({ _id: marketplaceProductID });
    if (!product) {
      res.status(403).send({
        message: "Product with provided ID not found",
      });
      return;
    }
    //make sure stock qty doesnt change
    if (req.body.Product_Stock_Quantity) {
      req.body.Product_Stock_Quantity = product.Product_Stock_Quantity;
    }
    const prod = await Products_Model.findOneAndUpdate(
      { _id: marketplaceProductID },
      req.body,
      {
        new: true,
      }
    );
    res.json(prod);
  } catch (e) {
    console.error(
      "Error while trying to update marketplace product details",
      e
    );

    res.status(503).send({
      message:
        "Something went wrong while trying to update the marketplace product record. Contact admin",
      error: e,
    });
  }
};

// @desc deactivate marketplace product instead of delete from db
// @route api/marketplace/deleteproduct/:productID
// @access private
export const deleteMarketplaceProduct = async (req, res) => {
  try {
    const prodID = req.params.productID;
    const product = await Products_Model.findOneAndUpdate(
      { _id: prodID },
      {
        active: false,
      },
      {
        new: true,
      }
    );
    res.json(product);
  } catch (e) {
    console.error("Error while trying to delete marketplace product", e);

    res.status(503).send({
      message:
        "Something went wrong while trying to delete the marketplace product.",
      error: e,
    });
  }
};
