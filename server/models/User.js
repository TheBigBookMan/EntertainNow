const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

// TODO can make the Entertainment model a subdoc of the Users model for favourites

// ! properties- username, email, password, saved movies (sub doc of entertainment model)

//TODO need password hashing for the password

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxLength: [19, "Too long, 19 characters max."],
    },
    password: {
      type: String,
      required: true,
      unique: false,
      minLength: [8, "Too short, 8 characters required."],
      maxLength: [19, "Too long, 19 characters maximum"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Must match an email address!"],
    },
    favourites: [
      {
        type: Schema.Types.ObjectId,
        ref: "Favourite",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual("favouriteCount").get(function () {
  return this.favourites.length;
});

userSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = model("user", userSchema);

module.exports = User;
