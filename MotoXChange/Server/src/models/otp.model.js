import mongoose, { mongo } from "mongoose";

const otpSchema = mongoose.Schema({
    otp: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300  
    }
})
 
export const OTP = mongoose.model("OTP",otpSchema);