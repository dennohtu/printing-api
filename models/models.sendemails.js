
import mongoose from "mongoose";           
const SendEmailsModelSchema = mongoose.Schema({
             User_Email:{
            type:String,
            required:true,
            default: ""
        },Email_Subject:{
            type:String,
            required:true,
            default: ""
        },Email_Body:{
            type:String,
            required:true,
            default: ""
        },
        
      active:{
                       type:Boolean,
                       required:true,
                       default: true
            },
            },
{
    timestamps: true,
}
)
            
const SendEmails = mongoose.model('SendEmails', SendEmailsModelSchema)
            
export default SendEmails
            