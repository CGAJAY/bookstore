import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv(); // load environment variables from .env

// Asynchronous function to connect to MongoDB
const connectDB = async () => {
	try {
		// connect to the MongoDB URI stored in .env
		await mongoose.connect(process.env.MONGO_URI);
		// // If connection is successful, log a success message
		console.log("MongoDB connection successful");
	} catch (error) {
		// // Log an error message if connection fails
		console.error("MongoDB connection failed");
		// // Exit the process
		process.exit();
	}
};

export { connectDB };
