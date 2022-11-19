const { AuthenticationError } = require("apollo-server-express");
const { User, Favourite } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    // User:
    //Favourites
  },

  Mutation: {
    // addUser:
    //login:
    // addFavourite:
    //removeFavourite:
  },
};

module.exports = resolvers;
