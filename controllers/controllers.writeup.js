import WriteupModel from "../models/models.writeups.js";

// @desc create writeup details
// @method POST
// @route  api/writeup/createwriteup
// @access private
export const createWriteup = async (req, res) => {
  try {
    const createwriteupRecords = await WriteupModel.create(req.body);
    res.json(createwriteupRecords);
  } catch (e) {
    console.error("Error while trying to create writeup details", e);
    res.status(503).send({
      message:
        "Something went wrong while trying to create writeup details. Contact admin",
      error: e,
    });
  }
};

// @desc Read Writeup details
// @method GET
// @route api/Writeup/readWriteup/:WriteupID
// @access private
export const readWriteup = async (req, res) => {
  try {
    const WriteupRecords = await WriteupModel.find({
      _id: req.params.writeupID,
      active: true,
    })
      .populate("crop_ID")
      .populate("creator");
    if (WriteupRecords.length > 0) {
      res.json(WriteupRecords);
    } else {
      res.status(403).send({
        message: "Writeup  not found",
      });
    }
  } catch (e) {
    console.error("Error while trying to read Writeup details", e);
    res.status(503).send({
      message:
        "Something went wrong while trying to read Writeup. Contact admin",
      error: e.message,
    });
  }
};

// @desc Read all Writeups details
// @method GET
// @route api/Writeups/readAllWriteups
// @access private
export const readAllWriteups = async (req, res) => {
  try {
    const queryList = req.query;
    //  find the crop calendar with the id
    const WriteupsDetails = await WriteupModel.find({
      ...queryList,
      active: true,
    })
      .populate("crop_ID")
      .populate("creator");
    if (WriteupsDetails.length > 0) {
      res.json(WriteupsDetails);
    } else {
      res.status(403).send({
        message: "No Writeups records found",
      });
    }
  } catch (e) {
    console.error("Error while trying to read writeup details", e);
    res.status(503).send({
      message:
        "Something went wrong while trying to read writeup records. Contact admin",
      error: e.message,
    });
  }
};

// @desc update writeup details
// @method PUT
// @route api/writeup/updatewriteup/:writeupID
// @access private
export const updatewriteup = async (req, res) => {
  try {
    const writeupID = req.params.writeupID;
    const writeupDetails = await WriteupModel.findOneAndUpdate(
      { _id: writeupID },
      req.body,
      {
        new: true,
      }
    )
      .populate("crop_ID")
      .populate("creator");
    res.json(writeupDetails);
  } catch (e) {
    console.error("Error while trying to update writeup details", e);
    res.status(503).send({
      message:
        "Something went wrong while trying to update the writeup record. Contact admin",
      error: e.message,
    });
  }
};

// @desc deactivate writeup instead of delete from db
// @route api/writeup/deletewriteup/:writeupID
// @access private
export const deletewriteup = async (req, res) => {
  try {
    const writeupID = req.params.writeupID;
    const writeupDetails = await WriteupModel.findOneAndUpdate(
      { _id: writeupID },
      {
        active: false,
      },
      {
        new: true,
      }
    );
    res.json(writeupDetails);
  } catch (e) {
    console.error("Error while trying to delete writeup", e);
    res.status(503).send({
      message: "Something went wrong while trying to delete the writeup.",
      error: e.message,
    });
  }
};
