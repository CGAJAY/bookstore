import express from "express";
import dotenv from "dotenv";

// Configure dotenv
dotenv.config();

const app = express();

// Server setup
const port = process.env.PORT || 5555;
app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
