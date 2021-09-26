import { gql } from "@apollo/client";

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
  UPDATE_PROJECT: gql`
    mutation UpdateProject($projectID: ID!, $update: ProjectUpdate) {
      updateProject(projectID: $projectID, update: $update) {
        id
        title
        ownerID
      }
    }
  `,
};

export const ProjectQueries = {
  GET_PROJECT: gql`
    query ($projectID: ID!) {
      getProject(projectID: $projectID) {
        id
        title
        ownerID
        owner {
          id
          username
        }
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
};
