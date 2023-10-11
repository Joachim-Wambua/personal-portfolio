const mongoose = require("mongoose");

// Define the Projects Schema
const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  year: {
    type: Number,
    required: true,
  },

  client: {
    type: String,
    required: true,
  },

  team: [
    {
      type: String,
    },
  ],

  services: [
    {
      type: String,
      required: true,
    },
  ],

  images: [
    {
      type: String,
    },
  ],
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
