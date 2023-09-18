const mongoose = require("mongoose");

// Defining the Clients Schema
const clientSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
  },

  logoUrl: {
    type: String,
    required: true,
  },
});

// Creating Model using Schema Above
const Client = mongoose.model("Client", clientSchema);

module.exports = Client;
