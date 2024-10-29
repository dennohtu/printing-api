import DefaultRolePermissionsModel from "../models/models.defaultPermissions.js";


// @desc create DefaultRolePermissions details
// @method POST
// @route  api/defaultrolepermissions/createDefaultRolePermissions
// @access private
export const createDefaultRolePermissions = async(req, res) => {
    try{
        const createDefaultRolePermissionsRecords= await DefaultRolePermissionsModel.create(req.body)
        res.json (createDefaultRolePermissionsRecords)
    }catch (e) {
        console.error("Error while trying to create DefaultRolePermissions details",e)
        res.status(503).send({
            message:"Something went wrong while trying to create DefaultRolePermissions details. Contact admin",
            error : e
        })
    }
}


// @desc Read DefaultRolePermissions details
// @method GET
// @route api/defaultrolepermissions/readDefaultRolePermissions/:DefaultRolePermissionsID
// @access private
export const readDefaultRolePermissions = async(req, res) => {
    try{
        const DefaultRolePermissionsRecords = await DefaultRolePermissionsModel.find({_id: req.params.DefaultRolePermissionsID}).populate("User_Role_ID")

        //  if no records throw 404 error
        DefaultRolePermissionsRecords.length > 0 ?  res.json( DefaultRolePermissionsRecords) : res.status(404).send({
            message:"No records found" })
    }catch (e) {
        console.error("Error while trying to read DefaultRolePermissions details",e)
        res.status(503).send({
            message:"Something went wrong while trying to read DefaultRolePermissions. Contact admin",
   error : e.message
        })
    }
}


// @desc Read all DefaultRolePermissions details
// @method GET
// @route api/defaultrolepermissions/readAllDefaultRolePermissions
// @access private
export const readAllDefaultRolePermissions = async(req, res) => {
    try{
        //  find the crop calendar with the id
        const DefaultRolePermissionsDetails = await DefaultRolePermissionsModel.find({...req.query}).populate("User_Role_ID")

        //  if no records throw 404 error
        DefaultRolePermissionsDetails.length > 0 ?  res.json( DefaultRolePermissionsDetails) : res.status(404).send({
            message:"No records found" })
    }catch (e) {
        console.error("Error while trying to update DefaultRolePermissions details",e)
        res.status(503).send({
            message:"Something went wrong while trying to read DefaultRolePermissions records. Contact admin",
   error : e.message
        })
    }
}


    
// @desc update DefaultRolePermissions details
// @method PUT
// @route api/defaultrolepermissions/updateDefaultRolePermissions/:DefaultRolePermissionsID
// @access private
export const updateDefaultRolePermissions = async(req, res) => {
    try{
        const DefaultRolePermissionsID = req.params.DefaultRolePermissionsID
        const DefaultRolePermissionsDetails = await DefaultRolePermissionsModel.findOneAndUpdate({_id : DefaultRolePermissionsID}, req.body, {
            new: true
        }).populate("User_Role_ID")

        res.json(DefaultRolePermissionsDetails)
    }catch (e) {
        console.error("Error while trying to update DefaultRolePermissions details",e)
        res.status(503).send({
            message:"Something went wrong while trying to update the DefaultRolePermissions record. Contact admin",
   error : e.message
        })
    }
}
   

// @desc deactivate DefaultRolePermissions instead of delete from db
// @route api/defaultrolepermissions/deleteDefaultRolePermissions/:DefaultRolePermissionsID
// @access private
export const deleteDefaultRolePermissions = async(req, res) => {
    try{
        const DefaultRolePermissionsID = req.params.DefaultRolePermissionsID
        const DefaultRolePermissionsDetails = await DefaultRolePermissionsModel.findOneAndUpdate({_id : DefaultRolePermissionsID}, {
            "active":false
        }, {
            new: true
        });
        res.json(DefaultRolePermissionsDetails).populate("User_Role_ID")
    }catch (e) {
        console.error("Error while trying to delete DefaultRolePermissions",e)
        res.status(503).send({
            message:"Something went wrong while trying to delete the DefaultRolePermissions.",
            error:e.message
        })
    }
}