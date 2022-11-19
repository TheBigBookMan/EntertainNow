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
  }

  type Auth {
    token: ID!
    User: User
  }

  type Query {
    User(username: String!, password: String!): User
    Favourites(username: String!): [Favourite]
  }

  type Mutation {
    addUser(username: String!, password: String!, email: String!): Auth
    login(username: String!, password: String!): Auth
    addFavourite(favouriteId: ID!): Favourite
    removeFavourite(favouriteId: ID!): Favourite
  }
`;

module.exports = typeDefs;
