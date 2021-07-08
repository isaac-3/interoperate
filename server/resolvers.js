import Users from "./models/dbUser.js";

export const resolvers = {
  Query: {
    getUsers: async () => await Users.find({}).exec(),
  },
  Mutation: {
    addUser: async (_, args) => {
      try {
        let response = await Users.create(args);
        return response;
      } catch (e) {
        return e.message;
      }
    },
  },
};
