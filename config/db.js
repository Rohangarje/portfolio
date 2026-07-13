const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

let isConnected = false;

async function connectDB() {
  if (!process.env.MONGODB_URI) {
    console.warn('⚠️ WARNING: MONGODB_URI is not set in environmental variables. Switching to local JSON fallback database.');
    isConnected = false;
    return false;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000 // Time out after 5s instead of hanging
    });
    console.log(`🔌 MongoDB Connected: ${conn.connection.host}`);
    isConnected = true;
    return true;
  } catch (error) {
    console.warn(`⚠️ WARNING: Failed to connect to MongoDB at "${process.env.MONGODB_URI}": ${error.message}. Switching to local JSON fallback database.`);
    isConnected = false;
    return false;
  }
}

module.exports = {
  connectDB,
  isMongoConnected: () => isConnected
};
