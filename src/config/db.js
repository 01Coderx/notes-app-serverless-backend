import mongoose from "mongoose";

let cachedConnection = null;
let connectionPromise = null;

const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI environment variable is required");
  }

  // Reuse the same MongoDB connection across warm serverless invocations.
  if (cachedConnection && mongoose.connection.readyState === 1) {
    return cachedConnection;
  }

  if (!connectionPromise) {
    connectionPromise = mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
  }

  try {
    const connection = await connectionPromise;
    cachedConnection = connection;
    console.log(`MongoDB connected: ${connection.connection.host}`);
    return connection;
  } catch (error) {
    connectionPromise = null;
    cachedConnection = null;
    console.error("MongoDB connection failed:", error.message);
    throw error;
  }
};

export default connectDB;
