import bcrypt from "bcryptjs";
import pkg from "jsonwebtoken";
import Items from "./models/dbItem.js";
import Pannels from "./models/dbPannel.js";
import Projects from "./models/dbProject.js";
import Users from "./models/dbUser.js";

const { sign } = pkg;

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
    getUser: async (_, args, { req }) => {
      let result = {};
      const foundUser = await Users.findById(req.id);
      if (!foundUser) {
        result = { message: "Please sign up or login" };
      } else {
        result = foundUser;
      }
      return result;
    },
    getUsers: async () => await Users.find({}).exec(),
    getProject: async (_, { projectID }) => {
      const project = await Projects.findById(projectID)
        .populate("owner", "id username email")
        .populate("members", "id  username");
      return project;
    },
    getProjects: async (_, args, { req }) => {
      const myProjects = await Projects.find({ ownerID: req.id });
      return myProjects;
    },
    getPannels: async () => await Pannels.find({}).exec(),
    getProjectPannels: async (_, { projectID }) => {
      const projectPannels = await Pannels.find({ projectID: projectID }).sort({
        position: "asc",
      });
      return projectPannels;
    },
    getPannelItems: async (_, { pannelID }) => {
      const pannelItems = await Items.find({ pannelID: pannelID }).sort({
        position: "asc",
      });
      return pannelItems;
    },
    getItems: async () => await Items.find({}).exec(),
    getItem: async (_, { itemID }) => {
      const item = await Items.findById(itemID);
      return item;
    },
  },
  Mutation: {
    signUp: async (_, { username, email, password }, { res }) => {
      let result = {};
      const foundUser = await Users.findOne({ email: email });

      if (foundUser) {
        result = { message: "User already exisit with that email" };
      } else {
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new Users({
          username,
          email,
          password: hashedPassword,
        });
        await user.save();
        const token = sign({ id: user.id }, process.env.JWT_SECRET);
        res.cookie("jwt_token", token);
        result = user;
      }
      return result;
    },
    login: async (_, { username, password }, { res }) => {
      let result = {};
      const foundUser = await Users.findOne({ username: username });

      if (!foundUser) {
        result = { message: "Invalid username or password" };
      } else {
        const isValid = await bcrypt.compare(password, foundUser.password);
        if (!isValid) {
          result = { message: "Invalid username or password" };
        } else {
          const token = sign({ id: foundUser.id }, process.env.JWT_SECRET);
          res.cookie("jwt_token", token);
          result = foundUser;
        }
      }
      return result;
    },
    addProject: async (_, { title, ownerID }) => {
      const project = new Projects({ title, ownerID });
      await project.save();
      const owner = await Users.findById(ownerID);
      project["owner"] = owner;
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
    deletePannel: async (_, { pannelID }) => {
      const myProjects = await Pannels.findByIdAndDelete(pannelID);
      if (myProjects) {
        return {
          success: true,
          message: "Successfully completed",
        };
      } else {
        return {
          success: false,
          message: "An error occured",
        };
      }
    },
    renamePannel: async (_, { pannelID, update }) => {
      const myProjects = await Pannels.findByIdAndUpdate(pannelID, update, {
        new: true,
      });
      if (myProjects) {
        return {
          success: true,
          message: "Successfully completed",
          pannel: myProjects,
        };
      } else {
        return {
          success: false,
          message: "An error occured",
          pannel: { id: 0, title: "" },
        };
      }
    },
    updateItem: async (_, { itemID, update }) => {
      const itemUpdate = await Items.findByIdAndUpdate(itemID, update, {
        new: true,
      });
      return itemUpdate;
    },
    updateProject: async (_, { projectID, update }) => {
      const projectUpdate = await Projects.findByIdAndUpdate(
        projectID,
        update,
        {
          new: true,
        }
      );
      return projectUpdate;
    },
  },
};
