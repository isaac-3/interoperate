import Projects from "../../../models/dbProject.js";
import Users from "../../../models/dbUser.js";

const projectMutations = {
  addProject: async (_, { title, ownerID }) => {
    const project = new Projects({ title, ownerID });
    await project.save();
    const owner = await Users.findById(ownerID);
    project["owner"] = owner;
    return project;
  },
  updateProject: async (_, { projectID, update }) => {
    const projectUpdate = await Projects.findByIdAndUpdate(projectID, update, {
      new: true,
    });
    return projectUpdate;
  },
};

export default projectMutations;
