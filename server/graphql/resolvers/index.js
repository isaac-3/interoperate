import { itemMutations, itemQueries } from "./item/index.js";
import { pannelMutations, pannelQueries } from "./pannel/index.js";
import { projectMutations, projectQueries } from "./project/index.js";
import { userMutations, userQueries } from "./user/index.js";

const resolvers = {
  // Temp
  Result: {
    __resolveType(obj) {
      if (obj.id) {
        return "User";
      }
      if (obj.message) {
        return "Error";
      }
      return null;
    },
  },

  Query: {
    ...userQueries,
    ...projectQueries,
    ...pannelQueries,
    ...itemQueries,
  },
  Mutation: {
    ...userMutations,
    ...projectMutations,
    ...pannelMutations,
    ...itemMutations,
  },
};

export default resolvers;
