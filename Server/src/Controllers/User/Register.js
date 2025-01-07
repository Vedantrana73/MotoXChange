const crypto = require('crypto');
const sendEmail = require('../../Components/Mail.js');
const OTP = require('../../Models/OtpModel.js');
const Auth = require('../../Models/AuthModel.js');

const registerDetails = async(req,res)=>{
    const {firstName,lastName,email} = req.body;

    try{
        const user = await Auth.findOne({email});
        if(user)
        {
            return res.status(400).json({message: 'User with Specified Email already Exists!'});
        }
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
        const otpRecord = await OTP.findOne({email}).sort({createdAt: -1});

        if(!otpRecord)
        {
            return res.status(404).json({message: 'OTP not Found Try Again'});
        }
        if(otp==otpRecord.otp)
        {
            await OTP.deleteMany({email});

            return res.status(200).json({message: 'OTP Verified Successfully!'})
        }
        else
        {
            return res.status(400).json({message: 'OTP didn\'t Match. Please Try Again'})
        }
    }
    catch(error)
    {
        res.status(500).json({message: 'Internal Server Error Occured'});
    }
}



module.exports = {registerDetails, verifyOtp}