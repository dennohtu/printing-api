import ResetPasswordModel from "../models/models.resetpassword.js";
import cache from 'memory-cache'
import {sendEmail} from "../utils/utils.sendEmails.js";
import {secrets} from "../config/config.config.js";
import {validateEmail} from "../utils/utils.validateIsEmail.js";
import UserModel from "../models/models.user.js";


// @desc create ResetPassword details
// @method POST
// @route  api/resetpassword/createResetPassword
// @access public

export const createResetPassword = async(req, res) => {

    try{
        // rsest email from user
        const {User_Email }= req.body
        const isEmailValid = await validateEmail(User_Email)
        if (!isEmailValid) {
            return res.status(403).send({
                message: 'Invalid email format'
            });
        }
        // generate code
        let User_OTP_Code = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
        User_OTP_Code = User_OTP_Code.toString()
        console.log("----------------------OTP",User_OTP_Code,User_Email)


        // set the unique key
        cache.put(User_Email, User_OTP_Code,  parseInt(secrets.MINUTES_MEMCACHE) * 60 * 1000, function(key, value) {
            console.log(key + ' did get in the cache ' + value);
        }); // Time in ms

        //send email
        await sendEmail(User_Email,"Thorium Reset password",`Use this code to reset your password ${User_OTP_Code} `)
        //save email and token

        res.json (true)

    }catch (e) {
        console.error("Error while trying to create ResetPassword details",e)

        res.status(503).send({
            message:"Something went wrong while trying to create ResetPassword details. Contact admin",
            error : e
        })
    }
}



// @desc Read ResetPassword details
// @method GET
// @route api/resetpassword/resetPassword/
// @access public

export const resetPassword = async(req, res) => {

    try{
        const {User_Email, User_OTP_Code,User_Password } = req.body
        const isEmailValid = await validateEmail(User_Email)
        if (!isEmailValid) {
            return res.status(403).send({
                message: 'Invalid email format'
            });
        }


        // method to get saved OTP code from memcache
        const otp_value = cache.get(User_Email)
        console.log("OTP IN MEMCACHE", otp_value, " otp given by user ", User_OTP_Code)
        if (User_OTP_Code === otp_value) {
            let findUserID = await UserModel.findOne({User_Email:User_Email}).populate('User_Role_ID').populate("Permission_ID");
            findUserID.User_Password = User_Password

            findUserID = await findUserID.save()

            res.json(findUserID)
        } else {
            return res.status(403).send({
                message: 'Code already expired'
            });
        }



    }catch (e) {
        console.error("Error while trying to read ResetPassword details",e)

        res.status(503).send({
            message:"Something went wrong while trying to read ResetPassword. Contact admin",
   error : e.message
        })
    }



}





// @desc Read all ResetPassword details
// @method GET
// @route api/resetpassword/readAllResetPassword
// @access private

export const readAllResetPassword = async(req, res) => {

    try{
        const queryList =req.query
        //  find the crop calendar with the id
        const ResetPasswordDetails = await ResetPasswordModel.find({...queryList})


        if(ResetPasswordDetails.length > 0 ){
            res.json(ResetPasswordDetails)
        }else{
            res.status(403).send({
                message:"No ResetPassword records found"
            })
        }


    }catch (e) {
        console.error("Error while trying to update ResetPassword details",e)

        res.status(503).send({
            message:"Something went wrong while trying to read ResetPassword records. Contact admin",
   error : e.message
        })
    }

}





    
// @desc update ResetPassword details
// @method PUT
// @route api/resetpassword/updateResetPassword/:ResetPasswordID
// @access private

export const updateResetPassword = async(req, res) => {

    try{
        const ResetPasswordID = req.params.ResetPasswordID
        const ResetPasswordDetails = await ResetPasswordModel.findOneAndUpdate({_id : ResetPasswordID}, req.body, {
            new: true
        })

        res.json(ResetPasswordDetails)


    }catch (e) {
        console.error("Error while trying to update ResetPassword details",e)

        res.status(503).send({
            message:"Something went wrong while trying to update the ResetPassword record. Contact admin",
   error : e.message
        })
    }



}
   


// @desc deactivate ResetPassword instead of delete from db
// @route api/resetpassword/deleteResetPassword/:ResetPasswordID
// @access private
export const deleteResetPassword = async(req, res) => {

    try{

        const ResetPasswordID = req.params.ResetPasswordID
        const ResetPasswordDetails = await ResetPasswordModel.findOneAndUpdate({_id : ResetPasswordID}, {
            "active":false
        }, {
            new: true
        });
        res.json(ResetPasswordDetails)

    }catch (e) {
        console.error("Error while trying to delete ResetPassword",e)

        res.status(503).send({
            message:"Something went wrong while trying to delete the ResetPassword.",
            error:e.message

        })
    }



}