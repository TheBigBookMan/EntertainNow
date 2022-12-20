const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

// * Mongoose schema for the user model
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

// * Function to hash the password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

//* Function to check if the users login password is correct or not
userSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;
