import Users from "../../../db/models/dbUser.js";

const userQueries = {
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
