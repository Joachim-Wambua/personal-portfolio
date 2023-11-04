const mongoose = require("mongoose");

// Define the ContactSchema
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  subject: {
    type: String,
    required: false,
  },
  message: {
    type: String,
    required: false,
  },
});

// Create a model using the schema
const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
