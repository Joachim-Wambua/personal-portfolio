const User = require("../dbSchemas/userSchema");
const bcrypt = require("bcrypt");
const passport = require("passport");

class AuthController {
  // Registration
  async registerUser(req, res) {
    try {
      const { username, email, password } = req.body;

      // Check if a user with the same email or username already exists
      const existingUser = await User.findOne({ $or: [{ email }, { username }] });
      if (existingUser) {
        return res.status(400).json({ error: "Email or username already in use" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });

      await newUser.save();

      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error("Registration Error:", error);
      res.status(500).json({ error: "An error occurred during registration" });
    }
  }


  // Login logic
  loginUser(req, res) {
    passport.authenticate("local", {
      successRedirect: "/admin", // Redirect to admin panel on successful login
      failureRedirect: "/login", // Redirect to login page on failed login
      failureFlash: true,
    })(req, res);
  }

  // Logout logic
  logoutUser(req, res) {
    req.logout();
    res.redirect("/login");
  }
}

module.exports = new AuthController();
