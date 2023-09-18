const mongoose = require('mongoose');

// Define the ContactSchema
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: false,
  },
  message: {
    type: String,
    required: true,
  },
});

// Create a model using the schema
const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;