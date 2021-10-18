import pkg from "apollo-server-express";
import { typeDefs } from "../typeDefs.js";
import resolvers from "./resolvers/index.js";

const { ApolloServer } = pkg;

const server = new ApolloServer({
  resolvers,
  typeDefs,
  context: ({ req, res }) => ({ req, res }),
});

export default server;
