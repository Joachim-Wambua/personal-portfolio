const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const dbModule = require("./config/db.js");
const routes = require("./routes/index.js");
const User = require("./dbSchemas/userSchema");
const session = require("express-session");
const bcrypt = require("bcrypt");
const crypto = require("crypto"); // Import the crypto module;
const flash = require("connect-flash");
const cloudinary = require("cloudinary").v2;

const port = process.env.PORT || 8080;
const app = express();

// Configure Cloudinary
cloudinary.config({
  cloud_name: "dltjv8zbh",
  api_key: "231522156545457",
  api_secret: "wfTTiBKo39ru4SJuPmgZld1TEB0",
  http_timeout: 60000, // Set a higher timeout value (in milliseconds)
});

// Generate a secure secret key
const generateSecretKey = () => {
  return crypto.randomBytes(32).toString("hex"); // 32 bytes is a good length for a secret key
};

const secretKey = generateSecretKey();

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(flash());

// Initialize express-session with custom options
app.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: false,
    // You can customize other options as needed for express-session
    // For example:
    // cookie: { secure: true }, // Use secure cookies for HTTPS
    // name: "customSessionName", // Name of the session cookie
    // store: customSessionStore, // Use a custom session store
    // Other options as needed
  })
);

// Custom middleware to check if the user is authenticated
const ensureAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    return next(); // User is authenticated, proceed to the route
  } else {
    res.redirect("/login"); // User is not authenticated, redirect to the login page
  }
};

app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});

app.use(express.static(path.join(__dirname, "public")));

// Serve your HTML form page
app.get("/admin", ensureAuthenticated, (req, res) => {
  // This route is only accessible to authenticated users
  const filePath = path.join(__dirname, "public", "admin", "admin.html");
  res.sendFile(filePath);
});

// Login route
app.get("/login", (req, res) => {
  // Render your login page here
  const loginPagePath = path.join(__dirname, "public", "admin", "login.html");
  res.sendFile(loginPagePath);
});

app.get("/registration", (req, res) => {
  // Render your login page here
  const registerPagePath = path.join(
    __dirname,
    "public",
    "admin",
    "registration.html"
  );
  res.sendFile(registerPagePath);
});

// Handle login form submission
app.post("/user-login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Replace this with your User model
    const user = await User.findOne({ email });
    if (!user) {
      req.flash("error_msg", "Incorrect email");
      res.redirect("/login");
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      req.flash("error_msg", "Incorrect password");
      res.redirect("/login");
      return;
    }

    req.session.user = user; // Store the user in the session
    req.flash("success_msg", "Login successful");
    res.redirect("/admin");
  } catch (err) {
    console.error(err);
    req.flash("error_msg", "An error occurred");
    res.redirect("/login");
  }
});

app.use("/", routes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`The application started successfully on port ${port}`);
});

dbModule();
