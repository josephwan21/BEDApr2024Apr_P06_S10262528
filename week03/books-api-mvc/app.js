const express = require("express");
const bodyParser = require("body-parser");
const booksController = require("./controllers/booksController"); // Import controllers
const validateBook = require("./middlewares/validateBook");
const validateReq = require("./middlewares/validateReq");
const app = express();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

app.use(bodyParser.json()); // Parse incoming JSON data in request body
app.use(bodyParser.urlencoded({ extended: true })); // For form data handling

// Define individual routes for each controller function
app.get("/books", validateReq, booksController.getAllBooks);
app.get("/books/:id", validateReq, booksController.getBookById);
app.post("/books", validateBook, validateReq, booksController.createBook); // Add validateBook before createBook
app.put("/books/:id", validateBook, validateReq, booksController.updateBook); // Add validateBook before updateBook
app.delete("/books/:id", validateReq, booksController.deleteBook);



