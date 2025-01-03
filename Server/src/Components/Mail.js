const nodemailer = require('nodemailer')
require('dotenv').config()

const sendEmail = async(to, subject, text) =>{

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_PASS
        }
    })

    const mailOptions = {
        from: 'MotoXChange',
        to: to,
        subject: subject,
        text: text
    }

    try{
        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${to}`);
    }
    catch(err)
    {
        console.log(`Failed to send mail to ${to}`);
        throw err;
    }
}

module.exports = sendEmail