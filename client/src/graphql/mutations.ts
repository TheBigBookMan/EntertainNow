import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation AddUser($username: String!, $password: String!, $email: String!) {
    addUser(username: $username, password: $password, email: $email) {
      user {
        _id
        username
        password
        email
        favourites {
          _id
          title
          description
          imDbRating
          contentRating
          image
          youtube
        }
      }
      token
    }
  }
`;

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      user {
        _id
        username
        password
        email
        favourites {
          _id
          title
          description
          imDbRating
          contentRating
          image
          youtube
        }
      }
    }
  }
`;
