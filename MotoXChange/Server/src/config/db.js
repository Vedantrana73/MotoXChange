import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectDB = async() =>{
    try
    {
        await mongoose.connect(process.env.DB_URI);
        console.log("Database Connected Successfully")
    }
    catch(error)
    {
        console.log("Mongo DB Connection Error"+error);
        process.exit(1);
    }
}

export default connectDB;