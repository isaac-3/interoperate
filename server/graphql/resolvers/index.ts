import { itemMutations, itemQueries } from "./item";
import { pannelMutations, pannelQueries } from "./pannel";
import { projectMutations, projectQueries } from "./project";
import { userMutations, userQueries } from "./user";

const resolvers: object = {
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
