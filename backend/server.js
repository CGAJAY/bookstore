import express from "express";
import { connectDB } from "./db/connect.js";
import { configDotenv } from "dotenv";
import { booksRouter } from "./routes/bookRoute.js";

configDotenv(); // Load environment variables from .env

await connectDB(); // connect to the database

const app = express();

app.use(express.json()); // required to parse JSON bodies

app.use("/books", booksRouter);

// Server setup
const PORT = process.env.PORT || 5555;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
