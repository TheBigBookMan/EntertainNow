const mongoose = require("mongoose");

// * Create connection to the MongoDB database
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/entertainment-users",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

module.exports = mongoose.connection;
