// Importing mongoose module
const mongoose = require("mongoose");
require("dotenv").config();

const connectionURL = process.env.DB_URL;
const connectDb = async () => {
  try {
    await mongoose.connect(connectionURL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log("Database Connected Successfully!");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDb;
