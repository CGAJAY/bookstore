import { Router } from "express";
import {
	getAllBooks,
	addBook,
	getBookById,
	updateBookById,
	deleteBookById,
} from "../controllers/bookController.js";

const booksRouter = Router();

booksRouter.get("/", getAllBooks);
booksRouter.post("/", addBook);
booksRouter.get("/:id", getBookById);
booksRouter.put("/:id", updateBookById);
booksRouter.delete("/:id", deleteBookByIdBookById);

export { booksRouter };
