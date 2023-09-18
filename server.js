const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const dbModule = require("./config/db.js");
const routes = require("./routes/index.js");

const port = process.env.PORT || 8080; // Use process.env.PORT for dynamic port assignment

const app = express();

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Use bodyParser to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Serve your HTML form page
app.get("/admin", (req, res) => {
  const filePath = path.join(__dirname, "public", "admin", "admin.html");
  console.log("File Path:", filePath);
  res.sendFile(filePath);
});

// Define your routes
app.use("/", routes); // Using "/admin" as a base route for your admin-related routes

// Define a route for the root
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Starting the server on the specified port
app.listen(port, () => {
  console.log(`The application started successfully on port ${port}`);
});

// Connect to the database
dbModule();
