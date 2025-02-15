import mongoose from "mongoose";

const authSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    }
},
{
    timestamps: true
});

export const Auth = mongoose.model("Auth",authSchema);

