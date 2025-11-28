const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        if (error.message.includes('Could not connect to any servers in your MongoDB Atlas cluster')) {
            console.error('SUGGESTION: Make sure your current IP address is whitelisted in MongoDB Atlas.');
        }
        process.exit(1);
    }
};

module.exports = connectDB;
