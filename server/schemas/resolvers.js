const { AuthenticationError } = require("apollo-server-express");
const { User, Favourite } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("favourites");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    favourites: async (parent, args, { user: userId }) => {
      const user = await User.findById(userId).populate("favourites");
      return user.favourites;
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });
      if (!user)
        throw new AuthenticationError("No user found with this username.");
      if (!(await user.isCorrectPassword(password)))
        throw new AuthenticationError("Incorrect credentials.");
      const token = signToken(user);
      return { user, token };
    },
    addFavourite: async (
      parent,
      { title, description, imDbRating, contentRating, image, youtube },
      { user }
    ) => {
      if (!user) throw new AuthenticationError("No user logged in");
      const favourite = await Favourite.create({
        title,
        description,
        imDbRating,
        contentRating,
        image,
        youtube,
      });
      let updateUser = await User.findByIdAndUpdate(
        user,
        { $push: { favourites: { $each: [{ favourite: favourite._id }] } } },
        { new: true }
      );
      return updateUser;
    },
    //removeFavourite:
  },
};

module.exports = resolvers;
