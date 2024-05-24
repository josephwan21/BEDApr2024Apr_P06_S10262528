const express = require("express");
const sql = require("mssql"); // Assuming you've installed mssql
const dbConfig = require("./dbConfig");
const booksController = require("./controllers/booksController");
const usersController = require("./controllers/usersController");

const app = express();
const port = process.env.PORT || 3000; // Use environment variable or default port
const validateBook = require("./middlewares/validateBook");
const bodyParser = require("body-parser"); // Import body-parser
const staticMiddleware = express.static("public"); // Path to the public folder

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // For form data handling
app.use(staticMiddleware);

// Routes for GET requests (replace with appropriate routes for update and delete later)
app.get("/books", booksController.getAllBooks);
app.get("/books-count", booksController.getBookCount);
app.get("/books/:id", booksController.getBookById);
app.post("/books", validateBook, booksController.createBook); // POST for creating books (can handle JSON data)
app.put("/books/:id", validateBook, booksController.updateBook);
app.delete("/books/:id", validateBook, booksController.deleteBook);

//Routes for Users
app.get("/users", usersController.getAllUsers);
app.get("/users-count", usersController.getUserCount);
app.get("/users/search", usersController.searchUsers);
app.get("/users/with-books", usersController.getUsersWithBooks);
app.get("/users/:id", usersController.getUserById);
app.post("/users", usersController.createUser); 
app.put("/users/:id", usersController.updateUser);
app.delete("/users/:id", usersController.deleteUser);



app.listen(port, async () => {
  try {
    // Connect to the database
    await sql.connect(dbConfig);
    console.log("Database connection established successfully");
  } catch (err) {
    console.error("Database connection error:", err);
    // Terminate the application with an error code (optional)
    process.exit(1); // Exit with code 1 indicating an error
  }

  console.log(`Server listening on port ${port}`);
});

// Close the connection pool on SIGINT signal
process.on("SIGINT", async () => {
  console.log("Server is gracefully shutting down");
  // Perform cleanup tasks (e.g., close database connections)
  await sql.close();
  console.log("Database connection closed");
  process.exit(0); // Exit with code 0 indicating successful shutdown
});