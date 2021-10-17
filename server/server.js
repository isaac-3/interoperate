import express from "express";
import pkg from "apollo-server-express";
const { ApolloServer } = pkg;
import { resolvers } from "./resolvers.js";
import { typeDefs } from "./typeDefs.js";
import mongoose from "mongoose";
import "dotenv/config.js";
import authMiddleware from "./authMiddleware.js";
import cookieParser from 'cookie-parser'

mongoose.connect(process.env.MONGODB_URL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

mongoose.connection.once("open", () => console.log(`Connected to mongoDB`));

const app = express();

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   context: ({ req, res }) => ({ req, res }),
// });

const corsOptions = {
  origin: process.env.HOST,
  credentials: true,
};

app.use(cookieParser());
app.use(authMiddleware);

server.applyMiddleware({ app, cors: corsOptions });

app.listen({ port: process.env.PORT }, () =>
  console.log(`Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`)
);
