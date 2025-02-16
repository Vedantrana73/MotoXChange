import crypto from "crypto";
import bcrypt from "bcrypt";
import sendEmail from "../utils/email.js";
import { User } from "../models/user.model.js";
import { OTP } from "../models/otp.model.js";
import { generateOtpEmailTemplate, generateWelcomeEmailTemplate } from "../utils/emailTemplate.js";

export const sendOtp = async(req,res) => {
    const {email} = req.body;
    try
    {
        const existingUser = await User.findOne({email});
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
    const { email, password, otp, phone, address, name } = req.body;

    try {
        // Check if OTP exists for the given email
        const existingOtp = await OTP.findOne({ email });
        if (!existingOtp) {
            return res.status(404).json({ message: "OTP Not Found" });
        }

        // Validate OTP
        if (existingOtp.otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        // Delete OTP after verification
        await OTP.deleteOne({ email });

        // Hash the password before storing
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create new user
        const newUser = await User.create({
            email,
            password: hashedPassword,
            phone,
            address: {
                city: address.city,
                state: address.state,
            },
            name,
            listedCars: [],
            wishlistedCars: [],
        });
        sendEmail(email, "Welcome to MotoXChange", `${name}, Welcome to MotoXChange`, generateWelcomeEmailTemplate(name));
        return res.status(201).json({ message: "User Registered Successfully", userId: newUser._id });
    } catch (error) {
        console.log("Error Occurred While Verifying OTP for " + email + ": ", error);
        return res.status(500).json({ message: "Internal Server Error Occurred" });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: "User Not Found" });
        }

        // Compare passwords
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        return res.status(200).json({ message: "Login Successful", user: {
            email: existingUser.email,
            phone: existingUser.phone,
            name: existingUser.name,
            state: existingUser.address.state,
            city: existingUser.address.city,
            userId: existingUser._id
        } });
    }
    catch (error) {
        console.log("Error Occurred While Logging in User " + email + ": ", error);
        return res.status(500).json({ message: "Internal Server Error Occurred" });
    }
}


