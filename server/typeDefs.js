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

  union Result = User | Error

  type Query {
    getUser: Result
    getUsers: [User]
    getProjects: [Project]
    getPannels: [Pannel]
    getItems: [Item]
  }

  type Mutation {
    signUp(username: String!, email: String!, password: String!): Result
    login(username: String!, password: String!): Result
    addProject(title: String!, ownerID: ID!): Project
    addPannel(title: String!, postition: Int): Pannel
    addItem(title: String!, description: String, postition: Int): Item
  }
`;
