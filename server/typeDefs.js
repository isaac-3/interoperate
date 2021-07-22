import pkg from "apollo-server-express";
const { gql } = pkg;

export const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
  }

  type Project {
    id: ID!
    title: String!
    pannels: [Pannel]
    ownerID: ID
    members: [User]
    owner: User
  }

  type Pannel {
    id: ID!
    title: String!
    list: [Item]
    postition: Int
    projectID: ID
  }

  type Item {
    id: ID!
    title: String!
    description: String
    postition: Int
  }

  type Error {
    message: String!
  }

  type DeleteMessage {
    success: Boolean
    message: String
  }

  union Result = User | Error

  type Query {
    getUser: Result
    getUsers: [User]
    getProjects: [Project]
    getPannels: [Pannel]
    getProjectPannels(projectID: ID!): [Pannel]
    getItems: [Item]
  }

  type Mutation {
    # Create
    signUp(username: String!, email: String!, password: String!): Result
    addProject(title: String!, ownerID: ID!): Project
    addPannel(title: String!, postition: Int!, projectID: ID!): Pannel
    addItem(title: String!, description: String, postition: Int): Item

    # Read
    login(username: String!, password: String!): Result

    # Update

    # Delete
    deletePannel(pannelID: ID!): DeleteMessage
  }
`;
