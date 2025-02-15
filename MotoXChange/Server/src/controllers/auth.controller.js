import crypto from "crypto";
import bcrypt from "bcrypt";
import sendEmail from "../utils/email.js";
import { Auth } from "../models/auth.model.js";
import { OTP } from "../models/otp.model.js";
import { generateOtpEmailTemplate } from "../utils/emailTemplate.js";

export const sendOtp = async(req,res) => {
    const {email} = req.body;
    try
    {
        const existingUser = await Auth.findOne({email});
        if(existingUser)
        {
            return res.status(400).json({message: "User with specified email exists"})
        }
        const existingOtp = await OTP.findOne({email});
        if(existingOtp)
        {
            await OTP.deleteOne({email});
        }
        const otp = crypto.randomInt(100000,999999).toString();
        await OTP.create({email,otp});
        await sendEmail(email,"Your Registeration Verification Code",`Your Verification Code for First Time Register is: ${otp}`,generateOtpEmailTemplate(otp))

        return res.status(200).json({message: "OTP sent successfully to "+email});
    }
    catch(error)
    {
        console.log("Error Occured While Sending Register OTP to "+email+" "+error);
        return res.status(500).json({message: "Internal Server Error Occured"})
    }
}

export const verifyOtp = async (req, res) => {
    const { email, password, otp } = req.body;
    try {
        const existingOtp = await OTP.findOne({ email });
        if (!existingOtp) {
            return res.status(404).json({ message: "OTP Not Found" });
        }
        if (existingOtp.otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }
        await OTP.deleteOne({ email });

        // Hash the password before storing
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await Auth.create({ email, password: hashedPassword });

        return res.status(201).json({ message: "User Registered Successfully" });
    } catch (error) {
        console.log("Error Occurred While Verifying OTP for " + email + " " + error);
        return res.status(500).json({ message: "Internal Server Error Occurred" });
    }
};


// export const authRegister = async(req,res) => {
//     try{
//         const {email, password} = req.body;
         
//         if(!email || !password)
//         {
//             return res.status(404).json({message: "Please Provide Email and Password First!"})
//         }

//         const existingUser = await Auth.findOne({email});
//         if(existingUser)

//         {
//             return res.status(400).json({message: "Email Already in Use"});
//         }
//     }
//     catch(error)
//     {
//         console.log("Error Occured in AuthRegister While Registering "+email+" "+error)
//     }
// }