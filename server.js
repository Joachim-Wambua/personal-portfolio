const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const dbModule = require("./config/db.js");
const routes = require("./routes/index.js");
const User = require("./dbSchemas/userSchema");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session"); // Import express-session
const bcrypt = require("bcrypt"); // Import bcrypt

const port = process.env.PORT || 8080; // Use process.env.PORT for dynamic port assignment

const app = express();

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Use bodyParser to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Initialize Passport and configure session management
app.use(
  session({
    secret: "your-secret-key", // Replace with a strong and secure secret key
    resave: false,
    saveUninitialized: false,
    // You can customize other options as needed
  })
);

// Initialize Passport and configure session management
app.use(passport.initialize());
app.use(passport.session());

// TODO: Authentication Middleware to protect admin routes

// Passport Local Strategy for user authentication
passport.use(
  new LocalStrategy((username, password, done) => {
    // Replace this with your User model
    User.findOne({ username }, async (err, user) => {
      if (err) return done(err);
      if (!user) return done(null, false, { message: "Incorrect username" });

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid)
        return done(null, false, { message: "Incorrect password" });

      return done(null, user);
    });
  })
);

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // Replace this with your User model
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

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
