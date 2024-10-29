import AfricasTalking from 'africastalking'
import {secrets} from "../config/config.config.js";
import ShortUniqueId from 'short-unique-id'
import cache from 'memory-cache'


export const sendSMS = async (User_Phone,message) => {
    try{


        const africastalking = AfricasTalking({
            apiKey: secrets.AFRICASTALKING_API,
            username: secrets.AFRICASTALKING_SMSUSERNAME
        });
        const newTo = "+" + User_Phone.toString()
        const newMessage = message.toString()
        const result = await africastalking.SMS.send({
            to: newTo,
            message: newMessage,
            // from: secrets.AFRICASTALKING_SMSFROM
        });
        console.log("result from sms sent", await result)
        return result
    }catch (e) {
        console.error('Something went wrong while trying to send the sms.' , e)
        throw Error(`Something went wrong while trying to send OTP CODE. ${e}.`)

    }


}