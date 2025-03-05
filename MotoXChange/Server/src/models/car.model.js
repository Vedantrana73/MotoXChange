import mongoose from 'mongoose';

const carSchema = mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    brand: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    year: { 
        type: Number, 
        required: true 
    },
    price: {
        type: Number,
        required: true
    },
    fuelType: {
        type: String,
        required: true,
        enum: ["Petrol", "Diesel", "Electric", "Hybrid","CNG"]
    },
    transmission: {
        type: String,
        required: true,
        enum: ["Manual", "Automatic"]
    },
    mileage: {
        type: Number,
        required: true,
        min: 0
    },
    location: {
        state:{
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        }
    },
    images:[ {
        type: String,
        required: true
    }],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    seats: {
        type: Number,
        required: true,
        min: 2,
        default: 4
    },
    features: [{
        type: String,
    }],
    views: {
        type: Number,
        default: 0,
        min: 0
    },
    status: {
        type: String,
        required: true,
        enum: ["Available", "Sold"],
        default: "Available"
    }
},
{
    timestamps: true
})

export const Car = mongoose.model("Car", carSchema);