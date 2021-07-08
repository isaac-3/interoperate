import pkg from "apollo-server-express";
const { gql } = pkg;

export const typeDefs = gql`
  type User {
    id: ID!
    userName: String
    email: String
  }
  type Query {
    getUsers: [User]
  }
  type Mutation {
    addUser(userName: String!, email: String!): User!
  }
`;
