//import model
import BannerModel from "../models/models.banners.js";

// @desc create Banner
// @method POST
// @route api/Banner/createBanner
// @access private
export const createBanner = async (req, res) => {
  try {
    console.log(req.body)
    const createNewBanner = await BannerModel.create({
      ...req.body,
    });

    res.json(createNewBanner);
  } catch (e) {
    console.error("Error while trying to create Banner", e);

    res.status(503).send({
      message:
        "Something went wrong while trying to create Banner. Contact admin",
      error: e,
    });
  }
};

// @desc Read Banner details
// @route api/Banner/readBanner/:BannerID
// @access private

export const readBannerDetails = async (req, res) => {
  try {
    //    find the Banner details with the id
    const foundBanner = await BannerModel.find({
      _id: req.params.BannerID,
      ...req.query,
      active: true,
    });
    if (foundBanner.length > 0) {
      res.json(foundBanner);
    } else {
      res.status(403).send({
        message: "Banner not found",
      });
    }
  } catch (e) {
    console.error("Error while trying to read Banner", e);

    res.status(503).send({
      message:
        "Something went wrong while trying to read Banner. Contact admin",
      error: e,
    });
  }
};

// @desc Read all Banner details
// @route api/Banner/readAllBanner
// @access private

export const readAllBannerDetails = async (req, res) => {
  try {
    //  find the Banner calendar with the id
    const foundBanner = await BannerModel.find({
      ...req.query,
      active: true,
    });
    //  if no records throw 404 error
    foundBanner.length > 0
      ? res.json(foundBanner)
      : res.status(403).send({
          message: "No records found",
        });
  } catch (e) {
    console.error("Error while trying to read all Banners", e);
    res.status(503).send({
      message:
        "Something went wrong while trying to read Banners. Contact admin",
      error: e,
    });
  }
};

export const readAllActiveBannerDetails = async (req, res) => {
    try {
      //  find the Banner calendar with the id
      const foundBanner = await BannerModel.find({
        ...req.query,
        active: true,
        expiry: {
          $gt: new Date()
        }
      });
      //  if no records throw 404 error
      foundBanner.length > 0
        ? res.json(foundBanner)
        : res.status(403).send({
            message: "No records found",
          });
    } catch (e) {
      console.error("Error while trying to read all Banners", e);
      res.status(503).send({
        message:
          "Something went wrong while trying to read Banners. Contact admin",
        error: e,
      });
    }
  };

// @desc update Banner details
// @method PUT
// @route api/Banner/updateBannerDetails/:BannerID
// @access private

export const updateBannerDetails = async (req, res) => {
  try {
    const findBannerID = await BannerModel.findOneAndUpdate(
      { _id: req.params.BannerID },
      req.body,
      {
        new: true,
      }
    );
    res.json(findBannerID);
  } catch (e) {
    console.error("Error while trying to update Banner details", e);

    res.status(503).send({
      message:
        "Something went wrong while trying to update the Banner. Contact admin",
      error: e,
    });
  }
};

// @desc deactivate Banner calendar instead of delete from db
// @route api/Bannerm/deleteBannerm/:BannermID
// @access private
export const deleteBanner = async (req, res) => {
  try {
    const findBannerID = await BannerModel.findOneAndUpdate(
      { _id: req.params.BannerID },
      {
        active: false,
      },
      {
        new: true,
      }
    );
    res.json(findBannerID);
  } catch (e) {
    console.error("Error while trying to delete Banner", e);
    res.status(503).send({
      message:
        "Something went wrong while trying to delete the Banner",
      error: e,
    });
  }
};
