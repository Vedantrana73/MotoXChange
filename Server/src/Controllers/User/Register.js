const express = require('express');
const crypto = require('crypto');

const Authentication = require('../../Models/AuthModel.js');
const sendEmail = require('../../Components/Mail.js');
const OTP = require('../../Models/OtpModel.js');

const registerDetails = async(req,res)=>{
    const {firstName,lastName,email} = req.body;

    try{
        const otp = crypto.randomInt(1000,9999).toString();
        const otpRecord = new OTP({
            email,
            otp
        });
        await otpRecord.save();
    
        const subject = 'Verification Mail';
        const message = `Dear ${firstName} ${lastName}, OTP(One Time Password) for Account Registeration is: ${otp}`;
        res.status(200).json({success: true, message: 'OTP Sent Successfully to your email address!'})
        sendEmail(email,subject,message);
    }
    catch(error)
    {
        res.status(400).json({success: false, message: 'Failed to send OTP Please Try Again!'})
    }
}

module.exports = registerDetails