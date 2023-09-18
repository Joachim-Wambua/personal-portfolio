const mongoose = require("mongoose");

// Define the Experience Schema
const experienceSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
  },

  company: {
    type: String,
    required: true,
  },

  startDate: {
    type: Date,
    required: true,
  },

  endDate: {
    type: Date,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
});

const Experience = mongoose.model("Experience", experienceSchema);

module.exports = Experience;
