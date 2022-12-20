const mongoose = require("mongoose");

// mongodb+srv://bsmerd:Thisisthe!0211@cluster0.j1mnute.mongodb.net/?retryWrites=true&w=majority

// * Create connection to the MongoDB database
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/entertainnow",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

module.exports = mongoose.connection;
