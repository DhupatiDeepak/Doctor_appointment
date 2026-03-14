const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`\n❌ MongoDB Connection Error: ${error.message}`);
        console.error(`\n👉 SOLUTION: This usually means your IP address is not whitelisted in MongoDB Atlas.`);
        console.error(`👉 Check the 'mongodb_setup.md' guide in the brain folder for help!\n`);
        process.exit(1);
    }
};

module.exports = connectDB;
