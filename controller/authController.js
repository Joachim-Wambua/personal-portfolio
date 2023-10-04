const User = require("../dbSchemas/userSchema");
const bcrypt = require("bcrypt");
const passport = require("passport");

class AuthController {
  // Registration
  async registerUser(req, res) {
    try {
      const { username, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });

      await newUser.save();

      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred during registration" });
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
