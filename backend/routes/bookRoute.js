import { Router } from "express";
import {
	getAllBooks,
	addBook,
	getBookById,
	updateBookById,
} from "../controllers/bookController.js";

const booksRouter = Router();

booksRouter.get("/", getAllBooks);
booksRouter.post("/", addBook);
booksRouter.get("/:id", getBookById);
booksRouter.put("/:id", updateBookById);

export { booksRouter };
