import bcrypt from "bcryptjs";
import pkg from "jsonwebtoken";
import Users from "../../../db/models/dbUser.js";

const { sign } = pkg;

const userMutations = {
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
};

export default userMutations;
