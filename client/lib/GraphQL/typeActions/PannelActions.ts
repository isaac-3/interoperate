import { gql } from '@apollo/client';

export const PannelMutations = {
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
  ADD_PANNEL: gql`
    mutation AddPannel($title: String!, $position: Int!, $projectID: ID!) {
      addPannel(title: $title, position: $position, projectID: $projectID) {
        id
        title
        position
        projectID
      }
    }
  `,
};

export const PannelQueries = {
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
