import SendEmailsModel from "../models/models.sendemails.js";


// @desc create SendEmails details
// @method POST
// @route  api/sendemails/createSendEmails
// @access private
export const createSendEmails = async(req, res) => {
    try{
        const createSendEmailsRecords= await SendEmailsModel.create(req.body)
        res.json (createSendEmailsRecords)
    }catch (e) {
        console.error("Error while trying to create SendEmails details",e)
        res.status(503).send({
            message:"Something went wrong while trying to create SendEmails details. Contact admin",
            error : e
        })
    }
}


// @desc Read SendEmails details
// @method GET
// @route api/sendemails/readSendEmails/:SendEmailsID
// @access private
export const readSendEmails = async(req, res) => {
    try{
        const SendEmailsRecords = await SendEmailsModel.find({_id: req.params.SendEmailsID})

        if(SendEmailsRecords.length>0){
            res.json(SendEmailsRecords)
        }else{
            res.status(403).send({
                message:"SendEmails  not found"
            })
        }
    }catch (e) {
        console.error("Error while trying to read SendEmails details",e)
        res.status(503).send({
            message:"Something went wrong while trying to read SendEmails. Contact admin",
   error : e.message
        })
    }
}


// @desc Read all SendEmails details
// @method GET
// @route api/sendemails/readAllSendEmails
// @access private
export const readAllSendEmails = async(req, res) => {
    try{
        const queryList =req.query
        //  find the crop calendar with the id
        const SendEmailsDetails = await SendEmailsModel.find({...queryList})

        if(SendEmailsDetails.length > 0 ){
            res.json(SendEmailsDetails)
        }else{
            res.status(403).send({
                message:"No SendEmails records found"
            })
        }
    }catch (e) {
        console.error("Error while trying to update SendEmails details",e)
        res.status(503).send({
            message:"Something went wrong while trying to read SendEmails records. Contact admin",
   error : e.message
        })
    }
}


    
// @desc update SendEmails details
// @method PUT
// @route api/sendemails/updateSendEmails/:SendEmailsID
// @access private
export const updateSendEmails = async(req, res) => {
    try{
        const SendEmailsID = req.params.SendEmailsID
        const SendEmailsDetails = await SendEmailsModel.findOneAndUpdate({_id : SendEmailsID}, req.body, {
            new: true
        })

        res.json(SendEmailsDetails)
    }catch (e) {
        console.error("Error while trying to update SendEmails details",e)
        res.status(503).send({
            message:"Something went wrong while trying to update the SendEmails record. Contact admin",
   error : e.message
        })
    }
}
   

// @desc deactivate SendEmails instead of delete from db
// @route api/sendemails/deleteSendEmails/:SendEmailsID
// @access private
export const deleteSendEmails = async(req, res) => {
    try{
        const SendEmailsID = req.params.SendEmailsID
        const SendEmailsDetails = await SendEmailsModel.findOneAndUpdate({_id : SendEmailsID}, {
            "active":false
        }, {
            new: true
        });
        res.json(SendEmailsDetails)
    }catch (e) {
        console.error("Error while trying to delete SendEmails",e)
        res.status(503).send({
            message:"Something went wrong while trying to delete the SendEmails.",
            error:e.message
        })
    }
}