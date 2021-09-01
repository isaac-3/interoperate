import { gql } from '@apollo/client';

export const ProjectMutations = {
  ADD_PROJECT: gql`
    mutation AddProject($title: String!, $ownerID: ID!) {
      addProject(title: $title, ownerID: $ownerID) {
        id
        title
        ownerID
      }
    }
  `,
};

export const ProjectQueries = {
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
};
