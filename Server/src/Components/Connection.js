const mongoose = require('mongoose');

const connectDB = async () =>{
    try
    {
        const conn = await mongoose.connect('mongodb://localhost:27017/MotoXChange',{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database Connected Successfully');
    }
    catch(error)
    {
        console.log(`Failed to Connect to Database ${error}`);
    }
}

module.exports = connectDB;