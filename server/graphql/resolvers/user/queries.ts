import bcrypt from "bcryptjs";
import Users from "../../../models/dbUser";

const userQueries: object = {
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
};

export default userQueries;
