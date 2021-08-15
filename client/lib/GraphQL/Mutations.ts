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
  RENAME_PANNEL: gql`
    mutation RenamePannel($pannelID: ID!, $update: PannelUpdate) {
      renamePannel(pannelID: $pannelID, update: $update) {
        success
        message
        pannel {
          id
          title
        }
      }
    }
  `,
  ADD_ITEM: gql`
    mutation AddItem($title: String!, $position: Int!, $pannelID: ID!) {
      addItem(title: $title, position: $position, pannelID: $pannelID) {
        id
        title
        position
        pannelID
      }
    }
  `,
};

export const {
  SIGN_UP,
  LOG_IN,
  ADD_PROJECT,
  DELETE_PANNEL,
  RENAME_PANNEL,
  ADD_ITEM,
} = Mutations;
