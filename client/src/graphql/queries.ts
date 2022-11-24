import { gql } from "@apollo/client";

export const GET_FAVOURITES = gql`
  query GetFavourites($userId: ID!) {
    favourites(userId: $userId) {
      _id
      title
      description
      imDbRating
      contentRating
      image
      youtube
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $password: String!, $email: String!) {
    addUser(username: $username, password: $password, email: $email) {
      user {
        _id
        username
        password
        email
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

export const QUERY_ME = gql`
  query Me {
    me {
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
`;

export const ADD_FAVOURITE = gql`
  mutation AddFavourite(
    $title: String!
    $description: String!
    $imDbRating: String!
    $contentRating: String!
    $image: String!
    $youtube: String!
  ) {
    addFavourite(
      title: $title
      description: $description
      imDbRating: $imDbRating
      contentRating: $contentRating
      image: $image
      youtube: $youtube
    ) {
      _id
      title
      description
      imDbRating
      contentRating
      image
      youtube
    }
  }
`;

export const REMOVE_FAVOURITE = gql`
  mutation RemoveFavourite($favouriteId: ID!) {
    removeFavourite(favouriteId: $favouriteId) {
      _id
      title
      description
      imDbRating
      contentRating
      image
      youtube
    }
  }
`;
