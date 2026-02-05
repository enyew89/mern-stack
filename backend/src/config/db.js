import mongoose from "mongoose";    


export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.CONNECTED_DB);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MONGODB: ${error.message}`);
    process.exit(1);
  }};