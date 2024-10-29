import nodemailer from "nodemailer"
import {secrets} from "../config/config.config.js";



export const sendEmail = async (User_Email, Email_Subject, Email_Body) => {


    let transporter = nodemailer.createTransport({
        host: "smtp.zoho.com",
        service: "Zoho",
        secure: false,
        port: 25,
        auth: {
            user: secrets.ZOHO_EMAIL,
            pass: secrets.ZOHO_PASSWORD,
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    console.log("THe email ", Email_Subject, Email_Body,User_Email)
    const mailOptions = {
        from:secrets.ZOHO_EMAIL, // sender address
        to: User_Email,
        subject: Email_Subject, // Subject line
        html: Email_Body, // plain text body
};

    await transporter.sendMail(mailOptions, function(err, info) {
        if (err) {
            // handle error
            console.error(err)
            return false
        }
        console.log("Email sent",info)
        return true
    })
}

