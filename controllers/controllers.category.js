//import model
import CategoriesModel from "../models/models.category.js";

// @desc create category
// @method POST
// @route api/category/createCategory
// @access private
export const createCategory = async (req, res) => {
  try {
    const createNewCategory = await CategoriesModel.create({
      ...req.body,
    });

    res.json(createNewCategory);
  } catch (e) {
    console.error("Error while trying to create Category", e);

    res.status(503).send({
      message:
        "Something went wrong while trying to create Category. Contact admin",
      error: e,
    });
  }
};

// @desc Read Category details
// @route api/Category/readCategory/:CategoryID
// @access private

export const readCategoryDetails = async (req, res) => {
  try {
    //    find the Category details with the id
    const foundCategory = await CategoriesModel.find({
      _id: req.params.categoryID,
      ...req.query,
      active: true,
    });
    if (foundCategory.length > 0) {
      res.json(foundCategory);
    } else {
      res.status(403).send({
        message: "Category not found",
      });
    }
  } catch (e) {
    console.error("Error while trying to read Category", e);

    res.status(503).send({
      message:
        "Something went wrong while trying to read Category. Contact admin",
      error: e,
    });
  }
};

// @desc Read all Category details
// @route api/Category/readAllCategory
// @access private

export const readAllCategoryDetails = async (req, res) => {
  try {
    //  find the Category calendar with the id
    const foundCategory = await CategoriesModel.find({
      ...req.query,
      active: true,
    });
    //  if no records throw 404 error
    foundCategory.length > 0
      ? res.json(foundCategory)
      : res.status(404).send({
          message: "No records found",
        });
  } catch (e) {
    console.error("Error while trying to read all Categorys", e);
    res.status(503).send({
      message:
        "Something went wrong while trying to read Categorys. Contact admin",
      error: e,
    });
  }
};

// @desc update Category details
// @method PUT
// @route api/Category/updateCategoryDetails/:CategoryID
// @access private

export const updateCategoryDetails = async (req, res) => {
  try {
    const findCategoryID = await CategoriesModel.findOneAndUpdate(
      { _id: req.params.categoryID },
      req.body,
      {
        new: true,
      }
    );
    res.json(findCategoryID);
  } catch (e) {
    console.error("Error while trying to update Category details", e);

    res.status(503).send({
      message:
        "Something went wrong while trying to update the Category. Contact admin",
      error: e,
    });
  }
};

// @desc deactivate Category calendar instead of delete from db
// @route api/Categorym/deleteCategorym/:CategorymID
// @access private
export const deleteCategory = async (req, res) => {
  try {
    const findCategoryID = await CategoriesModel.findOneAndUpdate(
      { _id: req.params.categoryID },
      {
        active: false,
      },
      {
        new: true,
      }
    );
    res.json(findCategoryID);
  } catch (e) {
    console.error("Error while trying to delete Category calendar", e);
    res.status(503).send({
      message:
        "Something went wrong while trying to delete the Category calendar",
      error: e,
    });
  }
};
