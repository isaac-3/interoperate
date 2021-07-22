import { gql } from '@apollo/client';

const Mutations = {
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
  ADD_PROJECT: gql`
    mutation AddProject($title: String!, $ownerID: ID!) {
      addProject(title: $title, ownerID: $ownerID) {
        id
        title
        ownerID
      }
    }
  `,
  DELETE_PANNEL: gql`
    mutation DeletePannel($pannelID: ID!) {
      deletePannel(pannelID: $pannelID) {
        success
        message
      }
    }
  `,
};

export const {
  SIGN_UP,
  LOG_IN,
  ADD_PROJECT,
  DELETE_PANNEL,
} = Mutations;
