import { gql } from '@apollo/client';

export const ItemMutations = {
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
  UPDATE_ITEM: gql`
    mutation UpdateItem($itemID: ID!, $update: ItemUpdate) {
      updateItem(itemID: $itemID, update: $update) {
        id
        title
        description
        position
        pannelID
      }
    }
  `,
};

export const ItemQueries = {
  GET_ITEM: gql`
    query ($itemID: ID!) {
      getItem(itemID: $itemID) {
        id
        title
        description
        position
        pannelID
      }
    }
  `,
};
