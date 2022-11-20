const { Schema, model } = require("mongoose");

// ! Poperties- title, description, imdbRating, contentrating, image

const favouriteSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imDbRating: {
    type: String,
    required: true,
  },
  contentRating: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Favourite = model("Favourite", favouriteSchema);

module.exports = Favourite;