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
    // addUser:
    //login:
    // addFavourite:
    //removeFavourite:
  },
};

module.exports = resolvers;
