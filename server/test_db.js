const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const testConn = async () => {
    const uri = process.env.MONGO_URI.includes('?') 
        ? process.env.MONGO_URI.replace('/?', '/doctor_appointment?') 
        : process.env.MONGO_URI + '/doctor_appointment';
    console.log('--- Database Connection Test ---');
    console.log('Standardized URI (password hidden):', uri.replace(/:([^@]+)@/, ':****@'));
    
    try {
        console.log('Connecting...');
        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 10000, // 10s
            connectTimeoutMS: 10000,
        });
        console.log('✅ SUCCESS: Connected to MongoDB Atlas!');
        
        // List databases to confirm full access
        const admin = mongoose.connection.db.admin();
        const dbs = await admin.listDatabases();
        console.log('Available Databases:', dbs.databases.map(db => db.name).join(', '));
        
        process.exit(0);
    } catch (error) {
        console.error('❌ CONNECTION FAILED');
        console.error('Error Name:', error.name);
        console.error('Error Message:', error.message);
        if (error.reason) {
            console.error('Reason:', JSON.stringify(error.reason, null, 2));
        }
        process.exit(1);
    }
};

testConn();
