import mongoose from "mongoose";
import "dotenv/config.js";
import app from "./app.js";
import server from "./graphql/index.js";

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    await mongoose.connection.once("open", () =>
      console.log(`Connected to mongoDB`)
    );
    await app.listen({ port: process.env.PORT }, () =>
      console.log(
        `Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`
      )
    );
  } catch {
    console.log("Not able to run GraphQL server");
  }
};

start();
