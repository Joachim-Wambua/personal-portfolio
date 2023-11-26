const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },

  author: {
    type: String,
    required: true,
  },

  client: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: [
      "Web Development",
      "Mobile App Development",
      "UX/UI Design",
      "Data Analytics",
      "Machine Learning",
    ], // Adjust as needed
    required: true,
  },
  tech_stack: [
    {
      type: String,
      required: true,
    },
  ],
  description: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  images: {
    background: {
      type: String,
    },
    image1: String,
    image2: String,
    image3: String,
  },
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
