const mongoose = require('mongoose');
const dotenv = require('dotenv').config(); 

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1); // Optionally exit the process on failure
    }
}

module.exports = {
    connectDb
}