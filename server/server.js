import express from "express";
import pkg from "apollo-server-express";
const { ApolloServer } = pkg;
import { resolvers } from "./resolvers.js";
import { typeDefs } from "./typeDefs.js";
import mongoose from "mongoose";
import "dotenv/config.js";

mongoose.connect(process.env.MONGODB_URL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => console.log(`Connected to mongoDB`));

const server = new ApolloServer({ typeDefs, resolvers });
const app = express();
server.applyMiddleware({ app });

app.listen({ port: process.env.PORT }, () =>
  console.log(`Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`)
);
