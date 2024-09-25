import { Book } from "../model/book.js";

//function to handle the request for getting all books
export const getAllBooks = async (req, res) => {
	try {
		// retrieve all book documents from the database using the 'find' method on the 'book' model
		const books = await Book.find();

		// If successful, send the list of books with a status code of 200 (OK)
		res.status(200).send({
			count: books.length,
			data: books,
		});
	} catch (error) {
		// If an error occurs, catch it and send a status code of 500 (Internal Server Error) along with the error message
		res.status(500).send(error);
	}
};

//function to handle adding a new book
export const addBook = async (req, res) => {
	try {
		// Check if all required fields (title, author, publishYear) are provided
		const { title, author, publishYear } = req.body;

		if (!title) {
			// If the 'title' field is missing, send a 400 status (Bad Request) with an error message
			return res
				.status(400)
				.send({ message: "Title is required" });
		}

		if (!author) {
			// If the 'author' field is missing, send a 400 status (Bad Request) with an error message
			return res
				.status(400)
				.send({ message: "Author is required" });
		}

		if (!publishYear) {
			// If the 'publishYear' field is missing, send a 400 status (Bad Request) with an error message
			return res
				.status(400)
				.send({ message: "Publish Year is required" });
		}

		// If all required fields are provided, create a new book instance
		const newBook = new book({
			title, // Set the title of the book from the request body
			author, // Set the author of the book from the request body
			publishYear, // Set the publish year of the book from the request body
		});

		// Save the new book to the database
		const savedBook = await newBook.save();

		// Send a response with a status code of 201 (Created) and the saved book data
		res.status(201).send(savedBook);
	} catch (error) {
		// If an error occurs during the process, send a 500 status (Internal Server Error)
		// and return the error message to the client
		res.status(500).send({
			message: "Failed to add book",
			error: error.message,
		});
	}
};

// Function to handle the request for getting a book by id
export const getBookById = async (req, res) => {
	try {
		// Retrieve the book document from the database using the 'findOne' method on the 'book' model
		// 'req.params._id' is used to get the book id from the request parameters
		console.log(req.params);

		const myBook = await book.findById(req.params.id);

		// If the book is not found, send a 404 (Not Found) status
		if (!myBook) {
			return res
				.status(404)
				.send({ message: "Book not found" });
		}

		// If successful, send the book data with a status code of 200 (OK)
		res.status(200).send(myBook);
	} catch (error) {
		// If an error occurs, catch it and send a status code of 500 (Internal Server Error) along with the error message
		res.status(500).send({
			message: "Failed to retrieve the book",
			error: error.message,
		});
	}
};

// Function to handle the request for updating a book by its ID
export const updateBookById = async (req, res) => {
	try {
		// Destructure the ID from request parameters and the updated fields from the request body
		const { id } = req.params;
		const { title, author, publishYear } = req.body;

		// Check if all required fields are provided
		if (!title || !author || !publishYear) {
			// If any field is missing, send a 400 status (Bad Request) with an error message
			return res.status(400).send({
				message:
					"Include all fields: title, author, and publishYear",
			});
		}

		// Use 'findByIdAndUpdate' to find the book by its ID and update it with the new data
		// 'new: true' option returns the updated document
		const updatedBook = await Book.findByIdAndUpdate(
			id,
			{ title, author, publishYear },
			{ new: true }
		);

		// Check if the book was found and updated
		if (!updatedBook) {
			// If the book is not found, send a 404 status (Not Found) with an error message
			return res.status(404).send({
				message: "Book not found",
			});
		}

		// If successful, send a 200 status (OK) with a success message and the updated book data
		res.status(200).send({
			message: "Book updated successfully",
			updatedBook,
		});
	} catch (error) {
		// If an error occurs during the update process, send a 500 status (Internal Server Error) with the error message
		res.status(500).send({
			message: "Failed to update the book",
			error: error.message,
		});
	}
};

// Function to handle the deletion of a book by its ID
export const deleteBookById = async (req, res) => {
	try {
		// Extract the 'id' from the URL parameters
		const { id } = req.params;

		// Attempt to find and delete the book by its ID from the database
		const result = await Book.findByIdAndDelete(id);

		// If the book was not found, respond with a 404 error
		if (!result) {
			return res
				.status(404)
				.send({ message: "Book not found" });
		}

		// Respond with a success message if the book was deleted
		res
			.status(200)
			.send({ message: "Book deleted successfully" });
	} catch (error) {
		// Log the error message to the console
		console.log(error.message);

		// Respond with a 500 error and the error message
		res.status(500).send({ message: error.message });
	}
};
