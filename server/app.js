import cookieParser from "cookie-parser";
import express from "express";
import authMiddleware from "./middleware/authMiddleware.js";
import server from "./graphql/index.js";

const corsOptions = {
  origin: process.env.HOST,
  credentials: true,
};

const app = express();

app.use(cookieParser());
app.use(authMiddleware);

server.applyMiddleware({
  app,
  cors: corsOptions,
});

export default app;
