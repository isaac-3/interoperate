import { gql } from '@apollo/client';

export const UserMutations = {
  SIGN_UP: gql`
    mutation SignUp($username: String!, $email: String!, $password: String!) {
      signUp(username: $username, email: $email, password: $password) {
        ... on User {
          id
          username
          email
          password
        }
        ... on Error {
          message
        }
      }
    }
  `,
  LOG_IN: gql`
    mutation LogIn($username: String!, $password: String!) {
      login(username: $username, password: $password) {
        ... on User {
          id
          username
          email
          password
        }
        ... on Error {
          message
        }
      }
    }
  `,
};

export const UserQueries = {
  GET_USER: gql`
    query {
      getUser {
        ... on User {
          id
          username
          email
          password
        }
        ... on Error {
          message
        }
      }
    }
  `,
  GET_USERS: gql`
    query {
      getUsers {
        id
        username
        email
      }
    }
  `,
};
