import mongoose from "mongoose";

const authSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
            minlength: 10,
            maxlength: 10,
            trim: true,
        },
        address: {
            city: {
                type: String,
                required: true,
                trim: true,
            },
            state: {
                type: String,
                required: true,
                trim: true,
            },
        },
        listedCars: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Car", // References the Car model
                default: null
            },
        ],
        wishlistedCars: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Car", // References the Car model
                default: null
            },
        ],
    },
    {
        timestamps: true,
    }
);

export const User = mongoose.model("User", authSchema);
