const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    password: String
    email: String
    favourites: [Favourite]
  }

  type Favourite {
    _id: ID
    title: String
    description: String
    imDbRating: String
    contentRating: String
    image: String
    youtube: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    favourites: [Favourite]
    user(username: String!): User
    me: User
  }

  type Mutation {
    addUser(username: String!, password: String!, email: String!): Auth
    login(username: String!, password: String!): Auth
    logout: Boolean
    addFavourite(
      title: String!
      description: String!
      imDbRating: String!
      contentRating: String!
      image: String!
      youtube: String!
    ): Favourite
    removeFavourite(image: String!): Favourite
  }
`;

module.exports = typeDefs;
