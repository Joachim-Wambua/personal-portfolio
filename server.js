const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const dbModule = require("./config/db.js");
const routes = require("./routes/index.js");
const User = require("./dbSchemas/userSchema");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const bcrypt = require("bcrypt");
const crypto = require("crypto"); // Import the crypto module

const port = process.env.PORT || 8080;

const app = express();

// Generate a secure secret key
const generateSecretKey = () => {
  return crypto.randomBytes(32).toString("hex"); // 32 bytes is a good length for a secret key
};

const secretKey = generateSecretKey();

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    // If the user is authenticated, allow access to the route
    return next();
  }
  // If not authenticated, redirect to the login page or return an unauthorized response
  res.redirect("/login"); // You can change this URL to your login page
};


// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Initialize express-session with the secret key
app.use(
  session({
    secret: secretKey,
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

app.use(express.static(path.join(__dirname, "public")));


// Serve your HTML form page
// Protect the "/admin" route with authentication
app.get("/admin", ensureAuthenticated, (req, res) => {
  // This route is only accessible to authenticated users
  const filePath = path.join(__dirname, "public", "admin", "admin.html");
  // console.log("File Path:", filePath);
  res.sendFile(filePath);
});

// Login route
app.get("/login", (req, res) => {
  // Render your login page here
  const loginPagePath = path.join(__dirname, "public", "admin", "login.html");
  // console.log("Login Page Path:", loginPagePath);
  res.sendFile(loginPagePath);
});

app.get("/register", (req, res) => {
  // Render your login page here
  const registerPagePath = path.join(__dirname, "public", "admin", "registration.html");
  // console.log("Login Page Path:", loginPagePath);
  res.sendFile(registerPagePath);
});

// Handle login form submission
app.post("/login", passport.authenticate("local", {
  successRedirect: "/admin", // Redirect to admin panel on successful login
  failureRedirect: "/login", // Redirect to login page on failed login
  failureFlash: true,
}));


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
