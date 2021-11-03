import { readdirSync, readFileSync } from "fs";
import pkg from "graphql-tools";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import resolvers from "./resolvers/index.js";
const { makeExecutableSchema } = pkg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const gqlFiles = readdirSync(join(__dirname, "./typedefs"));

let typeDefs = "";

gqlFiles.forEach((file) => {
  typeDefs += readFileSync(join(__dirname, "./typedefs", file), {
    encoding: "utf8",
  });
});

const schema = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
});

export default schema;
