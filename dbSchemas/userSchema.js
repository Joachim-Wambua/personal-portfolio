// userSchema.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  // Add more fields as needed
  linkedInUrl: {
    type: String,
    required: false,
  },
  githubUrl: {
    type: String,
    required: false,
  },
});

// Creating Model using Schema Above
const User = mongoose.model("User", userSchema);

module.exports = User;
