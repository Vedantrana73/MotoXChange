const crypto = require('crypto');
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
        sendEmail(email,subject,message);
        res.status(200).json({message: 'OTP Sent Successfully to your email address!'})
    }
    catch(error)
    {
        console.log('Error Occured while sending OTP for Register: '+error)
        res.status(400).json({message: 'Failed to send OTP Please Try Again!'})
    }
}


const verifyOtp = async(req,res)=>{
    const {email, otp} = req.body;

    try
    {
        const fetchedOtp = await OTP.find({email});

        if(!fetchedOtp)
        {
            return res.status(404).json({message: 'OTP not Found Try Again'});
        }

        if(Array.isArray(fetchedOtp) && fetchedOtp.includes(otp))
        {
            return res.status(200).json({message: 'Successfully Verified'});
        }
        else if(otp === fetchedOtp)
        {
            return res.status(200).json({message: 'Successfully Verified'});
        }
        else
        {
            return res.status(200).json({message: 'OTP didn\'t match Try Again'});
        }
    }
    catch(error)
    {
        res.status(500).json({message: 'Internal Server Error Occured'});
    }
}



module.exports = {registerDetails, verifyOtp}