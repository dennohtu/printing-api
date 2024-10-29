//import model
import RolesModel from "../models/models.roles.js";

// @desc create role details
// @route api/role/createRole
// @access private
export const createRole = async (req, res) => {
  try {
    const createNewRole = await RolesModel.create(req.body);

    res.json(createNewRole);
  } catch (e) {
    console.error("Error while trying to create role", e);

    res.status(503).send({
      message:
        "Something went wrong while trying to create role. Contact admin",
      error: e,
    });
  }
};

// @desc Read role details
// @route api/role/readRole/:roleID
// @access private

export const readRoleDetails = async (req, res) => {
  try {
    //    find the role details with the id
    const foundRole = await RolesModel.find({
      _id: req.params.roleID,
      active: true,
    });

    if (foundRole.length > 0) {
      res.json(foundRole);
    } else {
      res.status(403).send({
        message: "Role not found",
      });
    }
  } catch (e) {
    console.error("Error while trying to read role", e);

    res.status(503).send({
      message: "Something went wrong while trying to read role. Contact admin",
      error: e,
    });
  }
};

// @desc Read all role details
// @route api/role/readAllRoles
// @access private

export const readAllRoleDetails = async (req, res) => {
  try {
    const queryList = req.query;

    //  find the role calendar with the id
    const foundRole = await RolesModel.find({ ...queryList });

    if (foundRole.length > 0) {
      res.json(foundRole);
    } else {
      res.status(403).send({
        message: "No records found",
      });
    }
  } catch (e) {
    console.error("Error while trying to read all roles", e);

    res.status(503).send({
      message: "Something went wrong while trying to read roles. Contact admin",
      error: e,
    });
  }
};

// @desc update Role details
// @method PUT
// @route api/Role/updateRoleDetails/:roleID
// @access private

export const updateRoleDetails = async (req, res) => {
  try {
    const roleID = req.params.roleID;
    const findRoleID = await RolesModel.findOneAndUpdate(
      { _id: roleID },
      req.body,
      {
        new: true,
      }
    );
    res.json(findRoleID);
  } catch (e) {
    console.error("Error while trying to update Role details", e);

    res.status(503).send({
      message:
        "Something went wrong while trying to update the Role. Contact admin",
      error: e,
    });
  }
};

// @desc deactivate role calendar instead of delete from db
// @route api/Role/deleteRole/:roleID
// @access private

export const deleteRole = async (req, res) => {
  try {
    const roleID = req.params.roleID;
    const findRoleID = await RolesModel.findOneAndUpdate(
      { _id: roleID },
      {
        active: false,
      },
      {
        new: true,
      }
    );
    res.json(findRoleID);
  } catch (e) {
    console.error("Error while trying to delete role calendar", e);

    res.status(503).send({
      message: "Something went wrong while trying to delete the role calendar",
      error: e,
    });
  }
};
