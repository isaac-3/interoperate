import { gql } from '@apollo/client';

const QUERIES = {
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
  GET_PROJECTS: gql`
    query {
      getProjects {
        id
        title
        ownerID
      }
    }
  `,
};

export const { GET_USER, GET_USERS, GET_PROJECTS } = QUERIES;
