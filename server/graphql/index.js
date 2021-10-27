import pkg from "apollo-server-express";
import schema from "./schema.js";

const { ApolloServer } = pkg;

const server = new ApolloServer({
  schema,
  context: ({ req, res }) => ({ req, res }),
});

export default server;
