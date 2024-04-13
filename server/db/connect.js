const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/InternationSCM';
const connectDB = async () => {
    try{
        const conn = await mongoose.connect(MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB;