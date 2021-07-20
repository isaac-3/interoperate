import Users from "./models/dbUser.js";
import Projects from "./models/dbProject.js";
import Pannels from "./models/dbPannel.js";
import Items from "./models/dbItem.js";
import bcrypt from "bcryptjs";
import pkg from "jsonwebtoken";

const { sign, verify } = pkg;

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
    getUser: async (_, args, { req, res }) => {
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
    getProjects: async (_, args, { req, res }) => {
      const myProjects = await Projects.find({ ownerID: req.id });
      return myProjects;
    },
    getPannels: async () => await Pannels.find({}).exec(),
    getItems: async () => await Items.find({}).exec(),
  },
  Mutation: {
    signUp: async (_, { username, email, password }, { req, res }) => {
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
    login: async (_, { username, password }, { req, res }) => {
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
  },
};
