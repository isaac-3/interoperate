import Users from "./models/dbUser.js";
import Projects from "./models/dbProject.js";
import Pannels from "./models/dbPannel.js";
import Items from "./models/dbItem.js";

export const resolvers = {
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
    getUsers: async () => await Users.find({}).exec(),
    getProjects: async () => await Projects.find({}).exec(),
    getPannels: async () => await Pannels.find({}).exec(),
    getItems: async () => await Items.find({}).exec(),
  },
  Mutation: {
    addUser: async (_, args) => {
      let result = {};
      const found = await Users.findOne({ email: args.email });

      if (found) {
        result = { message: "User already exisit with that email" };
      } else {
        const user = new Users(args);
        await user.save();
        result = user;
      }
      return result;
    },
    addProject: async (_, args) => {
      const project = new Projects(args);
      await project.save();
      return project;
    },
    addPannel: async (_, args) => {
      const pannel = new Pannels(args);
      await pannel.save();
      return pannel;
    },
    addItem: async (_, args) => {
      const item = new Items(args);
      await item.save();
      return item;
    },
  },
};
