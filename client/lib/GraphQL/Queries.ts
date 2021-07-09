import { gql } from '@apollo/client';

const QUERIES = {
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
      }
    }
  `,
};

export const { GET_USERS, GET_PROJECTS } = QUERIES;
