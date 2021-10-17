import pkg from "apollo-server-express";
const { gql } = pkg;

export const typeDefs = gql`
  # type User {
  #   id: ID!
  #   username: String!
  #   email: String!
  #   password: String!
  # }

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
    position: Int
    projectID: ID
  }

  # type Item {
  #   id: ID!
  #   title: String!
  #   description: String
  #   position: Int
  #   pannelID: ID
  # }

  # type Error {
  #   message: String!
  # }

  type ActionMessage {
    success: Boolean
    message: String
    pannel: Pannel
  }

  # union Result = User | Error

  type Query {
    # getUser: Result
    # getUsers: [User]
    getProject(projectID: ID!): Project
    getProjects: [Project]
    getPannels: [Pannel]
    getProjectPannels(projectID: ID!): [Pannel]
    getPannelItems(pannelID: ID!): [Item]
    # getItems: [Item]
    # getItem(itemID: ID!): Item
  }

  input PannelUpdate {
    title: String
    position: Int
  }

  # input ItemUpdate {
  #   title: String
  #   description: String
  #   position: Int
  #   pannelID: ID
  # }

  input ProjectUpdate {
    title: String
    ownerID: ID
  }

  type Mutation {
    # Create
    # signUp(username: String!, email: String!, password: String!): Result
    addProject(title: String!, ownerID: ID!): Project
    addPannel(title: String!, position: Int!, projectID: ID!): Pannel
    # addItem(
    #   title: String!
    #   description: String
    #   position: Int!
    #   pannelID: ID!
    # ): Item

    # Read
    # login(username: String!, password: String!): Result

    # Update
    renamePannel(pannelID: ID!, update: PannelUpdate): ActionMessage
    # updateItem(itemID: ID!, update: ItemUpdate): Item
    updateProject(projectID: ID!, update: ProjectUpdate): Project

    # Delete
    deletePannel(pannelID: ID!): ActionMessage
  }
`;
