const mongoose = require("mongoose");

// * Create connection to the MongoDB database
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/EntertainNow",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

module.exports = mongoose.connection;
