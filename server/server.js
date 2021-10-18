import "dotenv/config.js";
import app from "./app.js";
import server from "./graphql/index.js";
import connectDB from "./db/index.js";

const start = async () => {
  try {
    console.log("Connecting to mongoDB...");
    await connectDB();
    console.log("Connected to mongoDB!");
    app.listen({ port: process.env.PORT }, () =>
      console.log(
        `Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`
      )
    );
  } catch {
    console.log("Not able to start server...");
  }
};

start();
