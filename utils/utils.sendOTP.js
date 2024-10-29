import AfricasTalking from 'africastalking'
import {secrets} from "../config/config.config.js";
import ShortUniqueId from 'short-unique-id'
 import cache from 'memory-cache'
 import { sendEmail } from './utils.sendEmails.js';


export const sendOTP = async (User_Email, User_Phone) => {
    try{


        // Random UUID
        let User_OTP_Code = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
        User_OTP_Code = User_OTP_Code.toString();


        const message = `Thank you for registering with Thorium Foods. ${User_OTP_Code} is your one time password (OTP). 
        Kindly note that your OTP expires in 60 minutes`
        // set the unique key
        cache.put(User_Phone, User_OTP_Code,  parseInt(secrets.MINUTES_MEMCACHE) * 60 * 1000, function(key, value) {
            console.log(key + ' did ' + value);
        }); // Time in ms


        // const africastalking = AfricasTalking({
        //     apiKey: secrets.AFRICASTALKING_API,
        //     username: secrets.AFRICASTALKING_SMSUSERNAME
        // });
        // const newTo = "+" + User_Email.toString()
        // const newMessage = message.toString()
        // const result = await africastalking.SMS.send({
        //     to: newTo,
        //     message: newMessage,
        //     // from: secrets.AFRICASTALKING_SMSFROM
        // });
        await sendEmail(User_Email, 'Thorium Organic Foods - OTP', message)
        return {message: 'OTP sent successfully'}
    }catch (e) {
        console.error('Something went wrong while trying to send OTP CODE.' , e)
        throw Error(`Something went wrong while trying to send OTP CODE. ${e}.`)


    }


}