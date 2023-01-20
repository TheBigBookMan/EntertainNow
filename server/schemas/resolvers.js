const { AuthenticationError } = require("apollo-server-express");
const { User, Favourite } = require("../models");
const { signToken, setCookie } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("favourites");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    favourites: async (parent, args, { user }) => {
      const loggedUser = await User.findById(user).populate("favourites");
      return loggedUser.favourites;
    },
  },

  Mutation: {
    addUser: async (parent, { username, password, email }, { res }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      // setCookie(res, token);
      return { user, token };
    },
    login: async (parent, { username, password }, { res }) => {
      const user = await User.findOne({ username });
      if (!user)
        throw new AuthenticationError("No user found with this username.");
      if (!(await user.isCorrectPassword(password)))
        throw new AuthenticationError("Incorrect credentials.");
      const token = signToken(user);
      // setCookie(res, token);
      return { user, token };
    },
    logout: async (parent, args, { res, user }) => {
      if (!user) {
        return false;
      }
      // res.clearCookie("token");
      return true;
    },
    addFavourite: async (
      parent,
      { title, description, imDbRating, contentRating, image, youtube },
      context
    ) => {
      const { user } = context;
      if (!user)
        throw new AuthenticationError(
          "You need to be logged in to add to favourites"
        );
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
        { $addToSet: { favourites: favourite._id } },
        { new: true }
      );
      return updateUser;
    },
    removeFavourite: async (parent, { image }, context) => {
      if (context.user) {
        const favourite = await Favourite.findOne({
          image: image,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { favourites: favourite._id } }
        );
        return favourite;
      }

      throw new AuthenticationError("You need to be logged in");
    },
  },
};

module.exports = resolvers;
