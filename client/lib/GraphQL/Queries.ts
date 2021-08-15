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
  GET_PROJECT_PANNELS: gql`
    query ($projectID: ID!) {
      getProjectPannels(projectID: $projectID) {
        id
        title
        projectID
      }
    }
  `,
  GET_PANNEL_ITEMS: gql`
    query ($pannelID: ID!) {
      getPannelItems(pannelID: $pannelID) {
        id
        title
        position
        pannelID
      }
    }
  `,
};

export const {
  GET_USER,
  GET_USERS,
  GET_PROJECTS,
  GET_PROJECT_PANNELS,
  GET_PANNEL_ITEMS,
} = QUERIES;
